// Last Updated: 5/4/2021 12:48:33
// Updated By  : @YourName
'use strict'

const os = require('os');
const servicescheduleModel = require('../models/serviceschedule.model');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');
const { findOneAndDelete } = require('../models/serviceschedule.model');


/**
 * @swagger
 * tags:
 *   name: ServiceSchedule
 *   description: service schedule
 */

var servicescheduleController = {

    /**
     * @openapi
     * /api/serviceschedule/{id}:
     *   get:
     *     tags: 
     *       - ServiceSchedule
     *     description: Get service schedule by Id 
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
     *               $ref: "#/components/schemas/ServiceSchedule"
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */

    /**
     * @openapi
     * /api/serviceschedule:
     *   get:
     *     tags: 
     *       - ServiceSchedule
     *     description: Get list of service schedule
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#/components/schemas/ServiceSchedule"
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */

    getServiceSchedule: (req, res) => {

        var id = req.params.id;

        var query = { '_id': { $eq: id } };

        if (!id || id === undefined) query = {};
        else query = { '_id': { $eq: id } };

        console.log(query);

        servicescheduleModel.find(query, (err, objects) => {


            if (err) {
                return (res.status(500).send({
                    status: "error",
                    message: err.message
                })
                );
            }

            if (!objects || objects.length == 0) {
 
                return (res.status(404).send({
                    status: "error",
                    message: "Registro(s) no encontrado(s)",
                    links: [{ "Agregar registro => curl -X POST ": global.baseURL + "/api/serviceschedule" }]
                }

                ));
            } else {

                return (res.status(200).send({
                    status: "ok",
                    objects: objects
                }));
            }
        });
    },


    /**
     * @openapi
     * /api/serviceschedule:
     *   post:
     *     tags: 
     *       - ServiceSchedule
     *     description: Create service schedule
     *     parameters:
     *       - in: body
     *         name: body
     *         required: true
     *         schema:
     *           $ref: "#/components/schemas/ServiceSchedule"
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/ServiceSchedule"
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */
    addServiceSchedule: (req, res) => {


        var data = req.body;


        //SIN PARAMETROS
        if (!data) {

            return (res.status(400).send({
                status: "error",
                message: "Faltan parámetros de request en formato JSON"
            })
            );
        }


        var newServiceSchedule = new servicescheduleModel(data);



        //INTENTAR GUARDAR EL NUEVO OBJETO
        newServiceSchedule.save((err, storedObject) => {
            if (err) {
                return (res.status(500).send({
                    status: "error",
                    message: err.message
                }));

            } else {
                if (!storedObject) {
                    return (res.status(500).send({
                        status: "error",
                        message: "Error al intentar guardar un nuevo registro"
                    }));
                }

                return (res.status(201).send({
                    status: "ok",
                    created: storedObject
                }));
            }

        });
    },


    /**
     * @openapi
     * /api/serviceschedule/{id}:
     *   put:
     *     tags: 
     *       - ServiceSchedule
     *     description: Update service schedule
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
     *           $ref: "#/components/schemas/ServiceSchedule"
     *     responses:
     *       200:
     *         description: Ok
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/ServiceSchedule"
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
    editServiceSchedule: (req, res) => {

        var id = req.params.id;
        var data = req.body;

        if (!id || id == undefined) {
            return (res.status(400).send({
                status: "error",
                message: "falta parámetro requerido ID"
            }));
        }
        if (!data || data == undefined) {
            return (res.status(400).send({
                status: "error",
                message: "falta parámetro requerido data JSON"
            }));
        }

        var query = { '_id': { $eq: id } };
        var command = { $set: data };

        servicescheduleModel.findOneAndUpdate(query, command, { new: true }, (err, updatedObject) => {
            if (err) {
                return (res.status(500).send({
                    status: "error",
                    message: err.message
                }));
            }

            if (!updatedObject) {

                return (res.status(404).send({
                    status: "error",
                    message: "No se encontró el registro a modificar"
                }));
            }

            return (res.status(200).send({
                status: "ok",
                updated: updatedObject
            }));

        });

    },

    /**
     * @openapi
     * /api/serviceschedule/{id}:
     *   delete:
     *     tags: 
     *       - ServiceSchedule
     *     description: Delete service schedule by id
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
     *               $ref: "#/components/schemas/ServiceSchedule"
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
    deleteServiceSchedule: (req, res) => {


        var id = req.params.id;
        if (!id || id == undefined) {
            return (res.status(400).send({
                status: "error",
                message: "falta parámetro requerido ID"
            }));
        }

        var query = { '_id': { $eq: id } };

        serviceschedule.findOneAndDelete(query, { new: false }, (err, deletedObject) => {
            if (err) {
                return (res.status(500).send({
                    status: "error",
                    message: err.message
                }));
            }

            if (!deletedObject) {

                return (res.status(404).send({
                    status: "error",
                    message: "No se encontró el registro a eliminar"
                }));
            }

            return (res.status(200).send({
                status: "ok",
                deleted: deletedObject
            }));

        });
    },
    

}

module.exports = servicescheduleController;