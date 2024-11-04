/*
   * by balzz
   * dont delate my wm
   * follow more instagram: @iqstore78
*/
const axios = require("axios")
const allowedApiKeys = require("../../declaration/arrayKey.jsx")

module.exports = async (req, res) => {
  const urls = req.query.urls
  const apiKey = req.query.apiKey

  if (!urls) {
    return res.status(400).json({
      error: "Url Tiktok Nya Mana?"
    })
  }

  if (!apiKey || !allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({
      error: "Input Parameter Apikey !"
    })
  }

  let url = `https://api.agatz.xyz/api/tiktok?url=${urls}`

  try {
    const response = await axios.get(url)
    const data = response.data.data

    res.status(200).json({
      status: true,
      creator: "krizz",
      data: data
    })
  } catch (error) {
    res.status(500).json({
      error: "Ada masalah, coba lagi nanti"
    })
  }
}
