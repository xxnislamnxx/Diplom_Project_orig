
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter"
import NavBar from './components/NavBar.js';
import { observer } from 'mobx-react-lite';
import { Context } from './index.js';
import { check } from './http/userAPI.js';
import { Spinner } from 'react-bootstrap';
import Project from './pages/Project.js';
import { jwtDecode } from 'jwt-decode';
import Admin from './pages/Admin.js';

const App = observer( () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)
  const tok = localStorage.getItem('token')
  if (!tok) {
    console.log("пустой токен ",tok)
  }else{
    const token = jwtDecode(tok)
    console.log("токен получен ",tok,token)
  }
  useEffect( () => {
      check().then(data => {
        user.setUser(user)
        user.setIsAuth(true)
        //user.setRole(token.Role)
      }).finally(() => setLoading(false))
    }, [])

  if (loading) {
    return <Spinner animation={'grow'}/>
    
  }
  

  return (
      <BrowserRouter>
        <NavBar />
        <AppRouter />
        
      </BrowserRouter>
      

  );
})
//<Statistics />
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
