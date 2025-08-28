import React, { useEffect, useState } from "react";
import { getCategories } from "../../managers/GeneralManager";
import { PostCard } from "../PostCard/PostCard";
import { Link } from "react-router-dom";
import "./PostsList.css";

export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts?expand=user")
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => {
        setPosts([]);
        console.error("Fetch error:", err);
      });
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    let filtered = posts;
    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (post) => post.category_Id === parseInt(selectedCategory)
      );
    }
    if (search.trim() !== "") {
      filtered = filtered.filter((post) =>
        post.title ? post.title.toLowerCase().includes(search.toLowerCase()) : false
      );
    }
    setFilteredPosts(filtered);
  }, [posts, selectedCategory, search]);

  return (
    <div className="posts-list-container">
      <h2 className="posts-list-title">Posts List</h2>
      <div className="filter-controls" style={{ marginBottom: "1rem" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label || category.category}
            </option>
          ))}
        </select>
        <input
          className="posts-search"
          type="text"
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: "1rem" }}
        />
        <button
          type="button"
          onClick={() => {
            setSelectedCategory("");
            setSearch("");
          }}
          style={{ marginLeft: "1rem" }}
        >
          Clear Filter
        </button>
        <Link to="/CreateNewPost">
          <button className="add-post-btn" style={{ marginLeft: "1rem" }}>
            Add Post <span className="plus-sign">+</span>
          </button>
        </Link>
      </div>
      <div className="posts-list">
        {filteredPosts.map((post) => (
          <Link to={`/posts/${post.id}`} className="post-link" key={post.id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};
