import React, { useState } from "react";
import { useProductsQuery } from "@/hooks/queries/products";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "@/services/product-service";

export default function HomePage() {
  const navigate = useNavigate();
  const [editedTitles, setEditedTitles] = useState({});
  const queryClient = useQueryClient();

  useMutation({
    mutationFn: productService.updateProduct,
    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old = []) =>
        old.map((p) =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        )
      );

      return { previousProducts };
    },
    onError: (err, updatedProduct, context) => {
      const queryClient = useQueryClient();
      queryClient.setQueryData(["products"], context.previousProducts);
    },
    onSettled: () => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useProductsQuery()


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }



  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {data.data.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-500">${item.price}</p>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
      <button className=" py-2 px-3 rounded-2xl text-white mt-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer" onClick={refetch}>Refetch</button>
      <input
        type="text"
        value={editedTitles[p.id] ?? p.title}
        onChange={(e) => {
          const value = e.target.value;

          setEditedTitles((prev) => ({
            ...prev,
            [p.id]: value,
          }));

          useMutation.mutate({ ...p, title: value });
        }}
      />

      < div className="mt-8" >
        <button className=" py-2 px-3 rounded-2xl text-white mt-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer" onClick={() => { navigate("/product") }}>CreateData</button>
      </div >
    </div >
  );
}