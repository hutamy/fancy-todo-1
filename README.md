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

    Show all todos

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

    Show todo by id

-   **URL**
    
    /todos/:id

- **URL Params**

	**Required:**

		`id=[integer]`
    
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
    
    /todos/:id

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

	Update existing todos with new data

-   **URL**
    
    /todos/:id

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
    
    /todos/:id

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

