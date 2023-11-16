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
import { AuthContext } from "../Context/AuthContext";

export interface SignInDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handleClickOpenSignUp: () => void;
}

export default function SignIn(props: SignInDialogProps) {
  const { onClose, open } = props;
  const authContext = React.useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated;
  const setIsAuthenticated = authContext?.setIsAuthenticated;

  const handleClose = () => {
    onClose("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    fetch("http://127.0.0.1:3009/users/logIn", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
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
        console.log(userObject);
        localStorage.setItem("user", JSON.stringify(userObject)),
          setIsAuthenticated ? userObject : null;
      })
      .catch((error) => console.error("Error:", error));
    handleClose();
  };

  const defaultTheme = createTheme();

  const handleClickSignUp = () => {
    handleClose();
    props.handleClickOpenSignUp();
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <p id="BeyondSign" onClick={handleClickSignUp}>
                    {"Don't have an account? Sign Up"}
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
