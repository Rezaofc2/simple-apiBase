/*
   * by balzz
   * dont delate my wm
   * follow more instagram: @iqstore78
*/
const axios = require("axios")
const allowedApiKeys = require("../../declaration/arrayKey.jsx")

module.exports = async (req, res) => {
  let urls = req.query.urls
  let apiKey = req.query.apiKey
  if (!urls) {
    return res.status(400).json({
      error: "Url Ig Nya Mana?"
    })
  }

  if (!apiKey || !allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({
      error: "Input Parameter Apikey !"
    })
  }

  let url = `https://api.agatz.xyz/api/instagram?url=${urls}`

  try {
    const response = await axios.get(url)
    const videoUrl = response.data.data
    res.status(200).json({
      status: true,
      creator: "RezaOffc",
      data: videoUrl
    })
  } catch (e) {
    res.status(500).json({
      error: "Ada masalah, coba lagi nanti"
    })
  }
}
