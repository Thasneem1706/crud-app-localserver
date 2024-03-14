// updateJsonFile.js
const fs = require('fs');

// Load the existing JSON file
const filePath = './src/assets/users.json';
let jsonData = require(filePath);

// Function to update JSON data
function updateJsonData(updatedData) {
  jsonData = updatedData;

  // Write updated data back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

// Usage example: updateJsonData(newData);
