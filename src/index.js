#!/usr/bin/env node

const vueEslint = require("./eslintVue");
const handleEslint = require("./handleEslint");

console.log("👴欢迎使用kwi工具", process.argv);

const init = () => {
  const [, , type] = process.argv;

  if (type === "eslint") {
    handleEslint();
    return;
  }
  if (type === "eslint:vue") {
    vueEslint();
    return;
  }
  console.log(`没有找到操作类型`);
};

try {
  init();
} catch (error) {
  console.log("出错了", error);
}
