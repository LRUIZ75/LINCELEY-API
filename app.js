'use strict'

// Cargar módulos de node para crear el servidor
const swaggerUI = require('swagger-ui-express');



var bodyParser = require('body-parser');
var express = require('express');
const jwt = require('jsonwebtoken');

// Ejecutar expresss (htpp)
var app = express();

global.baseURL = 'localhost';

// Cargar ficheros rutas
//Ruta básica de redirección al swagger doc
var rootRoutes = require('./routes/root.routes');
//TODO: Luego de generar código por plantillas CodeSmith:
//Añadir manualmente los requires para nuevas rutas parciales

var personRoutes = require('./routes/person.routes');
var roleRoutes = require('./routes/role.routes');
var roleActionRoutes = require('./routes/roleaction.routes');
var userRoutes = require('./routes/user.routes');
var claimRoutes = require('./routes/claim.routes');
var companyRoutes = require ('./routes/company.routes');

var apiRoutes = [
  rootRoutes,  
  personRoutes,
  roleRoutes,
  roleActionRoutes,
  userRoutes,
  claimRoutes,
  companyRoutes
];



process.env.ACCESS_TOKEN_SECRET = "xv2pXfdXV&aDs91P";
process.env.ACCESS_TOKEN_LIFE = '1h';
process.env.REFRESH_TOKEN_SECRET = "hw782wujnd99ahmmakhanjkajikhi&aDs91P";
process.env.REFRESH_TOKEN_LIFE = '24h';

// Middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Activar CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'authorization, X-API-KEY, Origin, X-Requested-With, x-access-token, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  global.baseURL = req.hostname + ":" + global.PORT;
  //console.log('INFO: Servidor corriendo en: ' + global.baseURL );
  next();
});

console.debug('listening on port ' + global.PORT); //requisito para debug desde VSCODE

app.disable('x-powered-by');

const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'LINCELEY API',
      description: 'An API Rest for LINCELEY',
      version: '1.0.0',
      license: {
        name: "GNU AGPL3",
        url: "https://www.gnu.org/licenses/agpl-3.0-standalone.html"
      },
      contact: {
        name: "CSI HIALEAH",
        url: "http://csihialeah.odoo.com",
        email: "csihialeah@gmail.com"
      },
      servers: [
        {
          url: "http://localhost:5000/"  //TODO: cambiar a URL de producción
        }
      ],
      basePath: "/api"
    },
  },
  components: {
    schemas: {
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  securityDefinitions: {
    ApiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "X-API-KEY"
    }
  },
  security: [
    {
      ApiKeyAuth: []
    }
  ],
  apis: ['./controllers/*.controller.js', './models/*.model.js'], // files containing annotations OPENAPI
};

const openapiSpecification = swaggerJsdoc(swaggerOptions);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(openapiSpecification, { explorer: true }));

// Añadir prefijos a las rutas / Cargar rutas
// Añadir manualmente las rutas parciales en el arreglo
app.use('/api', apiRoutes);
app.use('/', rootRoutes);



// /* Endpoints */
// require('./src/endpoints')(app);


// Exportar módulo (fichero actual)
module.exports = app;
