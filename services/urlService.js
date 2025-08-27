import UrlRecord from '../models/urlRecord.js';

export const getAllUrlRecords = async () => {
  return await UrlRecord.find({});
};

export const getUrlRecordById = async (id) => {
  return await UrlRecord.findById(id);
};

export const createUrlRecord = async (data) => {
  const newRecord = new UrlRecord(data);
  newRecord.shortenedHref = 'http://localhost:8080/v1/api/short/' + newRecord._id;
  return await newRecord.save();
};

export const updateUrlRecord = async (id, data) => {
  return await UrlRecord.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUrlRecord = async (id) => {
  return await UrlRecord.findByIdAndDelete(id);
};

export default {
  getAllUrlRecords,
  getUrlRecordById,
  createUrlRecord,
  updateUrlRecord,
  deleteUrlRecord
};