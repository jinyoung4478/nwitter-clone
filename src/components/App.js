import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { updateProfile } from "@firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if(user){
        setIsLoggedIn(true);
        if(user.displayName === null) {
          await updateProfile(user, {displayName: "User"});
        };
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing...."}
    {/* <footer>&copy; Nwitter {new Date().getFullYear()}</footer> */}
    </>
  
  );
}

export default App;