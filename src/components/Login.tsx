import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import Carlist from './Carlist';

type User = {
    username: string;
    password: string;
}
function Login() {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    });
    const [isAuthenticated, setAuth] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleLogin = () => {
        if (!user.username || !user.password) {
            setOpen(true);  // 打开 Snackbar 显示错误信息
            return;
        }
        console.log("User attempting to login: ", user);  // 打印用户输入的用户名和密码
        axios.post(import.meta.env.VITE_API_URL + "/login", user, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("Login response: ", res);  // 打印后端的响应
                const jwtToken = res.headers.authorization;
                if (jwtToken !== null) {
                    console.log("JWT Token: ", jwtToken);  // 打印收到的JWT token
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                }
            })
            //.catch(() => setOpen(true));
            .catch(err => {
                console.error("Login failed: ", err);  // 捕获并打印错误信息
                setOpen(true);
            });
    }

    const handleLogout = () => {
        setAuth(false);
        sessionStorage.setItem("jwt", "");
    }

    if (isAuthenticated) {
        return <Carlist logOut={handleLogout} />;
    }
    else {
        return (
            <Stack spacing={2} alignItems="center" mt={2}>
                <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange} />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleLogin}>
                    Login
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Login failed: Check your username and password"
                />
            </Stack>
        );
    }
}

export default Login;