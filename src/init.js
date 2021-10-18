console.log("init.js start");

import axios from 'axios';
const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/';

import {updateTask, editTask, addTask, deleteTask} from './main.js';


function getTasks() {
    /***
     * @todo Fetch the tasks created by the user and display them in the dom.
     */
    const taskList = document.querySelector('ul.todo-available-tasks');

     axios({
         method: 'get',
         headers: {
             Authorization: 'Token ' + localStorage.getItem('token'),
         },
         url: 'https://todo-app-csoc.herokuapp.com/todo/',
     }).then(res => {
         const todos = res.data;

         for(var todo of todos) {
             taskList.innerHTML += `
             <li class="list-group-item d-flex justify-content-between align-items-center">

                    <input id="input-button-${todo.id}" type="text" class="form-control todo-edit-task-input hideme" placeholder="Edit The Task">
                    <div id="done-button-${todo.id}"  class="input-group-append hideme">
                        <button class="btn btn-outline-secondary todo-update-task" type="button" id="update-task-${todo.id}-button">Done</button>
                    </div>
                    <div id="task-${todo.id}" class="todo-task">
                        ${todo.title}
                    </div>

                    <span id="task-actions-${todo.id}">
                        <button style="margin-right:5px;" type="button" id="edit-task-${todo.id}-button"
                            class="btn btn-outline-warning">
                            <img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
                                width="18px" height="20px">
                        </button>
                        <button type="button" class="btn btn-outline-danger" id="delete-task-${todo.id}-button">
                            <img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
                                width="18px" height="22px">
                        </button>
                    </span>
            </li>
             `;

            document.getElementById(`update-task-${todo.id}-button`).addEventListener("click", function() {updateTask(todo.id)});
            document.getElementById(`delete-task-${todo.id}-button`).addEventListener("click", function() {deleteTask(todo.id)});
            document.getElementById(`edit-task-${todo.id}-button`).addEventListener("click", function() {editTask(todo.id)});   
            

         }
     });
}

axios({
    headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
    },
    url: API_BASE_URL + 'auth/profile/',
    method: 'get',
}).then(function({data, status}) {
  document.getElementById('avatar-image').src = 'https://ui-avatars.com/api/?name=' + data.name + '&background=fff&size=33&color=007bff';
  document.getElementById('profile-name').innerHTML = data.name;
  getTasks();
})


console.log("init.js end");
