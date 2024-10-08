// Last Updated: 5/4/2021 12:47:00
// Updated By  : @YourName
'use strict'

const os = require('os');
const jobpositionModel = require('../models/jobposition.model');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');
const { findOneAndDelete } = require('../models/jobposition.model');


/**
 * @swagger
 * tags:
 *   name: JobPosition
 *   description: job position
 */

var jobpositionController = {

    /**
     * @openapi
     * /api/jobposition/{id}:
     *   get:
     *     tags: 
     *       - JobPosition
     *     description: Get job position by Id 
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
     *               $ref: "#/components/schemas/JobPosition"
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */

    /**
     * @openapi
     * /api/jobposition:
     *   get:
     *     tags: 
     *       - JobPosition
     *     description: Get list of job position
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#/components/schemas/JobPosition"
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */

    getJobPosition: (req, res) => {

        var id = req.params.id;

        var query = { '_id': { $eq: id } };

        if (!id || id === undefined) query = {};
        else query = { '_id': { $eq: id } };

        console.log(query);

        jobpositionModel.find(query)
        .populate('company')
        .populate('defaultRole')
        .exec( (err, objects) => {


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
                    links: [{ "Agregar registro => curl -X POST ": global.baseURL + "/api/jobposition" }]
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
     * /api/jobposition:
     *   post:
     *     tags: 
     *       - JobPosition
     *     description: Create job position
     *     parameters:
     *       - in: body
     *         name: body
     *         required: true
     *         schema:
     *           $ref: "#/components/schemas/JobPosition"
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/JobPosition"
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */
    addJobPosition: (req, res) => {


        var data = req.body;


        //SIN PARAMETROS
        if (!data) {

            return (res.status(400).send({
                status: "error",
                message: "Faltan parámetros de request en formato JSON"
            })
            );
        }


        var newJobPosition = new jobpositionModel(data);



        //INTENTAR GUARDAR EL NUEVO OBJETO
        newJobPosition.save((err, storedObject) => {
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
     * /api/jobposition/{id}:
     *   put:
     *     tags: 
     *       - JobPosition
     *     description: Update job position
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
     *           $ref: "#/components/schemas/JobPosition"
     *     responses:
     *       200:
     *         description: Ok
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/JobPosition"
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
    editJobPosition: (req, res) => {

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

        jobpositionModel.findOneAndUpdate(query, command, { new: true }, (err, updatedObject) => {
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
         * /api/jobposition/{id}:
         *   delete:
         *     tags: 
         *       - JobPosition
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
         *               $ref: "#/components/schemas/JobPosition"
         *       400:
         *         description: Bad Request
         *       404:
         *         description: Not Found
         *       500:
         *         description: Internal Server Error
         */
         deactivateJobPosition: (req, res) => {
    
            // el procedimiento de borrado consiste en desactivar isActive:false
                    var id = req.params.id;
                    if (!id || id == undefined) {
                        return (res.status(400).send({
                            status: "error",
                            message: "falta parámetro requerido ID"
                        }));
                    }
                   
                    var query = { '_id': { $eq: id } };
                    var command = { $set: {isActive: false} };
            
                    jobpositionModel.findOneAndUpdate(query, command, { new: true }, (err, deactivateObject) => {
                        if (err) {
                            return (res.status(500).send({
                                status: "error",
                                message: err.message
                            }));
                        }
            
                        if (!deactivateObject) {
            
                            return (res.status(404).send({
                                status: "error",
                                message: "No se encontró el registro a modificar"
                            }));
                        }
            
                        return (res.status(200).send({
                            status: "ok",
                            deleted: deactivateObject
                        }));
            
                    });
            
                },

    /**
     * @openapi
     * /api/jobposition/{id}:
     *   delete:
     *     tags: 
     *       - JobPosition
     *     description: Delete job position by id
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
     *               $ref: "#/components/schemas/JobPosition"
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
    deleteJobPosition: (req, res) => {


        var id = req.params.id;
        if (!id || id == undefined) {
            return (res.status(400).send({
                status: "error",
                message: "falta parámetro requerido ID"
            }));
        }

        var query = { '_id': { $eq: id } };

        jobposition.findOneAndDelete(query, { new: false }, (err, deletedObject) => {
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

module.exports = jobpositionController;