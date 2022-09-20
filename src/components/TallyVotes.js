import React, { useState } from "react";
import Title from "./Title";

// import { candDB, verfDB, ballotDB } from "../utils/FirebaseTools";
// import { getDatabase, ref, child, get } from "firebase/database";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { database } from "../utils/FirebaseTools";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import JSEncrypt from "jsencrypt";
// import sha256 from 'crypto-js/sha256';
// import Base64 from 'crypto-js/enc-base64';

export default function TallyVotes() {
  const privateKey = process.env.REACT_APP_FIREBASE_PRIVATE_KEY;
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);

  const [content, setContent] = useState();

  const decryptVote = (encryptedVote) => {
    const unc = decrypt.decrypt(encryptedVote);
    return JSON.parse(unc);
  };

  const countVotes = async () => {
    setContent();

    const querySnapshot = await getDocs(
      query(collection(database, "votty-cand"), orderBy("ballot_number"))
    );
    const tally = new Array(querySnapshot.size).fill(0);

    const ballotVotes = await getDocs(collection(database, "votty-bpoll"));
    const votesVerf = await getDocs(collection(database, "votty-verf"));
    let valid = 0;

    // Count valid votes
    ballotVotes.forEach((vote) => {
      const cleanVote = decryptVote(vote.data().vote);
      votesVerf.forEach((hash) => {
        if (hash.data().hash === vote.data().hash)
          tally[cleanVote.num - 1] += 1;
          valid += 1;
        //console.log('Valid Vote')
      });
      // console.log(cleanVote.num)
      // console.log(vote.data().hash)
    });

    querySnapshot.forEach((doc) => {
      // console.log(querySnapshot.size)
      setContent((content) => (
        <>
          {content}
          <TableRow>
            <TableCell component="th" scope="row">
              {doc.data().ballot_number}
            </TableCell>
            <TableCell align="center">
              {doc.data().first_name + " " + doc.data().last_name}
            </TableCell>
            <TableCell align="right">{doc.data().party}</TableCell>
            <TableCell align="right">
              {tally[doc.data().ballot_number - 1]}
            </TableCell>
          </TableRow>
        </>
      ));
    });
  };

  return (
    <React.Fragment>
      <Title>Conteo de Votos</Title>
      <Button variant="contained" onClick={countVotes}>
        Realizar Conteo
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Número en tarjetón</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="right">Partido</TableCell>
              <TableCell align="right">Votación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{content}</TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
