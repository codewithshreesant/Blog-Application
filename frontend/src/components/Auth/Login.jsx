import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Alert, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../features/users/user';
import { saveUser } from '../../slice/user/UserSlice';

function Login() {
    let [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const [loginUser, { error, isLoading }] = useLoginUserMutation();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('error'); 

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;

        try {
            const response = await loginUser({ email, password });
            if (response?.error) {
                setSnackbarMessage(response?.error?.data?.message || 'Login failed.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else if (response?.data?.statusCode === 200) {
                setSnackbarMessage('Login Successful!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                dispatch(saveUser(response.data.data));
                setLoginData({ email: '', password: '' });
            }
        } catch (err) {
            setSnackbarMessage('An unexpected error occurred.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            console.error('Error occurred during login:', err);
        }
    };
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div className='h-[90vh] flex flex-col justify-center items-center'>
            <h1 className="text-2xl font-bold text-center text-gray-800 md:text-5xl lg:text-3xl mt-5 mb-10 p-3 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg shadow-lg">
                Welcome back
            </h1>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className='h-[50vh]'
            >
                <div className='flex flex-col gap-[1rem]'>
                    <TextField
                        id="email"
                        label="email"
                        type="email"
                        name="email"
                        value={loginData.email}
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="password"
                        type="password"
                        value={loginData.password}
                        variant="standard"
                        onChange={handleChange}
                    />
                </div>
                <div className='flex justify-center'>
                    <Button variant='contained' color='secondary' type='submit' className='text-center'>Login</Button>
                </div>
            </Box>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;