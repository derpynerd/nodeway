import UrlRecord from '../models/urlRecord.js';

export const getRedirectUrl = async (shortenCode) => {
  const record = await UrlRecord.findById(shortenCode);
  return record ? record.originalHref : null;
};

export default {
    getRedirectUrl
}