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


    ///////////// PUT
    const [getIDEdit, setGetIDEdit] = useState('')
    const [getDataEdit, setGetDataEdit] = useState('')
    const handleGetDataEdit = (value) => {
        setGetIDEdit(value.id)
    }

    const handlePushDataEdit = (value) => {

        if (window.confirm("Bạn có chắc chắn muốn sửa")) {
            var dataEdit = {};
            dataEdit.id = getIDEdit
            dataEdit.title = value.tenbaibao
            dataEdit.desc = value.noidung
            setGetDataEdit(dataEdit)
            console.log(getDataEdit);
            async function editDataPostList() {
                await axios({
                    method: 'PUT',
                    url: "http://localhost:3000/new/" + getIDEdit,
                    data: {
                        title: value.tenbaibao,
                        desc: value.noidung,
                    },
                }).then(res => res.data)
                    .then(res => console.log(res))
                // .then(res => setdataPostList(...dataPostList, res))
            }
            editDataPostList()

        }
    }
    useEffect(() => {
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
    }, [getDataEdit])



    //////////// DELETE 
    const handleDeleteDataPostList = (id) => {
        // console.log(id);
        if (window.confirm("Bạn có chắc chắn muốn xóa")) {
            const dataPostListAfterDeletedata = dataPostList.filter(item => item.id !== id)
            setdataPostList(dataPostListAfterDeletedata)
            async function deleteDataPostList() {
                await axios({
                    method: "DELETE",
                    url: "http://localhost:3000/new/" + id,
                    data: null
                }).then(res => res.data)
            }
            deleteDataPostList()
        }
    }
    // console.log(dataPostList)
    return (

        <div className="App">

            {/* <h1>Change Color</h1>
            <Change_Color></Change_Color>
            <h1>Demo Todo Form</h1>
            <TodoForm onSubmit={handleTodoFormSubmit}></TodoForm>
            <h1>Demo Todo List use useState</h1>
            <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
            <h1>demo PostList</h1>
            <PostList getDataPostList={dataPostList}
                addDataPostList={handleDataPostList}
                deleteDataPostLost={handleDeleteDataPostList}
                getDataEdit={handleGetDataEdit}
                pushDataEdit={handlePushDataEdit}
            ></PostList>
            {/* <Test></Test> */}

        </div>
    );
}

export default App;
