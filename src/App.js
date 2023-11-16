import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "./components/User";
import Account from "./components/Account";
import UserList from "./components/UserList";
import AccountForm from "./components/AccountForm";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-extrabold mb-4">
        Welcome to User Management System
      </h1>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                margin: "20px",
              }}
              className="m-2 grid grid-cols-2 gap-4"
            >
              <User />
              <Account />
            </div>
          }
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/account" element={<AccountForm />} />
      </Routes>
    </div>
  );
}

export default App;
