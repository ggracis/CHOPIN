import { db } from "../../../db/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState } from "react";

const Form = () => {
  const [inputNombre, setInputNombre] = useState("");
  const [inputMail, setInputMail] = useState("");

  const crearUsuario = async () => {
    const usuario = {
      nombre: inputNombre,
      mail: inputMail,
    };
    const usuariosCollectionRef = collection(db, "usuarios");
    await addDoc(usuariosCollectionRef, usuario).then(({ id }) => {
      console.log("ID de usuario creado : " + id);
    });
    const querySnapshot = await getDocs(usuariosCollectionRef);
    const docs = querySnapshot.docs.map((doc) => doc.data());
    setUsuarios(docs);
    console.log(docs);
    setInputMail("");
    setInputNombre("");
  };

  return (
    <div>
      <form onSubmit={crearUsuario}>
        <input
          type="text"
          placeholder="Nombre"
          value={inputNombre}
          onChange={(e) => setInputNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Mail"
          value={inputMail}
          onChange={(e) => setInputMail(e.target.value)}
        />
        <button type="submit">Crear usuario</button>
      </form>
    </div>
  );
};

export default Form;
