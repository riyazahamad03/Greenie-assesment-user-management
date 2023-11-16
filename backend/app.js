import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import { log } from "node:console";

const app = express();
app.use(express.json());

app.use(bodyParser.json());

// Cross origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/user-data", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/user-data.json");
    const userData = JSON.parse(fileContent);
    res.status(200).json({ userData: userData });
  } catch (error) {
    console.error("Error reading user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/user-data", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/user-data.json");
    const id = Math.floor(Math.random() * (10000 - 1)) + 1;

    const formData = JSON.parse(req.body.formData);

    const UserName = formData.UserName;
    const email = formData.email;
    const phone = formData.phone;
    const password = formData.password;

    const newUserData = {
      id: id,
      UserName: UserName,
      email: email,
      phone: phone,
      password: password,
      creationDate: new Date().toLocaleString(),
    };

    const existingUserData = JSON.parse(fileContent);

    const updatedUserData = [...existingUserData, newUserData];

    await fs.writeFile(
      "./data/user-data.json",
      JSON.stringify(updatedUserData)
    );

    res.status(200).json({ message: "user data updated" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3001);
