import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [username, setUsername] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/home", { withCredentials: true })
      .then((result) => {
        const responseData = result.data;
        if (responseData.message === "Success") {
          setUsername(responseData.username);
        } else {
          console.log("User not authenticated");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://localhost:3001/posts")
      .then((response) => {
        setPosts(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPost = () => {
    axios
      .post("http://localhost:3001/posts", newPost, { withCredentials: true })
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: "", content: "" });
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  return (
    <div>
      Welcome home <span className="text-primary">{username}!</span>
      <div>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter title"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="Enter content"
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
        ></textarea>
        <button className="btn btn-primary" onClick={handleAddPost}>
          Add Post
        </button>
      </div>
      <hr />
      <div>
        {posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <div className="card-header">
              Posted by: {post.username} {/* Displaying the username */}
            </div>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>
              {/* Add buttons for Like, Comment, Update, and Delete */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
