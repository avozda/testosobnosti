import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import UserState from "./context/user/userState";
import ResultState from "./context/result/resultState";
import { ColorModeScript } from "@chakra-ui/react";
import "./App.css";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <UserState>
        <ResultState>
          <App />
        </ResultState>
      </UserState>
    </ChakraProvider>
  </React.StrictMode>
);
