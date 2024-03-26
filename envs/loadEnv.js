const dotEnv = require("dotenv");
const { resolve } = require("node:path");

const dotEnvFileMap = {
  development: "development",
  production: "production",
  staging: "staging",
};

/** @type {(NODE_ENV:"development" | "production") => void} */
function loadEnv(NODE_ENV) {
  const mode = dotEnvFileMap[NODE_ENV || "development"];
  const envFileList = [`.${mode}.local`, ".local", `.${mode}`, ""];
  envFileList?.forEach((envFile) =>
    dotEnv.config({ path: resolve(__dirname, `./.env${envFile}`) })
  );
}

module.exports = loadEnv;
