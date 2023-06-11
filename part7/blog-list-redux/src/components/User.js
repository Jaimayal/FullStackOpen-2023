function User({ user }) {
  console.log(user)
  if (!user) {
    return (<p>No user selected</p>)
  }
  return (
    <>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
