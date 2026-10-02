import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { superbase } from '../../lib/supabase';
import { Eye, Mail, Lock, ArrowRight } from "lucide-react";


export default function LoginPage(){
    

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    console.log("Wassup")

    function handleEmailOnChange(e: React.ChangeEvent<HTMLInputElement>){        
        const { name, value } = e.target;
        setEmail(value)
    }
    
    
    function handlePasswordOnChange(e: React.ChangeEvent<HTMLInputElement>){        
        const { name, value } = e.target;
        setPassword(value)
    }
    
    async function supbaseSignUp(){

        try{
            const {data, error} = await superbase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `http://localhost:5173/login`
                }
            });

            if (!data){
                console.log(error);
            }
            navigate('/admin/products')

        }catch(error){
            console.log(error);
        }
    }

    async function supbaseSignIn(){

        try{
            const {data, error} = await superbase.auth.signInWithPassword({
                email,
                password,
            });

            if (!data){
                console.log(error);
            }else{
                navigate('/admin/products')
                console.log(data)
            }


        }catch(error){
            console.log(error);
        }
    }





    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){

        e.preventDefault();
        const result = await supbaseSignUp();
        console.log("Handle submit - Results", result);
        // e.preventDefault();

        // const response = await fetch(`http://localhost:3000/api/v1/auth/login`, {
        //     method: 'Post',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(login)
        // })

        // if (!response.ok){
        //     setError("Invalid credentials");
        // }else{
        //     const data = await response.json();
        //     const userData = data.authenticatedUser;
        //     localStorage.setItem("data", JSON.stringify(userData));
        //     navigate('/admin/dashboard');
        // }
    }



    // return(
    //     <>
    //         {/* <div> */}

    //             <div className="flex flex-col h-screen justify-center items-center">
                    

    //                 <div className='border-4 rounded-xl p-10 border-gray-400 '>

    //                     <div className=' mb-10'>
    //                         <h1>Sdwadlo</h1>
    //                     </div>

    //                     <form onSubmit={handleSubmit}>    
    //                         <div className='mb-4'>
    //                             <label className='flex flex-col mb-4'>Email</label>
    //                             <input 
    //                                 className='mb-4 border p-4'
    //                                 type="email"
    //                                 name="username"
    //                                 placeholder='your@email,com'
    //                                 value={email}
    //                                 onChange={handleEmailOnChange}
    //                                 required 
    //                             />
    //                             <label className='flex flex-col mb-4'>Password</label>
    //                             <input
    //                                 className='mb-4 border p-4'
    //                                 type="password"
    //                                 name="password"
    //                                 placeholder='••••••••'
    //                                 value={password}
    //                                 onChange={handlePasswordOnChange}
    //                                 required 
    //                             />


    //                             <div className='m-4'>
    //                                 <button
    //                                     type="submit"
    //                                     className="label-caps"
    //                                     style={{
    //                                         background: '#0D0D0D',
    //                                         color: '#F3F1EC',
    //                                         border: 'none',
    //                                         padding: '1rem 2.5rem',
    //                                         cursor: 'pointer',
    //                                         letterSpacing: '0.3em',
    //                                         transition: 'opacity 0.2s',
    //                                     }}
    //                                     onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
    //                                     onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    //                                 >
    //                                     Enter
    //                                 </button>
    //                             </div>

    //                             {/* {error && (
    //                                 <p className='text-red-500 break words'>
    //                                     {error}
    //                                 </p>
    //                             )} */}
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>

              
    // )



      return (
        <div className="min-h-screen w-full bg-[#F7F4ED]">
          <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        
          {/* LEFT SIDE - IMAGE / BRANDING */}
          <div className="relative hidden lg:flex">
            <img
              src="/images/fashion-login.jpg"
              alt="Fashion"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/5" />

            <div className="absolute inset-0 flex flex-col justify-between p-10 text-[#252521]">
              <div className="space-y-6">
                <div className="text-xs uppercase tracking-[0.35em] text-[#5F6248]">
                  <p>Fashion</p>
                  <p>People</p>
                  <p>A Brighter</p>
                  <p>Tomorrow</p>
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-xs font-serif text-6xl leading-[0.95]">
                    Style
                    <br />
                    Moves
                    <br />
                    People
                  </h1>

                  <p className="max-w-[220px] text-lg leading-relaxed text-[#444]">
                    Timeless pieces for a kinder, brighter tomorrow.
                  </p>
                </div>
              </div>

              <div className="text-xs uppercase tracking-[0.35em] text-[#5F6248]">
                <p>Clothes</p>
                <p>For A More</p>
                <p>Conscious</p>
                <p>World</p>
              </div>
            </div>
          </div>

        RIGHT SIDE - LOGIN FORM
        <div className="flex items-center justify-center bg-[#FCFAF6] px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            
            {/* Top link */}
            <div className="mb-10 flex justify-end">
              <button className="flex items-center gap-2 text-sm text-[#5F6248] transition hover:text-[#454936]">
                Back to Store
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Logo */}
            <div className="mb-10 text-center">
              <div className="mb-3 flex justify-center">
                <div className="h-8 w-8 rounded-full border border-[#C7CCB3] bg-[#E7DED1]" />
              </div>

              <h1 className="font-serif text-5xl tracking-wide text-[#252521]">
                SDWADLO
              </h1>

              <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-[#77766F]">
                Wear A Brighter Tomorrow
              </p>

              <div className="mx-auto mt-6 h-px w-10 bg-[#D8D5CE]" />
            </div>

            {/* Welcome text */}
            <div className="mb-8 text-center">
              <h2 className="font-serif text-4xl text-[#252521]">Welcome Back</h2>
              <p className="mt-2 text-base text-[#77766F]">
                Sign in to your admin portal
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#252521]">
                  Email address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#D8D5CE] bg-white px-4 py-3 focus-within:border-[#5F6248]">
                  <Mail size={18} className="text-[#77766F]" />
                  <input
                    type="email"
                    placeholder="you@yourcompany.com"
                    className="w-full bg-transparent text-sm text-[#252521] outline-none placeholder:text-[#999]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#252521]">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#D8D5CE] bg-white px-4 py-3 focus-within:border-[#5F6248]">
                  <Lock size={18} className="text-[#77766F]" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm text-[#252521] outline-none placeholder:text-[#999]"
                  />
                  <button type="button">
                    <Eye size={18} className="text-[#77766F]" />
                  </button>
                </div>

                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-[#5F6248] underline underline-offset-2 hover:text-[#454936]"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Sign in button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#5F6248] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#454936]"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-[#D8D5CE]" />
                <span className="text-sm text-[#77766F]">or continue with</span>
                <div className="h-px flex-1 bg-[#D8D5CE]" />
              </div>

              {/* Example social button */}
              <button
                type="button"
                className="w-full rounded-xl border border-[#D8D5CE] bg-white px-4 py-3 text-sm font-medium text-[#252521] transition hover:bg-[#F7F4ED]"
              >
                Continue with Google
              </button>
            </form>

            {/* Bottom text */}
            <div className="mt-10 flex flex-col gap-3 text-center text-sm text-[#77766F] sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <p>Secure admin access • SDWADLO</p>
              <p className="uppercase tracking-[0.25em] text-xs">
                A more stylish tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
