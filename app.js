import express from "express";
import ejs from "ejs";
import fs from "fs";
const app = express();
import path from "path";
import { fileURLToPath } from "url";

// Get the filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssVersion = 0;

app.set("view engine", "ejs");
app.use("/assets", express.static("public/assets"));

const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
const categories = JSON.parse(fs.readFileSync("./data/categories.json", "utf-8"));

const passedInVariable = { products, categories, cssVersion };
app.use(function (req, res) {
  if (req.url.includes(".html")) {
    return ejs.renderFile("./views/" + req.url.split(".")[0] + ".ejs", passedInVariable, function (err, html) {
      if (err) console.log(err);
      return res.send(html);
    });
  }
  return res.redirect("/index.html");
});

/*
Make a folder for  category and products in the output folder
generate a random cssVersion  during build time=> "XX.XX.XXX"
*/

const PORT = 3000;
app.listen(PORT, console.log("server running..."));
