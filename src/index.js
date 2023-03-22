#!/usr/bin/env node

const handleEslint = require("./handleEslint");

console.log("👴欢迎使用kwi工具", process.argv);

const init = () => {
  const [, , type] = process.argv;

  if (type === "eslint") {
    handleEslint();
    return;
  }
  console.log(`没有找到操作类型`);
};

try {
  init();
} catch (error) {
  console.log("出错了", error);
}
