const url = 'http://localhost:3000/';

$(document).ready(function () {
    preLogin()


    $('#login-form')
        .click(() => {
            $('#login-form')
                .show()
        })

    if (localStorage.getItem('token')) {
        postLogin()
    }
});

function show_add_todo_form() {
    const raw = `
    <div class="row animated fadeInUp" style="margin-top: 5rem">
        <form class="col s12" >
            <div class="row">
                <div class="col s6 offset-s3">
                    <h1>Add New Todo</h1>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input id="name" type="text" class="validate">
                    <label for="name">Title</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <textarea id="description" class="materialize-textarea"></textarea>
                    <label for="description">Description</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input id="due_date" type="text" class="datepicker">
                    <label for="due_date">Due Date</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <a class="waves-effect waves-light btn-small" onclick="addTodo()">Create Todo</a>
                </div>
            </div>
        </form>
    </div>
    `;
    $('#homepage')
        .empty()
    $('#todo-list')
        .empty()
    $('#add-todo-form')
        .empty()
        .append(raw)
    $('.datepicker')
        .datepicker();
}

function todo_list() {
    $('#homepage')
        .empty()
    $('#add-todo-form')
        .empty()
    $('#todo-list')
        .empty()
        .append(`
            <h1 style="margin-bottom: 2rem; text-align: center;" class="animated fadeInDown">Todo List</h1>
        `)

    $
        .ajax({
            url: url + 'todos/',
            method: 'get',
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(todos => {
            todos.forEach(todo => {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                let raw = `
                <div class="col s3">
                    <div class="card small animated fadeInUp">
                        <div class="card-content">
                            <span class="card-title activator">${todo.name}</span>
                            <span>
                                <p>Due date: ${new Date(todo.due_date).toLocaleDateString('en', options)}</p>
                            </span>
                            <br>
                            <form action="#" onclick="updateTodo('${todo._id}', ${!todo.status})">
                                <p>
                                    <label>
                                    <input type="checkbox" ${todo.status ? checked = "checked" : checked = ""} />
                                        <span></span>
                                    </label>
                                </p>
                            </form>
                        </div>
                        <div class="card-reveal">
                           <span class="card-title grey-text text-darken-4">${todo.name}<i class="material-icons right">close</i></span>
                            <p>${todo.description}</p>
                            <span>
                                <i class="material-icons left" onclick="deleteTodo('${todo._id}')" style="cursor: pointer;">delete</i>
                            </span>
                        </div>
                    </div>
                </div>`

                $('#todo-list')
                    .append(raw)
            })
        })
        .fail((jqXHR, textstatus) => {
            swal(jqXHR.responseJSON.message)
        })
}

function show_register_form() {
    const raw = `
    <div class="row animated fadeInUp" style="margin-top: 5rem">
        <form class="col s12">
            <div class="row">
                <div class="col s6 offset-s3">
                    <h1>Register</h1>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input id="name" type="text" class="validate">
                    <label for="name">Name</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input id="email" type="email" class="materialize-email"></input>
                    <label for="email">Email</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <input id="password" type="password" class="password">
                    <label for="password">Password</label>
                </div>
                <div class="input-field col s6 offset-s3">
                    <a class="waves-effect waves-light btn-small" onclick="register()">Register</a>
                </div>
            </div>
        </form>
    </div>`

    $('#homepage')
        .empty()
    $('#login-form')
        .hide()
    $('#register-form')
        .empty()
        .append(raw)

}

function show_login_form() {
    $('#homepage')
        .empty()
    $('#register-form')
        .empty()
    $('#login-form')
        .show()
}

function deleteTodo(id) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $
                    .ajax({
                        url: url + `todos/${id}`,
                        method: 'delete',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                    .done(response => {
                        todo_list();
                        swal("Todo deleted!", {
                            icon: "success",
                        });
                    })
                    .fail((jqXHR, textstatus) => {
                        swal(jqXHR.responseJSON.message)
                    })
            }
        });
}

function addTodo() {
    const name = $('#name').val()
    const description = $('#description').val() || null
    const due_date = $('#due_date').val() || null

    $
        .ajax({
            url: url + `todos/`,
            method: 'post',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                name, description, due_date
            }
        })
        .done(response => {
            todo_list();
        })
        .fail((jqXHR, textstatus) => {
            swal(jqXHR.responseJSON.message)
        })
}



function updateTodo(id, status) {
    event.preventDefault();

    $
        .ajax({
            url: url + `todos/${id}`,
            method: 'put',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                status: status
            }
        })
        .done(response => {
            todo_list();
        })
        .fail((jqXHR, textstatus) => {
            swal(jqXHR.responseJSON.message)
        })
}

function register() {
    event.preventDefault();

    const name = $('#name').val();
    const email = $('#email').val();
    const password = $('#password').val();

    $
        .ajax({
            url: url + `users/register`,
            method: 'post',
            data: {
                name, email, password
            }
        })
        .done(response => {
            show_login_form()
        })
        .fail((jqXHR, textstatus) => {
            swal(jqXHR.responseJSON.message)
        })
}

function login() {
    event.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();

    $
        .ajax({
            url: url + `users/login`,
            method: 'post',
            data: {
                email, password
            }
        })
        .done(response => {
            localStorage.setItem('token', response);

            postLogin();
        })
        .fail((jqXHR, textstatus) => {
            swal(jqXHR.responseJSON.message)
        })
}

function onSignIn(googleUser) {
    event.preventDefault()
    const id_token = googleUser.getAuthResponse().id_token;

    $
        .ajax({
            url: url + 'users/google-login',
            method: 'post',
            data: {
                token: id_token
            }
        })
        .done((response) => {
            localStorage.setItem('token', response)

            postLogin()
        })
        .fail((jqXHR, textstatus) => {
            swal(jqXHR.responseJSON.message)
        })

}

function show_homepage() {

    $('#add-todo-form')
        .empty()
    $('#todo-list')
        .empty()
    $('#homepage')
        .empty()
    $('#login-form')
        .hide()
    $('#register-form')
        .empty()
    $('#homepage')
        .append(`
        <header class="animated fadeIn">
            <h1>Write it_ <br> Do it_</h1>
        </header>
        `)
}

function logout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2
        .signOut()
        .then(function () {
            localStorage.clear()
            $('#todo-list')
                .empty()

            $('#login-nav')
                .show()

            preLogin()
        })
        .catch(err => {
            localStorage.clear()
            console.log(err)
        })
}

function postLogin() {
    $('#register-form')
        .empty()

    $('#login-form')
        .hide()

    $('#nav-mobile')
        .show()

    $('.fixed-action-btn')
        .show()

    $('.fixed-action-btn')
        .floatingActionButton()
        .click(show_add_todo_form);

    todo_list();

    $('#home')
        .click(todo_list);

    $('#login-nav')
        .hide()
}

function preLogin() {
    $('#nav-mobile')
        .hide()

    $('.fixed-action-btn')
        .hide()

    show_homepage()
}