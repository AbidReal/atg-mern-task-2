/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission, you can perform actions like authentication here
    console.log("Login form submitted with data:", formData);
    // Reset the form after submission (optional)
    setFormData({ email: "", password: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <Button variant="primary" type="submit">
        Login
      </Button>

      <Form.Text className="text-muted mt-2">
        New?{" "}
        <Link
          to={"/register"}
          className="text-primary"
          style={{ cursor: "pointer" }}
        >
          SignUp
        </Link>
      </Form.Text>
    </Form>
  );
};

export default LogIn;
