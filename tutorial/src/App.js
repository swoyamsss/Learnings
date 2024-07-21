import AddItem from "./AddItem";
import "./App.css";
import Content from "./Content";
import Header from "./Header";
import { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequests";
// import ColorChanger from "./ColorChanger";

function App() {
  const API_URL = "http://localhost:3500/names";

  const [list, setList] = useState([]);
  const [newName, setNewName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [color, setColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = list.length ? list[list.length - 1].id + 1 : 1;
    const newElement = { id, name: newName };
    setList([...list, newElement]);
    setNewName("");
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newElement),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive the expected Data");
        const names = await response.json();
        setList(names);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Calling itself
    setTimeout(() => {
      (async () => await fetchNames())();
    }, 2000);
  }, []);

  const handleDelete = async (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);

    const deleteOptions = {
      method: "DELETE",
    };
    
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "lightgrey", // Optional: for visibility
  };

  // const divStyle = {
  //   width: "500px",
  //   height: "500px",
  //   backgroundColor: color,
  //   margin: "50px",
  // };

  return (
    <div className="App" style={containerStyle}>
      <Header title="List" />
      <SearchItem searchName={searchName} setSearchName={setSearchName} />
      {isLoading && <p>Loading Names...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
      {!fetchError && !isLoading && (
        <Content
          list={list.filter((item) =>
            item.name.toLowerCase().includes(searchName.toLowerCase())
          )}
          setList={setList}
          handleDelete={handleDelete}
        />
      )}
      <AddItem
        newName={newName}
        setNewName={setNewName}
        handleSubmit={handleSubmit}
      />
      {/* <div style={divStyle}></div>
      <ColorChanger color={color} setColor={setColor} /> */}
    </div>
  );
}

export default App;
