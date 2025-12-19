import productService from "@/services/product-service";
import { useState } from "react";

export default function CreateProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "electronic",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const dataToSend = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      const newProduct = await productService.createProduct(dataToSend);

      setSuccess(`Product created successfully! ID: ${newProduct.id}`);
      setFormData({
        title: "",
        price: "",
        description: "",
        image: "https://i.pravatar.cc",
        category: "electronic",
      });

    } catch (err) {
      console.error("Post Error:", err);
      setError("Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold">Create New Product</h2>

      {error && <p className="text-red-500 border border-red-500 p-2">{error}</p>}
      {success && <p className="text-green-500 border border-green-500 p-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300">
          {loading ? "Posting..." : "Post Product"}
        </button>
      </form>
    </div>
  );
}