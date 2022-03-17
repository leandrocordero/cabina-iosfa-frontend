import React, { useContext, useEffect, createContext } from 'react';
import { useSocket } from '../hooks/useSocket'
import AuthContext from './JWTAuthContext';


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4000');
    const logged = useContext(AuthContext)


    useEffect(() => {
        if(logged.isAuthenticated){
           conectarSocket()
        }
    }, [logged.isAuthenticated, conectarSocket])
    
    useEffect(() => {
        if(!logged.isAuthenticated){
           desconectarSocket()
        }
    }, [logged.isAuthenticated, desconectarSocket])
   
       
      useEffect(() => {
        socket?.emit('change-user-status',[logged]); 
    
      }, [socket])

      useEffect(() => {
        socket?.on('nuevo-registro-cargado',(registro)=>{
            console.log(registro);
            logged.newService = registro           
        })
    }, [ socket ])
      
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}