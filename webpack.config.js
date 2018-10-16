const path = require('path');

module.exports = {
   mode: "development",
   context: path.resolve(__dirname, "javascript/compiled"),
   entry: "./main.js",
   output: {
      path: path.resolve(__dirname, "distribution"),
      filename: "bundle.js",
   },
   resolve: {
      extensions: [".js", ".json", ".jsx"],
   },
   devtool: 'source-map',
   target: 'web'
}