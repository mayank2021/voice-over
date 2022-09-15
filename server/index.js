const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(fileUpload());

const url = "https://alan-blog.surge.sh/";

const getData = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const grabText = await page.evaluate(() => {
    let eles = [...document.body.getElementsByTagName("*")];
    const title = document.getElementsByTagName("title")[0];

    eles.unshift(title);
    console.log(eles);
    return eles.map((ele) => ({
      text: ele.childElementCount ? "" : ele.innerHTML,
      tag: ele.tagName,
      href: ele.getAttribute("href") ? ele.getAttribute("href") : "",
      imgAlt: ele.getAttribute("alt") ? ele.getAttribute("alt") : "",
      imgSrc: ele.getAttribute("src") ? ele.getAttribute("src") : "",
      imgHeight: ele.clientHeight ? ele.clientHeight : "",
      imgWidth: ele.clientWidth ? ele.clientWidth : "",
    }));
    // return eles;
  });
  return grabText;
};

app.post("/text", async (req, res) => {
  let url = req.body.url;
  if (url) {
    const data = await getData(url);
    res.send(data);
  }
});

app.post("/extract", (req, res) => {
  if (!req.files && !req.files.file) {
    res.status(400);
    res.end();
  }

  pdfParse(req.files.file).then((result) => res.send(result.text));
});

app.listen(4000, () => {
  console.log("server is up and running");
});
