import axios, { AxiosRequestConfig } from "axios";
import React, { useState } from "react";
import './css/login.scss'


interface loginData {
  username: string;
  password: string;
}

export default function Login(props: { history: string[]; }) {
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
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('username', loginInfo.username);
        props.history.push(`/dashboard?username=${loginInfo.username}`);
      }
    }).catch(function (error: any) {
      console.log(error);
    });
  }

  return (
    <div className='login'>
      <div className='login_container'>
        <div className='welcome_div'>
          <img src='/assets/loginBanner.png' className='loginBnnerImage' alt='bannerImage' />
        </div>
        <div className='login_form_container'>
          <div className='login_wrapper'>
            <div className='login_text'>
              <h1>Login</h1>
            </div>
            <form className='form_container'>
              <div className='input_field'>
                <img src='/assets/user.png' className='icon' alt='user' />
                <input type='text' className='form_input' name='username' onChange={onInputChange} placeholder="Username" required/>
              </div>
              <div className='input_field'>
                <img src='/assets/padlock.png' className='icon' alt='pass' />
                <input type='password' className='form_input' name='password' onChange={onInputChange} placeholder='Password' required/>
              </div>
              <div className='button_conatiner'>
                <button type='submit' onClick={submitForm}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


