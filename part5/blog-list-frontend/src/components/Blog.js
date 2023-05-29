import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
	const [showDetails, setShowDetails] = useState(false);

	const onViewDetailsClick = () => {
		console.log("View details clicked", blog);
		setShowDetails(!showDetails);
	};

  const onLikeClick = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    updateBlog(updatedBlog);
    console.log("Like clicked", updatedBlog);
  };

  const onDeleteClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog);
    }
  };

	if (showDetails) {
		return (
			<div>
				<p>{blog.title} {blog.author} <button onClick={onViewDetailsClick}>View details</button></p>
				<p>{blog.url}</p>
				<p>likes {blog.likes} <button onClick={onLikeClick}>Like</button> </p>
				<p>{blog.user.name}</p>
        <button onClick={onDeleteClick} style={{ backgroundColor: "red" }}>Delete</button>
			</div>
		);
	}

	return (
		<div>
			{blog.title} {blog.author}
			<button onClick={onViewDetailsClick}>View details</button>
		</div>
	);
};

export default Blog;
