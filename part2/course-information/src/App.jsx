import Course from "./components/Course";

function App() {
	const courses = [
		{
			name: "Half Stack application development",
			parts: [
				{
					name: "Fundamentals of React",
					exercises: 10,
				},
				{
					name: "Using props to pass data",
					exercises: 7,
				},
				{
					name: "State of a component",
					exercises: 14,
				},
				{
					name: "Redux",
					exercises: 21,
				},
				{
					name: "pepiyo",
					exercises: 0,
				},
			],
		},
		{
			name: "Node.js",
			parts: [
				{
					name: "SQL",
					exercises: 10,
				},
				{
					name: "File IO",
					exercises: 5,
				},
			],
		},
	];

	return courses.map((course, i) => <Course key={i} course={course} />);
}

export default App;
