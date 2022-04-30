import styles from "../styles/Home.module.css";
import { useState } from "react";

import { useRef } from "react";
import { useCallback } from "react";

//create todo list
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const [editTodo, setEditTodo] = useState("");
  const [editId, setEditId] = useState(0);
  let [maxNumber, setMaxNumber] = useState(0);
  const inputRef = useRef();
  const inputEditRef = useRef();

  const todoListRef = useRef();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (todo === "") {
        alert("Please enter a todo");
      } else {
        setTodos([...todos, { id: id, todo: todo, completed: false }]);
        setTodo("");
        setId(id + 1);
      }
    },
    [todo, todos, id]
  );

  const handleEditSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (editTodo === "") {
        alert("Please enter a todo");
      } else {
        setTodos(
          todos.map(() =>
            todo.id === editId
              ? { id: editId, todo: editTodo, completed: false }
              : todo
          )
        );

        setEdit(false);
        setEditTodo("");
        setEditId(0);
      }
    },
    [editTodo, todos, editId]
  );
  const handleDelete = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const handleEdit = useCallback(
    (id) => {
      setEdit(true);
      setEditId(id);
      setEditTodo(todos.find((todo) => todo.id === id).todo);
    },
    [todos]
  );

  const handleToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [todos]
  );

  const handleToggleAll = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      setTodos(todos.map((todo) => ({ ...todo, completed: isChecked })));
    },
    [todos]
  );

  const handleClearCompleted = useCallback(() => {
    setTodos(todos.filter((todo) => !todo.completed));
  }, [todos]);

  const handleClearAll = useCallback(() => {
    setTodos([]);
  }, [todos]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );
  const handleKeyDownMaxNumber = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  const handleEditKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        handleEditSubmit(e);
      }
    },
    [handleEditSubmit]
  );

  const handleToggleAllChange = useCallback(
    (e) => {
      handleToggleAll(e);
    },
    [handleToggleAll]
  );

  const handleClearCompletedChange = useCallback(() => {
    handleClearCompleted();
  }, [handleClearCompleted]);

  const handleClearAllChange = useCallback(() => {
    handleClearAll();
  }, [handleClearAll]);

  const handleTodoChange = useCallback((e) => {
    setTodo(e.target.value);
  }, []);
  const handleTodoChangesetMaxNumber = useCallback((e) => {
    setMaxNumber(e.target.value);
  }, []);

  const handleEditTodoChange = useCallback((e) => {
    setEditTodo(e.target.value);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.Maintext}>Todo List</h1>
      <div className={styles.addputton}>
        <input
          type='text'
          placeholder='What is the MaxNumber ?'
          value={maxNumber}
          onChange={handleTodoChangesetMaxNumber}
          onKeyDown={handleKeyDownMaxNumber}
          ref={inputRef}
        />
      </div>

      <h1>
        The MaxNumber is{" "}
        <span styles={{ color: "red", backgroundColor: "yellow" }}>
          {maxNumber}
        </span>{" "}
      </h1>
      <h4 style={{ color: "gray" }}>
        You Have{" "}
        <span styles={{ color: "red" }}>{maxNumber - todos.length}</span> Todos
        Left
      </h4>
      <form onSubmit={handleSubmit}>
        {maxNumber == 0 ? (
          <div className={styles.warning}>
            <p>Please put a maximum number of todos .</p>
          </div>
        ) : todos.length >= maxNumber ? (
          <div className={styles.warning}>
            <p>
              You have reached the maximum number of todos. Please clear some
              todos before adding more.
            </p>
          </div>
        ) : (
          <div className={styles.addputton}>
            <input
              type='text'
              placeholder='What needs to be done?'
              value={todo}
              onChange={handleTodoChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          </div>
        )}
        {todos.length >= maxNumber ? null : <button type='submit'>Add</button>}
        <div className={styles.checkboxdev}>
          <h1 className={styles.checkboxdivtext}> Sellect All </h1>
          <input
            type='checkbox'
            style={styles.checkbox}
            checked={todos.every((todo) => todo.completed)}
            onChange={handleToggleAllChange}
            ref={todoListRef}
          />
        </div>
      </form>

      <section className={styles.main}>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label
                onDoubleClick={() => handleEdit(todo.id)}
                ref={todoListRef}>
                {todo.todo}
              </label>
              <div className={styles.ggg}>
                <input
                  type='checkbox'
                  style={styles.checkbox}
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  ref={todoListRef}
                />

                <button onClick={() => handleDelete(todo.id)} ref={todoListRef}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {maxNumber == 0 ? null : (
        <footer className={styles.footer}>
          {todos.length < 1 ? (
            <p class={styles.putTodoCallToAction}>Put your todos !</p>
          ) : null}
          {todos.length > 0 && (
            <div className={styles.footerContent}>
              <span>
                <strong>
                  {todos.filter((todo) => !todo.completed).length}
                </strong>{" "}
                items left
              </span>

              <div className={styles.footerButtonsdiv}>
                <button
                  className={styles.btnFooter}
                  onClick={handleClearCompletedChange}>
                  Clear completed
                </button>

                <button
                  className={styles.btnFooter}
                  onClick={handleClearAllChange}>
                  Clear all
                </button>
              </div>
            </div>
          )}
        </footer>
      )}
      {edit && (
        <form onSubmit={handleEditSubmit}>
          <input
            type='text'
            placeholder='What needs to be done?'
            value={editTodo}
            onChange={handleEditTodoChange}
            onKeyDown={handleEditKeyDown}
            ref={inputEditRef}
          />

          <button type='submit'>Edit</button>
        </form>
      )}
    </div>
  );
}
