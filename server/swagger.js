import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Trainix API',
            version: '1.0.0',
            description: 'Endpoints Plans, Branches, Employees, Clients, etc.',
        },
        servers: [
            { url: 'https://trainix.site/api/v1', description: 'Production' },
            { url: 'http://localhost:41431/api/v1', description: 'Local dev' },
        ],
    },
    apis: ['./routes/v1/*.js', './controllers/**/*.js'],
};

export default swaggerJSDoc(options);
