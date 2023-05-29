import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const saveBlog = (blog) => {
	const config = {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("loggedBloglistUser")).token
			}`,
		},
	};

	const request = axios.post(baseUrl, blog, config);
	return request.then((response) => response.data);
};

const getById = (id) => {
	const request = axios.get(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

const updateBlog = (blog) => {
	const config = {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("loggedBloglistUser")).token
			}`,
		},
	};

	const request = axios.put(`${baseUrl}/${blog.id}`, blog, config);
	return request.then((response) => response.data);
};

const deleteBlog = (blogId) => {
	const config = {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("loggedBloglistUser")).token
			}`,
		},
	};

	const request = axios.delete(`${baseUrl}/${blogId}`, config);
	return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, saveBlog, getById, updateBlog, deleteBlog };
