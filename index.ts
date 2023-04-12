import { http, params } from "@ampt/sdk";
import { data } from "@ampt/data";

http.on(404, "static/index.html");

import express from "express";
import { readFile } from 'fs';
const expressApp = express();

expressApp.get("/api/secim/28/sehir/:id", async (req, res) => {
  res.json(await data.get("city:" + req.params.id));
});


// Workaround for data uploading to a Ampt Stage
expressApp.get("/loadData/:pass", async (req, res) => {
  if (req.params.pass === params("LOAD_DATA_PASS")) {
    readFile("data.json", "utf8", (err: any, jsonString: string) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      try {
        const jsonData = JSON.parse(jsonString);
        for (let item of jsonData) {
          data.set(item.key, item.value);
        }
      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
      res.json({ status: "ok" });
    });
  }
});

http.useNodeHandler(expressApp);
