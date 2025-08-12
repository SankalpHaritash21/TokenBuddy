#!/usr/bin/env node

import fs from "fs";
import Tokenizer from "./tokenizer.js";

const args = process.argv.slice(2);
const tokenizer = new Tokenizer();

if (args[0] === "train") {
  const text = fs.readFileSync(args[1], "utf-8");
  tokenizer.trainFromText(text);
  fs.writeFileSync("vocab.json", JSON.stringify(tokenizer.vocab, null, 2));
  console.log("Vocab trained and saved to vocab.json");
} else if (args[0] === "encode") {
  const vocab = JSON.parse(fs.readFileSync("vocab.json", "utf-8"));
  tokenizer.vocab = vocab;
  tokenizer.inverseVocab = Object.fromEntries(
    Object.entries(vocab).map(([k, v]) => [v, k])
  );
  console.log(tokenizer.encode(args.slice(1).join(" ")));
} else if (args[0] === "decode") {
  const vocab = JSON.parse(fs.readFileSync("vocab.json", "utf-8"));
  tokenizer.vocab = vocab;
  tokenizer.inverseVocab = Object.fromEntries(
    Object.entries(vocab).map(([k, v]) => [v, k])
  );
  const ids = args[1].split(",").map((id) => parseInt(id.trim(), 10));
  console.log(tokenizer.decode(ids));
} else {
  console.log("Usage:");
  console.log("  train <file.txt>");
  console.log("  encode <text>");
  console.log("  decode <ids>");
}
