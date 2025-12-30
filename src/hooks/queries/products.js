import productService from "@/services/product-service";
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
    retry: 3,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, price, description, categoryId, images }) => productService.createProduct({ title, price, description, categoryId, images: Array.isArray(images) ? images : [images] }),
    onSuccess: () => {
      alert("Product created successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      alert("Error creating product: " + error.message);
    },
  });
};

