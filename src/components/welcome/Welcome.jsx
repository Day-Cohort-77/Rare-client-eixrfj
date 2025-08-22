import { Link } from "react-router-dom"

export const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1>Welcome to Rare Publishing</h1>
            <Link to="/CreateNewPost">
                <button className="btn-create">Create New Post</button>
            </Link>
            <Link to="/PostsList">

                <button className="btn-posts">View All Posts</button>
            </Link>
        </div>
    )
}