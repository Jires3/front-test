import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  const addStudent = () => {
    axios.post("http://localhost:5000/students", { name, email }).then((res) => {
      setStudents([...students, res.data]);
      setName("");
      setEmail("");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Tracker</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={addStudent}>Add Student</button>

      <h2>All Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.name} - {s.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
