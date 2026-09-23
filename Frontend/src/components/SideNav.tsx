import { 
    House, 
    Settings, 
    Shirt, 
    ShoppingCart,
    Users,
    ChartNoAxesCombined,
    Megaphone 
} from "lucide-react"
import { NavLink, Outlet } from "react-router-dom";
import TopNav from "./TopNav";


export default function SideNav(){


    const navItems = [
        {to:"/admin/dashboard", icon:House, tag:"Dashboard", key:1},
        {to:"/admin/products", icon:Shirt, tag:"Products", key:2},
        {to:"/admin/orders", icon:ShoppingCart, tag:"Orders", key:3},
        {to:"/admin/customers", icon:Users, tag:"Customers", key:4},
        {to:"/admin/analytics", icon:ChartNoAxesCombined, tag:"Analytics", key:5},
        {to:"/admin/marketing", icon:Megaphone, tag:"Marketing", key:6},
        {to:"/admin/settings", icon:Settings, tag:"Store Settings", key:7},
    ]


    return(
        <>
            <div className="flex min-h-screen">

                <aside className="w-64 shrink-0 bg-[#EDE6DA]">
                 
                    {/* Branding details */}
                    <div className="flex flex-col items-center py-10 px-5">
                        
                        <div>
                            <h1 className="text-4xl ">SDWALDO</h1>
                        </div>
                        <div className="mb-20">
                            <p>NOMA YINIM IKHONA</p>
                        </div>
                       
                        {/* <nav>  */}
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return(

                                    // className="flex w-full m-5 gap-4 py-2 px-5 bg-[#5F6248] rounded-md">
                                
                                <NavLink
                                    to={item.to}
                                    key={item.key} 
                                    className= {({isActive}) => {
                                        return isActive
                                            ? "flex w-full m-5 gap-4 py-2 px-5 bg-[#5F6248] rounded-md text-white"
                                            : "flex w-full m-5 gap-4 py-2 px-5 rounded-md text-[#252521]"
                                }}>
                                    <Icon className="w-6 h-6"/>
                                    <span>{item.tag}</span>
                                </NavLink>
                            )
                        })}
                        {/* </nav> */}
                    </div>
                </aside>

                <div className="flex-1">
                    <TopNav/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}