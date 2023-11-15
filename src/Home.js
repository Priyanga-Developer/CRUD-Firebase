import React,{useContext,useEffect,useState} from 'react'
import { auth } from './firebaseConfig/firebase'
import { signOut} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import MyContext from './MyContext';
import { dB } from './firebaseConfig/firebase';
import { getDocs ,collection,addDoc,deleteDoc,doc,updateDoc} from "firebase/firestore"
import { storage } from './firebaseConfig/firebase';
import { uploadBytes, ref } from "firebase/storage"
const Home = () => {
  const navigate=useNavigate();
  const {user} =useContext(MyContext);
  const [moviesList,SetMoviesList]=useState([]);

  // setnewMovie
  const [newMovieTitle,setNewMovieTitle]=useState("");
  const [newReleaseDate,setReleaseDate]=useState(0);
  const [newReceivedAward,setReceivedAward]=useState(false);
  const movieListRef= collection(dB,"movies");
  const [updateTitle,setUpdateTitle]=useState("");
  const [fileUpload,setFileUpload]=useState(null);
  const getMovielist=async()=>{ 
    try{
       const data= await getDocs(movieListRef);
       const filteredProduct=data.docs.map((doc)=>({...doc.data(),id:doc.id}))
       SetMoviesList(filteredProduct);
    }
    catch(err){
      console.log(err.message)
    }

   }
  useEffect(()=>{

    getMovielist();

  },[])//eslint-disable-line react-hooks/exhaustive-deps

  const handleSignOut= async()=>{
    try{
           await signOut(auth);
           navigate("/");
    }
    catch(err){
      console.log(err.message)
    }

  }

  const handleOnsubmitMovie= async()=>{
    try{
      await addDoc(movieListRef,{
        title:newMovieTitle,
        releaseDate:newReleaseDate,
        receivedAward:newReceivedAward,
        userId:auth?.currentUser?.uid,
      });
      getMovielist();
    }
    catch(err){
      console.log(err)
    }

  }

  const handleDeleteMovie=async(id)=>{
    try{
      const movieDoc=doc(dB,"movies",id);
      await deleteDoc(movieDoc);
      getMovielist();
    }
    catch(err){
      console.log(err.message);
    }
   }
   const handleUpdateTitle=async(id)=>{
    try{
      const movieDoc=doc(dB,"movies",id);
      await updateDoc(movieDoc,{title:updateTitle});
      getMovielist();
    }
    catch(err){
      console.log(err.message);
    }
   }
   const handleOnUploadfile= async()=>{
    if(!fileUpload) return;
    
     try{
      const fileref=ref(storage,`/projectfiles/${fileUpload.name}`);
         await uploadBytes(fileref,fileUpload);
   
     }
     catch(err){
      console.log(err.message);
     }
   }
  return (
    <div>
      <h1>Hello {user.displayName}</h1>
      <button type='button' onClick={()=>handleSignOut()}>Log Out</button>
      <div>
          <input type='text' placeholder='Movie Title...'  onChange={(e)=>setNewMovieTitle(e.target.value)}/>
          <input type='number' placeholder='Release Date...'  onChange={(e)=>setReleaseDate(Number(e.target.value))}/>
          <input type='checkbox' checked={newReceivedAward} onChange={(e)=>setReceivedAward(e.target.checked)}/>
          <label>Reeceived Award</label>
          <button type='button' onClick={()=>handleOnsubmitMovie()}>Submit Movie</button>
      </div>
      <div>
        {moviesList.map((movie)=>
        <div key={movie.id}>
          <h1 style={{color:movie.receivedAward?"green":"red"}}>{movie.title}</h1>
          <p>{movie.releaseDate}</p>
          <button type='button' onClick={()=>handleDeleteMovie(movie.id)}>Delete</button>
          <input type='text' onChange={(e)=>setUpdateTitle(e.target.value)}/>
          <button type='button' onClick={()=>handleUpdateTitle(movie.id)}>Update Title</button>
        </div>
        )}
      </div>
      <div>
        <input type='file' placeholder='upload files' onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button type='button' onClick={()=>handleOnUploadfile()}>Upload Files</button>
      </div>
    </div>
  )
}

export default Home