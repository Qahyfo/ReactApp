import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import { publicRoutes, privateRoutes } from "../router";
import { AuthContext } from "../context";
import Loader from "../UI/Loader/Loader";

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext)
    console.log(isAuth)

    if (isLoading) {
        <Loader />
    }

    return (
        isAuth
            ? < Routes >
                {
                    privateRoutes.map(route => {
                        return (
                            <Route key={route.path} path={route.path} element={route.element} />
                        )
                    })
                }
            </Routes>
            : <Routes>
                {
                    publicRoutes.map(route => {
                        return (
                            <Route key={route.path} path={route.path} element={route.element} />
                        )
                    })
                }
            </Routes>

    )
}

export default AppRouter