const path = require("path");
const webpack = require("webpack");

module.exports = {
  title: "Docs",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  description: "Pipedream Documentation - Making any engineer a data engineer",
  base: "/",
  themeConfig: {
    algolia: {
      apiKey: "1e23962724b59d018bdedc0f5a214ce5",
      indexName: "pipedream"
    },
    logo: "/pipedream.svg",
    nav: [
      {
        text: "Community",
        link: "https://spectrum.chat/pipedream/general?tab=posts"
      },
      {
        text: "Support",
        link: "/support/"
      },
      {
        text: "pipedream.com",
        link: "https://pipedream.com/"
      }
    ],
    sidebar: [
      "/support/",
      {
        title: "Intro to Pipedream",
        collapsable: false,
        children: ["/what-is-pipedream/", "/sign-up/", "/your-first-workflow/"]
      },
      {
        title: "Notebooks",
        collapsable: false,
        children: [
          "/notebook/",
          "/notebook/fork/",
          "/notebook/sources/",
          "/notebook/inspector/",
          "/notebook/dollar-event/",
          "/notebook/code/",
          "/notebook/destinations/",
          "/notebook/destinations/http/",
          "/notebook/destinations/s3/",
          "/notebook/destinations/snowflake/",
          "/notebook/text/",
          "/notebook/sql/"
        ]
      },
      "/public-workflows/",
      "/environment-variables/",
      "/pricing/",
      "/limits/",
      "/security/"
    ],
    PIPEDREAM_BASE_URL: "https://pipedream.com",
    PAYLOAD_SIZE_LIMIT: "100kb",
    INSPECTOR_EVENT_LIMIT: "100"
  },
  plugins: ["tabs"]
};
