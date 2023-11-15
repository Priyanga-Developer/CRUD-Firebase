import React ,{useEffect ,useContext } from 'react'
import{ GoogleButton} from 'react-google-button'
import { auth } from './firebaseConfig/firebase'
import { googleProvider } from './firebaseConfig/firebase'
import { signInWithPopup,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MyContext from './MyContext';


const Signin = () => {
    const {setUser} =useContext(MyContext);
const navigate=useNavigate();
   const handleOnSignIn = async()=>{
    try{
           await signInWithPopup (auth,googleProvider)
           navigate("/Home");
    }
    catch(err){
        console.log(err.message)
    }
     
   }
 
   useEffect(()=>{
     const unsubscribe=()=>{
        onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
     }
     return ()=>unsubscribe();
   })

  return (
    <div>
        <GoogleButton onClick={()=>handleOnSignIn()} />
    </div>
  )
}

export default Signin