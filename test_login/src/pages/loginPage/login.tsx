import axios, { AxiosRequestConfig } from "axios";
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

  const submitForm = async (e:any) => {
    e.preventDefault();

    var req_data: AxiosRequestConfig = {
      method: 'post',
      url: 'http://localhost:8765/api/user/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(loginInfo),
    };
    await axios(req_data).then(function (response: { data: any; }) {
      if (response.data.token) {
        localStorage.setItem('userData',
          JSON.stringify({
            'username': loginInfo.username,
            'accessToken': response.data.token
          }));
      }
    }).catch(function (error: any) {
      console.log(error);
    });
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


