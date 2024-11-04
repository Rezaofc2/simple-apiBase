/*
   * by balzz
   * dont delete my wm
   * follow more instagram: @iqstore78
*/
const express = require("express");
const axios = require("axios");
const path = require("path");
const ambatron = require("../pages/fitures/ambatron.js");
const kotakHytam = require("../pages/fitures/blackbox.js");
const tiktod = require("../pages/fitures/tiktok.js");
const mediapire = require("../pages/fitures/mediafire.js");
const igedl = require("../pages/fitures/instagram.js");
const ephoto = require("../pages/fitures/ephoto.js"); // Pastikan Anda sudah menempatkan file ephoto.js di path yang benar
const { limit, checkBanned } = require("../declaration/rateLimit.jsx");

const app = express();
app.use(checkBanned);

app.get("/", limit, (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/404.html"));
});

/** example ajg **/
app.get("/ai/ambatron", limit, (req, res) => {
  ambatron(req, res);
});
app.get("/ai/blekbok", limit, (req, res) => {
  kotakHytam(req, res);
});
app.get("/downloader/tiktokDL", limit, (req, res) => {
  tiktod(req, res);
});
app.get("/downloader/instagramDL", limit, (req, res) => {
  igedl(req, res);
});
app.get("/downloader/mediafireDL", limit, (req, res) => {
  mediapire(req, res);
});

// Menambahkan rute untuk ephoto
app.get("/ephoto/glitchtext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/writetext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/advancedglow", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/typographytext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/pixelglitch", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/neonglitch", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/flagtext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/flag3dtext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/deletingtext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/blackpinkstyle", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/glowingtext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/underwatertext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/logomaker", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/cartoonstyle", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/papercutstyle", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/watercolortext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/effectclouds", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/blackpinklogo", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/gradienttext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/summerbeach", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/luxurygold", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/multicoloredneon", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/sandsummer", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/galaxywallpaper", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/1917style", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/makingneon", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/royaltext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/amongustext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/freecreate", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/rainytext", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/galaxystyle", limit, (req, res) => {
  ephoto(req, res);
});
app.get("/ephoto/lighteffects", limit, (req, res) => {
  ephoto(req, res);
});

module.exports = app;
