// UserList.js

import React, { useState, useEffect } from "react";
import { fetchUserData } from "../http.js";
import Card from "./Card.js";

function UserList() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        throw new Error("Failed to fetch user data");
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", margin: "20px", height: "600px", overflowY: "auto" }}>
      {userData ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {userData.map((user) => (
            <Card
              key={user.id}
              UserName={user.UserName}
              email={user.email}
              phone={user.phone}
              creationDate={user.creationDate}
              style={{
                flex: "0 0 40%",
                margin: "10px",
                width: "100% !important",
              }}
            />
          ))}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default UserList;
