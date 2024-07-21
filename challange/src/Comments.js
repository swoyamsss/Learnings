const Comments = ({comments}) => {
  return (
    <ul>
    {comments.map((comment) => (
      <li key={comment.id}>
      {JSON.stringify(comment)}
      </li>
    ))}
  </ul>
  )
}

export default Comments