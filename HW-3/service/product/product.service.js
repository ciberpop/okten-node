const uuid = require('uuid').v4;

const {getProductsFile, writeToProductFile} = require('../../utils/products');

class productService {
    constructor(id, title, count, price) {
        this.id = id || uuid();
        this.title = title;
        this.count = count;
        this.price = price;
    }

    async createProduct() {
        const products = await getProductsFile();

        products.push(this);

        await writeToProductFile(products);
    }

    static async getAllProducts() {
        return await getProductsFile();
    }

    static async getProduct(id) {
        const products = await getProductsFile();

        return products.find(product => product.id === id);
    }


    async updateProduct() {
        const products = await getProductsFile();
        const index = products.findIndex(product => product.id === this.id);

        products[index] = this;
       
        await writeToProductFile(products);
    }

    static async deleteProduct(id) {
        let products = await getProductsFile();

        products = products.filter(product => product.id !== id);

        await writeToProductFile(products);
    }

}

module.exports = productService;