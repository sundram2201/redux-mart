import React from "react";

const Signup = () => {
  const handleClick = () => {
    const data = {
      fullname: "sundram chauhan",
      username: "redux_mart",
      email: "test@redux.com",
      contact: "1234567890",
      password: "123",
    };

    fetch("http://localhost:3002/api/v1/user/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) // Handle response
      .catch((error) => error);
  };

  return (
    <div>
      <button onClick={() => handleClick()}>Click</button>
    </div>
  );
};

export default Signup;
