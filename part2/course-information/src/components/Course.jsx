function Header({ course }) {
	return (
		<>
			<h1>{course}</h1>
		</>
	);
}

function Content({ parts }) {
	return parts.map((part, i) => (
		<Part key={i} part={part.name} exercises={part.exercises} />
	));
}

function Part({ part, exercises }) {
	return (
		<>
			<p>
				{part} {exercises}
			</p>
		</>
	);
}

function Total({ parts }) {
	return (
		<>
			<p>
				Number of exercises{" "}
				{parts.reduce((acc, elem) => acc + elem.exercises, 0)}
			</p>
		</>
	);
}

function Course({ course }) {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
}

export default Course;
