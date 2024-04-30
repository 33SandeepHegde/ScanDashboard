import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import React ,{memo} from 'react'
import { CameraAlt } from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponent'
import { useFileHandler, useInputValidation } from '6pp'
import { usernamevalidator } from '../utils/validator,js'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Navigate, Outlet } from 'react-router-dom'
const Login = (props) => {
    // const [isLogin, setIsLogin] = useState(true);
    const navigate=useNavigate();
    const username = useInputValidation("", usernamevalidator);
    const password = useInputValidation("");
    
    const header={
        'Content-Type': 'application/json',
    }

    const handleLogin =async (e)=>{
        e.preventDefault();
        // alert("Login");
        
        const authenticat_enpoint='http://54.218.64.114:90/ecgapi/authenticate';
        try{
        const result= await axios.post(authenticat_enpoint,JSON.stringify({username:username.value,password:password.value}),{ headers: header });
        // console.log("Login results",result.data);
        // console.log(result.data.data.IsSuccess);

        if(result.data.IsSuccess){
            localStorage.setItem("isUser",true);
            localStorage.setItem("token",result.data.Response);
            props.handler(true);
            navigate("/");
           
            toast.success("Login succesfull")
        }else{
            // alert("No user found !. Try Again");
            toast.error("User Not Found !",result.data);
            props.handler(false);
        }

        }catch(err){
            console.log("User Authentication error",err);
            toast.error("error occured")
            props.handler(false);
        }
        

    }

    return (
        <div style={{backgroundImage:"linear-gradient(rgba(200, 200, 200, 0.5), #2d85ad)"}}  >

            <Container component={"main"} maxWidth="xs" sx={{ height: "100vh", display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                
                        <>
                            <Typography variant='h5'>Login</Typography>
                            <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleLogin}>
                                <TextField
                                    required
                                    fullWidth
                                    label='username'
                                    margin='normal'
                                    variant='outlined'
                                    value={username.value}
                                    onChange={username.changeHandler}
                                />
                                {
                            username.error && (
                                <Typography color={"error"} variant='caption'>{username.error}</Typography>
                            )
                        }
                                <TextField
                                    required
                                    fullWidth
                                    label='password'
                                    type='password'
                                    margin='normal'
                                    variant='outlined'
                                    value={password.value}
                                    onChange={password.changeHandler}

                                />
                                <Button
                                    sx={{
                                        marginTop: "1rem",
                                    }}
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                    fullWidth

                                >Login</Button>
                            </form>
                        </>
                </Paper>

            </Container >
        </div>)



}

export default memo(Login);