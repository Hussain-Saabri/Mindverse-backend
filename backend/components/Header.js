
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { GoScreenFull } from "react-icons/go";
import { BiExitFullscreen } from "react-icons/bi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { signOut,signIn } from "next-auth/react";
import Image from "next/image";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function Header()
{ 
  const imageUrl="/img/coder.png";
const{data:session,status}=useSession();
const[showLoader,setShowLoader]=useState(false);
const [isFullscreen, setIsFullscreen] = useState(false);
useEffect(() => {
  if (typeof window !== "undefined") {
    setIsFullscreen(!!document.fullscreenElement);
  }
}, []);
useEffect(() => {
  if (status === 'authenticated') {
    console.log("Name:", session.user.name);
    console.log("Email:", session.user.email);
    console.log("Image:",session.user.image);
   
  }
}, [status, session]);

const handleLogout=()=>{
  setShowLoader(true);
  toast.success('Logging Out');
  setTimeout(()=>{
      signOut({ callbackUrl: "/login" })
  },1000);

};

{/*
  
  const handleLogIn=()=>{
   toast.success('Signing In');
   signIn("google",{ callbackUrl: "/" });
   
}*/}
    return <>
    <>
    

    <header className="header flex flex-sb">
      

        <div className="logo flex gap-2 ">
                <h1>ADMIN</h1>
        
        
      { /* {status==='authenticated'?
        (<button className='bg-gray-500 text-white p-2 rounded'>User has Logged in</button>)
        :(<button>Signin</button>)}*/}
        
                <div className="headerham flex flex-center">
                    <RiBarChartHorizontalLine />
                </div>
            </div>
         <div className="rightnav flex gap-2">
                <div >
                    {isFullscreen ? <BiExitFullscreen /> : <GoScreenFull />}
                </div>

                {/* <div className="notification">
                    <img src="/img/notification.png" alt="notification" />
                </div> */}
                {(status==='authenticated')?(<button onClick={handleLogout} className="header_logout">Logout</button>):
                <>
               {/* <button onClick={() => signIn("google",{ callbackUrl: "/" })} className="header_logout">Login</button>*/}
              
                </>
                
                
                
                }
                
    {/* profile dropdown menu             */}
<div className="profilenav">

          
               {session?.user?.image ? (
            <Image
                src={session.user.image}
                width={40}
                height={40}
                alt="user"
                className="rounded-full"
              />
            ) : (
              <img src={imageUrl} alt="default user" title="Hussain" width={40} height={40} />
            )}
                
</div>

            </div>
    </header>
      
    
    </>
    </>
}







// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="fixed">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: 'block', md: 'none' } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;
