import React , {useState, useEffect} from "react";
import appwriteService from '../../appwrite/config'
import {PostCard ,Container} from '../../components'

export default function AllPost(){
    const [post , setPosts]= useState([])
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
    
    if (post.length === 0) {
        return (
            <div className="w-full py-24 text-center bg-gray-50 min-h-screen">
                <Container>
                    <p className="text-gray-500 text-lg">No posts found. Create your first post!</p>
                </Container>
            </div>
        )
    }
    
    return(
        <div className="w-full py-12 bg-gray-50 min-h-screen">
           <Container>
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {post.map((post) => (
                    <div key = {post.$id} className="w-full">
                        <PostCard {...post}/>
                    </div>
                ))}

            </div>
           </Container>
        </div>
    )
}
