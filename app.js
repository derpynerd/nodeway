import dotenv from 'dotenv';
import express from 'express';

import connectToDB from './db/connect.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const domainName = process.env.DOMAIN_NAME;
const port = process.env.PORT || 3000;
const contextPath = process.env.CONTEXT_PATH;

const app = express();
app.use(express.json()); // Parse request body as JSON

// Mount url routes
app.use(contextPath, urlRoutes); // Prefix url routes 

connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.log(`Serving requests at ${domainName}:${port}${contextPath}`);
    });
})
