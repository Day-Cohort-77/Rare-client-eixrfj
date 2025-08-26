import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavBar } from "./components/nav/NavBar";
import { Login } from "./components/auth/Login";
import { Welcome } from "./components/welcome/Welcome";
import { PostsList } from "./components/postsList/PostsList";
import { CategoryList } from "./components/categoryList/CategoryList.jsx";
import { CreateNewPost } from "./components/createNewPost/CreateNewPost";


// import your route components here, e.g. Welcome, DrinksList, etc.


export const Rare = () => {
 const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
 const [loggedInUser, setLoggedInUser] = useState(null);


 const setToken = (newToken) => {
   localStorage.setItem("auth_token", newToken);
   setTokenState(newToken);
 };


 useEffect(() => {
   const fetchUser = async () => {
     if (token) {
       try {
         const res = await fetch(`http://localhost:5000/users/${token}`, {
           headers: { Authorization: `Bearer ${token}` },
         });
         if (!res.ok) throw new Error("User not found");
         const user = await res.json();
         setLoggedInUser(user);
       } catch {
         setLoggedInUser(null);
       }
     } else {
       setLoggedInUser(null);
     }
   };
   fetchUser();
 }, [token]);


 return (
   <div>
     <NavBar
       token={token}
       setToken={(newToken) => {
         setLoggedInUser(null);
         setToken(newToken);
         if (!newToken) localStorage.removeItem("auth_token");
       }}
     />
     <div>
       {!loggedInUser ? (
         <Login setToken={setToken} />
       ) : (
         <Routes>
           {/* Example routes, replace with your actual components */}
           <Route path="/" element={<Welcome />} />
           <Route path="/PostsList" element={<PostsList />} />
           <Route path="/CategoryList" element={<CategoryList />} />
           <Route path="/CreateNewPost" element={<CreateNewPost loggedInUser={loggedInUser} />} />
         </Routes>
       )}
     </div>
   </div>
 );
};
