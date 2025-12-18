import { useProducts } from "@/hooks/queries/products";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useProducts()


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }


  return (
    <div className="min-h-screen flex flex-col items-center">
      {JSON.stringify(data)}
      <button className=" py-2 px-3 rounded-2xl text-white mt-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer" onClick={refetch}>Refetch</button>
      <div className="mt-8">
        <button className=" py-2 px-3 rounded-2xl text-white mt-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer" onClick={() => { navigate("/product") }}>CreateData</button>
      </div>
    </div>
  );
}