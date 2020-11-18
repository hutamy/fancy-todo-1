// const SERVER = 'https://fancy-toodoo.herokuapp.com'
const SERVER = 'http://localhost:3000'
let edited_id 

$(document).ready(function(){
    const access_token = localStorage.getItem('access_token')
    if(access_token){
        todoList()
    }else {
        loginPage()
    }
})


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
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
        let full_name = response.full_name
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('full_name', full_name)
        todoList()
    
        $('#email').val('')
        $('#password').val('')

        Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
        })  
    })
    .fail(err => {
        Swal.fire(
          'Error!',
          err.responseJSON.msg,
          'ERROR'
        )
        loginPage()
    })
}


function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `${SERVER}/googleLogin`,
        data: {
            google_access_token
        }
    })
    .done(response => {
        let access_token = response.access_token
        localStorage.setItem('access_token', access_token)
        todoList()
        Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
        })
    })
    .fail(err => {
        Swal.fire(
          'Error!',
          err.responseJSON.msg,
          'ERROR'
        )
        loginPage()
    })
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    
}


function register(e){
    e.preventDefault()
    const email = $('#email_register').val()
    const password = $('#password_register').val()
    const full_name = $('#full_name_register').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER}/register`,
        data: {
            email: email,
            password: password,
            full_name: full_name
        }
    })
    .done(response => {
        let access_token = response.access_token
        let full_name = response.full_name
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('full_name', full_name)
        todoList()
        Toast.fire({
            icon: 'success',
            title: 'Registered in successfully'
        })
        $('#email_register').val('')
        $('#password_register').val('')
        $('#full_name_register').val('')
    })
    .fail(err => {
        signUp()
        Swal.fire(
            'Error!',
            err.responseJSON.msg,
            'ERROR'
        )
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
            console.log(el)
            $('#allTodos').append(`
            <div class="card text-center mt-5 mb-5">
                <div class="card-header text-dark font-weight-bolder" style="background-color: #ecebc9">
                    ${el.title}
                </div>
                <div class="card-body" style="background-color: whitesmoke; opactiy: 0.5;">
                    <p class="card-text text-dark">${el.description}<br>${el.due_date}</p>
                    <a href="#" class="btn btn-sm btn-light" onclick="checkId(${el.id})" style="margin-right: 5px">Edit</a>     
                    <a href="#" class="btn btn-sm btn-success" onclick="editStatus(${el.id})" style="margin-right: 5px">${el.status}</a>  
                    <a href="#" class="btn btn-sm btn-primary" onclick="deleteTodo(${el.id})">Delete</a>
                </div>
                <div class="card-footer text-dark" style="background-color: #ecebc9">
                    Created By: ${el.User.full_name}
                </div>
            </div>
            `)
        });
    })
    .fail(err => {
        Swal.fire(
            'Error!',
            err.responseJSON.msg,
            'ERROR'
        )
    })
}


function todoById() {
    myTask()
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        url: `${SERVER}/todos/my-task`,
        method: 'GET',
        headers: {
            access_token: access_token
        }
    })
    .done(todos => {
        $('#user-task').empty()
        todos.forEach(el => {
            $('#user-task').append(`
            <div class="card text-center mt-5 mb-5">
                <div class="card-header text-dark font-weight-bolder" style="background-color: #ecebc9">
                    ${el.title}
                </div>
                <div class="card-body" style="background-color: whitesmoke, opacity: 0.5">
                    <p class="card-text text-dark">${el.description}<br>${el.due_date}</p>
                    <a href="#" class="btn btn-sm btn-light" onclick="edit(${el.id})" style="margin-right: 5px">Edit</a>     
                    <a href="#" class="btn btn-sm btn-success" onclick="editStatus(${el.id})" style="margin-right: 5px">${el.status}</a>  
                    <a href="#" class="btn btn-sm btn-primary" onclick="deleteTodo(${el.id})">Delete</a>
                </div>
            </div>
            `)
        });
    })
    .fail(err => {
        Swal.fire(
            'Error!',
            err.responseJSON.msg,
            'ERROR'
        )
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
        Swal.fire(
            'Added!',
            'New ToDo has been added.',
            'success'
        )
        $('#add_title').val('')
        $('#add_description').val('')
        $('#add_status').val('')
        $('#add_due_date').val('')
    })
    .fail(err => {
        add()
        Swal.fire(
            'Error!',
            err.responseJSON.msg,
            'ERROR'
        )
    })
}


function editStatus(id){
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: 'PATCH',
        url: `${SERVER}/todos/${id}`,
        headers: {
            access_token: access_token
        },
    })
    .done(response => {
        todoList()
        Swal.fire(
            'Edited!',
            'Your ToDo has been updated.',
            'success'
        )
    })
    .fail(err => {
        edit()
        Swal.fire(
            'Error!',
            err.responseJSON.msg,
            'ERROR'
        )
    })
}


function checkId(id) {
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: 'GET',
        url: `${SERVER}/todos/${id}`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
        if(!response){
            Swal.fire(
                'Error!',
                'Authentication failed',
                'ERROR'
            )
            viewTodo()
        }
        else{
            $('#edit_title').val(response.title)
            $('#edit_description').val(response.description)
            $('#edit_status').val(response.status)
            $('#edit_due_date').val(response.due_date)
            edit(id)
        }
    })
    .fail(err => {
        Swal.fire(
            'Error!',
            err.responseJSON.msg,
            'ERROR'
        )
    })
}


function editTodo(e){
    e.preventDefault()
    const id = edited_id
    const access_token = localStorage.getItem('access_token')
    const title = $('#edit_title').val()
    const description = $('#edit_description').val()
    const status = $('#edit_status').val()
    const due_date = $('#edit_due_date').val()
   
    $.ajax({
        method: 'PUT',
        url: `${SERVER}/todos/${id}`,
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
        Swal.fire(
            'Edited!',
            'Your ToDo has been updated.',
            'success'
        )
        $('#edit_title').val('')
        $('#edit_description').val('')
        $('#edit_status').val('')
        $('#edit_due_date').val('')
    })
    .fail(err => {
        console.log(err)
        edit()
        Swal.fire(
            'Error!',
            err.responseJSON.msg,
            'ERROR'
        )
    })
}


function deleteTodo(id){ 
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        url: `${SERVER}/todos/${id}`,
        method: 'DELETE',
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
        todoList()
        Swal.fire(
            'Deleted!',
            'Your ToDo has been deleted',
            'Sucess'
        )
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!',
            err.responseJSON.msg,
            'ERROR'
        )
    })
}


function logout (e) {
    signOut()
    e.preventDefault()
    localStorage.clear();
    loginPage()
    Toast.fire({
        icon: 'success',
        title: 'Logout successful'
    })
}


function movieRecommendation () {
    const access_token = localStorage.getItem('access_token')
    popularMovie()
    $.ajax({
        method: 'GET',
        url: `${SERVER}/popular-movies`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => { 
        $('#movies').empty() 
        response.forEach(element => {
            $('#movies').append(`
                <div class="movie-card" 
                    style="background: #ceca96;
                    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 315px;
                    margin: 2em;
                    border-radius: 10px;
                    display: inline-block;
                    position: relative;">
                    <div class="movie-header" 
                        style="padding: 0;
                        margin: 0;
                        height: 367px;
                        width: 100%;
                        display: block;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;">
                        <img src=${element.poster_path} width="100%" height="100%">
                    </div>
                    <div class="movie-content" 
                        style="padding: 18px 18px 24px 18px;
                        margin: 0 auto;
                        width: 100%;">
                        <div class="movie-content-header" style=" display: table;
                            width: 100%;
                            margin: 0 auto;
                            text-align: center;">
                        <h3 class="movie-title">${element.title}</h3>
                    </div>
                  </div>
                </div>
            `)
        });
    }) 
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!',
            err.responseJSON.msg,
            'ERROR'
        )
    })
}


function todoList() {
    viewTodo()
    $('#content').show()
    $('#content_navbar').show()
    $('#landing').hide()
    $('#register').hide()
    $('#add').hide()
    $('#editForm').hide()
    $('#allMovies').hide()
    $('#my-task').hide()
}


function add(){
    $('#content').hide()
    $('#content_navbar').show()
    $('#landing').hide()
    $('#register').hide()
    $('#add').show()
    $('#editForm').hide()
    $('#allMovies').hide()
    $('#my-task').hide()
}

function edit(id) {
    $('#content').hide()
    $('#content_navbar').show()
    $('#landing').hide()
    $('#register').hide()
    $('#add').hide()
    $('#editForm').show()
    $('#allMovies').hide()
    $('#my-task').hide()
    edited_id = id
}

function signUp(){
    $('#content').hide()
    $('#content_navbar').hide()
    $('#landing').hide()
    $('#register').show()
    $('#add').hide()
    $('#editForm').hide()
    $('#allMovies').hide()
    $('#my-task').hide()
}


function loginPage(){
    $('#content').hide()
    $('#content_navbar').hide()
    $('#landing').show()
    $('#register').hide()
    $('#add').hide()
    $('#editForm').hide()
    $('#allMovies').hide()
    $('#my-task').hide()
}


function popularMovie(){
    $('#content').hide()
    $('#content_navbar').show()
    $('#landing').hide()
    $('#register').hide()
    $('#add').hide()
    $('#editForm').hide()
    $('#allMovies').show()
    $('#my-task').hide()
}


function myTask() {
    $('#content').hide()
    $('#content_navbar').show()
    $('#landing').hide()
    $('#register').hide()
    $('#add').hide()
    $('#editForm').hide()
    $('#allMovies').hide()
    $('#my-task').show()
}