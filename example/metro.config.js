// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// const exclusionList = require("metro-config/private/defaults/exclusionList");
const path = require("path");
const baseDir = path.resolve(__dirname, "../");
const pak = require('../package.json');
const watchFolders = [baseDir];

const modules = Object.keys({
  ...pak.peerDependencies,
});

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchFolders = watchFolders;
config.resolver = {
  ...config.resolver,
  blacklistRE: modules.map(
    (m) =>
      new RegExp(
        `^${path.join(baseDir, 'node_modules', m)}\\/.*`
      )
  ),
  extraNodeModules: modules.reduce((acc, name) => {
    acc[name] = path.join(__dirname, 'node_modules', name);
    return acc;
  }, {})
}

module.exports = config;
