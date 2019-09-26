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
      "/",
      "/support/",
      "/sign-up/",
      {
        title: "Getting Started",
        collapsable: false,
        children: [
          "/what-are-workflows/",
          "/your-first-workflow/",
        ]
      },
      {
        title: "Workflow Steps",
        collapsable: false,
        children: [
          "/notebook/",
          "/notebook/sources/",
          "/notebook/code/",
          "/notebook/actions/",
        ]
      },
      {
        title: "Workflow Events",
        collapsable: false,
        children: [
          "/notebook/events/",
          "/notebook/inspector/",
          "/notebook/replay/",
          "/notebook/test/",
        ]
      },
      {
        title: "Managing Workflows",
        collapsable: false,
        children: [
          "/notebook/fork/",
          "/notebook/managing/",
          "/public-workflows/",
          "/environment-variables/",
        ]
      },
      {
        title: "Destinations",
        collapsable: false,
        children: [
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
