const listValue = document.querySelector(".todoValue");
const todoLists = document.querySelector(".todoLists");




// add task 
document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
});

let todoListValue = [];

const addTodoList = (e) => {
    e.preventDefault();

    todoListValue = getTodoListFromLS();
    let newTodo = listValue.value.trim();

    listValue.value = ""; // to remove text field data after clicking add btn. 

    if (newTodo.length != 0 && !todoListValue.includes(newTodo)) {

        todoListValue.push(newTodo);

        // todoListValue = [... new set(todoListValue)]; 

        addTodoListLocalStorage(todoListValue);

        const liElement = document.createElement("li");
        liElement.innerHTML =  newTodo
        // `
        // <input type="checkbox" class="checkbox"> 
        // <div class="task-button">
        //     <button class="edit-btn"><i></i></button>
        // </div> 
        // <span>${newTodo}</span>
        // `;

        todoLists.append(liElement);
    }
}

const getTodoListFromLS = () => {
    return JSON.parse(localStorage.getItem("todoData")) || []; // JSON.parse is used to simply convert local storage data into original format
}

const addTodoListLocalStorage = (todo) => {
    return localStorage.setItem("todoData", JSON.stringify(todo)); //JSON.stringify in local storare we must need to store in string format thats why we use 
}


// remove task 
todoLists.addEventListener("click", (e) => removeTodoList(e));

const removeTodoList = (e) => {
    console.log(e.target.textContent);

    let currentTodo = e.target;

    updatedTodoList = todoListValue.filter((curTodoValue) => curTodoValue != e.target.textContent);

    addTodoListLocalStorage(updatedTodoList);

    currentTodo.remove();
}


// desplay all task 
const showTodoList = () => {
    todoListValue = getTodoListFromLS();

    todoListValue.forEach((curTodo) => {
        const liElement = document.createElement("li");
        liElement.innerHTML = curTodo;
        todoLists.append(liElement);
    });
}

showTodoList();

