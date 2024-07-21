import "./App.css";
import Header from "./Header.js";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import Home from "./Home.js";
import NewPost from "./NewPost.js";
import PostPage from "./PostPage.js";
import About from "./About.js";
import Missing from "./Missing.js";
import EditPost from "./EditPost.js";
import { Route, useNavigate, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "./api/posts.js";
import useWindowSize from "./hooks/useWindowSize.js";
import useAxiosFetch from "./hooks/useAxiosFetch.js";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const history = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  //fetch data
  useEffect(() => {
    setPosts(data);
  }, [data]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         console.log(err.response);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filtered.reverse());
  }, [posts, search]);

  // delete data
  const handleDelete = async (id) => {
    await api.delete(`/posts/${id}`);
    const updatedList = posts.filter((post) => post.id !== id);
    setPosts(updatedList);
    history("/");
  };

  //Update data
  const handleEdit = async (id) => {
    const dateTime = format(new Date(), "yyyy pp, mm dd");
    const updatedPost = {
      id: id,
      title: editTitle,
      dateTime: dateTime,
      body: editBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditBody("");
      setEditTitle("");
      history("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  //Post new data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts.length + 1 : 1;
    const dateTime = format(new Date(), "yyyy pp, mm dd");
    const newPost = {
      id: id.toString(),
      title: postTitle,
      dateTime: dateTime,
      body: postBody,
    };
    try {
      const response = await api.post("/posts", newPost);
      setPosts([...posts, response.data]);
      setPostBody("");
      setPostTitle("");
      history("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <div className="App">
      <Header title="DC Blog" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={searchResults}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/post"
          element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
