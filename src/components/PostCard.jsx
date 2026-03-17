import React from "react";
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id , title , featuredImage}){
    console.log("PostCard - featuredImage:", featuredImage);
    const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : "";
    console.log("PostCard - imageUrl:", imageUrl);
    
    return(
       <Link to={`/post/${$id}`}>
         <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-full h-56 mb-0 overflow-hidden relative group">
            {imageUrl ? (
                <img src={imageUrl} alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"></img>
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-5">
                <h2 className="text-lg font-bold text-gray-800 hover:text-amber-600 transition-colors line-clamp-2">{title}</h2>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                    <span className="text-amber-600 font-medium">Read more →</span>
                </div>
            </div>

         </div>
       </Link>
    )
}


export default PostCard
