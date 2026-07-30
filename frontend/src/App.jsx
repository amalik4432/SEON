import React from "react";
import AppRoute from "./routes/AppRoute";
import { UserProvider } from "./context/user.context";

const App = () => {
  return (
    <UserProvider>
      <AppRoute />
    </UserProvider>
  );
};

export default App;
