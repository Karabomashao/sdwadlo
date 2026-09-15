import { useState } from 'react';


type LoginForm ={
    username: string,
    password: string
}


export default function LoginPage(){
    
    const [login, setLoginForm] = useState<LoginForm>({
    username: '',
    password: ''
    });

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        console.log(value);
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
        
        console.log(response);
        const data = await response.json();
        console.log(data);
                    

    }



    return(
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>username:</p>
                    <input 
                        type="email"
                        name="username"
                        value={login.username}
                        onChange={handleOnChange}
                        required 
                    />
    
                    <p>password</p>
                    <input 
                        type="password"
                        name="password"
                        value={login.password}
                        onChange={handleOnChange}
                        required 
                    />
                    <br></br>
                    <button type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}