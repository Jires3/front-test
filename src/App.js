import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("https://student-backend.onrender.com/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {students.map(s => (
          <li key={s.id}>{s.name} ({s.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
