import React from 'react'
import { createContext } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

import { auth } from '../utils/FirebaseTools'
import { useState, useEffect, useContext } from 'react';

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({})

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => { 
        return signOut(auth)
     }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => { 
        console.log(currentUser)
        setUser(currentUser)

       })    
      return () => {
        unsubscribe()
      }
    }, [])
    
    
    return (
        <UserContext.Provider value={{signIn, user, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => { 
    return useContext(UserContext)
}

