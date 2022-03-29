import React, { useContext, useEffect, createContext, useState } from 'react';
import moment from 'moment';
import { useSocket } from '../hooks/useSocket'
import AuthContext from './JWTAuthContext';


export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4000');
    const logged = useContext(AuthContext)
    const [endDate] = useState(moment().format())
    const [startDate, setStartDate] = useState(moment().subtract(1,'year').format())
    

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
            logged.newService = registro           
        })
    }, [ socket ])

     
    
    const reportsDates = {
        startDate,
        endDate
    }

    return (
        <SocketContext.Provider value={{ socket, online, reportsDates, setStartDate }}>
            { children }
        </SocketContext.Provider>
    )
}