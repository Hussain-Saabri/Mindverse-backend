"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const defaultAvatar = "/img/coder.png";

function Header({ onToggleSidebar }) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
   const handleToggle = () => {
    console.log("clicked on menu");
   onToggleSidebar();
    
  };
  const handleLogout = () => {
    signOut();
    handleCloseUserMenu();
  };

  return (
  <AppBar
  position="fixed"
  elevation={0}
  sx={{
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottom: "2px solid rgba(95,34,219,0.15)",
    boxShadow: "0 8px 25px rgba(95,34,219,0.2)",
    zIndex: 2000,
    height: "70px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <Container maxWidth="xl">
    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
      {/* Left Side → Menu + Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Hamburger */}
        <IconButton
          onClick={handleToggle}
          sx={{
            width: 44,
            height: 44,
            background: "linear-gradient(135deg, #5f22db, #9b64e3)", // sidebar gradient
            color: "#fff",
            borderRadius: "14px",
            mr: 1,
            "&:hover": {
              transform: "scale(1.08) rotate(-2deg)",
              boxShadow: "0 6px 15px rgba(95,34,219,0.4)",
            },
            transition: "0.3s",
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{
            fontWeight: 900,
            fontSize: "1.6rem",
            background: "linear-gradient(90deg,#5f22db,#9b64e3)", // same gradient as sidebar
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              left: 0,
              bottom: -6,
              width: "100%",
              height: "3px",
              borderRadius: "4px",
              background: "linear-gradient(90deg,#f23434,#9333ea)",
              transform: "scaleX(0)",
              transformOrigin: "right",
              transition: "transform 0.4s ease",
            },
            "&:hover::after": {
              transform: "scaleX(1)",
              transformOrigin: "left",
            },
          }}
        >
          Mindverse
        </Typography>
      </Box>

      {/* Right Side */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {isLoggedIn ? (
          <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Box
                  component="img"
                  src={session.user?.image || defaultAvatar}
                  alt="user avatar"
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "3px solid transparent",
                    background:
                      "linear-gradient(white, white) padding-box, linear-gradient(135deg,#5f22db,#9b64e3) border-box",
                    boxShadow: "0 4px 12px rgba(95,34,219,0.25)",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: "0 6px 20px rgba(95,34,219,0.35)",
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "Logout" ? handleLogout : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => signIn("google", { redirect: false })}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              px: 3,
              py: 1.2,
              fontSize: "0.95rem",
              fontWeight: 600,
              background: "linear-gradient(90deg,#5f22db,#9b64e3)", // same as sidebar
              boxShadow: "0 4px 15px rgba(95,34,219,0.35)",
              "&:hover": {
                background: "linear-gradient(90deg,#4c1dbb,#7a3edb)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(95,34,219,0.45)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Login with Google
          </Button>
        )}
      </Box>
    </Toolbar>
  </Container>
</AppBar>

  );
}
export default Header;
