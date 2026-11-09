
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "worker-entry.js");

// 按优先级检查可部署版本
const candidates = [
  "CFNext-小说混淆版.js",
  "CFNext-混淆版.js"
];

console.log("==================================");
console.log(" CFNext Automatic Build");
console.log("==================================");

let selected = null;

for (const filename of candidates) {
  const filepath = path.join(root, filename);

  if (fs.existsSync(filepath)) {
    selected = filepath;
    console.log(`Found: ${filename}`);
    break;
  }

  console.log(`Not found: ${filename}`);
}

if (!selected) {
  console.error("ERROR: No supported CFNext JS file found.");
  console.error("Please check the repository files.");
  process.exit(1);
}

// 复制到固定入口文件
fs.copyFileSync(selected, output);

if (!fs.existsSync(output) || fs.statSync(output).size === 0) {
  console.error("ERROR: Worker entry generation failed.");
  process.exit(1);
}

console.log(`Selected: ${path.basename(selected)}`);
console.log("Generated: worker-entry.js");
console.log("Build preparation completed.");
