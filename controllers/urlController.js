import urlService from '../services/urlService.js';
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
  try {
    const requestBody = req.body;
    console.log(requestBody);
    
    if (!requestBody) {
      return res.status(400).json({ message: 'Empty request body is invalid' });
    }

    const { error } = requestSchema.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.message });
    }

    const existingRecord = await urlService.getUrlRecordByUrl(req.body.originalHref);
    if (existingRecord) {
      return res.status(409).json({ message: 'Entry with provided URL already exists' });
    }

    const newRecord = await urlService.createUrlRecord(req.body);
    return res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error creating URL record:', error);
    res.status(500).json({ error: error.message });
  }
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