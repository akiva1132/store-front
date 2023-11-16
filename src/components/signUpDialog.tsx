import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./signInDialog.css";
import { useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { URL } from "../config";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handleClickOpenSignIn: () => void;
}
interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default function SignUp(props: SimpleDialogProps) {
  const authContext = React.useContext(AuthContext);
  const setIsAuthenticated = authContext?.setIsAuthenticated;
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const { onClose, selectedValue, open } = props;
  const [massageError, setMassageError] = useState<string | null>(null)
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.email) return;
    fetch(`${URL}/users/signUp`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          setMassageError(errorText)
          throw new Error(
            `HTTP error! Status: ${res.status}, Error: ${errorText}`
          );
        }
        return res.json();
      })
      .then((data) => {
        const userObject = {
          email: user.email,
          token: data.token,
          id: data.id,
        };
        localStorage.setItem("user", JSON.stringify(userObject)),
        console.log(userObject);
        setIsAuthenticated && setIsAuthenticated(userObject);
        handleClose();
      })
      .catch((error) => {console.log("Error:", error.message), setMassageError(() => {return error.message})})


  };

  const defaultTheme = createTheme();

  const handleClickSignIn = () => {
    handleClose();
    props.handleClickOpenSignIn();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={user?.firstName}
                    onChange={(e) =>
                      setUser({ ...user, ["firstName"]: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={user?.lastName}
                    onChange={(e) =>
                      setUser({ ...user, ["lastName"]: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={user?.email}
                    onChange={(e) =>
                      setUser({ ...user, ["email"]: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={user?.password}
                    onChange={(e) =>
                      setUser({ ...user, ["password"]: e.target.value })
                    }
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {massageError && (<div>{massageError}</div>)}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <p id="BeyondSign" onClick={handleClickSignIn}>
                    {"Already have an account? Sign in"}
                  </p>
                </Grid>
              </Grid>
              <br />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Dialog>
  );
}
