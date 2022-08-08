import React, { useState } from "react";


const ToDoList = () => {

	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	const handleChange = (e) => {
		setTask(e.target.value);
	};

	const AddTask = () => {
		if (task !== "") {
			const taskDetails = {
				id: Math.floor(Math.random() * 1000),
				value: task,
				isCompleted: false,
			};

			setTaskList([...taskList, taskDetails]);
		};
	};

	const deleteTask = (e, id) => {
		e.preventDefault();
		setTaskList(taskList.filter((t) => t.id != id));
	}

	return (<>
		<div className="title glow">
			<h1>To Do List</h1>
		</div>

		<div className="list glow">
			<div>
			<input
				className="input-field"
				type="text"
				name="text"
				id="text"
				placeholder="Add task here..."
				onChange={(e) => handleChange(e)}
			/>

			<button onClick={AddTask} className="btn">Add</button>
			</div>

			{taskList !== [] ? (
				<ul className="glow">
					{taskList.map((t) => (
						<li>
							{t.value}
							<button className="delete" onClick={(e) => deleteTask(e, t.id)}>
								X
							</button>
						</li>
					))}
				</ul>
			) : null}
		</div>
	</>
	);
};

export default ToDoList;
