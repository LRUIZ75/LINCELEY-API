// Last Updated: 5/4/2021 12:46:25
// Updated By  : @YourName
"use strict";

const os = require("os");
const driverModel = require("../models/driver.model");
const validator = require("validator");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
const { findOneAndDelete } = require("../models/driver.model");

/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: driver
 */

var driverController = {
  /**
   * @openapi
   * /api/driver/{id}:
   *   get:
   *     tags:
   *       - Driver
   *     description: Get driver by Id
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
   *               $ref: "#/components/schemas/Driver"
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  /**
   * @openapi
   * /api/driver:
   *   get:
   *     tags:
   *       - Driver
   *     description: Get list of driver
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/Driver"
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  getDriver: (req, res) => {
    var id = req.params.id;

    var query = { _id: { $eq: id } };

    if (!id || id === undefined) query = {};
    else query = { _id: { $eq: id } };

    console.log(query);

    driverModel.find(query, (err, objects) => {
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
                global.baseURL + "/api/driver",
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
   * /api/driver:
   *   post:
   *     tags:
   *       - Driver
   *     description: Create driver
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           $ref: "#/components/schemas/Driver"
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Driver"
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
  addDriver: (req, res) => {
    var data = req.body;

    //SIN PARAMETROS
    if (!data) {
      return res.status(400).send({
        status: "error",
        message: "Faltan parámetros de request en formato JSON",
      });
    }

    var newDriver = new driverModel(data);

    //INTENTAR GUARDAR EL NUEVO OBJETO
    newDriver.save((err, storedObject) => {
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
   * /api/driver/{id}:
   *   put:
   *     tags:
   *       - Driver
   *     description: Update driver
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
   *           $ref: "#/components/schemas/Driver"
   *     responses:
   *       200:
   *         description: Ok
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Driver"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  editDriver: (req, res) => {
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

    driverModel.findOneAndUpdate(
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
   * /api/driver/{id}:
   *   delete:
   *     tags:
   *       - Driver
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
   *               $ref: "#/components/schemas/Driver"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  deactivateDriver: (req, res) => {
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

    driverModel.findOneAndUpdate(
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
   * /api/driver/{id}:
   *   delete:
   *     tags:
   *       - Driver
   *     description: Delete driver by id
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
   *               $ref: "#/components/schemas/Driver"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  deleteDriver: (req, res) => {
    var id = req.params.id;
    if (!id || id == undefined) {
      return res.status(400).send({
        status: "error",
        message: "falta parámetro requerido ID",
      });
    }

    var query = { _id: { $eq: id } };

    driver.findOneAndDelete(query, { new: false }, (err, deletedObject) => {
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
   * /api/driver/{field}/{id}:
   *   put:
   *     tags:
   *       - Driver
   *     description: Upload driver picture
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
   *               $ref: "#/components/schemas/Driver"
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
    var validFields = ["licenseCard", "insuranceCard"];

    if (!validFields.includes(fieldname)) {
      return res.status(400).send({
        status: "error",
        message: "Parámetros de ruta, son incorrectos",
      });
    }

    //conseguir nombre y extensión del archivo
    var file_path = req.files.picture.path;

    var file_name = path.basename(file_path);

    var file_ext = path.extname(file_name).toLowerCase();
    var oldValue = "";

    const validExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

    if (validExtensions.includes(file_ext)) {
      //Archivo aceptable

      var query = { _id: { $eq: id } };
      // licenseCard | insuranceCard

      var command = { $set: { [fieldname]: file_name } };

      driverModel.findOne(query, (err, doc) => {
        if (err)
          return res.status(500).send({
            status: "error",
            message: err.message,
          });
        if (doc) {
          var object = JSON.parse(JSON.stringify(doc._doc));
          oldvalue = object[fieldname];
          oldvalue = "/uploads/picture/" + oldvalue;
          console.log(`Deleting: ${oldvalue}`);
          fs.unlinkSync(oldvalue);
        }
      });

      driverModel.findOneAndUpdate(
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
    } else {
      //Archivo no aceptado

      //Borrar el archivo

      fs.unlinkSync(file_path);

      return res.status(400).send({
        status: "error",
        message: "Tipo de archivo no es imagen",
        file_name,
      });
    }
  },

  /**
   * @openapi
   * /api/driver/picture/{filename}:
   *   get:
   *     tags:
   *       - Driver
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

module.exports = driverController;
