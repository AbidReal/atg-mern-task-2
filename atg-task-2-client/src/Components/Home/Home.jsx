import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3001/home")
      .then((result) => {
        // console.log(result);
        const responseData = result.data;
        if (responseData.message === "Success") {
          setUsername(responseData.username); // Access username directly
        } else {
          console.log("User not authenticated");
          // Redirect or handle non-authenticated user
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle errors here
      });
  }, []);

  return (
    <div>
      Welcome home <span className="text-primary">{username}!</span>{" "}
    </div>
  );
};

export default Home;
