import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState("");
	const formRef = useRef();

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = localStorage.getItem("loggedBloglistUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	if (user === null) {
		return (
			<>
				<p>{notification}</p>
				<LoginForm
					setUser={setUser}
					setNotification={setNotification}
				/>
			</>
		);
	}

	const onLogoutClick = () => {
		localStorage.removeItem("loggedBloglistUser");
		setUser(null);
	};

	const addBlog = async (blog) => {
		try {
			const saved = await blogService.saveBlog(blog);
			const all = await blogService.getAll();
			console.log(all);
			const updated = all.find((b) => b.id === saved.id);
			console.log(updated);
			setBlogs((prevBlogs) => [...prevBlogs, updated]);
			formRef.current.toggleVisibility();
			setNotification(
				`A new blog ${updated.title} by ${updated.author} added`
			);
			setTimeout(() => {
				setNotification("");
			}, 5000);
		} catch (error) {
			setNotification(error.response.data.error);
			setTimeout(() => {
				setNotification("");
			}, 5000);
		}
	};

	const updateBlog = async (blog) => {
		try {
			const blogToSubmit = {
				id: blog.id,
				title: blog.title,
				author: blog.author,
				url: blog.url,
				likes: blog.likes,
				user: blog.user.id,
			}
			await blogService.updateBlog(blogToSubmit);
			setBlogs((prevBlogs) =>
				prevBlogs.map((b) => (b.id === blog.id ? blog : b))
			);
		} catch (error) {
			setNotification(error.response.data.error);
			setTimeout(() => {
				setNotification("");
			}, 5000);
		}
	};

	const deleteBlog = async (blog) => {
		try {
			await blogService.deleteBlog(blog.id);
			setBlogs((prevBlogs) =>

				prevBlogs.filter((b) => b.id !== blog.id)
			);
		} catch (error) {
			setNotification(error.response.data.error);
			setTimeout(() => {
				setNotification("");
			}, 5000);
		}
	};

	return (
		<div>
			<h2>blogs</h2>
			<p>{notification}</p>
			<p>{user.name} logged in</p>
			<button onClick={onLogoutClick}>logout</button>
			{blogs.sort((curr, next) => next.likes - curr.likes).map((blog) => (
				<Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
			))}
			<Togglable buttonLabel="Add Blog" ref={formRef}>
				<AddBlogForm addBlog={addBlog} />
			</Togglable>
		</div>
	);
};

export default App;
