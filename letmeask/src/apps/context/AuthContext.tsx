import { createContext, useState,ReactNode, useEffect } from "react";

type User = {
    id: number | undefined,
    profile:string | undefined,
    username:string | undefined,
    email:string | undefined,
    telefone:string | undefined,
    data_nasc:string | undefined

 };

 
type AuthContextType ={
    user:User | undefined
    getUser:() => Promise<void>
    resetUser:() => Promise<void>
  }
type ProposType = {
    children:ReactNode
}

export const authContext = createContext({} as AuthContextType);

export function  AuthContProvider(props:ProposType){
    const [user,setUser] = useState<User>();

    async function resetUser(){
        setUser(undefined);
        localStorage.removeItem('token')
    }

    useEffect(()=>{
        getUser();
      }  
      ,[])

    async function getUser(){
        const url = 'http://localhost:8000/user';
        let token = localStorage.getItem('token');
        if(token){
            const requestOptions = {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json',
                   'Authorization':'Token '+token
                  },
                body: JSON.stringify({token:token})
            };   
           
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {    
                  const {id,email,profile,username,telefone,data_nasc} = data
                  setUser({
                     id:id,
                     email:email,
                     profile:profile,
                     username:username,
                     telefone:telefone,
                     data_nasc:data_nasc
                    });
                })
                .catch(error => {
                    console.log('Fail');
                    console.log(error);
                    return;
                });

        }
        
        
    }
    return (
        <authContext.Provider value={{user,getUser,resetUser}}>
            {props.children}
        </authContext.Provider>
    )
}