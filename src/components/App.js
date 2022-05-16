import React, { useState } from "react";
import fbase from "fbase";
import AppRouter from "components/Router";

function App() {
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn} />
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  
  );
}

export default App;
