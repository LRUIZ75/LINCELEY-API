// Last Updated: 5/4/2021 12:46:11
// Updated By  : @YourName
"use strict";

const os = require("os");
const distributioncenterModel = require("../models/distributioncenter.model");
const validator = require("validator");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
const { findOneAndDelete } = require("../models/distributioncenter.model");

/**
 * @swagger
 * tags:
 *   name: DistributionCenter
 *   description: distribution center
 */

var distributioncenterController = {
  /**
   * @openapi
   * /api/distributioncenter/{id}:
   *   get:
   *     tags:
   *       - DistributionCenter
   *     description: Get distribution center by Id
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
   *               $ref: "#/components/schemas/DistributionCenter"
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  /**
   * @openapi
   * /api/distributioncenter:
   *   get:
   *     tags:
   *       - DistributionCenter
   *     description: Get list of distribution center
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/DistributionCenter"
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  getDistributionCenter: (req, res) => {
    var id = req.params.id;

    var query = { _id: { $eq: id } };

    if (!id || id === undefined) query = {};
    else query = { _id: { $eq: id } };

    console.log(query);

    distributioncenterModel.find(query)
    .populate('company')
    .exec( (err, objects) => {
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
                global.baseURL + "/api/distributioncenter",
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
   * /api/distributioncenter:
   *   post:
   *     tags:
   *       - DistributionCenter
   *     description: Create distribution center
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           $ref: "#/components/schemas/DistributionCenter"
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/DistributionCenter"
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
  addDistributionCenter: (req, res) => {
    var data = req.body;

    //SIN PARAMETROS
    if (!data) {
      return res.status(400).send({
        status: "error",
        message: "Faltan parámetros de request en formato JSON",
      });
    }

    var newDistributionCenter = new distributioncenterModel(data);

    //INTENTAR GUARDAR EL NUEVO OBJETO
    newDistributionCenter.save((err, storedObject) => {
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
   * /api/distributioncenter/{id}:
   *   put:
   *     tags:
   *       - DistributionCenter
   *     description: Update distribution center
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
   *           $ref: "#/components/schemas/DistributionCenter"
   *     responses:
   *       200:
   *         description: Ok
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/DistributionCenter"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  editDistributionCenter: (req, res) => {
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

    distributioncenterModel.findOneAndUpdate(
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
   * /api/distributioncenter/{id}:
   *   delete:
   *     tags:
   *       - DistributionCenter
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
   *               $ref: "#/components/schemas/DistributionCenter"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  deactivateDistributionCenter: (req, res) => {
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

    distributioncenterModel.findOneAndUpdate(
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
   * /api/distributioncenter/{id}:
   *   delete:
   *     tags:
   *       - DistributionCenter
   *     description: Delete distribution center by id
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
   *               $ref: "#/components/schemas/DistributionCenter"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  deleteDistributionCenter: (req, res) => {
    var id = req.params.id;
    if (!id || id == undefined) {
      return res.status(400).send({
        status: "error",
        message: "falta parámetro requerido ID",
      });
    }

    var query = { _id: { $eq: id } };

    distributioncenter.findOneAndDelete(
      query,
      { new: false },
      (err, deletedObject) => {
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
      }
    );
  },
};

module.exports = distributioncenterController;
