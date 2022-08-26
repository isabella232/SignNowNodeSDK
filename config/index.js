/* eslint-disable global-require */
"use strict";

const ENVIRONMENTS = { prod: "prod", eval: "eval" };
let currentEnvironment = ENVIRONMENTS.prod;

/**
 * @type {EnvConfig}
 */
const currentConfig = {};

/**
 * Returns environment config data
 * @return {EnvConfig}
 */
const getEnvConfig = () => currentConfig;

/**
 * Sets and returns environment config data
 * @param {string} [env]
 * @return {EnvConfig}
 */
const setEnvConfig = (env) => {
  if (env) {
    currentEnvironment = env;
    if (env === ENVIRONMENTS.eval)
      return Object.assign(currentConfig, require("./eval"));
    if (env === ENVIRONMENTS.prod)
      return Object.assign(currentConfig, require("./prod"));
  }

  return Object.assign(currentConfig, require(`./${currentEnvironment}`));
};

module.exports = {
  getEnvConfig,
  setEnvConfig,
};
