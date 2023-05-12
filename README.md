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
- Create constant into it 
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/5d70c672-b09a-4763-940c-bc6b6cd583b4)

### actions
- Create index.js and users.js 
- Import constants and create actions into users.js and expot
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/4ac4802c-7888-4111-804e-034f539d3b3c)

- Import all actions into index.js and export 
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/ae35514b-8ec1-4336-bc7e-d947d622937e)


### reducers
- Create index.js and users.js 
- Import constants and create reducer into users.js and expot
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/35f39516-4121-4794-b072-c7ab19273c8e)

- Import combineReducers method from redux into index.js
- Import all reducres combine them into index.js and export as rootReducer
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/f82be480-7fc5-49a8-94ba-692c30cb9997)


### store
- Create index.js
- Import createStore, applyMiddleware, compose methos from redux into index.js
- Import redux-thunk as thunk into index.js
- Import rootReducer into index.js
- Create store and export
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/e5653d62-b856-46bf-80e1-7700844765d1)


#### Thus created redux state now use it
- Into root index.js file import Provider compoment from react-redux
- Import store
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/936d5f74-38e0-4cab-b65d-1999c214f1d5)

- Wrap root App component inside Provider component as image
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/0187a9d2-8c9c-4d98-b145-aa1f871be878)

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
