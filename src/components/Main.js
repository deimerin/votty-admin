import * as React from "react";
//import Title from "./Title";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import logo from "../assets/3.png";

export default function Main() {
  return (
    <React.Fragment>
      {/* <Title>Inicio</Title> */}
      <Grid container spacing={2}>
        <Grid item xs></Grid>
        <Grid item xs={8}>
          <img src={logo} height={270} alt='app-logo' />

          <Typography variant="body1" gutterBottom>
          Bienvenido al módulo de gestión y conteo de Votty. En este módulo podrá realizar las siguientes funciones:
          </Typography>

          <List>
            <ListItem>Definir la lista de votantes autorizados</ListItem>
            <ListItem>Definir la lista de candidatos elegibles</ListItem>
            <ListItem>Realizar el conteo de votos</ListItem>
          </List>

        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </React.Fragment>
  );
}
