import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editText, setEditText] = useState({ id: null, text: "" });

  const handleEditChange = (e) => {
    setEditText({ id: editText.id, text: e.target.value });
  };

  const handleEditSubmit = (id) => {
    dispatch(updateTodo({ id: id, newText: editText.text }));
    setEditText({ id: null, text: "" });
  };

  const handleEditClick = (todo) => {
    setEditText({ id: todo.id, text: todo.text });
  };

  return (
    <>
      <div className="text-3xl p-2">Todos</div>
      {todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <ul className="list-none">
          {todos.map((todo) => (
            <li
              className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
              key={todo.id}
            >
              {editText.id === todo.id ? (
                <input
                  type="text"
                  placeholder="Edit Todo"
                  value={editText.text}
                  onChange={handleEditChange}
                  className="text-white bg-gray-800 border-0 py-1 px-2 focus:outline-none rounded-md"
                />
              ) : (
                <div className="text-white">{todo.text}</div>
              )}
              <div>
                {editText.id === todo.id ? (
                  <button
                    onClick={() => handleEditSubmit(todo.id)}
                    className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md mr-2"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md mr-2 "
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Todos;
