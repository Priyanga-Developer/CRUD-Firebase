import {useContext} from 'react'
import MyContext from './MyContext';
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user} =useContext(MyContext);
    
    if(!user){
       return <Navigate to="/"/>
    }

  
  return children;
}

export default ProtectedRoute