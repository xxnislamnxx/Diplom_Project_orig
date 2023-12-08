
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter"
import NavBar from './components/NavBar.js';
import { observer } from 'mobx-react-lite';
import { Context } from './index.js';
import { check } from './http/userAPI.js';
import { Spinner } from 'react-bootstrap';
import { set } from 'mobx';
//import Statistics from './components/Statistics.js';
const App = observer( () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect( () => {
      check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
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
