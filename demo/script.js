class Tokenizer {
  constructor() {
    this.specialTokens = {
      "<PAD>": 0,
      "<UNK>": 1,
      "<BOS>": 2,
      "<EOS>": 3,
    };
    this.vocab = { ...this.specialTokens };
    this.inverseVocab = Object.fromEntries(
      Object.entries(this.vocab).map(([t, id]) => [id, t])
    );
    this.nextId = Object.keys(this.vocab).length;
  }
  trainFromText(text) {
    const words = text.split(/\s+/).filter((w) => w.trim());
    for (const word of words) {
      if (!this.vocab[word]) {
        this.vocab[word] = this.nextId++;
        this.inverseVocab[this.vocab[word]] = word;
      }
    }
  }
  encode(text) {
    const tokens = [this.vocab["<BOS>"]];
    for (const word of text.split(/\s+/).filter((w) => w.trim())) {
      tokens.push(this.vocab[word] ?? this.vocab["<UNK>"]);
    }
    tokens.push(this.vocab["<EOS>"]);
    return tokens;
  }
  decode(ids) {
    return ids
      .map((id) => this.inverseVocab[id] ?? "<UNK>")
      .filter((t) => !["<BOS>", "<EOS>", "<PAD>"].includes(t))
      .join(" ");
  }
}

const tokenizer = new Tokenizer();

document.getElementById("trainBtn").onclick = () => {
  tokenizer.trainFromText(document.getElementById("trainText").value);
  alert("✅ Vocab trained!");
};

document.getElementById("encodeBtn").onclick = () => {
  const tokens = tokenizer.encode(document.getElementById("inputText").value);
  document.getElementById("tokens").textContent = tokens.join(", ");
};

document.getElementById("decodeBtn").onclick = () => {
  const tokenStr = document.getElementById("tokens").textContent;
  if (!tokenStr.trim()) return;
  const ids = tokenStr
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  document.getElementById("decoded").textContent = tokenizer.decode(ids);
};
