import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box
} from '@mui/material';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const token = 'mockToken123'; // Replace with actual token logic if available
        dispatch(login({ email, token })); // Dispatch login action
        navigate('/');
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
        >
            <Box display="flex" justifyContent="center" marginBottom={2}>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/tcs_logo_new_black.png`}
                    alt="TCS Logo"
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            </Box>
            <Box width="400px">
                <Card sx={{ boxShadow: 2,backgroundColor: '#f9f9f9' }}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            align="center"
                            gutterBottom
                        >
                            Credit Application Generator
                        </Typography>
                        <form
                            onSubmit={handleLogin}
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Login;