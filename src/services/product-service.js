import { instance } from "@/lib/axios";

const productService = {
    getProducts: async () => {
        return await instance.get("/products");
    },

    createProduct: async (product) => {
        return await instance.post("/products/", product);
    }, 
    updateProduct: async (product) => {
        const { data } = await instance.put(`${API_URL}/products/${product.id}`, product);
        return data;
    }
};

export default productService;
