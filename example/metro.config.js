// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require("path");

const baseDir = path.resolve(__dirname, "../");
const watchFolders = [baseDir];

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchFolders = watchFolders;
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(__dirname, "node_modules")
  ],
  disableHierarchicalLookup: true
}

module.exports = config;
