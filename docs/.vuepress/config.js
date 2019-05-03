const path = require("path");
const webpack = require("webpack");

module.exports = {
  title: "Docs",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  description: "Pipedream Documentation - Making any engineer a data engineer",
  base: "/",
  themeConfig: {
    logo: "/pipedream.svg"
  },
  plugins: ["tabs"]
};
