"use client";
import React from "react";
import { useState } from "react";

const page = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeUser = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePw = (e) => {
    setPassword(e.target.value);
  };

  const postData = async (email, password) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error); // Set the error message in the state
      }
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
      {message && 
        <p>{message}</p>
      }
    </div>
  );
};

export default page;
