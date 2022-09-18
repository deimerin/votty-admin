import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Image from 'mui-image'
import logo from '../assets/1.png'

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import JSEncrypt from 'jsencrypt';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Votty App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {

  // RSA TEST

  const publicKey = process.env.REACT_APP_FIREBASE_PUBLIC_KEY;
  const privateKey = process.env.REACT_APP_FIREBASE_PRIVATE_KEY;

    const encrypt = new JSEncrypt();

    encrypt.setPublicKey(publicKey);
    const encrypted = encrypt.encrypt('hello');

    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);

    const uncrypted = decrypt.decrypt(encrypted);
    console.log(uncrypted)





  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { signIn } = UserAuth()
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('')

    try{
      await signIn(email, password);
      navigate('/main')

    } catch(e){
      setError(e.message)
      console.log(e.message)
      console.log(process.env.REACT_APP_FIREBASE_PRIVATE_KEY)
    }

    console.log(email, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/1600x900/?democracy)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image src={logo} width={300}/>

            <Typography component="h1" variant="h5">
              Sistema de Gestion y Conteo
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => { setEmail(e.target.value) }}
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
                onChange={(e) => { setPassword(e.target.value) }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
