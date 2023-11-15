import React,{createContext,useState} from 'react'

 const MyContext=createContext({});

  export const MyContextProvider=({children})=>{
    const [user,setUser]=useState("");

    return(
      <MyContext.Provider value={{user,setUser}}>
             {children}
      </MyContext.Provider>
    )

 
  }



 export default MyContext;