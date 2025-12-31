import { useState } from "react";
import { useUpdateProduct } from "@/hooks/queries/products";

export default function PutProducts() {
  const { mutate, isLoading } = useUpdateProduct();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      id: Number(id),
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: Array.isArray(images) ? images : [images],
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Update Product (PUT)</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          placeholder="Product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
