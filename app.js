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
const dist = JSON.parse(fs.readFileSync("./data/distributors.json", "utf-8"));

const passedInVariable = { products, categories, cssVersion, dist };
app.use(function (req, res) {
  if (req.url.includes(".html")) {
    if (req.url.startsWith("/product-")) {
      return ejs.renderFile(
        "./views/one-product.ejs",
        {
          ...passedInVariable,
          product: products.find((product) => {
            return product.slug.toLowerCase() == req.url.split("product-")[1].replace(".html", "");
          }),
        },
        function (err, html) {
          if (err) console.log(err);
          return res.send(html);
        }
      );
    }
    if (req.url.startsWith("/category-")) {
      const category = categories.find((cat) => {
        return cat.url == req.url;
      });
      return ejs.renderFile(
        "./views/one-category.ejs",
        {
          ...passedInVariable,
          category,
          subproducts: products.filter((product) => product.type == category.typeSelector),
        },
        function (err, html) {
          if (err) console.log(err);
          return res.send(html);
        }
      );
    }
    return ejs.renderFile("./views/" + req.url.split(".")[0] + ".ejs", passedInVariable, function (err, html) {
      if (err) console.log(err);
      return res.send(html);
    });
  }
  return res.redirect("/index.html");
});

if (process.argv[2]) {
  const cssVersion = (Math.random() * 100).toFixed() + "." + (Math.random() * 1000).toFixed() + "." + (Math.random() * 10).toFixed();
  const pages = [
    "about.ejs",
    "contact.ejs",
    "index.ejs",
    "products.ejs",
    "services.ejs",
    "dist.ejs",
    "installers.ejs",
    "blogs.ejs",
    "installation.ejs",
    "quotation.ejs",
    "how-to-become-an-affiliate-marketer-for-obst.ejs",
  ];
  //  "one-product.ejs",
  pages.forEach((page) => {
    ejs.renderFile("./views/" + page, { ...passedInVariable }, function (err, html) {
      if (err) {
        return err;
      }
      fs.writeFileSync(__dirname + "/public/" + page.replace(".ejs", ".html"), html);
    });
  });
  console.log("pages has been completed");
  products.forEach((product) => {
    return ejs.renderFile("./views/one-product.ejs", { ...passedInVariable, product }, function (err, html) {
      if (err) console.log(err);
      return fs.writeFileSync(__dirname + "/public/product-" + product.slug.toLowerCase() + ".html", html);
    });
  });
  console.log("products has been completed");
  categories.forEach((category) => {
    return ejs.renderFile(
      "./views/one-category.ejs",
      {
        ...passedInVariable,
        category,
        subproducts: products.filter((product) => product.type == category.typeSelector),
      },
      function (err, html) {
        if (err) console.log(err);
        return fs.writeFileSync(__dirname + "/public/" + category.url, html);
      }
    );
  });

  console.log("completed building...");
  process.exit(0);
}

const PORT = 4000;
app.listen(PORT, console.log("server running..."));
