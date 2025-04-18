import React, {useEffect, useState} from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
} from "reactstrap";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {currentUser, login} = useAuth();
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("")
            await login(email, password);
        } catch {
            setError("Failed to log in")
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{height: "90vh"}}
        >
            <Col md="6" lg="4">
                <div className="login-card">
                    <h2 className="text-center mb-4">Welcome Back</h2>
                    {error && <Alert color={"danger"}>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <Button color="primary" type="submit" block>
                            Login
                        </Button>
                    </Form>
                </div>
            </Col>
        </div>
    );
};

export default Login;
