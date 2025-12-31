import { useProductsQuery } from "@/hooks/queries/products";
import { useNavigate } from "react-router-dom";
import PutProducts from "../putProducts";

export default function HomePage() {
  const navigate = useNavigate();


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
        {data.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-xl shadow hover:shadow-lg transition"
          >
            <h1 className="text-lg font-semibold">{item.id}</h1>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-500">${item.price}</p>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
      <button className=" py-2 px-3 rounded-2xl text-white mt-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer" onClick={refetch}>Refetch</button>
      <PutProducts />
      < div className="mt-8" >
        <button className=" py-2 px-3 rounded-2xl text-white mt-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer" onClick={() => { navigate("/product") }}>CreateData</button>
      </div >
    </div >
  );
}