# fancy-todo

## **Create Todos**

	Create todo list

-   **URL**
    
    /todos
    
-   **Method:**
    
     `POST`  

   **Data Params**
    
    {
    title: String,
    description: String,
    status: String,
    due_date: Date
    }
    
-   **Success Response:**
    
    Return data from Todo list
    
    -   **Code:**  201  **Content:**  `[{title: "Groceries Shopping", description: "get some chicken", status: "incomplete", due_date: 2020-10-26}] (array of objects)`
        
-   **Error Response:**
    
    -   **Code:**  400  **Content:**  `{ error : "Validation Errors" }`
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`
    

## **Show All Todos**

    Show all todos from users

-   **URL**
    
    /todos
    
-   **Method:**
    
    `GET`
    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `[{title: "Groceries Shopping", description: "get some chicken", status: "incomplete", due_date: 2020-10-26}] (array of objects)`
-   **Error Response:**
    
    -   **Code:**  500  
        **Content:**  `{ error : "Internal Server Error" }`
    

## **Show Todos by Id**

    Show todo by User id

-   **URL**
    
    /todos/my-task

    
-   **Method:**
    
    `GET`
    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `[{title: "Groceries Shopping", description: "get some chicken", status: "incomplete", due_date: 2020-10-26}] (array of objects)`
    
-   **Error Response:**
    
    -   **Code:**  500  
        **Content:**  `{ error : "Internal Server Error" }`
    

## **Replace Todos**

	Replace existing todos with new data

-   **URL**
    
    /todos/edit/:id

- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `PUT`  

**Data Params**
    
    {
    title: String,
    description: String,
    status: String,
    due_date: Date
    }
    
-   **Success Response:**
    
    Return data from Todo list
    
    -   **Code:**  200  **Content:**   `[{title: "Groceries Shopping", description: "get some chicken", status: "incomplete", due_date: 2020-10-26}]`
        
-   **Error Response:**
    
    -   **Code:**  400  **Content:**  `{ error : "Validation Errors" }`
    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`

## **Update Todos**

	Update existing todo's status with new data

-   **URL**
    
    /todos/update/:id

- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `PATCH`  

**Data Params**
    
    {status: String}
    
-   **Success Response:**
    
    Return data from Todo list
    
    -   **Code:**  200  **Content:**   `[{title: "Groceries Shopping", description: "get some chicken", status: "incomplete", due_date: 2020-10-26}]`
        
-   **Error Response:**
    
    -   **Code:**  400  **Content:**  `{ error : "Validation Errors" }`
    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


## **Delete Todos**

	Delete existing todo

-   **URL**
    
    /todos/delete/:id

- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `DELETE`  
    
-   **Success Response:**
    
    Return data from Todo list
    
    -   **Code:**  200  **Content:**  `{messsage: "Todo success to delete"}`
        
-   **Error Response:**
    
    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


    ## **Register User**

	Add new user

-   **URL**
    
    /register

**Data Params**
    
    {
    full_name: String,
    email: String,
    password: String
    }

-   **Method:**
    
     `POST`  
    
-   **Success Response:**
    
    Return data from Todo list
    
    -   **Code:**  201  **Content:**  `{id: 1, email: "test@mail.com", full_name:"Amy"}`
        
-   **Error Response:**
   
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


    ## **Log In User**

	Log in user

-   **URL**
    
    /login

**Data Params**
    
    {
    email: String,
    password: String
    }

-   **Method:**
    
     `POST`  
    
-   **Success Response:**
    
    Return data from Todo list
    
    -   **Code:**  201  **Content:**  `{access_token: "567hbnmu087"}`
        
-   **Error Response:**
   
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


    ## **Log In Google**

	Log in user from google account

-   **URL**
    
    /googleLogin

-   **Method:**
    
     `POST`  
    
-   **Success Response:**
    
    Return data from Todo list
    
    -   **Code:**  201  **Content:**  `{access_token: "567hbnmu087"}`
        
-   **Error Response:**
   
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


    ## **Movie Recommendation**

	See popular movie from TMDB

-   **URL**
    
    /popular-movies

-   **Method:**
    
     `GET`  
    
-   **Success Response:**
    
    Return data popular movies from TMDB
    
    -   **Code:**  201  **Content:**  `[{title: "Mulan", poster_path: "img.jpg"}]`
        
-   **Error Response:**
   
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`
