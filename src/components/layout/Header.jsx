
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useState , lazy, memo, useEffect} from 'react'
import { orange } from '../../constants/color'
import { Notifications as NotificationsIcon,Logout as LogoutIcon, Group as GroupIcon, Add as AddIcon, Menu as MenuIcon, Search as SearchTcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
// const SearchDiaglog= lazy(() => import("../specific/Search"));
import { jwtDecode } from 'jwt-decode';
import { Suspense } from 'react'
import toast from 'react-hot-toast'
const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSearch, setIsSearch]=useState(false);
    const [nameUser,setNameUser]=useState('');
    const navigate = useNavigate();

     useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const decodedToken = jwtDecode(token);
            const username = decodedToken.username;
            setNameUser(username);   
        }
     },[])    
    const handleMobile = () => {
       setIsMobile(prev=>!prev);
    }
    const openSearch = () => {
        // e.preventDefault();
        setIsSearch(prev=>!prev);
        alert("HI");
    }
    const logoutHandler = () => {
        // alert("Logout");
        localStorage.clear();
        toast.success('Logged out')
        navigate('/login');
    }
    
    return (
        <Box sx={{ flowGlow: 1 }} height={"4rem"}>
            <AppBar
                position='static' sx={{
                    // bgcolor: orange ,
                   backgroundImage:"linear-gradient(#2d85ad, #0b5070)",
                   backdropFilter: "blur(24px)"
                }}>

                <Toolbar>
                    <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>Scan Dashboard</Typography>  
                    
                    <Box
                        sx={{ display: { xs: "block", sm: "none" } }}
                    >
                       
                        <IconButton color='inherit' onClick={handleMobile}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        flexGrow: 1
                    }} />
                    <Box sx={{
                        display:'flex',
                        alignItems:'center'
                    }}>
                    <Typography variant='body1' color={"inherit"}>Welcome, {nameUser&&nameUser}</Typography>
                        {/* <IconBtn
                            title={"Search"}
                            icon={<SearchTcon />}
                            onClick={openSearch}
                        />   */}
                        <IconBtn
                            title={"Logout"}
                            icon={<LogoutIcon />}
                            onClick={logoutHandler}
                        />
                        {/* {
                            isSearch &&  <Suspense fallback={<Backdrop open/>}><SearchDiaglog/></Suspense>
                        } */}
                        

                    </Box>
                </Toolbar>
            </AppBar>

        </Box>
    )
}

const IconBtn = ({ title, icon, onClick }) => {
    return (
        <Tooltip title={title}> 
            <IconButton color='inherit' size='large' onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    )

}

export default Header;