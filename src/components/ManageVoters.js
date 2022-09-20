import * as React from "react";
import Title from "./Title";
// import under from "../assets/undercons.jpg";
import Button from '@mui/material/Button';

import {database} from '../utils/FirebaseTools';
import { collection, doc, setDoc } from "firebase/firestore"; 


export default function ManageVoters() {
  let fileReader;

  const handleFileRead = async (e) => {
    const content = JSON.parse(fileReader.result);
    content.forEach(async (entry) => { 
      const newDBRef = doc(collection(database, "load-test"));
      await setDoc(newDBRef, {
      id: entry.id,
      full_name: entry.full_name,
      password: entry.password,
      voted: entry.voted
      })
     })
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <React.Fragment>
      <Title>Gestionar Votantes</Title>
      {/* <img src={under} alt={"soon"}></img> */}
      <Button variant="contained" component="label" width={100}>
        Cargar Lista de Votantes
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
