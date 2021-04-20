// Last Updated: 5/4/2021 12:46:43
// Updated By  : @YourName
"use strict";

const os = require("os");
const employeeModel = require("../models/employee.model");
const validator = require("validator");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
const { findOneAndDelete } = require("../models/employee.model");

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: employee
 */

var employeeController = {
  /**
   * @openapi
   * /api/employee/{id}:
   *   get:
   *     tags:
   *       - Employee
   *     description: Get employee by Id
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
   *               $ref: "#/components/schemas/Employee"
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  /**
   * @openapi
   * /api/employee:
   *   get:
   *     tags:
   *       - Employee
   *     description: Get list of employee
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/Employee"
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  getEmployee: (req, res) => {
    var id = req.params.id;

    var query = { _id: { $eq: id } };

    if (!id || id === undefined) query = {};
    else query = { _id: { $eq: id } };

    console.log(query);

    employeeModel
      .find(query)
      .populate("department")
      .populate("jobposition")
      .populate("person")
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
                  global.baseURL + "/api/employee",
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
   * /api/employee:
   *   post:
   *     tags:
   *       - Employee
   *     description: Create employee
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           $ref: "#/components/schemas/Employee"
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Employee"
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal Server Error
   */
  addEmployee: (req, res) => {
    var data = req.body;

    //SIN PARAMETROS
    if (!data) {
      return res.status(400).send({
        status: "error",
        message: "Faltan parámetros de request en formato JSON",
      });
    }

    var newEmployee = new employeeModel(data);

    //INTENTAR GUARDAR EL NUEVO OBJETO
    newEmployee.save((err, storedObject) => {
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
   * /api/employee/{id}:
   *   put:
   *     tags:
   *       - Employee
   *     description: Update employee
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
   *           $ref: "#/components/schemas/Employee"
   *     responses:
   *       200:
   *         description: Ok
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Employee"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  editEmployee: (req, res) => {
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

    employeeModel.findOneAndUpdate(
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
   * /api/employee/{id}:
   *   delete:
   *     tags:
   *       - Employee
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
   *               $ref: "#/components/schemas/Employee"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  deactivateEmployee: (req, res) => {
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

    employeeModel.findOneAndUpdate(
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
   * /api/employee/{id}:
   *   delete:
   *     tags:
   *       - Employee
   *     description: Delete employee by id
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
   *               $ref: "#/components/schemas/Employee"
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  deleteEmployee: (req, res) => {
    var id = req.params.id;
    if (!id || id == undefined) {
      return res.status(400).send({
        status: "error",
        message: "falta parámetro requerido ID",
      });
    }

    var query = { _id: { $eq: id } };

    employee.findOneAndDelete(query, { new: false }, (err, deletedObject) => {
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
};

module.exports = employeeController;
