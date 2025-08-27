import express from 'express';
import urlController from '../controllers/urlController.js';
import redirectController from '../controllers/redirectController.js';

const router = express.Router();

router.get('/', urlController.getAllUrlRecords);
router.get('/:url', urlController.getUrlRecord);
router.post('/', urlController.createUrlRecord);
router.put('/:url', urlController.updateUrlRecord);
router.delete('/:url', urlController.deleteUrlRecord);

router.get('/short/:shortenCode', redirectController.redirectShortUrl);

export default router;
