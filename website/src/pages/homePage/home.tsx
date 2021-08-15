import { useEffect } from "react";

export default function Home(props: { history: { replace: (arg0: string) => void; push: (arg0: string) => void; }; }) {
  useEffect(
    () => {
      var accessToken = localStorage.getItem('accessToken');
      var username = localStorage.getItem('username');
      if (accessToken && username) {
        props.history.replace(`/dashboard?username=${username}`);
      }
    }
  )
  const handleLogin = () => {
    props.history.push('/login');
  }
  return (
    <div>
      <p>Login to continue</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}