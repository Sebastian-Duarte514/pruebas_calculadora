import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);
  console.log("Estado actual de user:", user);
  return (
    <div className="container">
      {user ? <h1>Hola, {user.email}</h1> : <h1>Cargando...</h1>}
      <button onClick={() => auth.signOut().then(() => navigate("/login"))} style={{ backgroundColor: "#dc3545" }}>
        Cerrar sesión
      </button>
      <button onClick={() => auth.signOut().then(() => navigate("/materialForm"))} style={{ backgroundColor: "#dc3545" }}>
        Agregar Material
      </button>
    </div>
  );
};

export default Home;
