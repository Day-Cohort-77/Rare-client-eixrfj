export const loginUser = (user) => {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  }).then(res => res.json())
}

export const registerUser = (newUser) => {
  return fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newUser)
  }).then(res => res.json())
}
