/*
   * by balzz
   * dont delate my wm
   * follow more instagram: @iqstore78
*/
const axios = require("axios")
const allowedApiKeys = require("../../declaration/arrayKey.jsx")

module.exports = async (req, res) => {
  const q = req.query.q || ""
  const apiKey = req.query.apiKey
  if (!q) {
    return res.status(400).json({
      error: "Mau nanya apa lu njir"
    })
  }
  
    if (!apiKey || !allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({
      error: "Input Parameter Apikey !"
    })
  }

  try {
    const response = await ambatronAi(q)
    res.status(200).json({
      status: true,
      creator: "krizz",
      data: response
    })
  } catch (error) {
    res.status(500).json({
      error: "Ada masalah, coba lagi nanti"
    })
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function ambatronAi(content) {
  return new Promise(async (resolve, reject) => {
    const url = 'https://www.blackbox.ai/api/chat';

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, Gecko) Chrome/128.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://www.blackbox.ai/agent/ambatron'
    };

    const body = {
      messages: [
        {
          id: generateId(),
          content,
          role: "user"
        }
      ],
      id: generateId(),
      previewToken: null,
      userId: null,
      codeModelMode: true,
      agentMode: {
        mode: true,
        id: "ambatron",
        name: "Ambatron"
      },
      trendingAgentMode: {},
      isMicMode: false,
      maxTokens: 1024,
      isChromeExt: false,
      githubToken: null,
      clickedAnswer2: false,
      clickedAnswer3: false,
      clickedForceWebSearch: false,
      visitFromDelta: false,
      mobileClient: false
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
        compress: true
      });

      let data = await response.text(); 
      data = data.replace(/^\$@\$.+?\$@\$/, '');

      resolve(data);
    } catch (error) {
      reject('Error:', error);
    }
  });
}
