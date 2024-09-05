import express from "express";
import ejs from "ejs";
import fs from "fs";
const app = express();
import path from "path";
import { fileURLToPath } from "url";

// Get the filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
