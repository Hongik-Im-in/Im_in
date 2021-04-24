import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Check, Mode, List, Settings } from "../screens/index";
import { MaterialIcons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { logout } from '../utils/firebase';
import { UserContext,ProgressContext } from '../contexts';



const Tab = createBottomTabNavigator();

const TabIcon = ({ name, size, color }) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};

const MainTab = ({ navigation, route }) => {
  const { dispatch } = useContext(UserContext); 
  const { spinner } = useContext(ProgressContext);

  const _handleLogoutButtonPress = async () => {
        try {
            spinner.start();
            await logout();
        } catch (e) {
            console.log('[Profile] logout: ', e.message);
        } finally {
            dispatch({});
            spinner.stop();
        }
    };

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    const index = 0; // 수정 요망
    navigation.setOptions({
      headerTitle: routeName,
      headerRight: () =>
        index === 0 && (
          <MaterialIcons
            name="login"
            size={26}
            style={{ margin: 10 }}
            onPress={_handleLogoutButtonPress}
          />
        )
    });
  }, [route]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        labelPosition: "below-icon",
        style: {
          backgroundColor: "#ffffff",
          borderTopColor: "#cfcfcf",
          borderTopWidth: 0.3
        },
        activeTintColor: "#000000",
        inactiveTintColor: "#cfcfcf"
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: props => {
          let name = "";
          if (route.name === "Home") name = "home-filled";
          else if (route.name === "Check") name = "account-circle";
          else if (route.name === "Mode") name = "supervisor-account";
          else if (route.name === "List") name = "list";
          else name = "settings";

          return TabIcon({ ...props, name });
        }
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerTitle: "Home"
        }}
      />
      <Tab.Screen
        name="Check"
        component={Check}
        options={{
          tabBarLabel: "Check",
          headerTitle: "Check"
        }}
      />
      <Tab.Screen
        name="Mode"
        component={Mode}
        options={{
          tabBarLabel: "Mode",
          headerTitle: "Mode"
        }}
      />
      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarLabel: "List",
          headerTitle: "List"
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          headerTitle: "Settings"
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
