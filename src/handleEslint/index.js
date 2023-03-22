const path = require("path");
const fs = require("fs");

const handleEslint = () => {
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
      "pre-commit": "^1.2.2",
      prettier: "^2.5.1",
      "@typescript-eslint/eslint-plugin": "^5.10.2",
      "@typescript-eslint/parser": "^5.10.2",
      eslint: "^8.8.0",
      "eslint-config-prettier": "^8.3.0",
      "eslint-plugin-import": "^2.25.4",
      "eslint-plugin-jsx-a11y": "^6.5.1",
      "eslint-plugin-prettier": "^4.0.0",
      "eslint-plugin-react": "^7.28.0",
      "eslint-plugin-simple-import-sort": "^7.0.0",
      "eslint-plugin-react": "^7.32.2",
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

module.exports = handleEslint;
