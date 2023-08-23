import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "../Context/ThemeContext";
import { auth } from "../FirebaseConfig";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";

const Login = ({ handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let { theme } = useThemeContext();

  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  function handleSubmit() {
    if (!email || !password) {
      toast.warn("All fields are mandatory", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
      });
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
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

        handleClose();
      })
      .catch((err) => {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "Dark",
        });
      });
  }

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2rem",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <CssTextField
          id="custom-css-outlined-input"
          variant="standard"
          type="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
          }}
          InputLabelProps={{
            style: { color: theme.textColor },
          }}
          inputProps={{
            style: { color: theme.correct },
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "5rem",
            bottom: "17rem",
          }}
        >
          <EmailIcon />
        </div>
      </div>

      <div
        style={{
          width: "100%",
        }}
      >
        <CssTextField
          id="custom-css-outlined-input"
          variant="standard"
          type={showPassword ? "text" : "password"}
          label="Password"
          style={{
            width: "100%",
          }}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            style: { color: theme.textColor },
          }}
          inputProps={{
            style: { color: theme.correct },
          }}
        />
        <div
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          style={{
            position: "absolute",
            right: "5rem",
            bottom: "12rem",
          }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>

      <Button
        variant="contained"
        size="medium"
        onClick={handleSubmit}
        style={{
          backgroundColor: theme.timer,
          color: theme.background,
          alignSelf: "flex-start",
          padding: "0.3rem 0.8rem",
          marginLeft: "0.5rem",
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: `${({ theme }) => theme.timer}`,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: `white`,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: `${({ theme }) => theme.timer}`,
    },
    "&:hover fieldset": {
      borderColor: `${({ theme }) => theme.timer}`,
    },
    "&.Mui-focused fieldset": {
      borderColor: `${({ theme }) => theme.timer}`,
    },
  },
});
