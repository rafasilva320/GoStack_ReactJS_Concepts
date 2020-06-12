import React, { useState, useEffect } from "react";
import api from "./services/api";
import backgroundImage from "./assets/background.jpg";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handdleAddproject() {
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);
    const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Rafael Silva Menezes",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }
  return (
    <>
      <Header title="Projects" />
      <img width={200} height={200} src={backgroundImage} />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
      <button type="button" onClick={handdleAddproject}>
        Adicionar Projeto
      </button>
    </>
  );
}

export default App;
