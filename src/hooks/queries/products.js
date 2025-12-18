import productService from "@/services/product-service"
import { useQuery } from "@tanstack/react-query"

export const useProducts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: productService.getAllProducts,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}
