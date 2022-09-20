import * as React from "react";
import Title from "./Title";
// import under from '../assets/undercons.jpg'
import Button from "@mui/material/Button";

import { database } from "../utils/FirebaseTools";
import { collection, doc, setDoc } from "firebase/firestore";

export default function ManageCandidates() {
  let fileReader;

  const handleFileRead = async (e) => {
    const content = JSON.parse(fileReader.result);
    content.forEach(async (entry) => {
      const newDBRef = doc(collection(database, "load-test2"));
      await setDoc(newDBRef, {
        ballot_number: entry.ballot_number,
        first_name: entry.first_name,
        last_name: entry.last_name,
        picture: entry.picture,
        party: entry.party,
      });
    });
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <React.Fragment>
      <Title>Gestionar Candidatos</Title>
      {/* <img src={under} alt={'soon'}></img> */}
      <Button variant="contained" component="label" width={100}>
        Cargar lista de candidatos
        <input
          type="file"
          id="file"
          className="input-file"
          accept=".json"
          hidden
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />
      </Button>
    </React.Fragment>
  );
}
