import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
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
      .post("http://localhost:3001/forgot-password", formData)
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      });

    // Reset the form after submission
    setFormData({ username: "", password: "" });
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}{" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Enter email to reset password</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="d-flex flex-column mt-4 gap-3">
          <Button variant="primary" type="submit">
            Send Mail
          </Button>

          <Form.Text className="text-muted">
            New?{" "}
            <Link to={"/register"} className="text-primary">
              SignUp
            </Link>
          </Form.Text>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
