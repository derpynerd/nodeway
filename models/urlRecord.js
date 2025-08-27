import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const shortenCode = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7);

const UrlRecordSchema  = new mongoose.Schema({
  _id: { type: String, default: () => shortenCode() },
  originalHref: { type: String, required: true, unique: true, trim: true },
  shortenedHref: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const UrlRecord = mongoose.model('UrlRecord', UrlRecordSchema, 'urlRecord');

export default UrlRecord;
