import React, { useState } from "react";
import Project from "./pages/Projects";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeLayout from "./layouts/HomeLayout";

import "./index.scss";

function App() {
  const [project, setProject] = useState(null);

  return (
    <>
      {!project ? (
       <Project setProject={setProject} />
      ) : (
        <HomeLayout project={project} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={true}
      />
    </>
  );
}

export default App;
