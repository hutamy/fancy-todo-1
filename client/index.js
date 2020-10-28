const SERVER = 'http://localhost:3000'

$(document).ready(function(){
    const access_token = localStorage.getItem('access_token')
    if(access_token){
        todoList()
    }else {
        loginPage()
    }
})


function login(e) {

    e.preventDefault()
    const email = $('#email').val()
    const password = $('#password').val()
    
    $.ajax({
        method: 'POST',
        url: `${SERVER}/login`,
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {
        let access_token = response.access_token
        localStorage.setItem('access_token', access_token)
        $('#content').show()
        $('#content_navbar').show()
        $('#landing').hide()
        $('#landing_navbar').hide()

        //ngosongin isi form after login
        $('#email').val('')
        $('#password').val('')

        viewTodo()
    })
    .fail(err => {
        $('#content').hide()
        $('#content_navbar').hide()
        $('#landing').show()
        $('#landing_navbar').show()
    }) 
}


function register(e){
    e.preventDefault()
    const email = $('#email_register').val()
    const password = $('#password_register').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER}/register`,
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {
        viewTodo()
    })
    .fail(err => {
        signUp()
    }) 

}


function viewTodo() {
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        url: `${SERVER}/todos`,
        method: 'GET',
        headers: {
            access_token: access_token
        }
    })
    .done(todos => {
        $('#allTodos').empty()
        todos.forEach(el => {
            $('#allTodos').append(`
            <tr>
                <th scope="row">${el.id}</th>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</td>
                <td>${el.due_date}</td>
                <td onclick="edit()">Edit</td>
                <td onclick="deleteTodo(${el.id})">Delete</td>
            </tr>
            `)
        });
    })
    .fail(err => {
        console.log(err)
    })
}


function addTodo(e){
    const access_token = localStorage.getItem('access_token')

    e.preventDefault()
    const title = $('#add_title').val()
    const description = $('#add_description').val()
    const status = $('#add_status').val()
    const due_date = $('#add_due_date').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER}/todos`,
        headers: {
            access_token: access_token
        },
        data: {
            title: title,
            description: description,
            status: status,
            due_date: due_date,
        }
    })
    .done(response => {
        todoList()
    })
    .fail(err => {
        add()
    })

}


function editTodo(e){
    const access_token = localStorage.getItem('access_token')

    e.preventDefault()
    const title = $('#add_title').val()
    const description = $('#add_description').val()
    const status = $('#add_status').val()
    const due_date = $('#add_due_date').val()

    $.ajax({
        method: 'PUT',
        url: `${SERVER}/edit/${id}`,
        headers: {
            access_token: access_token
        },
        data: {
            title: title,
            description: description,
            status: status,
            due_date: due_date,
        }
    })
    .done(response => {
        todoList()
    })
    .fail(err => {
        edit()
    })
}


function deleteTodo(id){ //kak deletenya gak bisa
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        url: `${SERVER}/delete/${id}`,
        method: 'DELETE',
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
        todoList()
    })
    .fail(err => {
        console.log(err)
    })
}


function todoList() {
    viewTodo()
    $('#content').show()
    $('#content_navbar').show()
    $('#landing').hide()
    $('#landing_navbar').hide()
    $('#register').hide()
    $('#add').hide()
    $('#editForm').hide()
}


function add(){
    $('#content').hide()
    $('#content_navbar').show()
    $('#landing').hide()
    $('#landing_navbar').hide()
    $('#register').hide()
    $('#add').show()
    $('#editForm').hide()
}

function edit() {
    $('#content').hide()
    $('#content_navbar').show()
    $('#landing').hide()
    $('#landing_navbar').hide()
    $('#register').hide()
    $('#add').hide()
    $('#editForm').show()
}

function signUp(){
    $('#content').hide()
    $('#content_navbar').hide()
    $('#landing').hide()
    $('#landing_navbar').show()
    $('#register').show()
    $('#add').hide()
    $('#editForm').hide()
}

function loginPage(){
    $('#content').hide()
    $('#content_navbar').hide()
    $('#landing').show()
    $('#landing_navbar').show()
    $('#register').hide()
    $('#add').hide()
    $('#editForm').hide()
}