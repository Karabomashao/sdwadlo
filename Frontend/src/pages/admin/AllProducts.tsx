// import { access } from "fs";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Folder,
  Home,
  Megaphone,
  MoreVertical,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Tag,
  Users,
} from "lucide-react";

import { superbase } from "../../lib/supabase";
import { useEffect, useState } from "react";
// import { data } from "react-router-dom";

function getStatusClasses(status: string) {
  if (status === "Published") {
    return "bg-[#DDECD4] text-[#47613D]";
  }

  if (status === "Draft") {
    return "bg-[#EEEAE4] text-[#6C675F]";
  }

  return "bg-[#F5D9D8] text-[#A14A49]";
}

function SidebarSubLink({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full rounded-lg px-4 py-2 text-left text-sm transition ${
        active
          ? "bg-[#D9D0BF] font-medium text-[#252521]"
          : "text-[#252521] hover:bg-[#E7DED1]"
      }`}
    >
      {label}
    </button>
  );
}

function StatCard({
  title,
  value,
  change,
  changeColor,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  changeColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#ECE6DD] bg-[#FCFAF6] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F6F2EB] text-[#3A342E]">
          {icon}
        </div>

        <div>
          <p className="text-sm text-[#5D5A54]">{title}</p>
          <h3 className="mt-1 font-serif text-5xl leading-none text-[#252521]">
            {value}
          </h3>
          <p className={`mt-3 text-sm ${changeColor}`}>{change}</p>
        </div>
      </div>
    </div>
  );
}

export default function AllProducts() {
  const [userData, setUserData] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  const stats = [
    {
      title: "Total Products",
      value: userData.length,
      // change: "+12% from last month",
      changeColor: "text-green-600",
      icon: <Package size={24} />,
    },
    {
      title: "Published",
      value: numOfPublished(),
      // change: "+9% from last month",
      changeColor: "text-green-600",
      icon: <Tag size={24} />,
    },
    {
      title: "Drafts",
      value: numOfDrafts(),
      // change: "+2% from last month",
      changeColor: "text-green-600",
      icon: <Folder size={24} />,
    },
    {
      title: "Out of Stock",
      value: numOfStock(),
      // change: "+3% from last month",
      changeColor: "text-red-600",
      icon: <AlertTriangle size={24} />,
    },
  ];

  const products = [
    {
      name: "Linen Blazer",
      sku: "SDW-001",
      category: "Outerwear",
      price: "$129.00",
      stock: 18,
      stockColor: "bg-green-500",
      status: "Published",
      updated: "Jun 14, 2024",
      time: "10:24 AM",
      image: "/images/product-1.jpg",
    },
    {
      name: "Relaxed Fit Shirt",
      sku: "SDW-002",
      category: "Tops",
      price: "$89.00",
      stock: 24,
      stockColor: "bg-green-500",
      status: "Published",
      updated: "Jun 12, 2024",
      time: "04:18 PM",
      image: "/images/product-2.jpg",
    },
    {
      name: "Wide Leg Trousers",
      sku: "SDW-003",
      category: "Bottoms",
      price: "$109.00",
      stock: 12,
      stockColor: "bg-green-500",
      status: "Published",
      updated: "Jun 11, 2024",
      time: "02:36 PM",
      image: "/images/product-3.jpg",
    },
    {
      name: "Linen Midi Dress",
      sku: "SDW-004",
      category: "Dresses",
      price: "$149.00",
      stock: 8,
      stockColor: "bg-yellow-500",
      status: "Published",
      updated: "Jun 10, 2024",
      time: "11:52 AM",
      image: "/images/product-4.jpg",
    },
    {
      name: "Classic Blazer",
      sku: "SDW-005",
      category: "Outerwear",
      price: "$179.00",
      stock: 5,
      stockColor: "bg-red-500",
      status: "Published",
      updated: "Jun 08, 2024",
      time: "09:27 AM",
      image: "/images/product-5.jpg",
    },
    {
      name: "Ribbed Knit Top",
      sku: "SDW-006",
      category: "Tops",
      price: "$69.00",
      stock: 20,
      stockColor: "bg-green-500",
      status: "Published",
      updated: "Jun 06, 2024",
      time: "03:14 PM",
      image: "/images/product-6.jpg",
    },
    {
      name: "Tailored Shorts",
      sku: "SDW-007",
      category: "Bottoms",
      price: "$89.00",
      stock: 15,
      stockColor: "bg-green-500",
      status: "Draft",
      updated: "Jun 05, 2024",
      time: "10:11 AM",
      image: "/images/product-7.jpg",
    },
    {
      name: "Cotton Maxi Skirt",
      sku: "SDW-008",
      category: "Bottoms",
      price: "$119.00",
      stock: 0,
      stockColor: "bg-red-500",
      status: "Out of Stock",
      updated: "Jun 03, 2024",
      time: "01:45 PM",
      image: "/images/product-8.jpg",
    },
  ];

  useEffect(() => {
    async function getSession() {
      const { data, error } = await superbase.auth.getSession();
      if (error) {
        return;
      }
      setAccessToken(data.session?.access_token ?? "");

      // try {
      //   const response = await fetch(
      //     `http://localhost:5173/admin/allProducts/`,
      //     {
      //       headers: {
      //         "content-type": "application/json",
      //         authorization: `Bearer ${accessToken}`,
      //       },
      //     },
      //   );
      //   const data_ = await response.json();
      //   // console.log(data_);
      // } catch (error) {
      //   console.log(error);
      // }

      const response = await fetch(
        `http://localhost:3000/api/v1/product/admin/allProducts`,
      );
      const data_ = await response.json();
      setUserData(data_.message);
      console.log(userData);
    }
    getSession();
  }, []);

  const { data } = superbase.storage
    .from("product-images")
    .getPublicUrl("products/aca1f861-24aa-4fc5-b500-b91731b9c100.png");

  const imageUrl = data.publicUrl;
  console.log(imageUrl);

  function numOfDrafts() {
    return userData.filter((item) => item.status === "Draft").length;
  }

  function numOfPublished() {
    return userData.filter((item) => item.status === "Published").length;
  }

  function numOfStock() {
    return userData.filter((item) => item.status === "Out of Stock").length;
  }

  return (
    <main className="flex min-h-screen flex-1 bg-[#F7F4ED] text-[#252521]">
      <div className="px-6 py-8 lg:px-8">
        <div className="mb-8 flex gap-5 2xl:flex-row items-start justify-between">
          <div>
            <h1 className="font-serif text-6xl leading-none text-[#252521]">
              All Products
            </h1>
            <p className="mt-3 text-xl text-[#6D6A62]">
              Manage your full product catalog.
            </p>
          </div>

          {/* <div className="flex items-start gap-3 2xl:items-end"> */}
          <div className="flex items-center gap-3 text-sm text-[#6E6A63]">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span>Products</span>
            <ChevronRight size={14} />
            <span>All Products</span>
          </div>

          <div className="text-right text-[11px] uppercase tracking-[0.35em] text-[#6D6A62]">
            <p>Fashion People</p>
            <p className="mt-1">A Brighter Tomorrow</p>
          </div>
          {/* </div> */}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-center">
          <div className="flex h-14 flex-1 items-center gap-3 rounded-xl border border-[#E5DED3] bg-[#FCFAF6] px-4">
            <Search size={18} className="text-[#8A857B]" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#A7A298]"
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row xl:w-auto">
            <button className="flex h-14 min-w-[180px] items-center justify-between rounded-xl border border-[#E5DED3] bg-[#FCFAF6] px-4 text-sm text-[#4E4A44]">
              All Categories
              <ChevronDown size={16} />
            </button>

            <button className="flex h-14 min-w-[180px] items-center justify-between rounded-xl border border-[#E5DED3] bg-[#FCFAF6] px-4 text-sm text-[#4E4A44]">
              All Statuses
              <ChevronDown size={16} />
            </button>

            <button className="flex h-14 min-w-[220px] items-center justify-between rounded-xl border border-[#E5DED3] bg-[#FCFAF6] px-4 text-sm text-[#4E4A44]">
              Sort by: Newest
              <ChevronDown size={16} />
            </button>

            <button className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#5F6248] px-6 text-sm font-medium text-white transition hover:bg-[#454936]">
              <Plus size={18} />
              Add New Product
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-[#E8E1D7] bg-[#FCFAF6]">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-[#ECE5DA] bg-[#FCFAF6]">
                <tr className="text-left text-[11px] uppercase tracking-[0.28em] text-[#77766F]">
                  <th className="w-14 px-4 py-5">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-[#CFC7BC] accent-[#5F6248]"
                    />
                  </th>
                  <th className="px-4 py-5">Product</th>
                  <th className="px-4 py-5">Category</th>
                  <th className="px-4 py-5">Price (Rand)</th>
                  <th className="px-4 py-5">Stock</th>
                  <th className="px-4 py-5">Status</th>
                  <th className="px-4 py-5">Updated</th>
                  <th className="px-4 py-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {userData.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#EEE8DE] last:border-b-0"
                  >
                    <td className="px-4 py-4 align-middle">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-[#CFC7BC] accent-[#5F6248]"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            superbase.storage
                              .from("product-images")
                              .getPublicUrl(product.filepath).data.publicUrl
                          }
                          alt={product.product}
                          className="h-16 w-16 rounded-lg object-cover"
                        />

                        <div>
                          <p className="text-2xl font-medium text-[#252521]">
                            {product.product}
                          </p>
                          <p className="mt-1 text-sm text-[#8A857B]">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-lg text-[#5C5852]">
                      {product.category}
                    </td>

                    <td className="px-4 py-4 text-lg text-[#252521]">
                      {product.price}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${product.stockColor}`}
                        />
                        <span className="text-lg text-[#252521]">
                          {product.stock}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${getStatusClasses(
                          product.status,
                        )}`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-lg text-[#4F4B45]">
                        {product.created_at}
                      </p>
                      <p className="mt-1 text-sm text-[#8A857B]">
                        {product.time}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button className="text-[#252521]">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#EDE6DD] px-4 py-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-base text-[#6D6A62]">
              Showing 1–8 of 52 products
            </p>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD5CA] bg-white text-[#5C5852]">
                  <ChevronLeft size={16} />
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5F6248] text-white">
                  1
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD5CA] bg-white text-[#5C5852]">
                  2
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD5CA] bg-white text-[#5C5852]">
                  3
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD5CA] bg-white text-[#5C5852]">
                  4
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD5CA] bg-white text-[#5C5852]">
                  5
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD5CA] bg-white text-[#5C5852]">
                  6
                </button>
                <span className="px-1 text-[#8A857B]">...</span>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD5CA] bg-white text-[#5C5852]">
                  7
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD5CA] bg-white text-[#5C5852]">
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3 text-base text-[#6D6A62]">
                <span>Show</span>
                <button className="flex h-10 min-w-[70px] items-center justify-between rounded-lg border border-[#DDD5CA] bg-white px-3 text-[#4F4B45]">
                  8
                  <ChevronDown size={16} />
                </button>
                <span>per page</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
