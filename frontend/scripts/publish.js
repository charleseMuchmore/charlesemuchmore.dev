const { execSync } = require("child_process");
const fs = require("fs");

require("dotenv").config({ path: ".env" });

const user = process.env.DEPLOYMENT_USER;
const host = process.env.DEPLOYMENT_HOST;
const path = process.env.DEPLOYMENT_PATH;

console.log("Building frontend...");
execSync("npm run build", { stdio: "inherit" });

console.log("Uploading build to server...");

execSync(
  `scp -r build/* ${user}@${host}:${path}`,
  { stdio: "inherit" }
);

console.log("Deploy complete.");