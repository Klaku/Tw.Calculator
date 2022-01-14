import React from "react";
import ReactDOM from "react-dom";
import Root from "views/Root";
import AppProviders from "providers/App.provider";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <Root />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
