import UrlRecord from '../models/urlRecord.js';

export const getAllUrlRecords = async () => {
  return await UrlRecord.find({});
};

export const getUrlRecordById = async (id) => {
  return await UrlRecord.findById(id);
};

export const getUrlRecordByUrl = async (url) => {
  return await UrlRecord.findOne({ originalHref: url });
};

export const createUrlRecord = async (data) => {
  const existing = await UrlRecord.findOne({ originalHref: data.originalHref });

  if (existing) {
    const error = new Error('Duplicate URL');
    error.code = 'DUPLICATE_URL';
    throw error;
  }

  const newRecord = new UrlRecord(data);
  newRecord.shortenedHref = `${process.env.DOMAIN_NAME}:${process.env.PORT}${process.env.CONTEXT_PATH}/short/` + newRecord._id;
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
  getUrlRecordByUrl,
  createUrlRecord,
  updateUrlRecord,
  deleteUrlRecord
};