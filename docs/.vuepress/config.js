const path = require("path");
const webpack = require("webpack");

module.exports = {
  title: "Docs",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  description: "Pipedream Documentation - Making any engineer a data engineer",
  base: "/",
  themeConfig: {
    logo: "/pipedream.svg",
    nav: [{ text: "Support", link: "/support/" }],
    sidebar: [
      ["/", "Docs Home"],
      "/what-is-pipedream/",
      "/sign-up/",
      "/your-first-pipeline/"
    ],
    PIPEDREAM_BASE_URL: "https://tidewater.pipedream.com",
    PAYLOAD_SIZE_LIMIT: "100kb",
    INSPECTOR_EVENT_LIMIT: "100"
  },
  plugins: ["tabs"]
};
