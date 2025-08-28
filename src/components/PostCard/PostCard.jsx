import React from "react";
import "./PostCard.css";

export const PostCard = ({ post }) => (
    <div className="post-card">
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-author">
            {post.user
                ? `${post.user.first_Name} ${post.user.last_Name}`
                : ""}
        </p>
        <p className="post-card-category">
            {post.category?.label ? post.category.label : ""}
        </p>
        <p className="post-card-date">
            {post.publication_Date
                ? new Date(post.publication_Date).toLocaleDateString()
                : ""}
        </p>
        <p className="post-card-content">
            {post.content?.slice(0, 100)}{post.content && post.content.length > 100 ? "..." : ""}
        </p>
    </div>
);