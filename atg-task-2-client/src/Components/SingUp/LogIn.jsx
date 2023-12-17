import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: "",
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
      .post("http://localhost:3001/login", formData)
      .then((result) => {
        console.log(result);
        navigate("/home");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message); // Set error message from server response
        } else {
          setError("Something went wrong. Please try again."); // Generic error message
        }
      });

    // Reset the form after submission
    setFormData({ username: "", password: "" });
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}{" "}
      {/* Display error message */}
      <Form onSubmit={handleSubmit}>
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

        <Button variant="primary" type="submit">
          Login
        </Button>

        <Form.Text className="text-muted mt-2">
          New?{" "}
          <Link to={"/register"} className="text-primary">
            SignUp
          </Link>
        </Form.Text>
      </Form>
    </div>
  );
};

export default LogIn;
