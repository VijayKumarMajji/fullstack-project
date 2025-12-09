import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { useAuth } from '../utils/auth';

export default function Dashboard(){
  const { logout, user, setUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [q, setQ] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks', { params: { q } });
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    }
  };

  useEffect(()=>{ fetchTasks(); /* eslint-disable-next-line */ }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', form);
      setForm({ title: '', description: '' });
      fetchTasks();
    } catch (err) { console.error(err); alert('Add failed'); }
  };

  const toggle = async (t) => {
    try {
      // use string concat to avoid any escaping issues
      await API.put('/tasks/' + t._id, { completed: !t.completed });
      fetchTasks();
    } catch (err) { console.error(err); alert('Update failed'); }
  };

  const remove = async (id) => {
    try {
      await API.delete('/tasks/' + id);
      fetchTasks();
    } catch (err) { console.error(err); alert('Delete failed'); }
  };

  const updateProfile = async () => {
    const name = prompt('New name', user?.name || '');
    if (!name) return;
    try {
      const res = await API.put('/profile', { name });
      setUser(res.data.user);
    } catch (err) { console.error(err); alert('Update failed'); }
  };

  return (
    <div style={{padding:24,maxWidth:900,margin:'0 auto'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <div>
          <h1 style={{margin:0}}>Dashboard</h1>
          <div style={{color:'#6b7280'}}>{user?.name || user?.email}</div>
        </div>
        <div>
          <button onClick={updateProfile} style={{marginRight:8,padding:8}}>Edit Profile</button>
          <button onClick={logout} style={{padding:8,background:'#ef4444',color:'#fff',border:0,borderRadius:6}}>Logout</button>
        </div>
      </header>

      <form onSubmit={add} style={{display:'flex',gap:8,marginBottom:16}}>
        <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="Title" required style={{flex:1,padding:8}} />
        <input value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Description" style={{width:260,padding:8}} />
        <button style={{padding:8,background:'#2563eb',color:'#fff',border:0,borderRadius:6}}>Add</button>
      </form>

      <div style={{marginBottom:12}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{padding:8,width:'100%',marginBottom:8}} />
        <button onClick={fetchTasks} style={{padding:8}}>Search</button>
      </div>

      <div>
        {tasks.map(t => (
          <div key={t._id} style={{padding:12,border:'1px solid #e5e7eb',borderRadius:8,marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{textDecoration: t.completed ? 'line-through' : 'none', fontWeight:600}}>{t.title}</div>
              <div style={{color:'#6b7280'}}>{t.description}</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>toggle(t)} style={{padding:8}}>{t.completed ? 'Undo' : 'Done'}</button>
              <button onClick={()=>remove(t._id)} style={{padding:8,background:'#ef4444',color:'#fff',border:0,borderRadius:6}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
