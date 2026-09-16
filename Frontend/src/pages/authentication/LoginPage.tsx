import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


type LoginForm ={
    username: string,
    password: string
}


export default function LoginPage(){
    
    const LOGIN_BG = 'https://images.unsplash.com/photo-1760497925673-d2f56ed4d8f9?w=1800&h=2400&fit=crop&auto=format'
    const navigate = useNavigate();

    const [login, setLoginForm] = useState<LoginForm>({
    username: '',
    password: ''
    });

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        setLoginForm({
            ...login,
            [name]: value,
        })
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/api/v1/auth/login`, {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(login)
        })

        if (!response.ok){
            console.log("Invalid Credentials!");
        }else{
            const data = await response.json();
            const userData = data.authenticatedUser;
            localStorage.setItem("data", JSON.stringify(userData));
            navigate('/admin/dashboard');
        }
    }



    return(
        <>
            <div className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: '#F3F1EC' }}>

                {/* <div className="absolute inset-y-0 left-0 w-[62%]">
                    <img src="/cover.png" alt="Editorial fashion" className="w-full h-full object-cover" />
                </div>

                <div
                    className="login-panel absolute inset-y-0 right-0 w-[38%] flex flex-col"
                    style={{ backgroundColor: '#f5f4f2' }}
                >
                    <div className="pt-12 px-16">
                        <span className="label-caps" style={{ letterSpacing: '0.35em' }}>Sdwadlo</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center px-16 pb-24">
                        <h1
                            style={{
                            fontFamily: "'Bodoni Moda', Georgia, serif",
                            fontSize: '3rem',
                            fontWeight: 400,
                            lineHeight: 1.1,
                            letterSpacing: '-0.01em',
                            marginBottom: '3.5rem',
                            color: '#0D0D0D',
                            }}
                        >
                            Sign in
                        </h1> */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">    
                            <div className="flex flex-col gap-1">
                                <label className='label-caps'>Email</label>
                                    <input 
                                        className="field-line"
                                        type="email"
                                        name="username"
                                        placeholder='your@email,com'
                                        value={login.username}
                                        onChange={handleOnChange}
                                        required 
                                    />
                            </div>
    
                            <div className="flex flex-col gap-1">
                                <label className='label-caps'>Password</label>
                                <input
                                    className="field-line" 
                                    type="password"
                                    name="password"
                                    placeholder='••••••••'
                                    value={login.password}
                                    onChange={handleOnChange}
                                    required 
                                />
                            </div>
                            
                            <div className="pt-8">
                                <button
                                    type="submit"
                                    className="label-caps"
                                    style={{
                                        background: '#0D0D0D',
                                        color: '#F3F1EC',
                                        border: 'none',
                                        padding: '1rem 2.5rem',
                                        cursor: 'pointer',
                                        letterSpacing: '0.3em',
                                        transition: 'opacity 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                >
                                    Enter
                                </button>
                            </div>
                        </form>
                    {/* </div>
                </div>                 */}
            </div>
        </>
    )
}
