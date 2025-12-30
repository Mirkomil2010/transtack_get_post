import { useCreateProduct, useProductsQuery } from "@/hooks/queries/products";
import { useState } from "react";

export default function CreateProductForm() {
  const { data, isLoading, error, isError } = useProductsQuery();
  const { mutate } = useCreateProduct();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [categoryId, setCategoryId] = useState("");


  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceInput = (e) => {
    setPrice(Number(e.target.value));
  };

  const handleDesInput = (e) => {
    setDescription(e.target.value);
  };

  const handleImageInput = (e) => {
    setImages(e.target.value);
  };

  const handleCategoryIdInput = (e) => {
    setCategoryId(Number(e.target.value));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title, price, description, categoryId, images });
  };


  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold">Create New Product</h2>


      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" value={FormData.title} onChange={handleTitleInput} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="price" value={FormData.price} onChange={handlePriceInput} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={FormData.description} onChange={handleDesInput} required rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CategoryId</label>
          <input type="number" name="categoryId" value={FormData.categoryId} onChange={handleCategoryIdInput} required rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input type="text" name="image" value={FormData.image} onChange={handleImageInput} required rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>


        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300">
          {isLoading ? "Posting..." : "Post Product"}
        </button>
      </form>
    </div>
  );
}