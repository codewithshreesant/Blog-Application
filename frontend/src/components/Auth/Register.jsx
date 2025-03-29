import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useCreateUserMutation } from '../../features/users/user';
import { saveUser } from '../../slice/user/UserSlice';

function Register() {
    let [registerData, setRegisterData] = React.useState(
        {
            username: '',
            email: '',
            password: ''
        }
    )

    const dispatch = useDispatch();

    const [ createUser, { error, isLoading } ] = useCreateUserMutation();
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterData({ ...registerData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(registerData);
        const { username, email, password } = registerData;

       try {
         const response = await createUser({
             username,email,password
         });
         console.log(" register user response ", response);
         if(response?.data.statusCode === 200)
         {
             alert(" User Registered Successfully ");
             setRegisterData(
                {
                    username: '',
                    email: '',
                    password: ''
                }
             )
         }
       } catch (error) {
        console.log(" Error occured while registering user ", error.message)
       }
    }

    return (
        <div className='h-[90vh] flex flex-col justify-center items-center'>
            <h1 className="text-2xl font-bold text-center text-gray-800 md:text-5xl lg:text-3xl mt-5 mb-10 p-3 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg shadow-lg">
                Create your Account
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
                        id="username"
                        label="username"
                        name="username"
                        value={registerData.username}
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        id="email"
                        label="email"
                        type="email"
                        name="email"
                        value={registerData.email}
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="password"
                        type="password"
                        value={registerData.password}
                        variant="standard"
                        onChange={handleChange}
                    />
                </div>
                <div className='flex justify-center'><Button variant='contained' color='secondary' type='submit' className='text-center'>Signup</Button></div>
            </Box>
        </div>
    )
}

export default Register;