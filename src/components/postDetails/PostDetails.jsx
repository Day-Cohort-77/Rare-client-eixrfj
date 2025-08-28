import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetailsById } from "../../managers/GeneralManager"; // Adjust if needed
import "./PostDetails.css"

export const PostDetails = ({ loggedInUser }) => {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { postId } = useParams();
    const loggedIn = loggedInUser; // Or get from context/state

    useEffect(() => {
        getPostDetailsById(postId).then(setPost);
    }, [postId]);

    if (post === null) {
        return <div>Loading post details...</div>;
    }

    return (
        <div className="post-details">
            <h2>{post.title}</h2>
            <p><strong>Category:</strong> {post.category?.label}</p>
            <p><strong>Published:</strong> {new Date(post.publicationDate).toLocaleDateString()}</p>
            <p><strong>Author:</strong> {post.user?.name}</p>
            {post.imageUrl && (
                <img src={post.imageUrl} alt="Post header" className="post-image" />
            )}
            <h3>Content</h3>
            <p>{post.content}</p>
            {/* Add more fields as needed */}
            {post.user_Id === loggedIn?.id && (
                <button
                    type="button"
                    onClick={() => navigate(`/EditPost/${post.id}`)}
                >
                    Edit Post
                </button>
            )}
        </div>
    );
};