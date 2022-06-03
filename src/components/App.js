import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { updateProfile } from "@firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  const [userObj, setUserObj] = useState(null);
  //For using setState rerendering
  const [refresh, setRefresh] = useState("");
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if(user){
        setIsLoggedIn(true);
        if(user.displayName === null) {
          await updateProfile(user, {displayName: "User"});
        };
        setUserObj(user);
        /* setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, {displayName:user.displayName}),
        }); */
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    /* setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, {displayName:user.displayName}),
    });
    setUserObj({displayName: 'hellO'}); */
    setRefresh(userObj.displayName);
  }
  return (
    <>
    {init ? (
      <AppRouter
      refreshUser={refreshUser}
      isLoggedIn={isLoggedIn}
      userObj={userObj} />
    ) : (
      "Initializing...."
    )}
    {/* <footer>&copy; Nwitter {new Date().getFullYear()}</footer> */}
    </>
  
  );
}

export default App;