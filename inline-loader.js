const fs = require("fs");

module.exports = function(source) {
  const filePath = this.resourcePath; // Get the file path
  const fileContent = fs.readFileSync(filePath, "utf-8"); // Read file content
  const inlineContent = JSON.stringify(fileContent); // Escape special characters

  // Return the modified source code with the inline content
  return `module.exports = ${inlineContent};`;
};
