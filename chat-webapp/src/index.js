import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <ChatProvider>
          <App />
        </ChatProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
