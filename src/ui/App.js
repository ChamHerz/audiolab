import React, { useState } from "react";
import Project from "./pages/Projects";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeLayout from "./layouts/HomeLayout";

import "./index.scss";

require.config({
  paths: {
    peaks: "bower_components/peaks.js/src/main",
    EventEmitter: "bower_components/eventemitter2/lib/eventemitter2",
    Konva: "bower_components/konvajs/konva",
    "waveform-data": "bower_components/waveform-data/dist/waveform-data.min",
  },
});

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
