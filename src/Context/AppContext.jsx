import React,{createContext,useEffect,useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../data/api_path";
import { useNavigate } from "react-router-dom";
export const AppContext=createContext()
const AppContextProvider=(props)=>{
    const[user,setUser]=useState(null);
    const [showLogin,setShowLogin]=useState(false);
    const [token,setToken]=useState(localStorage.getItem('token'))
    const [credit,setCredit]=useState(false)
    // const BackendURL=import.meta.env.VITE_BACKEND_URL
    const BackendURL=VITE_BACKEND_URL

    const navigate=useNavigate()

    const loadCreditsData=async()=>{
        try {
            const {data}=await axios.get(BackendURL+'/api/user/credits',{headers:{token}})
            if(data.success){
                setCredit(data.credits)
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
         loadCreditsData()
         return data.resultImage
       }
       else{
        toast.error(data.message);
        loadCreditsData()
        if(data.creditBalance===0){
            navigate('/credit')
        }
       }
     } catch (error) {
        toast.error(error.message);
     }
    }
    useEffect(()=>{
        if(token){
           loadCreditsData()
        }
     },[token])
    const logout=()=>{
        localStorage.removeItem('token');
        setToken("");
        setUser(null);
    }
    const value={
        user,
        setUser,showLogin,setShowLogin,BackendURL,token,setToken,loadCreditsData,logout,generateImage,credit,setCredit
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider