
module.exports = function (api) {
  api.cache(true);

  // Disable editable components to prevent import resolution errors
  const EDITABLE_COMPONENTS = [];

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          alias: {
            "@": "./",
            "@components": "./components",
            "@style": "./style",
            "@hooks": "./hooks",
            "@types": "./types",
            "@contexts": "./contexts",
            "@lib": "./lib",
          },
        },
      ],
      ...EDITABLE_COMPONENTS,
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-worklets/plugin", // react-native-worklets/plugin must be listed last!
    ],
  };
};
