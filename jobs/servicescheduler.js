"use strict";

const os = require("os");
const { parentPort } = require("worker_threads");
const Cabin = require("cabin");
const dayjs = require("dayjs");
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

var mongoose = require("mongoose");
//Mongoose Options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

//Base de datos local en MongoDB
var uriMongoDB = "mongodb://localhost:27017/linceley";

if (process.env.NODE_ENV == "production") {
  //Esta URL cuando el proyecto tenga un cluster en Mongodb Atlas debe ser camabiada a la correcta
  //admin:iVdVNpQh2lFNDNSu
  uriMongoDB =
    "mongodb+srv://admin:iVdVNpQh2lFNDNSu@cluster0.9rxic.mongodb.net/linceley?retryWrites=true&w=majority";
}

mongoose.Promise = global.Promise;

const servicescheduleModel = require("../models/serviceschedule.model");
const vehicleModel = require("../models/vehicle.model");
const ms = require("ms");
const { findByIdAndUpdate } = require("../models/vehicle.model");
const { Console } = require("console");

//
// we recommend using Cabin as it is security-focused
// and you can easily hook in Slack webhooks and more
// <https://cabinjs.com>
//
const logger = new Cabin();

// store boolean if the job is cancelled
let isCancelled = false;

// how many emails to send at once
const concurrency = os.cpus().length;

async function checkSchedules() {
  // return early if the job was already cancelled
  if (isCancelled) return;

  try {
    let messages = "";
    await mongoose.connect(uriMongoDB, options);

    mongoose.connection.on("error", (err) => {
      logger.error(err);
      isCancelled = true;
      return;
    });
    mongoose.set("debug", true);
    let query = { isActive: { $eq: true } };

    //obtener todas la programaciones activas
    let schedules = await servicescheduleModel.find(query).populate("vehicle");
    //console.log("Programaciones activas: " + schedules.length);
    messages = messages + "Programaciones activas: " + schedules.length;

    for (var i = 0; i < schedules.length; i++) {
      let s = schedules[i];

      let quantumTerm = parseInt(!s.term ? 0 : s.term);
      let uomTerm = !s.term ? "m" : s.term.substr(s.term.length - 1, 1);

      let quantumRepeat = parseInt(!s.repeatEvery ? 0 : s.repeatEvery);
      let uomRepeat = !s.repeatEvery
        ? "m"
        : s.repeatEvery.substr(s.repeatEvery.length - 1, 1);

      let now = dayjs();
      let dueDate = dayjs(s.startDate).add(quantumTerm, uomTerm);
      let nextStartDate = dayjs(dueDate).add(quantumRepeat, uomRepeat);

      let dates = {
        startDate: s.startDate.toISOString(),
        dueDate: dueDate.toISOString(),
        today: now.toISOString(),
        nextStartDate: nextStartDate.toISOString(),
      };

      console.log("SCHEDULE ID: " + s._id);
      console.log("<<<");
      console.log(JSON.stringify(dates));

      //Verificar si vence ahora
      if (dayjs(dueDate).isSameOrBefore(now, "minute")) {
        console.info("        IS DUE ON -> " + dueDate.toISOString());

        //verificar si es repetible y reprogramar el registro con el nuevo nextStartDate
        if (s.repeatEvery) {
          let nextStart = nextStartDate.toISOString();
          await servicescheduleModel.findByIdAndUpdate(s._id, {
            $set: { startDate: nextStart },
          });

          console.info("        NEW START DATE -> " + nextStart);
        } else {
          await servicescheduleModel.findByIdAndUpdate(s._id, {
            $set: { isActive: false },
          });

          console.info("        HAS BEEN DEACTIVATED");
        }
      } else {
        //la programación es válida y no está vencida
        //aplicamos isAvailble al vehículo en dependencia del serviceStatus dado en la programación
        //ON-DUTY y SERVICING => isAvailable FALSE
        //AVAIBLE => isAvailable TRUE
        let updateAvailable = {
          isAvailable: s.serviceStatus == "AVAILABLE" ? true : false,
        };
        await vehicleModel.findByIdAndUpdate(s.vehicle._id, {
          $set: updateAvailable,
        });
      }
      console.log(">>>");
    }

    //borrar todas las programaciones INACTIVAS
    await servicescheduleModel.deleteMany({ isActive: { $eq: false } });
    mongoose.set("debug", false);
  } catch (err) {
    logger.error(err);
    return 1; //Oops! algo sucedió!
  }
}

// handle cancellation
if (parentPort)
  parentPort.once("message", (message) => {
    //
    // TODO: once we can manipulate concurrency option to p-map
    // we could make it `Number.MAX_VALUE` here to speed cancellation up
    // <https://github.com/sindresorhus/p-map/issues/28>
    //
    if (message === "cancel") isCancelled = true;
  });

(async () => {
  // query database results for emails not sent
  // and iterate over them with concurrency

  await checkSchedules();

  // signal to parent that the job is done
  if (parentPort) parentPort.postMessage("done");
  else process.exit(0);
})();
