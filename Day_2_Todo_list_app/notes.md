// --------------- learning --------------------------

// local storage 
stores data as a string

let todos = JSON.parse(localStorage.getItem("todos")) || [];

Reads todos from localStorage, which is stored as a string.
Converts it to a JavaScript array using JSON.parse().
If there’s nothing in storage yet, initialize as an empty array [].

stringify() : convert  js object --> json String
parse() : convert json string --> js object








// --------------------------- methods ------------------------

saveTodos() Saves it in the browser’s localStorage.

renderTodos() 

startEdit()

saveEdit()

deleteTodo()

addTodo()




some()  some() is an array method that checks whether at least ONE element in an array satisfies a given condition.
