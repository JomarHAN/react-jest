import axios from 'axios'
import React, { useState } from 'react'
import './Login.style.css'

const Login = () => {
  const [error, setError] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})

  const handleClick = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const {data} = await axios.get('https://jsonplaceholder.typicode.com/users/1')
      setUser(data)
    } catch (error) {
      setError(true)
    }
    
  }
  return (
    <div className='container'>
      <span>{user.name}</span>
        <form>
            <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={!username || !password ? true : false} onClick={handleClick}>{isloading ? 'please wait' : 'Login'}</button>
            <span style={{color:'red', visibility: error ? 'visible' : 'hidden'}} data-testid='error'>Something went wrong</span>
        </form>
    </div>
  )
}

export default Login