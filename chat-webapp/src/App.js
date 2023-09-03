import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

function App() {
  // const fetchMovies= async()=>{
  //   try {
  //   const res=  await axios.get('/allMovies');
  //   console.log(res.data);
  //   } catch (error) {

  //   }

  // }
  // useEffect(()=>{
  //   console.log("hello");
  //   fetchMovies();
  // },[])

  return (
    <div className="App">
    
          <Route path="/" component={HomePage} exact />
          <Route path="/chats" component={ChatPage} exact />
    
    </div>
  );
}

export default App;
