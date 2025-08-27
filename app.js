import dotenv from 'dotenv';
import express from 'express';

import connectToDB from './db/connect.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();
app.use(express.json()); // Parsing JSON body

// Mount url routes
app.use('/v1/api/', urlRoutes); // Prefix url routes 

const port = process.env.PORT || 3000;
connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.log(`Serving requests at http://localhost:${port}/v1/api/`);
    });
})
