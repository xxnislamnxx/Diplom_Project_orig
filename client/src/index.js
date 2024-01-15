import React,{createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index';
import App from './App.js';
import UserStore from './store/UserStore.js';
import OtdelStore from './store/OtdelStore.js';
import WorkStore from './store/WorkStore.js';
import StatisticsStore from './store/StatisticsStore.js';



export const Context = createContext(null)
//import reportWebVitals from './reportWebVitals';
console.log("Какая то ссылка", process.env.REACT_APP_API_URL)
/*
ReactDOM.render(
  <App />,
  document.getElementById('root')

);
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <Context.Provider value={{
      user: new UserStore(),
      otdel : new OtdelStore(),
      work : new WorkStore(),
      statistics : new StatisticsStore()
  }}>
    <App />
  </Context.Provider>
);
/* рабочий вариант
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
<React.StrictMode>
    <App />
</React.StrictMode>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
