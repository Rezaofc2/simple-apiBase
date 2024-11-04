/*
   * by balzz
   * dont delete my wm
   * follow more instagram: @iqstore78
*/
const express = require("express")
const axios = require("axios")
const path = require("path")
const kotakHytam = require("../pages/fitures/blackbox.js")
const tiktod = require("../pages/fitures/tiktok.js")
const ambatron = require("../pages/fitures/ambatron.js")
const mediapire = require("../pages/fitures/mediafire.js")
const igedl = require("../pages/fitures/instagram.js")
const { limit, checkBanned } = require("../declaration/rateLimit.jsx")

const app = express()
app.use(checkBanned)

app.get("/", limit, (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/404.html"))
})

/** example ajg **/
app.get("/ai/blekbok", limit, async (req, res) => {
  kotakHytam(req, res)
})
app.get("/ai/ambatron", limit, async (req, res) => {
  ambatron(req, res)
})
app.get("/downloader/tiktokDL", limit, async (req, res) => {
  tiktod(req, res)
})
app.get("/downloader/instagramDL", limit, async (req, res) => {
  igedl(req, res)
})
app.get("/downloader/mediafireDL", limit, async (req, res) => {
  mediapire(req, res)
})

module.exports = app
