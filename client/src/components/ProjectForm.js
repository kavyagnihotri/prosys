import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProjectForm = () => {
  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [projectID, setProjectID] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [prerequisite, setPrerquisite] = useState("");
  const [numberOfStudents, setProjectNumber] = useState("");
  const [error, setError] = useState(null);
  const [emptyfields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const professorEmail = user.email;
    const approved = 0;

    const project = { title, projectID, description, prerequisite, projectType, professorEmail, numberOfStudents, approved };
    console.log(project)
    const response = await fetch("/projects", {
      method: "POST",
      body: JSON.stringify({ title, projectID, description, prerequisite, projectType, professorEmail, numberOfStudents, approved }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json)
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyfields);
    }

    if (response.ok) {
      setTitle("");
      setProjectID("");
      setDescription("");
      setProjectNumber("");
      setProjectType("");
      setPrerquisite("");
      setError(null);
      setEmptyFields([]);
      console.log("new project added", json);
      dispatch({ type: "CREATE_PROJECT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new project</h3>

      <label>Project Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyfields.includes("title") ? "error" : ""}
      />

      <label>Project ID</label>
      <input
        type="text"
        onChange={(e) => setProjectID(e.target.value)}
        value={projectID}
        className={emptyfields.includes("projectID") ? "error" : ""}
      />

      <label>Description</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyfields.includes("description") ? "error" : ""}
      />

      <label>Project Prerequisite</label>
      <input
        type="text"
        onChange={(e) => setPrerquisite(e.target.value)}
        value={prerequisite}
        className={emptyfields.includes("description") ? "error" : ""}
      />

      <label>Project Type</label>
      <input
        type="text"
        onChange={(e) => setProjectType(e.target.value)}
        value={projectType}
        className={emptyfields.includes("description") ? "error" : ""}
      />

      <label>Number Of Students</label>
      <input
        type="text"
        onChange={(e) => setProjectNumber(e.target.value)}
        value={numberOfStudents}
        className={emptyfields.includes("description") ? "error" : ""}
      />

      <button>Add Project</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProjectForm;
