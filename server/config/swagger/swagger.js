import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml')); 

const options = {
    swaggerDefinition: swaggerDocument,
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Trainix API',
            version: '1.0.0',
            description: 'Endpoints Plans, Branches, Employees, Clients, etc.',
        },
        servers: [
            { url: 'http://localhost:41431', description: 'Local dev' },
            { url: 'https://trainix.site', description: 'Production' },
        ],
        components: {
            schemas: {
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            example: 'Unauthorized',
                        },
                        errorCode: {
                            type: 'string',
                            example: 'UNAUTHORIZED',
                        },
                    },
                },
                PlanInput: {
                    type: 'object',
                    required: ['name', 'description', 'features', 'monthlyPrice'],
                    properties: {
                        name: {
                            type: 'object',
                            required: ['ar', 'en'],
                            properties: {
                                ar: { type: 'string' },
                                en: { type: 'string' }
                            }
                        },
                        description: {
                            type: 'object',
                            required: ['ar', 'en'],
                            properties: {
                                ar: { type: 'string' },
                                en: { type: 'string' }
                            }
                        },
                        features: {
                            type: 'object',
                            required: ['branches', 'employeesPerBranch', 'trainersPerBranch', 'clientsPerBranch'],
                            properties: {
                                branches: { type: 'number' },
                                employeesPerBranch: { type: 'number' },
                                trainersPerBranch: { type: 'number' },
                                clientsPerBranch: { type: 'number' }
                            }
                        },
                        monthlyPrice: { type: 'number' },
                        semiAnnualPrice: { type: 'number' },
                        annualPrice: { type: 'number' },
                        semiAnnualDiscount: { type: 'number' },
                        annualDiscount: { type: 'number' }
                    }
                }
            },
            parameters: {
                planId: {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'string'
                    },
                    description: 'ID of the plan'
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [
        join(__dirname, './routes/v1/*.js'),
        join(__dirname, './controllers/**/*.js')
    ],
};

export default swaggerJSDoc(options);
