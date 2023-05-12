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
![image](https://github.com/rameshgchavan/stb-crm-backend/assets/109573381/e220e09e-fa51-4cef-b499-97a23906357c)

##
### Steps to set sever >>>
##

### Setting environment keys (.env)
- PORT and MONGODB_URL

### Ignore (.ignore)
- .env and /node_modules

### Create Models (/models/(e.g. UsersModel.js))
- Import mongoose >> Create schema >> export mongoose model as module

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
