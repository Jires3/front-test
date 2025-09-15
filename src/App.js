import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = "https://test-dky0.onrender.com"; // Your Render backend

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/students`);
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
      alert("Failed to fetch students");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add new student
  const addStudent = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter both name and email");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/students`, { name, email });
      setStudents([...students, res.data]); // Add to local state
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Error adding student:", err);
      alert("Failed to add student");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Students List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s.id}>
              {s.name} ({s.email})
            </li>
          ))}
        </ul>
      )}

      <h2>Add New Student</h2>
      <form onSubmit={addStudent}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Add Student
        </button>
      </form>
    </div>
  );
}

export default App;
