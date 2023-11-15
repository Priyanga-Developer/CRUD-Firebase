import Home from './Home';
import Signin from './Signin';
import {Routes,Route} from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute";
import { MyContextProvider } from "./MyContext";

function App() {


  return (
    <div className="App" >
      <MyContextProvider>
     <Routes>
          <Route path="/" element={<Signin/>}/>
          <Route path="/Home" element={ 
            <ProtectedRoute >
                  <Home/>
          </ProtectedRoute>}/>
           
     </Routes>
     </MyContextProvider>
    </div>
  );
}

export default App;
