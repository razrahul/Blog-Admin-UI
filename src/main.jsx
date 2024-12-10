import React, { Suspense } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import App from "./App.jsx";
import SuspenseContent from "./components/suspance/SuspenseContent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<SuspenseContent />}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
