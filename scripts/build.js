buildPlugin({
  entryPoints: ["builds/cdn.js"],
  outfile: "dist/openfeature.min.js",
});

buildPlugin({
  entryPoints: ["builds/module.js"],
  outfile: "dist/openfeature.esm.js",
  platform: "neutral",
  mainFields: ["main", "module"],
});

function buildPlugin(buildOptions) {
  return require("esbuild").buildSync({
    ...buildOptions,
    minify: true,
    bundle: true,
  });
}
