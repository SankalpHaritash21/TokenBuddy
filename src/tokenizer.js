class Tokenizer {
  constructor() {
    this.vocab = {};
    this.inverseVocab = {};
    this.specialTokens = {
      "<PAD>": 0,
      "<UNK>": 1,
      "<BOS>": 2,
      "<EOS>": 3,
    };
    this.nextId = Object.keys(this.specialTokens).length;
    this.vocab = { ...this.specialTokens };
    this.inverseVocab = Object.fromEntries(
      Object.entries(this.vocab).map(([k, v]) => [v, k])
    );
  }

  trainFromText(text) {
    const words = text.split(/\s+/);
    for (const word of words) {
      if (!this.vocab[word]) {
        this.vocab[word] = this.nextId++;
        this.inverseVocab[this.vocab[word]] = word;
      }
    }
  }

  encode(text) {
    const tokens = [this.vocab["<BOS>"]];
    for (const word of text.split(/\s+/)) {
      tokens.push(this.vocab[word] ?? this.vocab["<UNK>"]);
    }
    tokens.push(this.vocab["<EOS>"]);
    return tokens;
  }

  decode(tokenIds) {
    const words = tokenIds
      .map((id) => this.inverseVocab[id] ?? "<UNK>")
      .filter((tok) => !["<BOS>", "<EOS>", "<PAD>"].includes(tok));
    return words.join(" ");
  }
}

export default Tokenizer;
