import swaggerJsdoc from 'swagger-jsdoc';
import 'dotenv/config'; 

const PORT = process.env.PORT || 3000;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'TechFix API',
    version: '1.0.0',
    description: 'API completa de gestión de reparación de dispositivos TechFix',
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
        description: 'Ingrese su token JWT aquí',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'User ID' },
          email: { type: 'string', format: 'email', description: 'User email' },
          firstName: { type: 'string', description: 'User first name' },
          lastName: { type: 'string', description: 'User last name' },
          isActive: { type: 'boolean', description: 'User active status' },
          roleId: { type: 'integer', description: 'Role ID' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Role: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
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
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Brand: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string', description: 'Brand name' },
          description: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Device: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          serialNumber: { type: 'string' },
          modelId: { type: 'integer' },
          brandId: { type: 'integer' },
          status: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      DeviceModel: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          brandId: { type: 'integer' },
          description: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Part: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          partNumber: { type: 'string' },
          description: { type: 'string' },
          cost: { type: 'number', format: 'decimal' },
          supplierId: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Supplier: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          address: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' },
          zipCode: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
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
          totalCost: { type: 'number', format: 'decimal' },
          createdAt: { type: 'string', format: 'date-time' },
          completedAt: { type: 'string', format: 'date-time' },
        },
      },
      RepairTask: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          repairOrderId: { type: 'integer' },
          description: { type: 'string' },
          status: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Quote: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          repairOrderId: { type: 'integer' },
          estimatedCost: { type: 'number', format: 'decimal' },
          description: { type: 'string' },
          validUntil: { type: 'string', format: 'date' },
          status: { type: 'string', enum: ['pending', 'accepted', 'rejected'] },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Invoice: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          repairOrderId: { type: 'integer' },
          invoiceNumber: { type: 'string' },
          totalAmount: { type: 'number', format: 'decimal' },
          taxAmount: { type: 'number', format: 'decimal' },
          status: { type: 'string', enum: ['pending', 'paid', 'overdue', 'cancelled'] },
          dueDate: { type: 'string', format: 'date' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Payment: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          invoiceId: { type: 'integer' },
          amount: { type: 'number', format: 'decimal' },
          paymentMethodId: { type: 'integer' },
          status: { type: 'string', enum: ['pending', 'completed', 'failed'] },
          transactionId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      PaymentMethod: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
          isActive: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      OrderStatus: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string' },
        },
      },
      Diagnostic: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          repairOrderId: { type: 'integer' },
          findings: { type: 'string' },
          diagnosedAt: { type: 'string', format: 'date-time' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      PartCompatibility: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          partId: { type: 'integer' },
          deviceModelId: { type: 'integer' },
          compatible: { type: 'boolean' },
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