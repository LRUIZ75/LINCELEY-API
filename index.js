"use strict";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

global.PORT = process.env.PORT || 5000;

var app = require("./app");

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

console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);

// optional
const ms = require("ms");
const dayjs = require("dayjs");
const Graceful = require("@ladjs/graceful");
const Cabin = require("cabin");

// required
const Bree = require("bree");

const bree = new Bree({
  logger: new Cabin(),
  jobs: [
    {
      name: "servicescheduler",
      interval: "1m", // runs `./jobs/servicescheduler.js` on start
    },
  ],
});

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] });

mongoose.connect(uriMongoDB, options).then(
  () => {
    console.log("\n");
    console.log("INFO: process.env.NODE_ENV = " + process.env.NODE_ENV);
    console.log("INFO: La conexión a la base de datos es correcta!!!");
    console.log("INFO: La base de datos es: " + uriMongoDB);

    graceful.listen();
    // start all jobs (this is the equivalent of reloading a crontab):
    bree.start();
    console.log("INFO: Bree Job Scheduler está iniciado!");

    //Crear servidor y ponerme a escuchar peticiones HTTP
    app.listen(PORT, () => {
      console.log("INFO: Escuchando peticiones en el puerto: " + global.PORT);
    });
  },
  (err) => {
    console.log("ERROR: " + err);
    bree.stop();
  }
);
