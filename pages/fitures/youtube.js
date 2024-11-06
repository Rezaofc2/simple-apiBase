const axios = require("axios")
require('dotenv').config()
const allowedApiKeys = require("../../declaration/arrayKey.jsx")

module.exports = async (req, res) => {
  let urls = req.query.urls
  let apiKey = req.query.apiKey
  if (!urls) {
    return res.status(400).json({
      error: "Url yt Nya Mana?"
    })
  }

  if (!apiKey || !allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({
      error: "Input Parameter Apikey !"
    })
  }

  let url = `https://api.betabotz.eu.org/api/download/ytmp3?url=${urls}&apikey=gatau`

  try {
    const response = await axios.get(url)
    const videoUrl = response.data.result
    res.status(200).json({
      status: true,
      creator: "krizz",
      data: videoUrl
    })
  } catch (e) {
    res.status(500).json({
      error: "Ada masalah, coba lagi nanti"
    })
  }
}
