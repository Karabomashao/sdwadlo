import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { superbase } from "../../lib/supabase";

export default function SignUpPage() {


    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfrimPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");



    // Dynamic function for setting different states
    function handleChange(e: React.ChangeEvent<HTMLInputElement>, 
        setter: React.Dispatch<React.SetStateAction<string>>){    
        setter(e.target.value);
    }


    //sign up using supeerbase SDK
    async function superbaseSignUp(){
        
        const {data, error} = await superbase.auth.signUp({
            email,
            password,
            options: {
                data:{
                    name,
                    lastName
                }
            }
        })

        if (!data){
            console.log(error);
        }else{
            console.log(data.user);
            console.log(data.session);
        }
    }

    // Handle form submit
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
        
        if (password !== confirmPassword){
            setPasswordError("Passwords do not match");
            return;
        }

        setPassword("");

        e.preventDefault();
        const result = superbaseSignUp()
        console.log(result);

    }



  return (
    <div className="min-h-screen w-full bg-[#F7F4ED]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:block">
          <img
            src="/images/fashion-login.jpg"
            alt="SDWADLO Fashion"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute inset-0 flex flex-col justify-between p-10">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-[#5F6248]">
                <p>Fashion</p>
                <p>People</p>
                <p>A Brighter</p>
                <p>Tomorrow</p>
              </div>

              <div className="mt-12">
                <h1 className="font-serif text-6xl leading-[0.95] text-[#252521]">
                  Join
                  <br />
                  The
                  <br />
                  Movement
                </h1>

                <p className="mt-6 max-w-[250px] text-lg text-[#454545]">
                  Create your account and discover timeless fashion made for a
                  brighter tomorrow.
                </p>
              </div>
            </div>

            <div className="text-xs uppercase tracking-[0.35em] text-[#5F6248]">
              <p>Better Style</p>
              <p>Better Choices</p>
              <p>Brighter Days</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <main className="flex min-h-screen items-center justify-center bg-[#FCFAF6] px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">

            {/* Logo */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-3 h-8 w-8 rounded-full bg-[#C7CCB3]" />

              <h1 className="font-serif text-4xl tracking-[0.12em] text-[#252521] sm:text-5xl">
                SDWADLO
              </h1>

              <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#77766F]">
                Wear A Brighter Tomorrow
              </p>
            </div>

            {/* Heading */}
            <div className="mb-8 text-center">
              <h2 className="font-serif text-3xl text-[#252521] sm:text-4xl">
                Create Account
              </h2>

              <p className="mt-2 text-sm text-[#77766F] sm:text-base">
                Register your details to get started
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* First + Last Name */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-[#252521]"
                  >
                    First Name
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#D8D5CE] bg-white px-4 py-3 focus-within:border-[#5F6248]">
                    <User size={18} className="text-[#77766F]" />

                    <input
                      id="firstName"
                      type="text"
                      name="name"
                      placeholder="John"
                      required
                      className="w-full bg-transparent text-sm outline-none"
                      value={name}
                      onChange={(e) => handleChange(e, setName)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-[#252521]"
                  >
                    Last Name
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#D8D5CE] bg-white px-4 py-3 focus-within:border-[#5F6248]">
                    <User size={18} className="text-[#77766F]" />

                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Smith"
                      required
                      className="w-full bg-transparent text-sm outline-none"
                      value={lastName}
                      onChange={(e) => handleChange(e, setLastName)}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#252521]"
                >
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#D8D5CE] bg-white px-4 py-3 focus-within:border-[#5F6248]">
                  <Mail size={18} className="text-[#77766F]" />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    required
                    className="w-full bg-transparent text-sm outline-none"
                    value={email}
                    onChange={(e) => handleChange(e, setEmail)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#252521]"
                >
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#D8D5CE] bg-white px-4 py-3 focus-within:border-[#5F6248]">
                  <Lock size={18} className="text-[#77766F]" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    required
                    className="w-full bg-transparent text-sm outline-none"
                    value={password}
                    onChange={(e) => handleChange(e, setPassword)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-[#77766F] hover:text-[#252521]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[#252521]"
                >
                  Confirm Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#D8D5CE] bg-white px-4 py-3 focus-within:border-[#5F6248]">
                  <Lock size={18} className="text-[#77766F]" />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    className={`border rounded-md px-3 py-2 ${
                        password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => handleChange(e, setConfrimPassword)}
                  />

                {passwordError && (
                    <span className="text-red-500 text-sm">
                    {passwordError}
                </span>
        )}


                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="text-[#77766F] hover:text-[#252521]"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 text-sm text-[#77766F]">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[#5F6248]"
                />

                <span>
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-[#5F6248] hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </label>

              {/* Create Account */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#5F6248] px-4 py-3 font-medium text-white transition hover:bg-[#454936]"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#D8D5CE]" />

              <span className="text-xs text-[#77766F]">
                or continue with
              </span>

              <div className="h-px flex-1 bg-[#D8D5CE]" />
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#D8D5CE] bg-white px-4 py-3 text-sm font-medium text-[#252521] transition hover:bg-[#F7F4ED]"
            >
              Continue with Google
            </button>

            {/* Login Link */}
            <div className="mt-7 text-center">
              <p className="text-sm text-[#77766F]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#5F6248] hover:text-[#454936] hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}