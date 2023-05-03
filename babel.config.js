module.exports = api => {
  // Cache configuration is a required option
  api.cache(false);

  const presets = ["@babel/preset-typescript", "@babel/preset-env"];

  return {
    presets,
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@types": "./src/types",
            "@utils": "./src/utils",
            "@controllers": "./src/controllers",
            "@components": "./src/components",
            "@components/*": "./src/components/*",
            "@modules": "./src/modules",
            "@pages": "./src/pages",
            "@hocs": "./src/hocs",
            "@api": "./src/api",
            "@connectors": "./src/connectors",
            "@routes": "./src/pages/routes.ts"
          }
        }
      ]
    ]
  };
};
