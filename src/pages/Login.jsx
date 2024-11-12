import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Attempt login, check if successful
    if (login(username, password)) {
      navigate("/"); // Redirect to events page
    } else {
      setError("Invalid username or password"); // Show error message
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Form className="p-4 border rounded shadow-sm bg-light" onSubmit={(e) => e.preventDefault()}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin} className="w-100">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;