import React, { useState, useEffect } from "react";

// Componente per visualizzare la lista degli utenti
const UserList = () => {
  // Stato per memorizzare la lista degli utenti
  const [users, setUsers] = useState([]);

  // Effetto che si attiva al caricamento del componente per ottenere la lista degli utenti
  useEffect(() => {
    fetch("http://localhost/project_wp_react/wordpress/wp-json/wp/v2/users")
      .then((response) => response.json())
      .then((data) => {
        // Aggiorna lo stato con la lista degli utenti ottenuta dall'API
        setUsers(data);
      })
      .catch((error) => {
        // Gestione degli errori
        console.error("Errore nella richiesta API:", error);
      });
  }, []);

  // Mostra la lista degli utenti
  return (
    <div>
      <h2>LISTA UTENTI :</h2>
      <ul>
        {/* Mappa ogni utente per creare un elemento della lista */}
        {users.map((user) => (
          <li key={user.id}>
            <h3 className="mt-3">{user.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
