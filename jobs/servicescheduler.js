"use strict";

const os = require("os");
const { parentPort } = require("worker_threads");
const Cabin = require("cabin");

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
    await mongoose.connect(uriMongoDB, options);

    mongoose.connection.on("error", (err) => {
      logger.error(err);
      isCancelled = true;
      return;
    });

    const query = { isActive: { $eq: "true" } };

    const schedules = await servicescheduleModel
      .find(query)
      .populate("vehicle");

    console.log(schedules);

    var response = 0;
    return response;
  } catch (err) {
    logger.error(err);
  }
}

// handle cancellation (this is a very simple example)
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
