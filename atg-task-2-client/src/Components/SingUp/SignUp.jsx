import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", formData)
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message); // Set error message from server response
        } else {
          setError("Something went wrong. Please try again."); // Generic error message
        }
      });

    // Reset the form after submission
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <div className="d-flex flex-column mt-4 gap-2">
        <Button variant="primary" type="submit">
          Sign Up
        </Button>

        <Form.Text className="text-muted ">
          Already have an account?{" "}
          <Link className="text-primary" to={"/login"}>
            Login
          </Link>
        </Form.Text>
      </div>
    </Form>
  );
};

export default SignUp;
