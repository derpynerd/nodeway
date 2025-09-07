import express from 'express';
import redirectController from '../controllers/redirectController.js';

const router = express.Router();

/**
 * @swagger
 * /v1/redirect/{shortCode}:
 *  get:
 *      summary: Redirects to original URL based on shortCode
 *      tags: [Redirect Service]
 *      responses:
 *          302:
 *              description: Found original URL to redirect to
 *          404:
 *              description: No stored URL record found for provided shortCode
 *          500:
 *              description: Server error while trying to find/redirect url
 */
router.get('/redirect/:shortCode', redirectController.redirectShortUrl);

export default router;