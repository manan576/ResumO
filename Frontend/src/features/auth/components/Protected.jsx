import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import SiteHeader from "../../../components/SiteHeader";

const Protected = ({children}) => {
    const { initializing, user } = useAuth()


    if(initializing){
        return (
            <div className="auth-page">
                <SiteHeader />
                <main><h1>Loading...</h1></main>
            </div>
        )
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected
