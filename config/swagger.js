import swaggerJsdoc from 'swagger-jsdoc';
import 'dotenv/config'; 

const PORT = process.env.PORT || 3000;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'TechFix API',
    version: '1.0.0',
    description: 'API de gestión de reparación de dispositivos TechFix',
    contact: {
      name: 'API Support',
      email: 'support@techfix.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}`, 
      description: 'Development server',
    },
    {
      url: process.env.API_URL || `http://localhost:${PORT}`,
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token from login endpoint',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'User ID' },
          email: { type: 'string', format: 'email', description: 'User email' },
          name: { type: 'string', description: 'Nombre completo del usuario' },
          role: { type: 'string', description: 'User role' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Customer: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          address: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' },
          zipCode: { type: 'string' },
        },
      },
      RepairOrder: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          orderNumber: { type: 'string' },
          customerId: { type: 'integer' },
          deviceId: { type: 'integer' },
          status: { type: 'string', enum: ['pending', 'in_progress', 'completed', 'cancelled'] },
          description: { type: 'string' },
          estimatedCost: { type: 'number', format: 'decimal' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          message: { type: 'string' },
          status: { type: 'integer' },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ['./routes/*.js', './src/app.js'],
};

export const swaggerSpec = swaggerJsdoc(options);