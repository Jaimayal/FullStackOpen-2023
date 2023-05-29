import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState("");

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

	return (
		<div>
			<h2>blogs</h2>
			<p>{notification}</p>
			<p>{user.name} logged in</p>
			<button onClick={onLogoutClick}>logout</button>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
			<AddBlogForm
				setBlogs={setBlogs}
				setNotification={setNotification}
			/>
		</div>
	);
};

export default App;
