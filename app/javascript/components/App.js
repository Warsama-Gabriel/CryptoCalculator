import React from "react"; // Import React
import PortfolioContainer from "./PortfolioContainer";
import axios from "axios";

function App() {
  const csrfToken = document.querySelector('[name="csrf-token"]').content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  return (
    <div>
      <PortfolioContainer />
    </div>
  );
}

export default App;
