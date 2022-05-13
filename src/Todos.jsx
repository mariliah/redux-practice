import { useState, useEffect } from 'react';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    // const [completed, setCompleted] = useState(false);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => {
                setTodos(data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    // const updateTodo = (todo) => {
    //     const todoItemIndex = todos.findIndex((x) => x.id === todo.id);
    //     const newTodos = [...todos];

    //     const newTodo = newTodos[todoItemIndex];
    //     newTodo.completed = !newTodo.completed;
    //     newTodos[todoItemIndex] = newTodo;
    //     setTodos(newTodos);
    // }

    const handleCompleted = (e, id) => {

        const tempTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: e.target.value
                }
            }
            return { ...todo };
        })

        setTodos(tempTodos);

    }

    const rows = todos.map(({ id, title, completed }, index) => {
        console.log('completed', completed);
        return (
            <tr key={index}>
                <td>{title}</td>
                <td>{<input
                    value={completed}
                    checked={completed}
                    onChange={(e) => handleCompleted(e, id)}
                    onClick={() => !todos.completed}
                    type="checkbox" />}</td>
            </tr>
        )
    });


    return (
        <div className="">

            <h1>To-do List: </h1>
            <form>
                <table>
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>completed?</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </form>
        </div>
    )
}

export default Todos;