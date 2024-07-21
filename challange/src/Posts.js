const Posts = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
        {JSON.stringify(post)}
        </li>
      ))}
    </ul>
  );
};

export default Posts;
