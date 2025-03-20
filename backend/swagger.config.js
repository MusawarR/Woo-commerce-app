const swaggerJSDoc = require("swagger-jsdoc")

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API documentation',
      version: '1.0.0',
      description: 'API docs for the E-commerce app',
    },
    servers: [
      {
        url: `${process.env.DEPLOYED_BASE_URL}:${process.env.PORT || 4534}/api`,
      },
    ],
  };

  const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"]
  }

  const swaggerSpec = swaggerJSDoc(options)

  module.exports = swaggerSpec