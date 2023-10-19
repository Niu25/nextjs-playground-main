"use client";
import React from "react";
import { useState } from "react";


const page = () => {
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  

  const handleChangeUser = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePw = (e) => {
    setPassword(e.target.value);
  };

  const postData = async (userName, password) => {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div>
      <form>
        <label>Username: </label>
        <input
          type="text"
          value={userName}
          onChange={handleChangeUser}
          className="bg-orange-200"
        />
        <label>Password: </label>
        <input
          type="text"
          value={password}
          onChange={handleChangePw}
          className="bg-orange-200"
        />
      </form>
      <button
        onClick={() => {
          postData(userName, password);
        }}
        disabled={!userName}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save to Database
      </button>
      
    </div>
  );
};

export default page;
