import React, { useState } from "react";
import { DoorOpenIcon, ChevronDown, BoxSelect, TextSelect } from "lucide-react";
import { allColours, allSizes } from "../../utils/productData";
import { superbase } from "../../lib/supabase";

export default function Products(){

    const [product, setProduct] = useState({
        productName: "",
        category: "",
        price: "",
        description:"",
        brand: "",
        sizes: [] as Number[],
        colours: [] as Number[]
    });

    const [image, setImage] = useState<File | null>(null);

    function validateArrayLength(arr: Object[]){
        
        if (arr.length === 0){
            alert("Select at least one option for colours and sizes!")
            return true;
        }
        return false;
    }

    const [selectedColour, setSelectedColour] = useState<string>()


    function handleUploadImage(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0];
        console.log(file);

        if (!file){
            return;
        }
        setImage(file);
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = e.target;
        setProduct( (prev) => ({
            ...prev,
            [name]: value
        }));
    }
    function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>){
        const {name}= e.target;
        const value = parseInt(e.target.value);
        setProduct( (prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSizes(event: React.ChangeEvent<HTMLInputElement>){

        const {checked} = event.target;
        const value = parseInt((event.target.value));
        setProduct((prev) => ({
            ...prev,
            sizes: checked
                ?[...prev.sizes, value]
                : prev.sizes.filter((size) => size !== value)
        }))
    }

    function handleColourClick(event: React.MouseEvent<HTMLButtonElement>) {
        
        const value = parseInt(event.currentTarget.value);
        setProduct((prev) => ({
            ...prev,

            colours: prev.colours.includes(value)
                ? prev.colours.filter((id) => id !== value)
                : [...prev.colours, value]
        }));
    }

    async function uploadImage(){
        
        if (!image) return;
        
        const fileExtension = image.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `products/${fileName}`;

        const { data, error } = await superbase.storage
            .from("product-images")
            .upload(filePath, image);

        if (error){
            console.log(error);
            return;
        }

        console.log(data)
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){

        e.preventDefault();
        
        if (validateArrayLength(product.sizes) || validateArrayLength(product.colours)){
            return
        }

        const data = JSON.parse(localStorage.getItem("data") ?? "null")
        const response = await fetch(`http://localhost:3000/api/v1/product/addProduct`, {
            
            method: 'Post',
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${data.token}`
            },
            body: JSON.stringify(product)
        })
        
        // const data = await response.json();
        // console.log(data);

    }




    return(
        <>
           <main className="bg-[#F7F4ED] px-4">

                <section className="flex flex-col p-5">
                    <span className="text-3xl">Add New Product</span>
                    <span className="text-[#77766F] font-sans">Add new pieces for a brighter drip tomorrow</span>
                </section>

                <div className="grid grid-cols-2 px-4 pb-4 gap-5">

                    <section className="bg-[#FCFAF6] rounded-xl p-5 shadow-md ">
               
                        <div className="flex flex-col mb-5">
                            <span className="text-md">Product Information</span>
                            <span className="text-[#77766F] font-sans text-sm">Fill in the details below to add new product to your store</span>
                        </div>

                        <form onSubmit={handleSubmit} className="font-sans">
                            <div className="grid grid-cols-2 gap-5 [&_input]:border [&_input]:border-[#D8D5CE] [&_input]:rounded-md [&_input]:px-2 [&_input]:py-1">

                                <div className="flex flex-col">
                                    <label className="font-medium text-sm">Product Name <span className="text-red-500">*</span></label>
                                    <input
                                        name="productName"
                                        value={product.productName}
                                        placeholder="e.g Linen Blazer" 
                                        type="text"
                                        required
                                        onChange={handleOnChange}
                                        
                                    />
                                </div>
    
                                <div className="flex flex-col">
                                    <label className="font-medium text-sm">Category <span className="text-red-500">*</span></label>
                                    <select 
                                        name="category"
                                        value={product.category}
                                        className="px-2 py-1 border-[#D8D5CE] border rounded-md"
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Select Category</option>
                                        <option value={1}>T-shirt</option>
                                        <option value={2}>Golf-shirt</option>
                                        <option value={3}>Sweater</option>
                                        <option value={4}>Long-Sleeve</option>
                                        <option value={5}>Jeans</option>
                                        <option value={6}>Shorts</option>
                                        <option value={7}>Socks</option>
                                        <option value={8}>Hoodies</option>
                                        <option value={9}>Shirts</option>
                                        <option value={10}>Coats</option>
                                        <option value={11}>Pants</option>
                                        <option value={12}>Leggings</option>
                                        <option value={13}>Hats</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-medium text-sm">Price <span className="text-red-500">*</span></label>
                                    <input
                                        name="price"
                                        value={product.price}
                                        type="number"
                                        required
                                        placeholder="R 0.00"
                                        onChange={handleOnChange}
                                        />
                                </div>
                                
                                <div className="flex flex-col">
                                    <label className="font-medium text-sm">Brand<span className="text-red-500">*</span></label>
                                    <input
                                        name="brand"
                                        value={product.brand}
                                        type="text"
                                        required
                                        placeholder="R 0.00"
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div className="flex flex-col">

                                    <label className="font-medium text-sm">Sizes <span className="text-red-500">*</span></label>
                                    <div className="flex justify-between">
                                        {allSizes().map((item) => {
                                            const [key, val] = Object.entries(item)[0]
                                            
                                            return(
                                            <label className="flex gap-2" key={key}>
                                                <input
                                                    name="sizes"
                                                    value={key}
                                                    checked={product.sizes.includes(parseInt(key))}
                                                    type="checkbox"
                                                    onChange={handleSizes}
                                                />
                                                <span>{val.toUpperCase()}</span>
                                            </label>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-col">

                                    <label className="font-medium text-sm">Colours <span className="text-red-500">*</span></label>
                                    <div className="flex justify-between">
                                        {allColours().map((item) => {
                                            const [key, value] = Object.entries(item)[0]

                                            return (
                                            <button
                                                key={key}
                                                type="button"
                                                className="rounded-full w-6 h-6"
                                                style={{backgroundColor: value}}
                                                onClick={handleColourClick}
                                                value={key}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-medium text-sm">Stock Quantity <span className="text-red-500">*</span></label>
                                    <input
                                        placeholder="0"
                                        type="number" 
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-medium text-sm">SKU (Optional)</label>
                                    <input
                                        placeholder="e.g. SDW-001"
                                        type="text" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-col-1 my-5">
                                <label className="font-medium text-sm">Product Description</label>
                                <input
                                    name="description"
                                    value={product.description}
                                    className="border border-[#D8D5CE] h-15 p-3" 
                                    type="text" 
                                    placeholder="Write a detailed description here"
                                    onChange={handleOnChange}
                                />
                            </div>

                                <div className="flex flex-col">
                                    <label className="font-medium text-sm">Product Images <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-4 mb-5 gap-3">
                                        <label htmlFor="product-image" className="w-30 h-20 border items-center">Upload here</label>            
                                            <input
                                                id="product-image" 
                                                type="file"
                                                accept="image/*"
                                                onChange={handleUploadImage}
                                            />
                                            <span className="border w-30 h-20">Two</span>
   
                                    </div>


                                    
                                </div>

                                <div className="flex justify-between">

                                    <div className="flex gap-2 items-center">
                                        <input 
                                            type="checkbox" 
                                        />             
                                        <label>Save as draft</label>
                                    </div>

                                    <div className="flex gap-2">

                                    <button onClick={uploadImage} className="w-30 h-8 border rounded-md border-[#5F6248] text-sm">
                                        Save Product
                                    </button>

                                    <button className="bg-[#5F6248] w-30 h-8 rounded-md text-white">
                                        Publish
                                    </button>
                                    </div>
                                </div>
                        </form>
                    </section>
                    
                    <div className="grid grid-rows-[1.5fr_1fr] gap-4">                        
                            <section className="bg-[#FCFAF6] rounded-2xl p-5 shadow-md">
                                
                                <div className="flex flex-col mb-5 h-full">
                                    <span className="text-2xl">Product Review</span>
                                    <span className="text-[#77766F] font-sans">How it will appear on your store</span>

                                    <div className="h-full border rounded-2xl shadow:lg m-3">
                                        <div className="grid grid-cols-[1fr_1.5fr] gap-5 p-3 h-full ">
                                                { image && (
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt="Preview"
                                                        className="h-full rounded-lg shadow-md"
                                                    />
                                                )

                                                }
                                                {/* <img src="/cover.png" alt="An image" className="h-full rounded-lg shadow-md"/> */}
           
                                            <div className="border rounded-lg p-2">
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-sans">{product.productName}</span>
                                                    <span className="text-md font-sans">R {product.price}.00</span>
                                                    <p className="text-[#77766F]">{product.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </section>

                            <section className="bg-[#FCFAF6] rounded-2xl border p-4 w-full bg-green-200">
                                Bottom right
                            </section>

                    </div>
                </div>            
           </main>
        </>
    )
}