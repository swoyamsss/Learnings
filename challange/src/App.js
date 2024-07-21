import { useEffect, useState } from "react";
import "./App.css";
import Posts from "./Posts";
import Comments from "./Comments";
import Users from "./Users";

function App() {
  const API_URL_POSTS = "https://jsonplaceholder.typicode.com/posts";
  const API_URL_COMMENTS = "https://jsonplaceholder.typicode.com/comments";
  const API_URL_USERS = "https://jsonplaceholder.typicode.com/users";

  const navBarButtons = ["Posts", "Comments", "Users"];

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentTab, setCurrentTab] = useState(navBarButtons[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await fetch(API_URL_POSTS);
        const responseUsers = await fetch(API_URL_USERS);
        const responseComments = await fetch(API_URL_COMMENTS);

        const postResponse = await responsePosts.json();
        const userResponse = await responseUsers.json();
        const commentResponse = await responseComments.json();

        setPosts(postResponse);
        setUsers(userResponse);
        setComments(commentResponse);
      } catch (err) {
        console.log(err.message);
      }
    };

    (async () => await fetchData())();
  }, []);
  const handleChangeTab = (e) => {
    const tab = e.target.name;
    setCurrentTab(tab);
  };
  return (
    <div className="App">
      <div className="NavBar">
        {navBarButtons.map((tab) => (
          <button key={tab} name={tab} onClick={handleChangeTab}>
            {tab}
          </button>
        ))}
      </div>
      {currentTab === navBarButtons[0] && <Posts posts={posts} />}
      {currentTab === navBarButtons[1] && <Comments comments={comments} />}
      {currentTab === navBarButtons[2] && <Users users={users} />}
    </div>
  );
}

export default App;
