import React, { useEffect, useState } from 'react';
import { database } from "../firebaseConfig";
import { ref, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const MaterialForm = () => {
    const [nombre, setNombre] = useState("");
    const [costo, setCosto] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [unidadMedida, setUnidadMedida] = useState('');
    const [user, setUser] = useState(null); 

    const unidadesMedida = ["kilogramos", "litros", "mililitros", "gramos", "unidades", "no se"];

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log("Estado actual de user:", currentUser);
                setUser(currentUser); // Usuario autenticado
            } else {
                console.log("Estado actual de user1:", currentUser);
                setUser(null); // No hay usuario autenticado
            }
        });
    }, []);

    const handleSaveMaterial = (e) => {
        e.preventDefault();

        // Crear referencia a la base de datos para guardar en la tabla 'material'
        const materialsRef = ref(database, "material");

        // Guardar los datos en la base de datos
        push(materialsRef, {
            nombre,
            costo,
            cantidad,
            unidadMedida
        })
            .then(() => {
                alert("Material guardado correctamente");
                setNombre("");
                setCosto("");
                setCantidad("");
                setUnidadMedida("");
                userId: user.uid
            })
            .catch((error) => {
                alert("Error al guardar: " + error.message);
            });
    };

    return (
        <div className="container">
            <h2>Registrar Material</h2>
            <form onSubmit={handleSaveMaterial}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Costo"
                    value={costo}
                    onChange={(e) => setCosto(parseFloat(e.target.value))}
                    step="0.01" // Permite números con decimales
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                />
                <label>
                    Unidad de medida:
                    <select
                        value={unidadMedida}
                        onChange={(e) => setUnidadMedida(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una unidad</option>
                        {unidadesMedida.map((unidad) => (
                            <option key={unidad} value={unidad}>
                                {unidad}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Guardar Material</button>
                <button onClick={() => navigate("/")} style={{ backgroundColor: "#9b9b9b" }}>
                    Volver
                </button>
            </form>
        </div>
    );
};

export default MaterialForm;

