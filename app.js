import dotenv from 'dotenv';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import connectToDB from './db/connect.js';
import urlRoutes from './routes/shortenerRoutes.js';
import redirectRoutes from './routes/redirectRoutes.js';
import swaggerSpecs from './swagger.js';

dotenv.config();

const scheme = process.env.SCHEME;
const domainName = process.env.DOMAIN_NAME;
const port = process.env.PORT || 3000;
const contextPath = process.env.CONTEXT_PATH;
const swaggerDocPath = '/docs';

const app = express();

// Basic middleware setup
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// TODO: Add CORS configuration

// Swagger UI setup
app.use(contextPath + swaggerDocPath, swaggerUI.serve, swaggerUI.setup(swaggerSpecs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Nodeway API Documentation'
}));

// Mount url routes
app.use(contextPath, urlRoutes); // Prefix url routes 
app.use(contextPath, redirectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl
  });
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred'
  });
});

connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`Nodeway server running at ${scheme}://${domainName}:${port}${contextPath}`);
        console.log(`Swagger documentation served at ${scheme}://${domainName}:${port}${contextPath}${swaggerDocPath}}`)
    });
})
