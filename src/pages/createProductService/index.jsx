import CreateProductForm from "@/components/createProduct";
import { useNavigate } from "react-router-dom";


export default function CreateData() {
    const navigate = useNavigate();


    return (
        <div className="min-h-screen flex flex-col items-center">
            <CreateProductForm />
            <button className=" py-2 px-3 rounded-2xl text-white mt-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 cursor-pointer" onClick={() => { navigate("/") }}>Home</button>
        </div>
    );
}