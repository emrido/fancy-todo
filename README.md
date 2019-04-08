# Fancy Todo!

## User Routes
| Route | HTTP | Request | Response |
|--|--|--|--|
| `/users/register` | POST | name: String (**required**)<br>email: String (**required**)<br>password: String (**required**) | *Success:*<br>201: User Created<br>*Error:*<br>500: Internal server error |
| `/users/google-login` | POST | email: String (**required**)<br>password: String (**required**) | *Success:*<br>200: Login Succeed!<br>*Error:*<br>500: Internal server error |
| `/users/login` | POST | email: String (**required**)<br>password: String (**required**) | *Success:*<br>200: Login Succeed!<br>*Error:*<br>500: Internal server error |

## Todo Routes
| Route | HTTP | Request | Response |
|--|--|--|--|
| `/todos/add` | POST | title: String (**required**)<br>description: String (**required**)<br>due_date: Date (**required**) | *Success:*<br>201: Todo created<br>*Error:*<br>500: Internal server error |
| `/todos/list` | GET |  | *Success:*<br>200: `[{ <object todo> }, ... {}]`<br>*Error:*<br>500: Internal server error |
| `/todos/update` | PUT |  | *Success:*<br>200: Todo updated!<br>*Error:*<br>500: Internal server error |
| `/todos/delete` | DELETE |  | *Success:*<br>200: Todo Deleted!<br>*Error:*<br>500: Internal server error |

## Usage

Run this command: 
```
$ npm install
$ npm run dev
$ live-server --host=localhost
```

## Access point:
Server: http://localhost:3000

Client: http://localhost:8080
