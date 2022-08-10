import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [version, setVersion] = useState("");
  const [placeholder, setPlaceholder] = useState();

  useEffect(() => {
    fetch(`http://localhost:9001/api/movie`)
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

    fetch(`http://localhost:9001/api/placeholder`)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setPlaceholder(res);
      });
  };

  return (
    <div className="App">
      {movies.map((_movie)=>{
        return <div>{_movie.title}</div>
      })}
      <div>
        <button onClick={fetchVersion}>Fetch version and placeholder</button>
        <div>{version}</div>
        <div>{JSON.stringify(placeholder)}</div>
      </div>
    </div>
  );
}

export default App;
