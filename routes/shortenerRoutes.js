import express from 'express';
import urlSchema from '../schemas/urlSchema.js';
import urlController from '../controllers/shortenerController.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();

/**
 * @swagger
 * /v1/short:
 *  get:
 *      summary: Returns all shortened URL records
 *      tags: [Shortener Service]
 *      responses:
 *          200:
 *              description: Returned all stored URL records
 *          204:
 *              description: No stored URL records found
 *          206:
 *              description: Returned stored URL records as per max page size, but more records exist
 */
router.get('/short/', urlController.getAllUrlRecords);

/**
 * @swagger
 * /v1/short/{url}:
 *  get:
 *      summary: Returns a shortened URL record by url
 *      tags: [Shortener Service]
 *      responses:
 *          200:
 *              description: Found stored URL record
 *          404:
 *              description: No stored URL record found by provided url
 */
router.get('/short/:url', urlController.getUrlRecord);

/**
 * @swagger
 * /v1/short:
 *  post:
 *      summary: Create a shortened URL record
 *      tags: [Shortener Service]
 *      responses:
 *          201:
 *              description: Successfully created a shortened URL record
 *          400:
 *              description: Invalid payload for URL record creation 
 *          500:
 *              description: Server error while creating shortened URL record
 */
router.post('/short', validateRequest(urlSchema), urlController.createUrlRecord);

/**
 * @swagger
 * /v1/short/{url}:
 *  put:
 *      summary: Update an existing shortened URL record by url
 *      tags: [Shortener Service]
 *      responses:
 *          200:
 *              description: Successfully updated existing URL record by url
 *          404:
 *              description: No stored URL record found by provided url
 *          500:
 *              description: Server error while updating existing URL record
 */
router.put('/short/:url', urlController.updateUrlRecord);

/**
 * @swagger
 * /v1/short/{url}:
 *  delete:
 *      summary: Delete an existing shortened URL record
 *      tags: [Shortener Service]
 *      responses:
 *          200:
 *              description: Successfully deleted existing URL record by url
 *          404:
 *              description: No stored URL records found by provided url
 *          500:
 *              description: Server error while deleting existing URL record 
 */
router.delete('/short/:url', urlController.deleteUrlRecord);

export default router;
