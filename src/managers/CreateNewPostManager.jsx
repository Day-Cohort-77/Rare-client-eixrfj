export const CreateNewPostService = (newPost) => {
    return fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost)
    }).then(res => res.json());
}
