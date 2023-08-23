import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Login from "./Login";
import SignUp from "./SignUp";
import { useThemeContext } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import { auth } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Account = () => {
  let [user] = useAuthState(auth);

  let [value, setValue] = useState(0);
  let [open, setOpen] = useState(false);

  let { theme } = useThemeContext();

  let navigate = useNavigate();

  function handleModal() {
    if (user) {
      navigate("/user");
    } else {
      setOpen(true);
    }
  }

  function handleClose() {
    setOpen(false);
  }

  function handleValue(e, v) {
    setValue(v);
  }

  function handleLogout() {
    auth
      .signOut()
      .then((res) => {
        toast.success("Logged out ");
      })
      .catch((err) => {
        toast.error("not able to logout");
      });
  }

  let googleProvider = new GoogleAuthProvider();

  function handleGoogle() {
    signInWithPopup(auth, googleProvider)
      .then((rees) => {
        toast.success("Logged in succesfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "Dark",
        });
      })
      .catch((err) => {
        toast.error(
          errorMapping[err.code] || "Not able to use google account",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "Dark",
          }
        );
      });
  }

  return (
    <AccountContainer>
      <div className="profile">
        <AccountCircleIcon onClick={handleModal} className='icon'/>
        {user && <div className="userDiv">
                     <span className="user" onClick={handleModal}>{user.email}</span>
                     <LogoutIcon onClick={handleLogout} className='icon'/>  
                  </div>}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{
          border:`1px solid ${({theme})=>theme.timer},`,
          minWidth:'30vw',
          background:`linear-gradient(35deg,${({theme})=>theme.timer},${({theme})=>theme.timer})`,
          backdropFilter:'blur(10px)',
          borderRadius:'20px',
          boxShadow:`0 8px 32px 0 ${({theme})=>theme.background}`,
          padding:'0.8rem 2rem'
        }}>
          <AppBar position="static" style={{ backgroundColor: "transparent" }}>
            <Tabs value={value} onChange={handleValue} variant="fullWidth">
              <Tab label="Login" style={{ color: theme.correct }}></Tab>
              <Tab
                label="SignUp"
                style={{
                  color: theme.correct,
                }}
              ></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose} />}
          {value === 1 && <SignUp handleClose={handleClose} />}

          <Box
            style={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ marginLeft: "9.5rem", alignSelf: "center" }}>
              or
            </span>
            <GoogleButton
              onClick={handleGoogle}
              style={{
                width: "85%",
                marginTop: "1rem",
                marginLeft: "1.5rem",
              }}
            />
          </Box>
        </div>
      </Modal>
    </AccountContainer>
  );
};

export default Account;

let AccountContainer = styled.div`
    .profile{
        display: flex;
        padding-top: 0.5rem;
        .icon{
           font-size: 1.9rem;
            transition: 0.3s ease;
        }
        .icon:hover{
            color : ${({theme})=>theme.timer};
            cursor: pointer;
            font-size:2rem;
        }
        .userDiv{
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .user{
          transition: 0.3s ease;
          margin-right: 1rem;
        }
        .user:hover{
            color : ${({theme})=>theme.timer};
            cursor: pointer;
        }
    }
`