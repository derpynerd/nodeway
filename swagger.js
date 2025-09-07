import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Nodeway API v1.0.0',
            description: 'Comprehensive API Documentation for Nodeway - URL Shortener',
            contact: {
                name: 'Nodeway API Support',
                email: 'derpynerd@protonmail.com'
            }
        }
    },
    apis: [
        './routes/shortenerRoutes.js',
        './routes/redirectRoutes.js'
    ]
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;
