
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter"
import NavBar from './components/NavBar.js';
import Statistics from './components/Statistics.js';
const App = () => {
  return (
      <BrowserRouter>
        <NavBar />
        <Statistics />
        <AppRouter />
      </BrowserRouter>
      

  );
}

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
