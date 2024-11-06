const axios = require("axios");
const allowedApiKeys = require("../../declaration/arrayKey.jsx");

module.exports = async (req, res) => {
  const apiKey = req.query.apiKey;

  if (!apiKey || !allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({
      error: "Input Parameter Apikey !"
    });
  }

  // URL untuk file JSON yang ada di GitHub
  let url = "https://raw.githubusercontent.com/ketchupmaze/AssistenYulaDB/main/anime/akira.json";

  try {
    const response = await axios.get(url);
    const data = response.data; // Ambil data langsung dari response

    res.status(200).json({
      status: true,
      creator: "RezaOffc",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      error: "Ada masalah, coba lagi nanti"
    });
  }
}
