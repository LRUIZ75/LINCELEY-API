﻿

'use strict'

const os = require('os');
const personModel = require('../models/person.model');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');
const { findOneAndDelete } = require('../models/person.model');


/**
 * @swagger
 * tags:
 *   name: Person
 *   description: Personas
 */

var personController = {

    /**
     * @openapi
     * /api/person/{id}:
     *   get:
     *     tags: 
     *       - Person
     *     description: Get Personas by Id 
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
     *               $ref: "#/components/schemas/Person"
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */

    /**
     * @openapi
     * /api/person:
     *   get:
     *     tags: 
     *       - Person
     *     description: Get list of Personas
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#/components/schemas/Person"
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */

    getPerson: (req, res) => {

        var id = req.params.id;

        var query = { '_id': { $eq: id } };

        if (!id || id === undefined) query = {};
        else query = { '_id': { $eq: id } };

        //console.log(query);

        personModel.find(query, (err, objects) => {


            if (err) {
                return (res.status(500).send({
                    status: "error",
                    error: err.message
                })
                );
            }

            if (!objects || objects.length == 0) {
 
                return (res.status(404).send({
                    status: "error",
                    message: "Registro(s) no encontrado(s)",
                    links: [{ "Agregar registro => curl -X POST ": global.baseURL + "/api/person" }]
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
     * /api/person:
     *   post:
     *     tags: 
     *       - Person
     *     description: Create Personas
     *     parameters:
     *       - in: body
     *         required: true
     *         schema:
     *           $ref: "#/components/schemas/Person"
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Person"
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */
    addPerson: (req, res) => {


        var data = req.body;


        //SIN PARAMETROS
        if (!data) {

            return (res.status(400).send({
                status: "error",
                messager: "Faltan parámetros de request en formato JSON"
            })
            );
        }


        var newPerson = new personModel(data);



        //INTENTAR GUARDAR EL NUEVO OBJETO
        newPerson.save((err, storedObject) => {
            if (err) {
                return (res.status(500).send({
                    status: "error",
                    error: err.message
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
     * /api/person/{id}:
     *   put:
     *     tags: 
     *       - Person
     *     description: Update Personas
     *     parameters:
     *       - in: path
     *         name: id
     *         description: "Object Id"
     *         type: string
     *         required: true
     *       - in: body
     *         required: true
     *         schema:
     *           $ref: "#/components/schemas/Person"
     *     responses:
     *       200:
     *         description: Ok
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Person"
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
    editPerson: (req, res) => {

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

        personModel.findOneAndUpdate(query, command, { new: true }, (err, updatedObject) => {
            if (err) {
                return (res.status(500).send({
                    status: "error",
                    error: err.message
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
     * /api/person/{id}:
     *   delete:
     *     tags: 
     *       - Person
     *     description: Delete Personas by id
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
     *               $ref: "#/components/schemas/Person"
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       500:
     *         description: Internal Server Error
     */
    deletePerson: (req, res) => {


        var personId = req.params.id;
        if (!personId || personId == undefined) {
            return (res.status(400).send({
                status: "error",
                message: "falta parámetro requerido ID"
            }));
        }

        var query = { '_id': { $eq: personId } };

        personsModel.findOneAndDelete(query, { new: false }, (err, deletedObject) => {
            if (err) {
                return (res.status(500).send({
                    status: "error",
                    error: err.message
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
    

    /**
     * @openapi
     * /api/person/picture/{id}:
     *   put:
     *     tags: 
     *       - Person
     *     description: Upload Personas picture
     *     parameters:
     *       - in: path
     *         name: id
     *         description: "Object Id"
     *         type: string
     *         required: true
     *       - in: form-data
     *         name: picture
     *         required: true
     *         content:
     *           file:
     *             schema:
     *               type: string
     *               format: base64
     *     responses:
     *       200:
     *         description: Ok
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Person"
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
        var file_name = 'Imagen no proporcionada...';
        var id = req.params.id;

        // console.log(req.files);

        if (!req.files.picture) {
            return res.status(400).send({
                status: 'error',
                message: 'No hay parametro: logo',
                file_name
            });
        }
        if (!id) {

            return res.status(400).send({
                status: 'error',
                message: 'No hay parámetro: Id'
            });
        }

        //conseguir nombre y extensión del archivo
        var file_path = req.files.picture.path;

        var file_name = path.basename(file_path);

        var file_ext = path.extname(file_name);


        console.log(file_ext);

        switch (file_ext) {
            case '.png':
            case '.jpg':
            case '.jpeg':
            case '.gif':
                //Archivo aceptable


                var query = { '_id': { $eq: id } };
                var command = { $set: { 'picture': file_name } };


                personModel.findOneAndUpdate(query, command, { new: true }, (err, updatedObject) => {

                    if (err) {

                        fs.unlinkSync(file_path);

                        return res.status(500).send({
                            status: 'error',
                            error: err
                        });
                    }

                    if (!updatedObject) {

                        fs.unlinkSync(file_path);

                        return res.status(404).send({
                            status: 'error',
                            message: 'No se pudo encontrar el registro'
                        });
                    }

                    return res.status(200).send({
                        status: 'ok',
                        updated: updatedObject
                    });
                });
                break;

            default:
                //Archivo no aceptado

                //Borrar el archivo

                fs.unlinkSync(file_path);

                return res.status(400).send({
                    status: 'error',
                    message: 'Tipo de archivo no es imagen',
                    file_name
                }
                );
                break;
        };
    },


    /**
     * @openapi
     * /api/person/picture/{filename}:
     *   get:
     *     tags: 
     *       - Person
     *     description: Get Personas picture by filename
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
           return (res.status(400).send({
               status: "error",
               message: "falta el nombre del archivo"
           }));
       }

       var path_file = './uploads/pictures/' + file;

       fs.stat(path_file, (err) => {

           if (err) {

               return res.status(404).send({
                   status: 'error',
                   message: 'archivo no encontrado',
                   path: path_file
               });
           }

           return res.status(200).sendFile(path.resolve(path_file));

       });


    }

}

module.exports = personController;