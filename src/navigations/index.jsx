import React, { useContext, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import { Spinner } from "../components";
import AuthStack from "./AuthStack";
import { ProgressContext}  from "../contexts";

const Navigation=() => {
  const {inProgress}=useContext(ProgressContext);
  
  return (
    <NavigationContainer>
      <AuthStack />
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
