import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewPostService } from "../../managers/CreateNewPostManager";
import { getCategories } from "../../managers/GeneralManager";


export const CreateNewPost = ({ loggedInUser }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [availableCategories, setAvailableCategories] = useState([]);


    useEffect(() => {
        getCategories().then(setAvailableCategories);
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = {
            Title: title,
            Content: content,
            Category_Id: categoryId,
            Publication_Date: new Date().toISOString(),
            Image_Url: imageUrl,
            User_Id: loggedInUser?.id // automatically assign user ID
        };
        try {
            const createdPost = await CreateNewPostService(newPost);
            alert("New Post Created! Huzzah!");
            navigate(`/posts/${createdPost.id}`);
        } catch (error) {
            console.error("Error creating post u stinker", error);
            alert("Failed to create new post");
        }
    };


    return (
        <div className="create-post-container">
            <h2>Create New Post</h2>
            <form
                onSubmit={handleSubmit}
                onKeyDown={(event) => {
                    if (event.key === "Enter") event.preventDefault();
                }}
            >
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    autoFocus
                />
                <input
                    type="textarea"
                    placeholder="Type Content Here"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    required
                />
                <select
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    required
                >
                    <option value={""}>Select Category</option>
                    {availableCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.label}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Header Image URL (optional)"
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                />
                <button
                    type="submit"
                    className="submit-button"
                >Submit Post</button>
            </form>
        </div>
    );
}
