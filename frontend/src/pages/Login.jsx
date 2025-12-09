import React from 'react';
import API from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';

export default function Login() {
  const nav = useNavigate();
  const { setToken, setUser } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target));
    try {
      const res = await API.post('/auth/login', body);
      setToken(res.data.token);
      setUser(res.data.user);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <form onSubmit={submit} style={{width:360,padding:20,border:'1px solid #e5e7eb',borderRadius:8,background:'#fff'}}>
        <h2 style={{marginBottom:12}}>Login</h2>

        <input name="email" type="email" placeholder="Email" style={{marginBottom:8,width:'100%',padding:8}} required />
        <input name="password" type="password" placeholder="Password" style={{marginBottom:12,width:'100%',padding:8}} required />

        <button style={{width:'100%',padding:10,background:'#10b981',color:'#fff',border:0,borderRadius:6}}>
          Login
        </button>

        {/* Register Link */}
        <p style={{marginTop:12, textAlign:'center'}}>
          Don't have an account? <Link to="/register" style={{color:'#2563eb'}}>Register</Link>
        </p>
      </form>
    </div>
  );
}
