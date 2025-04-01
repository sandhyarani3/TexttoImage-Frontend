import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import {motion} from "framer-motion"
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';
const Results = () => {
  const [image,setImage]=useState(assets.sample_img_1);
  const [isImageLoaded,setisimageLoaded]=useState(false );
  const [isLoading,setisLoading]=useState(false);
  const [input,setInput]=useState('');
  const {generateImage,user,setShowLogin}=useContext(AppContext)
  const onSubmitHandler=async(e)=>{
     e.preventDefault();
     if(!user){
      setShowLogin(true);
      return
    }
     setisLoading(true);
     try {
      if(input){
        const image=await generateImage(input);
        if(image){
         setisimageLoaded(true);
         setImage(image)
        }
      }
      setisLoading(false)
     } catch (error) {
        toast.error(error.message)
     }
     setInput('')
  }

  return (
    <motion.form 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='flex flex-col min-h-[90vh] justify-center items-center' onSubmit={onSubmitHandler}>
    <div>
      <div className='relative'>
        <img src={image} alt="" className='max-w-sm rounded' />
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500
        ${isLoading ? 'w-full transition-all duration-[10s]':'w-0'}`}/>
      </div>
      <p className={!isLoading ? 'hidden' :'w-full mx-auto px-8 sm:px-0'}>Loading.....</p>
    </div>
    {!isImageLoaded && <div className='flex w-full max-w-xl bg-neutral-500
    text-white text-sm p-0.5 mt-10 rounded-full'>
      <input onChange={(e)=>setInput(e.target.value)} value={input}
      type="text" placeholder='Describe what you want to generate'
      className='flex-1 bg-transparent outline-none ml-8
      max-sm:w-20 placeholder-color' />
      <button type="submit"
      className='bg-zinc-900 px-10 sm:px-16 py-3
      rounded-full'>Generate</button>
    </div>}
    {isImageLoaded && <div className='flex gap-2 flex-wrap justify-center text-white
    text-sm p-0.5 mt-10 rounded-full'>   
      <p onClick={()=>setisimageLoaded(false)}
      className='bg-transparent border border-zinc-900
      text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a href={image} download className='bg-zinc-900 px-10 py-3
      rounded-full cursor-pointer'>Download</a>
    </div>}
  
    
    </motion.form>
  )
}

export default Results
