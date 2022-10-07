import express, { Express, Request, Response } from "express";
import crypto from "crypto";
import * as dotenv from "dotenv";
import { getUrlDoc, urlSchema, writelog } from "./utils";
import { LinkDB } from "./db/model";
import { PatternType } from "./@types";

dotenv.config();
const app: Express = express();
const SCHEME: string = process.env.SCHEME as string;
const HOST: string = process.env.HOST as string;
const PORT: number = parseInt(process.env.PORT as string);

app.post("/", async (req: Request, res: Response) => {
  const url = req.query.url as string;
  writelog(req.params);
  if (url) {
    // if link exists already, just send the existing gen link
    const doc = await getUrlDoc({ url } as PatternType);
    if (doc) {
      res.send(urlSchema(SCHEME, HOST, PORT, doc.genUrl));
    } else {
      // generate & send short link
      const genUrl = crypto.randomBytes(2).toString("hex");
      LinkDB.url = url;
      LinkDB.genUrl = genUrl;
      LinkDB.save(() => {
        const newUrl = `${SCHEME}://${HOST}:${PORT}/${genUrl}`;
        res.send(newUrl);
      });
    }
  } else {
    res.status(400).send("url was empty.");
  }
});

app.post("/:genUrl", async (req: Request, res: Response) => {
  const genUrl = req.params.genUrl;
  const doc = await getUrlDoc({ genUrl } as PatternType);
  doc ? res.send(doc.url) : res.status(404).send();
});

app.listen(PORT, () => writelog(`Server started on port ${PORT}`));
