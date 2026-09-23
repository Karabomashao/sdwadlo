import React, { useState } from "react"

export default function Products(){

    const [product, setProduct] = useState({
        productName: "",
        category: "",
        price: "",
        description:"",
        comapare_at_price: "",
        sizes: {
            xs: false,
            s: false,
            m: false,
            l: false,
            xl: false
        },
        colours: {

        }
    });

    const [selectedColour, setSelectedColour] = useState<string>()


    console.log(product.price);


    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }




    return(
        <>
           <main className="bg-[#F7F4ED] p-4">

                <section className="flex flex-col p-5">
                    <span className="text-5xl">Add New Product</span>
                    <span className="text-[#77766F] font-sans">Add new pieces for a brighter drip tomorrow</span>
                </section>

                <div className="grid grid-cols-2 p-4 gap-5">


                    <section className="bg-[#FCFAF6] rounded-xl p-5 shadow-md ">
               
                        <div className="flex flex-col mb-5">
                            <span className="text-2xl">Product Information</span>
                            <span className="text-[#77766F] font-sans">Fill in the details below to add new product to your store</span>
                        </div>

                        <form action="" className="font-sans">
                            <div className="grid grid-cols-2 gap-5 [&_input]:border [&_input]:border-[#D8D5CE] [&_input]:rounded-md [&_input]:p-2">

                                <div className="flex flex-col">
                                    <label className="font-medium">Product Name <span className="text-red-500">*</span></label>
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
                                    <label className="font-medium">Category <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required 
                                        />
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-medium">Price <span className="text-red-500">*</span></label>
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
                                    <label className="font-medium">Compare at Price<span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="R 0.00"
                                    />
                                </div>

                                <div className="flex flex-col">

                                    <label className="font-medium">Sizes <span className="text-red-500">*</span></label>
                                    <div className="flex justify-between">
                                        {["XS", "S","M", "L", "XL"].map((item) => (
                                            <label className="flex gap-2" key={item}>
                                                <input
                                                    type="checkbox"
                                                    required
                                                />
                                                <span>{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col">

                                    <label className="font-medium">Colours <span className="text-red-500">*</span></label>
                                    <div className="flex justify-between">
                                        {["#000000", "#FFFFFF","#2563EB", "#808080", "#E7DED1", " #7A5C3E", "#5F6248"].map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                className="rounded-full w-10 h-10"
                                                style={{backgroundColor: item}}
                                                />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-medium">Stock Quantity <span className="text-red-500">*</span></label>
                                    <input
                                        placeholder="0"
                                        type="number" 
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-medium">SKU (Optional)</label>
                                    <input
                                        placeholder="e.g. SDW-001"
                                        type="text" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-col-1 my-5">
                                <label className="font-medium">Product Description</label>
                                <input
                                    name="description"
                                    value={product.description}
                                    className="border border-[#D8D5CE] h-20 p-3" 
                                    type="text" 
                                    placeholder="Write a detailed description here"
                                    onChange={handleOnChange}
                                />
                            </div>

                                <div className="flex flex-col">
                                    <label className="font-medium">Product Images <span className="text-red-500">*</span></label>
                                    
                                    <div className="grid grid-cols-4 my-5 gap-3">
                                            <span className="border w-50 h-50">One</span>
                                            <span className="border">Two</span>
                                            <span className="border">Three</span>
                                            <span className="border">Four</span>
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

                                    <button className="w-30 h-10 border rounded-md border-[#5F6248]">
                                        Save Product
                                    </button>

                                    <button className="bg-[#5F6248] w-30 h-10 rounded-md text-white">
                                        Publish
                                    </button>
                                    </div>
                                </div>
                        </form>
                    </section>
                    
                    <div className="grid grid-rows-[1.3fr_1fr] gap-4">                        
                            <section className="bg-[#FCFAF6] rounded-2xl p-5 shadow-md">
                                
                                <div className="flex flex-col mb-5 h-full">
                                    <span className="text-2xl">Product Review</span>
                                    <span className="text-[#77766F] font-sans">How it will appear on your store</span>

                                    <div className="h-full border rounded-2xl shadow:lg m-3">
                                        <div className="grid grid-cols-[1fr_1.5fr] gap-5 p-3 h-full ">
                                            <div className="border rounded-lg p-2">
                                                <span>Test</span>
                                            </div>
                                            <div className="border rounded-lg p-2">
                                                <div className="flex flex-col">
                                                    <span className="text-4xl font-sans">{product.productName}</span>
                                                    <span className="text-3xl font-sans">R {product.price}.00</span>
                                                    <p className="text-[#77766F]">{product.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </section>

                            <section className="bg-[#FCFAF6] rounded-2xl border p-4 h-full w-full bg-green-200">
                                Bottom right
                            </section>

                    </div>
                </div>            
           </main>
        </>
    )
}