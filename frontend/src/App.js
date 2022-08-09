import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [version, setVersion] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9001/api/movies`)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setMovies(res);
      });
  }, []);

  const fetchVersion = () => {
    fetch(`http://localhost:9001/`)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setVersion(res?.version);
      });
  };

  return (
    <div className="App">
      {JSON.stringify(movies)}
      <div>
        <button onClick={fetchVersion}>Fetch version</button>
        <div>{version}</div>
      </div>
    </div>
  );
}

export default App;
