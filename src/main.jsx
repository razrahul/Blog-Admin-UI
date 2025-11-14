import React, { Suspense } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import App from "./App.jsx";
import SuspenseContent from "./components/suspance/SuspenseContent.jsx";
import { applyGlobal, _debugParsedEnv } from "./Utils/logger.js";


_debugParsedEnv();  // run once to confirm env parsing (uses console.error)
applyGlobal(); // overrides global console.log in production (optional)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<SuspenseContent />}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
