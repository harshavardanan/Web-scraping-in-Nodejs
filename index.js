const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const { contains } = require("cheerio/lib/static");
const PORT = process.env.PORT || 5000;

const url =
  "https://www.cricbuzz.com/cricket-series/2798/icc-mens-t20-world-cup-2021";
const articles = [];

axios.get(url).then((response) => {
  const html = response.data;
  const $ = cheerio.load(html);
  $(".cb-nws-hdln-ancr", html).each(function () {
    const title = $(this).text();
    const url = $(this).find("a").attr("href");

    articles.push({
      title,
      url,
    });
  });
});

app.get("/news", (req, res) => {
  console.log(articles);
  res.send(articles);
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
