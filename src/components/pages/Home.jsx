import React  , {useEffect,  useState} from "react";
import appwriteService from '../../appwrite/config'
import {Container , PostCard} from '../../components'

export default function Home(){
        const [post , setPosts]= useState([])
        useEffect(()=>{
            appwriteService.getPosts().then((posts)=>{
                if(posts){
                    setPosts(posts.documents)
                }
            })
        }, [])
         if (post.length === 0) {
        return (
            <div className="w-full py-24 text-center bg-gradient-to-b from-gray-50 to-white min-h-screen">
                <Container>
                    <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
                        <div className="bg-amber-100 p-6 rounded-full mb-6">
                            <svg className="w-16 h-16 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                            Welcome to MegaBlog
                        </h1>
                        <p className="text-gray-500 text-lg mb-8">
                            Start your blogging journey! Login to read and create amazing posts.
                        </p>
                        <div className="flex gap-4">
                            <a href="/login" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                                Login
                            </a>
                            <a href="/signup" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors">
                                Sign Up
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
      return (
        <div className='w-full py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen'>
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Latest Posts</h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Discover the most recent articles and stories from our community</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {post.map((post) => (
                        <div key={post.$id} className='w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}
