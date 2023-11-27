## Set Top Boxes and Cutomers Relationship Management Web App

### About App
This app manages relationship between set top boxes and customers. It let the user enter, update, remove and show set top box as well customter details over the time. This is a responsive UI so user can access this app on Computer, Tab and Mobile as well.

### Project description
- This project has developed by using react js and devided into mudules which contains jsx componets, react routes, react redux, custom functions, navigation pages, axios crud apis.
- Component folder again devided into modules which coantains cards components, charts components, filters components, forms components, modals components, prints components and security components.
- Project folders and files structure looks like as shown in following image.

![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/15cba04c-326e-4a29-94e6-480d18178021)

### ./src/`components`
- #### /`cards`/`CustomerCard.jsx`
This component shows customer details and has three buttons, 
1. Yellow Booksatck button: On clicking this button it shows PackageModal
2. WhatsappSquare button: On clicking this button it copies the customer details to clipboard
3. ReadMore button: On clicking this button it shows CusomterModal

- #### /`cards`/`TransactioCard.jsx`
This component shows customer details and has three buttons, 
1. Yellow Rupees button: On clicking this button it shows PackageModal
2. WhatsappSquare button: On clicking this button it copies the customer details to clipboard
3. ReadMore button: On clicking this button it shows CusomterModal

- #### /`cards`/`PackageCard.jsx`
This component has devided in three sections
1. customer details section: shows customer details
2. filter section: filters month and year and list dates if any transaction found
3. bouquet details section: shows details of transactions

- #### /`cards`/`UserCard.jsx`
This component shows user name and last login date and time. It has two buttons 'Rename' and 'Block'

- #### /`charts`/`STBPieChart.jsx`
This component shows statistics graph of customers in form of pie chart

- #### /`charts`/`STBRCBarChart.jsx`
This component shows statistics graph of transactions of a selected year in form of bar chart. This shows two bar charts
1. Bar chart of paid STBs
2. Bar chart of free STBs

- #### /`filters`/`CustomersFilter.jsx`
This component filters and paginate customers and has divided in two sections
1. Filter section: filteration of customers as user choice
2. Pagination section: Navigate pages of filtered customers

- #### /`filters`/`TransactionsFilter.jsx`
This component filters and paginate transactions and has divided in two sections
1. Filter section: filteration of transactions as user choice
2. Pagination section: Navigate pages of filtered transactions

- #### /`filters`/`UsersFilter.jsx`
This component filters users and has divided in two actions
1. Filter users by clicking Buttons
2. Filter users by type in text box and search button

- #### /`forms`/`customerForm`
     - /`index.jsx`
       
This is a root component and renders three components CustomerSection, STBSection and SeedSection.
This component has Save (in case of adding new cusomter), Update and Delete buttons

- #### /`forms`/`customerForm`
     - /`CustomerSection.jsx`, /`STBSection.jsx`, /`SeedSection.jsx`

 If user updating a customer then these component shows prefilled customer and STB details else empty values

- #### /`forms`/`packageForm`
     - /`index.jsx`
       
This is a root component and renders three components CustomerSection, FilterSection and PackageSection.

- #### /`forms`/`packageForm`
     /`FilterSection.jsx`

This component filters transactions of selected year and month that has chosen by user

- #### /`forms`/`packageForm`
     - /`CustomerSection.jsx`, /`PackageSection.jsx`

This shows details of customer, STB and transactions (bouquets)

- #### /`modals`/`CustomerModal.jsx`
This renders customerForm 

- #### /`modals`/`PackageModal.jsx`
This renders packageForm 

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

#### To fetch data from redux state
- Import useSelector method from react-redux
- Create constant of useSelector and fetch data from redux state to it
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/b4270e5d-8db1-4272-ab0b-998174974248)
#### Update data to redux state
- Import useDispatch method from react-redux
- Import actions ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/1abcdabf-62e0-40cd-abe0-511b310829ea)
- Create an object of useDispatch method ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/94ce39f4-2062-4234-a523-36b981cea975)
- Dispatch action with data ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/cf6db8b0-211b-49e3-af25-10664ef3f1c5)

### Create routes in routes folder and navigate by NavBar.js

## Flow>>
- Home page with login
- After login Customer page will be default page
- If user is admin then show Customer, Trasaction, Users and Logout link in Navabar
- If user is user (not admin) then show Logout link in Navabar
- After Logout Home page with login will be shown

### Pages
- Home: Will shows Login, Singup and Forgot password as requirement
- Users: List of users
- Customers: List of Cutomers
- Transactions: List of transactions
- 404 page not found: if route not found or matched
