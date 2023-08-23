import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "../Context/ThemeContext";
import { auth } from "../FirebaseConfig";
import { styled } from "styled-components";
import EmailIcon from "@mui/icons-material/Email";
import { toast } from "react-toastify";

const SignUp = ({ handleClose }) => {
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [confirmPassword, setConfirmPassword] = useState();

  let { theme } = useThemeContext();

  function handleSubmit() {
    if (!email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast.warn("Passwords didnt match", {
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
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        toast.warn("Account created", {
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
        toast.error("Not able to create account", {
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
    <SignUpDiv>
      <Box
        p={3}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1.2rem",
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
            className="textField"
            InputLabelProps={{
              style: { color: theme.correct },
            }}
            inputProps={{
              style: { color: theme.correct },
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "5rem",
              bottom: "20rem",
            }}
          >
            <EmailIcon />
          </div>
        </div>

        <CssTextField
          id="custom-css-outlined-input"
          variant="standard"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="textField"
          InputLabelProps={{
            style: { color: theme.correct },
          }}
          inputProps={{
            style: { color: theme.correct },
          }}
        />

        <CssTextField
          id="custom-css-outlined-input"
          variant="standard"
          type="text"
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="textField"
          InputLabelProps={{
            style: { color: theme.correct },
          }}
          inputProps={{
            style: { color: theme.correct },
          }}
        />

        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          style={{
            backgroundColor: theme.timer,
            color: theme.background,
            alignSelf: "flex-start",
            padding: "0.3rem 0.8rem",
            marginLeft: "0.5rem",
          }}
        >
          SignUp
        </Button>
      </Box>
    </SignUpDiv>
  );
};

export default SignUp;

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

let SignUpDiv = styled.div`
  width: 100%;

  .textField {
    width: 100%;
  }
`;
