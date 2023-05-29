
const { useState, forwardRef, useImperativeHandle } = require('react');
function Togglable(props, refs) {
	const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        };
    });

	if (visible) {
		return (
			<>
                {props.children}
				<button onClick={() => setVisible(false)}>Cancel</button>
			</>
		);
	}

	return (
		<>
			<button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
		</>
	);
}

export default forwardRef(Togglable);
