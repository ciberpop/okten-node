const path = require('path');
const fs = require('fs').promises;

const pathToProductFile = path.join(process.cwd(), 'data', 'products.json');

async function getProductsFile() {
    const fileContent = await fs.readFile(pathToProductFile);

    return JSON.parse(fileContent);
}

async function writeToProductFile(products) {
    await fs.writeFile(pathToProductFile, JSON.stringify(products));
}

module.exports = {
    getProductsFile,
    writeToProductFile
}