// backend/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const urlDatabase = {}; // In-memory (temporary)

app.post("/api/shorten", (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "Missing longUrl" });

  const code = nanoid(6);
  const shortUrl = `http://localhost:5000/${code}`;
  urlDatabase[code] = longUrl;

  res.json({ shortUrl });
});

app.get("/:code", (req, res) => {
  const longUrl = urlDatabase[req.params.code];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
