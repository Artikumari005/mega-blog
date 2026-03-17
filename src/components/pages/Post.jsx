import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 bg-gray-50 min-h-screen">
            <Container>
                {/* Featured Image */}
                <div className="w-full max-w-4xl mx-auto mb-8 relative">
                    <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-1">
                        {post.featuredImage ? (
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full max-h-96 object-cover"
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl">
                                <span className="text-gray-400">No Image Available</span>
                            </div>
                        )}
                    </div>

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 shadow-lg">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="shadow-lg">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post Content */}
                <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="mb-6 border-b pb-4">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm">
                            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
                                {post.status || 'Published'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-amber-600 hover:prose-a:text-amber-700">
                        {parse(post.content)}
                    </div>
                </div>

                {/* Back to Home Link */}
                <div className="w-full max-w-4xl mx-auto mt-6 text-center">
                    <Link to="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
                        ← Back to all posts
                    </Link>
                </div>
            </Container>
        </div>
    ) : null;
}