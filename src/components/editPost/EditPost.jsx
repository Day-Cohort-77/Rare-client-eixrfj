import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Replace with your actual service import
import { getPostDetailsById } from "../../managers/GeneralManager";
import "./EditPost.css";

export const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Fetch post details by ID
        getPostDetailsById(postId)
            .then(data => {
                if (!data || Object.keys(data).length === 0) {
                    setPost({ error: "No post found or invalid response." });
                } else {
                    setPost(data);
                }
            })
            .catch(() => setPost({ error: "Network error or server unreachable." }));
    }, [postId]);

    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:5000/posts/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        });
        navigate(`/posts/${postId}`); // Go to post details after update
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
        await fetch(`http://localhost:5000/posts/${postId}`, { method: "DELETE" });
        navigate("/PostsList"); // Go to posts list after delete
    };

    if (post === null) return <div>Loading...</div>;
    if (post.error) return <div style={{ color: 'red' }}>{post.error}</div>;

    return (
        <form onSubmit={handleSubmit} className="edit-post-form">
            <h2>Edit Post</h2>
            <input
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="Content"
                required
            />
            {/* Add more fields as needed */}
            <button type="submit">Update Post</button>
            <button
                type="button"
                className="delete-post-btn"
                onClick={handleDelete}
                style={{ background: "#d32f2f", color: "white", marginTop: "1rem" }}
            >
                Delete Post
            </button>
        </form>
    );
};