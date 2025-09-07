import urlService from '../services/shortenerService.js';
import requestSchema from '../schemas/urlSchema.js';

export const getAllUrlRecords = async (req, res) => {
  try {
    const records = await urlService.getAllUrlRecords();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUrlRecord = async (req, res) => {
  try {
    const record = await urlService.getUrlRecordById(req.params.url);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUrlRecord = async (req, res) => {
  const requestBody = req.body;
  console.log(`Received request to create short URL for ${requestBody.originalHref}`);

  try {
    const result = await urlService.createUrlRecord(req.body);
    return res.status(201).json(result);
  } catch (error) {
    if (error.code === 'DUPLICATE_URL') {
      return res.status(409).json({ message: 'Entry with provided URL already exists' });
    }
  }
  
  console.error('Error creating URL record:', error);
  return res.status(500).json({ message: 'Internal server error' });
};

export const updateUrlRecord = async (req, res) => {
  try {
    const updated = await urlService.updateUrlRecord(req.params.url, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUrlRecord = async (req, res) => {
  try {
    const deleted = await urlService.deleteUrlRecord(req.params.url);
    if (!deleted) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
    getAllUrlRecords,
    getUrlRecord,
    createUrlRecord,
    updateUrlRecord,
    deleteUrlRecord
};