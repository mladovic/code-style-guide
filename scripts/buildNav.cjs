const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const docsDir = path.join(__dirname, "../src/docs");
const outputPath = path.join(__dirname, "../src/lib/nav.json");

function traverseDir(dir, parentPath = "") {
  const files = fs.readdirSync(dir);
  let navItems = [];

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const children = traverseDir(fullPath, `${parentPath}/${file}`);
      navItems.push({
        title: toTitleCase(file),
        path: `${parentPath}/${file}`,
        children,
      });
    } else if (stat.isFile() && path.extname(file) === ".md") {
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContent);

      navItems.push({
        title: data.title || toTitleCase(path.basename(file, ".md")),
        path: `${parentPath}/${path.basename(file, ".md")}`,
        content,
      });
    }
  });

  return navItems;
}

function toTitleCase(str) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const navData = traverseDir(docsDir);
fs.writeFileSync(outputPath, JSON.stringify(navData, null, 2));
console.log("Navigation data generated successfully!");
