// Last Updated: 5/4/2021 13:12:06
// Updated By  : @YourName
'use strict'

const os = require('os');
const userModel = require('../models/user.model');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');
const { findOneAndDelete } = require('../models/user.model');


/**
 * @swagger
 * tags:
 *   name: User
 *   description: user
 */

var userController = {

    /**
     * @openapi
     * /api/user/{id}:
     *   get:
     *     tags: 
     *       - User
     *     description: Get user by Id 
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
     *               $ref: "#/components/schemas/User"
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */

    /**
     * @openapi
     * /api/user:
     *   get:
     *     tags: 
     *       - User
     *     description: Get list of user
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#/components/schemas/User"
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */

    getUser: (req, res) => {

        var id = req.params.id;

        var query = { '_id': { $eq: id } };

        if (!id || id === undefined) query = {};
        else query = { '_id': { $eq: id } };

        console.log(query);

        userModel.find(query, (err, objects) => {


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
                    links: [{ "Agregar registro => curl -X POST ": global.baseURL + "/api/user" }]
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
     * /api/user:
     *   post:
     *     tags: 
     *       - User
     *     description: Create user
     *     parameters:
     *       - in: body
     *         name: body
     *         required: true
     *         schema:
     *           $ref: "#/components/schemas/User"
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/User"
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */
    addUser: (req, res) => {


        var data = req.body;


        //SIN PARAMETROS
        if (!data) {

            return (res.status(400).send({
                status: "error",
                message: "Faltan parámetros de request en formato JSON"
            })
            );
        }


        var newUser = new userModel(data);



        //INTENTAR GUARDAR EL NUEVO OBJETO
        newUser.save((err, storedObject) => {
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
     * /api/user/{id}:
     *   put:
     *     tags: 
     *       - User
     *     description: Update user
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
     *           $ref: "#/components/schemas/User"
     *     responses:
     *       200:
     *         description: Ok
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/User"
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
    editUser: (req, res) => {

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

        userModel.findOneAndUpdate(query, command, { new: true }, (err, updatedObject) => {
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
         * /api/user/{id}:
         *   delete:
         *     tags: 
         *       - User
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
         *               $ref: "#/components/schemas/User"
         *       400:
         *         description: Bad Request
         *       404:
         *         description: Not Found
         *       500:
         *         description: Internal Server Error
         */
         deactivateUser: (req, res) => {
    
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
            
                    userModel.findOneAndUpdate(query, command, { new: true }, (err, deactivateObject) => {
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
     * /api/user/{id}:
     *   delete:
     *     tags: 
     *       - User
     *     description: Delete user by id
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
     *               $ref: "#/components/schemas/User"
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
    deleteUser: (req, res) => {


        var id = req.params.id;
        if (!id || id == undefined) {
            return (res.status(400).send({
                status: "error",
                message: "falta parámetro requerido ID"
            }));
        }

        var query = { '_id': { $eq: id } };

        user.findOneAndDelete(query, { new: false }, (err, deletedObject) => {
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

module.exports = userController;