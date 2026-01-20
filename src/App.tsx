import { useState, useEffect } from 'react'
import { api } from './lib/api'

function App() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // ฟังก์ชันดึงข้อมูล User (เหมือนเดิม)
  const fetchUser = async () => {
    const { data, error } = await api.me.get()
    if (data) {
      setUser(data) // ถ้าได้ข้อมูล ใส่ใน State
    } else {
      console.log('ยังไม่ Login หรือ Token หมดอายุ', error)
      setUser(null)
    }
  }

  // ฟังก์ชัน Login (เพิ่มใหม่)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // ยิง API Login
    const { data, error } = await api.login.post({
      email,
      password
    })

    console.log(data)

    if (!error) {
      alert('Login สำเร็จ!')
      fetchUser() // Login เสร็จ ดึงข้อมูล User ทันที
    } else {
      alert('Login พลาด: ' + error.value)
    }
  }

  // ฟังก์ชัน Logout (แถมให้)
  const handleLogout = async () => {
    await api.logout.post()
    setUser(null) // ล้างข้อมูลหน้าเว็บ
  }

  // ทำงานครั้งแรกเมื่อเข้าเว็บ
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 POS System</h1>
      
      {/* ถ้ามี User แล้ว ให้โชว์ข้อมูล */}
      {user ? (
        <div>
          <h2>ยินดีต้อนรับ, {user.name} 👋</h2>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
          <button onClick={handleLogout} style={{ background: 'red', color: 'white' }}>
            Logout
          </button>
        </div>
      ) : (
        // ถ้ายังไม่มี User ให้โชว์ฟอร์ม Login
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300 }}>
          <h3>เข้าสู่ระบบ</h3>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ padding: 8 }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ padding: 8 }}
          />
          <button type="submit" style={{ padding: 8, cursor: 'pointer' }}>
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default App