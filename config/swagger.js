import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Comida y Descuentos',
            version: '1.0.0',
            description: 'API para dueños',
        },
        servers: [{ url: 'https://extra2.onrender.com' }],
    },
    apis: ['./routes/*.js', './controllers/*.js', 'app.js'], // Especificar que archivos va a tomar, TODOS
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
