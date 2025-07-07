const fs = require("fs");
const path = require("path");
const { globby } = require("globby");

function extractScriptNames(pkgPath) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  return pkg.scripts || {};
}

async function findReferences(rootDir) {
  const files = await globby(["**/*.{js,ts,json,md,yml,yaml}"], {
    cwd: rootDir,
    gitignore: true,
    absolute: true,
    onlyFiles: true
  });

  const content = files.map(f => fs.readFileSync(f, "utf8").toLowerCase()).join("\n");
  return content;
}

async function findUnusedScripts({ pathToPkg = "package.json", dry = false, remove = false }) {
  const pkgPath = path.resolve(pathToPkg);
  const rootDir = path.dirname(pkgPath);

  const scripts = extractScriptNames(pkgPath);
  const allScriptKeys = Object.keys(scripts);
  const allContent = await findReferences(rootDir);

  const unused = allScriptKeys.filter(name => {
    return !allContent.includes(`npm run ${name}`) &&
           !allContent.includes(`run ${name}`) &&
           !allContent.includes(`:${name}`);
  });

  if (dry) {
    console.log("🔍 Unused scripts (preview):");
    unused.forEach(s => console.log(`- ${s}`));
    return;
  }

  if (remove && unused.length > 0) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    unused.forEach(s => delete pkg.scripts[s]);
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log(`✅ Removed ${unused.length} unused script(s):`);
    unused.forEach(s => console.log(`- ${s}`));
  } else {
    console.log("🧾 Unused scripts:");
    unused.forEach(s => console.log(`- ${s}`));
  }
}

module.exports = findUnusedScripts;
