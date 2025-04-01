import React,{createContext,useEffect,useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../data/api_path";
export const AppContext=createContext()
const AppContextProvider=(props)=>{
    const[user,setUser]=useState(null);
    const [showLogin,setShowLogin]=useState(false);
    const [token,setToken]=useState(localStorage.getItem('token'))
    // const BackendURL=import.meta.env.VITE_BACKEND_URL
    const BackendURL=VITE_BACKEND_URL

    const userData=async()=>{
        try {
            const {data}=await axios.get(BackendURL+'/api/user/credits',{headers:{token}})
            if(data.success){
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const generateImage=async(prompt)=>{
     try {
       const{data} =await axios.post(BackendURL+'/api/image/generate-image',{prompt},{headers:{token}})
       if(data.success){
         return data.resultImage
       }
       else{
        toast.error(data.message);
       }
     } catch (error) {
        toast.error(error.message);
     }
    }
    const logout=()=>{
        localStorage.removeItem('token');
        setToken("");
        setUser(null);
    }
    useEffect(()=>{
       if(token){
          userData()
       }
    },[token])
    const value={
        user,
        setUser,showLogin,setShowLogin,BackendURL,token,setToken,userData,logout,generateImage
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider