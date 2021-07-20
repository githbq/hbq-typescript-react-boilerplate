import * as debug from "debug";
import * as path from "path";
import * as dotenvExpand from "dotenv-expand";
import * as dotenv from "dotenv";
import { PUBLIC_PATH, ROOT_PATH } from "./constants";

function loadEnv(mode?) {
  const logger = debug("react:env");
  const basePath = path.resolve(ROOT_PATH, `.env${mode ? `.${mode}` : ``}`);
  const localPath = `${basePath}.local`;

  const load = (envPath) => {
    try {
      const env = dotenv.config({ path: envPath, debug: process.env.DEBUG === "env" });
      dotenvExpand(env);
      logger(envPath, env);
    } catch (err) {
      // only ignore error if file is not found
      if (err.toString().indexOf("ENOENT") < 0) {
        console.error(err);
      }
    }
  };

  load(localPath);
  load(basePath);

  // by default, NODE_ENV and BABEL_ENV are set to "development" unless mode
  // is production or test. However the value in .env files will take higher
  // priority.
  if (mode) {
    // always set NODE_ENV during tests
    // as that is necessary for tests to not be affected by each other
    const defaultNodeEnv = mode === "production" || mode === "test" ? mode : "development";
    if (process.env.NODE_ENV == null) {
      process.env.NODE_ENV = defaultNodeEnv;
    }
    if (process.env.BABEL_ENV == null) {
      process.env.BABEL_ENV = defaultNodeEnv;
    }
  }
}

const prefixRE = /^REACT_APP_/;

function resolveClientEnv(raw) {
  const env = { BASE_URL: "" };
  Object.keys(process.env).forEach((key) => {
    if (prefixRE.test(key) || key === "NODE_ENV") {
      env[key] = process.env[key];
    }
  });
  env.BASE_URL = PUBLIC_PATH;

  if (raw) {
    return env;
  }

  for (const key in env) {
    env[key] = JSON.stringify(env[key]);
  }
  return {
    "process.env": env,
  };
}

const mode = process.env.REACT_APP_MODE;

if (mode) {
  loadEnv(mode);
}
// load base .env
loadEnv();

export { resolveClientEnv };
