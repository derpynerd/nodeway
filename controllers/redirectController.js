import redirectService from '../services/redirectService.js';

export const redirectShortUrl = async (req, res) => {
  try {
    const redirectUrl = await redirectService.getRedirectUrl(req.params.shortenCode);
    res.redirect(redirectUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
    redirectShortUrl
}