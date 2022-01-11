import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { parseString } from "xml2js";
const app = express();
app.use(cors());
app.use(express.static("public"));
app.get("/api/get_unit_info/:world", async (request, response) => {
  let rep = await fetch(
    `https://pl174.plemiona.pl/interface.php?func=get_unit_info`,
    { method: "POST" }
  );
  let xml = await rep.text();
  parseString(xml, (err, result) => {
    response.send(result);
  });
});
app.listen(8000);
