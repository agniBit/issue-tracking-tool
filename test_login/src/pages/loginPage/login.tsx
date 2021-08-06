import React, { useState } from "react";

interface loginData {
  username: string;
  password: string;
}


export default function Login() {
  const [loginInfo, setLoginInfo] = useState<loginData>({
    username: '',
    password: ''
  });

  const onInputChange = (e: { target: { name: string; value: string; }; }) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  }

  const submitForm = (e:any) => {
    e.preventDefault();
    console.log(loginInfo);
  }

  return (
    <div className='loginWrapper'>
      <form>
        <input type='text' className='form_input' name='username' onChange={onInputChange} required/>
        <input type='password' className='form_input' name='password' onChange={onInputChange} required/>
        <button type='submit' onClick={submitForm}>Login</button>
      </form>
    </div>
  )
}