import { useState } from "react";
import blogService from "../services/blogs";

function AddBlogForm({ setBlogs, setNotification }) {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const onAddBlogFormSubmit = (event) => {
		event.preventDefault();
		console.log("Title: ", title);
		console.log("Author: ", author);
		console.log("Url: ", url);
		blogService
			.saveBlog({ title, author, url })
			.then((response) => {
				setBlogs((prevBlogs) => [...prevBlogs, response]);
				setNotification(`A new blog ${title} by ${author} added`);
                setTimeout(() => {
                    setNotification("");
                }, 5000);
			})
			.catch((error) => {
				setNotification(error.response.data.error);
                setTimeout(() => {
                    setNotification("");
                }, 5000);
			});
	};

	return (
		<>
			<h2>Add blog</h2>
			<form onSubmit={onAddBlogFormSubmit}>
				<div>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					<label htmlFor="author">Author</label>
					<input
						type="text"
						name="author"
						id="author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					<label htmlFor="url">Url</label>
					<input
						type="text"
						name="url"
						id="url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">Add</button>
			</form>
		</>
	);
}

export default AddBlogForm;
