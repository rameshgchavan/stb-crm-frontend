# stb-crm-frontend

### Step to create project on local machine
1. create: stb-crm-project folder into your drive
2. type: "cmd" in folder address bar and hit enter. Command prompt will open
3. type: npx create-react-app stb-crm-frontend and hit enter
4. after successfull creation of app type cd stb-crm-frontend and hit enter
5. type: "code ." and hit enter. VS code editor will open
6. create: components, pages, redux, formik and routes folders into src folder

### Requarements: 
- type: npm install bootstrap, react-bootstrap, react-router-dom, axios, redux, react-redux, redux-thunk, formik and yup

##### Project structure looks like as shown in image
![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/b7a976c9-6506-4267-ad91-61548f1a1c76)

##
### Steps to create redux state >>>
##
- Create folders into redux folder as following
1. constants
2. actions
3. reducers
4. store

### constants
- Create users.js 
- Create constant into it (e.g const AUTHENTICATE_USER = "AUTHENTICATE_USER") and expot

### actions
- Create index.js and users.js 
- Import constants and create actions into users.js and expot
- Import all actions into index.js and export 

### reducers
- Create index.js and users.js 
- Import constants and create reducer into users.js and expot
- Import combineReducers method from redux into index.js
- Import all reducres combine them into index.js and export as rootReducer

### store
- Create index.js
- Import createStore, applyMiddleware, compose methos from redux into index.js
- Import redux-thunk as thunk into index.js
- Import rootReducer into index.js
- Create store and export

#### Thus created redux state now use it
- Into root index.js file import Provider compoment from react-redux
- Import store
- Wrap root App component inside Provider component
- <Provider  store={store}><App /></Provider>


### Routes (/Routes/(e.g. UsersRoute.js))
- Import express and models (e.g. UsersModel)
- Create express.Router object (e.g. UsersRoutes)
- Create route http request as
  - route("/login").post
  - route("/isemail").post
  - route("/signup").post
  - route("/resetpass").put 
- Export router (e.g. UsersRoutes) as module

### Setting Server (server.js)
- Import dependancies/middlewares
  - express, mongoose and dotenv
- Import Routes (e.g. UsersRoute)
- Create object of express as app 
- Environment setting
  - dotEnv.config();
  - const PORT = process.env.PORT;
  - const connectionString = process.env.MONGODB_URL
- connect to mongodb using mongoose and listen to port
- Use middlewares and routes in express
  - app.use(cors())
  - app.use(express.json())
  - app.use("/users", UsersRoutes)
- To run frontend
  - app.use(express.static('./client/build'))

### To check server on local machine
- Type "nodemon server" in command prompt and hit enter 
