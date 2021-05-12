import { useEffect, useState } from 'react';
import './App.scss';
import Change_Color from './components/randomColor/Change_Color';
import TodoList from './components/todoDemo/TodoList';
import TodoForm from './components/todoForm/TodoForm';
import PostList from './components/postList/PostList';
import Test from './components/Test';
import axios from "axios"


function App() {
    const [todoList, setTodoList] = useState([
        { id: 1, title: "Phung Viet Hoang" },
        { id: 2, title: "Learn" },

        { id: 3, title: "UseState" },
    ])
    function handleTodoClick(todo) {
        console.log(todo)
        const index = todoList.findIndex(x => x.id === todo.id);
        if (index < 0) return
        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }
    function handleTodoFormSubmit(formValues) {
        // console.log('Form submit', formValues);
        const newTodo = {
            id: todoList.length + 1,
            ...formValues,
        }
        const newTodoList = [...todoList];
        newTodoList.push(newTodo)
        setTodoList(newTodoList)
    }
    //////////////////////////////////////////// POST_LIST ///////////////////////////////////////////
    const [dataPostList, setdataPostList] = useState([])
    useEffect(() => {
        // async function fetchPostList() { // sử ụng thư viện fetch
        //     const requestUrl = 'http://localhost:3000/new';
        //     const response = await fetch(requestUrl);
        //     const responseJSON = await response.json();
        //     setPostList(responseJSON)
        //     // console.log(responseJSON);
        // }
        // fetchPostList();
        async function getDataNews() {
            // fetch data from a url endpoint
            await axios({
                method: 'GET',
                url: 'http://localhost:3000/new',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                data: null,
            }).then((res) => setdataPostList(res.data))
        }
        getDataNews()


    }, []) //empty array chạy đúng 1 lần 

    ////// POST DATA POST_LIST
    const handleDataPostList = (dataNews) => { // hàm handleDataPostList sẽ chứa data trong PostList


        var item = {};
        item.id = dataPostList.length + 1;
        item.title = dataNews.tenbaibao;
        item.desc = dataNews.noidung;
        dataPostList.push(item);
        console.log(dataPostList);

        // console.log(dataNews.tenbaibao);
        // console.log(dataNews.noidung);

        async function postDataNews() {
            // fetch data from a url endpoint
            await axios({
                method: 'POST',
                url: 'http://localhost:3000/new',

                data: {
                    title: dataNews.tenbaibao,
                    desc: dataNews.noidung,
                }
            }).then((res) => res.data)

        }
        postDataNews()
    }

    return (
        <div className="App">

            {/* <h1>Change Color</h1>
            <Change_Color></Change_Color>
            <h1>Demo Todo Form</h1>
            <TodoForm onSubmit={handleTodoFormSubmit}></TodoForm>
            <h1>Demo Todo List use useState</h1>
            <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
            <h1>demo PostList</h1>
            <PostList getDataPostList={dataPostList} addDataPostList={handleDataPostList}></PostList>


        </div>
    );
}

export default App;
