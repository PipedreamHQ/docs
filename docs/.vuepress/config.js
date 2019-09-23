const path = require("path");
const webpack = require("webpack");

module.exports = {
  title: "Docs",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  description: "Pipedream Documentation - Integrate your apps, data and APIs",
  base: "/",
  themeConfig: {
    algolia: {
      apiKey: "1e23962724b59d018bdedc0f5a214ce5",
      indexName: "pipedream"
    },
    logo: "/pipedream.svg",
    nav: [
      {
        text: "Slack",
        link: "https://pipedream.com/community"
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
        title: "Workflows",
        collapsable: false,
        children: [
          "/notebook/",
          "/notebook/fork/",
          "/notebook/sources/",
          "/notebook/inspector/",
          "/notebook/steps/",
          "/notebook/code/",
          "/notebook/actions/",
          "/notebook/destinations/",
          "/notebook/destinations/http/",
          "/notebook/destinations/s3/",
          "/notebook/destinations/email/",
          "/notebook/destinations/snowflake/",
          "/notebook/sql/",
          "/notebook/destinations/sse/"
        ]
      },
      "/cron/",
      "/public-workflows/",
      "/environment-variables/",
      "/pricing/",
      "/limits/",
      "/security/"
    ],
    PIPEDREAM_BASE_URL: "https://pipedream.com",
    PAYLOAD_SIZE_LIMIT: "100kb",
    INSPECTOR_EVENT_LIMIT: "100",
    NODE_VERSION: "10"
  },
  plugins: ["tabs"]
};
