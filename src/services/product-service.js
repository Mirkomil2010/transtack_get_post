import { instance } from "@/lib/axios";

const productService = {
    getProducts: async () => {
        const { data } = await instance.get("/products");
        return data;
    },

    createProduct: async (product) => {
        const { data } = await instance.post("/products", product);
        return data;
    },

    updateProduct: async (product) => {
        const { id, ...payload } = product;

        const { data } = await instance.put(
            `/products/${id}`,
            payload
        );

        return data;
    },
};

export default productService;
