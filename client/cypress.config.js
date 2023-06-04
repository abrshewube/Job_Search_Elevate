// import { defineConfig } from "cypress";
module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      config.env = process.env;
      return config;
    },
  },
};
