import { useState } from "react";
import "./App.css";
import { Signin } from "./comps/Signin";
import { Login } from "./comps/Login";
import { Users } from "./comps/Users";
import Dashboard from "./comps/Dashboard";
import AllRoutes from "./AllRoute/AllRoutes";
import { Navbar } from "./Navbar/Navbar";
import Footer from "./comps/Footer";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [count] = useState(0);

  return (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  );
}

export default App;
