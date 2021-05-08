import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todos: PropTypes.array, //tạo props
    onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
    todos: [], // nếu thằng cha không truyền data xuống thì lấy giá trị mặc định là rỗng
    onTodoClick: null,
}
function TodoList(props) {
    const { todos, onTodoClick } = props;
    function handleClick(todo) {
        if (onTodoClick) {
            onTodoClick(todo);
        }
    }
    return (
        <div>
            <ul className="todo-list">
                {
                    todos.map(value => (
                        <li key={value.id}
                            onClick={() => handleClick(value)}>
                            {value.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TodoList;