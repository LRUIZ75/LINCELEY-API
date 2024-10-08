// Last Updated: 5/4/2021 12:49:21
// Updated By  : @YourName
"use strict";

const os = require("os");
const vehicleModel = require("../models/vehicle.model");
const validator = require("validator");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
const { findOneAndDelete } = require("../models/vehicle.model");

/**
 * @swagger
 * tags:
 *   name: Vehicle
 *   description: vehicle
 */

var vehicleController = {
  /**
   * @openapi
   * /api/vehicle/{id}:
   *   get:
   *     tags:
   *       - Vehicle
   *     description: Get vehicle by Id
   *     parameters:
   *       - in: path
   *         name: id
   *         description: Object Id
   *         required: false
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Vehicle"
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  /**
   * @openapi
   * /api/vehicle:
   *   get:
   *     tags:
   *       - Vehicle
   *     description: Get list of vehicle
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/Vehicle"
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  getVehicle: (req, res) => {
    var id = req.params.id;

    var query = { _id: { $eq: id } };

    if (!id || id === undefined) query = {};
    else query = { _id: { $eq: id } };

    console.log(query);

    vehicleModel
      .find(query)
      .populate('company')
      .populate('owner')
      .exec((err, objects) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: err.message,
          });
        }

        if (!objects || objects.length == 0) {
          return res.status(404).send({
            status: "error",
            message: "Registro(s) no encontrado(s)",
            links: [
              {
                "Agregar registro => curl -X POST ":
                  global.baseURL + "/api/vehicle",
              },
            ],
          });
        } else {
          return res.status(200).send({
            status: "ok",
            objects: objects,
          });
        }
      });
  },

  /**
   * @openapi
   * /api/vehicle:
   *   post:
   *     tags:
   *       - Vehicle
   *     description: Create vehicle
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           $ref: "#/components/schemas/Vehicle"
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Vehicle"
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
  addVehicle: (req, res) => {
    var data = req.body;

    //SIN PARAMETROS
    if (!data) {
      return res.status(400).send({
        status: "error",
        message: "Faltan parámetros de request en formato JSON",
      });
    }

    var newVehicle = new vehicleModel(data);

    //INTENTAR GUARDAR EL NUEVO OBJETO
    newVehicle.save((err, storedObject) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: err.message,
        });
      } else {
        if (!storedObject) {
          return res.status(500).send({
            status: "error",
            message: "Error al intentar guardar un nuevo registro",
          });
        }

        return res.status(201).send({
          status: "ok",
          created: storedObject,
        });
      }
    });
  },

  /**
   * @openapi
   * /api/vehicle/{id}:
   *   put:
   *     tags:
   *       - Vehicle
   *     description: Update vehicle
   *     parameters:
   *       - in: path
   *         name: id
   *         description: "Object Id"
   *         type: string
   *         required: true
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           $ref: "#/components/schemas/Vehicle"
   *     responses:
   *       200:
   *         description: Ok
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Vehicle"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  editVehicle: (req, res) => {
    var id = req.params.id;
    var data = req.body;

    if (!id || id == undefined) {
      return res.status(400).send({
        status: "error",
        message: "falta parámetro requerido ID",
      });
    }
    if (!data || data == undefined) {
      return res.status(400).send({
        status: "error",
        message: "falta parámetro requerido data JSON",
      });
    }

    var query = { _id: { $eq: id } };
    var command = { $set: data };

    vehicleModel.findOneAndUpdate(
      query,
      command,
      { new: true },
      (err, updatedObject) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: err.message,
          });
        }

        if (!updatedObject) {
          return res.status(404).send({
            status: "error",
            message: "No se encontró el registro a modificar",
          });
        }

        return res.status(200).send({
          status: "ok",
          updated: updatedObject,
        });
      }
    );
  },

  /**
   * @openapi
   * /api/vehicle/{id}:
   *   delete:
   *     tags:
   *       - Vehicle
   *     description: Desactivar por id
   *     parameters:
   *       - in: path
   *         name: id
   *         description: "Object Id"
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Vehicle"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  deactivateVehicle: (req, res) => {
    // el procedimiento de borrado consiste en desactivar isActive:false
    var id = req.params.id;
    if (!id || id == undefined) {
      return res.status(400).send({
        status: "error",
        message: "falta parámetro requerido ID",
      });
    }

    var query = { _id: { $eq: id } };
    var command = { $set: { isActive: false } };

    vehicleModel.findOneAndUpdate(
      query,
      command,
      { new: true },
      (err, deactivateObject) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            message: err.message,
          });
        }

        if (!deactivateObject) {
          return res.status(404).send({
            status: "error",
            message: "No se encontró el registro a modificar",
          });
        }

        return res.status(200).send({
          status: "ok",
          deleted: deactivateObject,
        });
      }
    );
  },

  /**
   * @openapi
   * /api/vehicle/{id}:
   *   delete:
   *     tags:
   *       - Vehicle
   *     description: Delete vehicle by id
   *     parameters:
   *       - in: path
   *         name: id
   *         description: "Object Id"
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Vehicle"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  deleteVehicle: (req, res) => {
    var id = req.params.id;
    if (!id || id == undefined) {
      return res.status(400).send({
        status: "error",
        message: "falta parámetro requerido ID",
      });
    }

    var query = { _id: { $eq: id } };

    vehicle.findOneAndDelete(query, { new: false }, (err, deletedObject) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: err.message,
        });
      }

      if (!deletedObject) {
        return res.status(404).send({
          status: "error",
          message: "No se encontró el registro a eliminar",
        });
      }

      return res.status(200).send({
        status: "ok",
        deleted: deletedObject,
      });
    });
  },

  /**
   * @openapi
   * /api/vehicle/{field}/{id}:
   *   put:
   *     tags:
   *       - Vehicle
   *     description: Upload vehicles picture
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               picture:
   *                 type: string
   *                 format: base64
   *     parameters:
   *       - in: path
   *         name: field
   *         description: "fieldname for picture"
   *         type: string
   *         default: "insuranceCard"
   *         required: true
   *       - in: path
   *         name: id
   *         description: "Object Id"
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Ok
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Vehicle"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  setPicture: (req, res) => {
    //description: 'Archivo grafico: PNG JPEG GIF' ,

    //recojer fichero de petición
    var file_name = "Imagen no proporcionada...";
    var id = req.params.id;
    var fieldname = req.params.field;

    // console.log(req.files);

    if (!req.files.picture) {
      return res.status(400).send({
        status: "error",
        message: "Parámetros de formData, son incorrectos",
        file_name,
      });
    }

    if (!id || !fieldname) {
      return res.status(400).send({
        status: "error",
        message: "Parámetros de ruta, son incorrectos",
        fieldname,
        id,
      });
    }

    //TODO: Revisar y controlar los campos válidos para imagenes de la colección
    var validFields = ["registrationCard", "insuranceCard"];

    if (!validFields.includes(fieldname)) {
      return res.status(400).send({
        status: "error",
        message: "Parámetros de ruta, son incorrectos",
        fieldname,
        id,
      });
    }

    //conseguir nombre y extensión del archivo
    var file_path = req.files.picture.path;

    var file_name = path.basename(file_path);

    var file_ext = path.extname(file_name);

    console.log(file_ext);

    switch (file_ext) {
      case ".png":
      case ".jpg":
      case ".jpeg":
      case ".gif":
        //Archivo aceptable

        var query = { _id: { $eq: id } };
        // registrationCard | insuranceCard

        var command = {};
        if (fieldname == "insuranceCard")
          command = { $set: { insuranceCard: file_name } };
        if (fieldname == "registrationCard")
          command = { $set: { registrationCard: file_name } };

        vehicleModel.findOneAndUpdate(
          query,
          command,
          { new: true },
          (err, updatedObject) => {
            if (err) {
              fs.unlinkSync(file_path);

              return res.status(500).send({
                status: "error",
                message: err.message,
              });
            }

            if (!updatedObject) {
              fs.unlinkSync(file_path);

              return res.status(404).send({
                status: "error",
                message: "No se pudo encontrar el registro",
              });
            }

            return res.status(200).send({
              status: "ok",
              updated: updatedObject,
            });
          }
        );
        break;

      default:
        //Archivo no aceptado

        //Borrar el archivo

        fs.unlinkSync(file_path);

        return res.status(400).send({
          status: "error",
          message: "Tipo de archivo no es imagen",
          file_name,
        });
        break;
    }
  },

  /**
   * @openapi
   * /api/vehicle/picture/{filename}:
   *   get:
   *     tags:
   *       - Vehicle
   *     description: Get pictures
   *     parameters:
   *       - in: path
   *         name: filename
   *         description: Image filename
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           image/png:
   *             type: image
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  getPicture: (req, res) => {
    var file = req.params.filename;
    if (validator.isEmpty(file)) {
      return res.status(400).send({
        status: "error",
        message: "falta el nombre del archivo",
      });
    }

    var path_file = "./uploads/pictures/" + file;

    fs.stat(path_file, (err) => {
      if (err) {
        return res.status(404).send({
          status: "error",
          message: "archivo no encontrado",
          path: path_file,
        });
      }

      return res.status(200).sendFile(path.resolve(path_file));
    });
  },
};

module.exports = vehicleController;
