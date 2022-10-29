import React, { useState, useEffect } from "react";

import { TiDelete } from 'react-icons/ti';
import { BiSad } from 'react-icons/bi';

const ToDoListFetch = () => {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			try {
				await fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/KarlyMakowski"
				)
					.then((resp) => resp.json())
					.then((data) => setTaskList(data));
			} catch (error) {
				console.log(error);
			}
		};
		getTasks();
	}, []);

	const list = async (newList) => {
		try {
			await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/KarlyMakowski",
				{
					method: "PUT",
					body: JSON.stringify(newList),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteAllTasks = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/KarlyMakowski", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/KarlyMakowski", {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((resp) => resp.json())
				.then((data) => {
					if (data.result === "ok") {
						setTaskList([]);
					}
				});
		});
	};

	const handleChange = (event) => {
		setTask(event.target.value);
	};

	const addTask = (event) => {
		if (event.key === "Enter" && event.target.value !== "") {
			let newList = { label: event.target.value, done: false };
			setTaskList(
				taskList.concat({ label: `${event.target.value}`, done: false }),
				list([...taskList, newList])
			);
			event.target.value = "";
		}
	};

	const deleteTask = (indexDelete) => {
		setTaskList(taskList.filter((t, index) => index !== indexDelete));
	};

	return (
		<div className="to-do-container">
			<h1 className="glow">To Do List</h1>
			<input
				type="text"
				name="text"
				id="text"
				placeholder="Add task here..."
				onChange={handleChange}
				value={task}
				onKeyDown={addTask}
				autoComplete="off"
				className="input-field"
			/>

			{taskList !== [] ? (
				<ul className="glow list">
					{taskList.length === 0 && (
						<p>You have no tasks <BiSad /></p>
					)}
					{taskList.map((t, i) => {
						return (
							<li key={i} className="d-flex justify-content-between">
								<p>{t.label}</p>
								<span onClick={() => deleteTask(i)}>
									<TiDelete className="delete" />
								</span>
							</li>
						);
					})}
				</ul>
			) : null}

			<button type="button" className="deleteAll" onClick={deleteAllTasks}>
				Delete All Tasks
			</button>
		</div>
	);
};

export default ToDoListFetch;
