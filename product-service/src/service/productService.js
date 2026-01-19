class productService{
    async createProduct(name, description, images, categoryId, price) {
        if (!name||!description||!categoryId||!price) {
            throw new ("")
        }
    }

}
export default new productService