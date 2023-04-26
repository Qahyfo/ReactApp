import React, { useEffect, useState } from "react";
import './styles/app.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./UI/Navbar/Navbar";
import AppRouter from "./Components/AppRouter";
import { AuthContext } from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])

  return (

    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>

  )
}

export default App