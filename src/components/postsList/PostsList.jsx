import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostsList.css";

export const PostsList = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="posts-list">
      <div className="posts-header-row">
        <input
          className="posts-search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="add-post-btn"
          title="Add Post"
          onClick={() => navigate("/CreateNewPost")}
        >
          Add Post <span className="plus-sign">+</span>
        </button>
      </div>
      <table className="posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Category</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>
                <span
                  style={{ cursor: "pointer", color: "#034300", textDecoration: "underline" }}
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  {post.title}
                </span>
              </td>
              <td>{post.user_id}</td>
              <td>{post.publication_date}</td>
              <td>{post.category_id}</td>
              <td>{/* Tags placeholder */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
