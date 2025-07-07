# 🧹 npm-unused-scripts

> Find and remove unused `scripts` from your `package.json`.  
> Great for cleaning up dev clutter, legacy commands, and dead tasks.

---

## ✅ Features

- 📦 Lists all `scripts` defined in `package.json`
- 🔍 Detects unused scripts by scanning your project:
  - Source files (`.js`, `.ts`)
  - CI configs (`.yml`, `.yaml`)
  - Docs (`README.md`, `.json`, etc.)
- ✂️ Option to auto-remove unused scripts with `--remove`
- 🔁 Supports dry-run mode for safe previews
- 🛠 CLI + programmatic API

---

## 🚀 Installation

```bash
npm install -g npm-unused-scripts
````

Or use it without installing:

```bash
npx npm-unused-scripts
```

---

## 🔧 CLI Usage

```bash
npx npm-unused-scripts [options]
```

### Options

| Flag       | Alias | Description                               | Default          |
| ---------- | ----- | ----------------------------------------- | ---------------- |
| `--path`   | `-p`  | Path to `package.json`                    | `./package.json` |
| `--dry`    | `-d`  | Show unused scripts without removing them | `false`          |
| `--remove` | `-r`  | Remove unused scripts from package.json   | `false`          |

### Examples

```bash
# Show unused scripts (safe preview)
npx npm-unused-scripts --dry

# Actually remove unused scripts
npx npm-unused-scripts --remove

# Scan a custom package.json path
npx npm-unused-scripts --path ./examples/package.json --dry
```

---

## 💻 Programmatic API

```js
const findUnusedScripts = require("npm-unused-scripts");

findUnusedScripts({
  pathToPkg: "./package.json",
  dry: true,
  remove: false
});
```

---

## 📦 What Counts as "Unused"?

A script is marked **unused** if it’s **not referenced** in:

* Your project files: `.js`, `.ts`, `.json`, `.md`, `.yml`, `.yaml`
* Any `npm run <script>` or `run <script>` call
* Any `:<script>` usage in tools like `turbo`, `nx`, `lerna`

---

## 🧹 Why This Tool?

Your `package.json` grows over time — but how many scripts do you still use?
This tool helps you:

* Remove dead scripts safely
* Avoid confusion for teammates
* Clean up CI configs and docs

---

## 🚧 Roadmap

* [ ] Support `.unusedscriptsignore`
* [ ] Track usage across monorepos / workspaces
* [ ] Visual output with groups
* [ ] GitHub Action integration

---

## 👥 Contributing

Pull requests welcome!
Feel free to open issues or suggest enhancements.

---

## 📄 License

MIT © 2025 Huzaifa Azim# npm-unused-scripts
