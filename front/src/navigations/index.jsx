import React, { useContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import { Spinner } from "../components";
import AuthStack from "./AuthStack";
import { ProgressContext,UserContext}  from "../contexts";

// 최상위 APP.JSX에서 사용될 값들, 모든 스택들을 여기서 관리해준다. 
const Navigation=({handledark}) => {
  const {inProgress}=useContext(ProgressContext);
  const { user } = useContext(UserContext);
  
  return (
    <NavigationContainer>
      {user.uid&&user.email ? <MainStack handledark={handledark} /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
