import urlService from '../services/urlService.js';

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
    const newRecord = await urlService.createUrlRecord(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
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