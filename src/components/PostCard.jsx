import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/10
                      transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
        
        <div className="w-full aspect-video mb-4 overflow-hidden rounded-xl bg-black/40">
          {featuredImage ? (
            <img 
              src={appwriteService.getFilePreview(featuredImage)} 
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40">
              No Image
            </div>
          )}
        </div>
        
        <h2 className="text-lg font-bold text-white/80 group-hover:text-white text-center truncate w-full transition-colors duration-200">
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard
