const path = require("path");
const fs = require("fs");

const vueEslint = () => {
  const cwd = process.cwd(); // 获取当前目录

  // 获取路径下的package.json
  let contents = fs.readdirSync(cwd);
  // 判断是否存在package.json

  if (!contents.includes("package.json")) {
    console.log("当前目录没有package.json文件");
    return;
  }

  const fileUrl = path.resolve(cwd, "package.json");

  let str = fs.readFileSync(fileUrl).toString();

  let packageJson = JSON.parse(str);
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }

  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    ...{
      "@typescript-eslint/eslint-plugin": "~5.38.1",
      "@typescript-eslint/parser": "~5.38.1",
      eslint: "~8.23.1",
      "eslint-config-prettier": "~8.5.0",
      "eslint-plugin-import": "2.26.0",
      "eslint-plugin-prettier": "~4.2.1",
      "eslint-plugin-vue": "~9.4.0",
      prettier: "~2.7.1",
    },
  };

  // 写入package.json
  fs.writeFileSync(fileUrl, JSON.stringify(packageJson, null, 2));

  // 将codyContent文件夹下的文件复制到当前目录
  const codyContent = path.resolve(__dirname, "copyContent");
  const codyContentFiles = fs.readdirSync(codyContent);

  codyContentFiles.forEach((file) => {
    const fileUrl = path.resolve(codyContent, file);
    const fileContent = fs.readFileSync(fileUrl);
    fs.writeFileSync(path.resolve(cwd, file), fileContent);
  });
};

module.exports = vueEslint;
