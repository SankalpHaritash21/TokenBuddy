# Simple JavaScript Tokenizer

A basic tokenizer in JavaScript that:

- Learns vocabulary from text
- Supports encode / decode
- Handles special tokens: `<PAD>`, `<UNK>`, `<BOS>`, `<EOS>`

---

## 📦 Features

- Learn vocabulary from a text file
- Encode text → numbers
- Decode numbers → text
- Supports special tokens:
  - `<PAD>`: empty space
  - `<UNK>`: unknown piece
  - `<BOS>`: beginning of sentence
  - `<EOS>`: end of sentence

---

## 🚀 Usage

### 1️⃣ Train Vocabulary

Learn tokens from a text file:

```bash
node src/cli.js train ./example/sample.txt
```

**Example output:**

```
✅ Vocab trained and saved to vocab.json
```

---

### 2️⃣ Encode Text

Convert text into token IDs:

```bash
node src/cli.js encode "How are you?"
```

**Example output:**

```
[ 4, 5, 6, 7 ]
```

---

### 3️⃣ Decode Tokens

Convert token IDs back to text:

```bash
node src/cli.js decode "4,5,6,7"
```

**Example output:**

```
How are you?
```

If a token ID is unknown:

```bash
node src/cli.js decode "2,99,3"
```

**Output:**

```
<UNK>
```

---

## 📝 Example `sample.txt`

```
How are you?
This is a tokenizer example.
```
