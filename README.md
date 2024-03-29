## Set Top Boxes and Customers Relationship Management Web App

### About App
This app manages relationship between set top boxes and customers. It let the user enter, update, remove and show set top box as well customter details over the time. This is a responsive UI so user can access this app on Computer, Tab and Mobile as well.
#

### Project status
Updating on users feedbacks.
#

### Live app link
[stb-crm](https://stb-crm.cyclic.app/#/login)
#

### Prerequisites
- Download and install [Node.js](https://nodejs.org/en/download)
- Download and install [Visual Studio Code](https://code.visualstudio.com/download)
#

### Step to clone repository on local machine
- Click on Code button and copy path in HTTPS
![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/5f54decb-2660-4526-8ad1-1c9ee3b9f918)

1. Create: stb-crm-project folder on your local machine's desired drive
2. Type: "cmd" in folder's address bar and hit Enter key on keyboard. Command prompt will open
3. Type `git clone`, then paste the URL you copied earlier, hit Enter key on keyboard and wait until it done.

![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/85c0c341-9a60-4bec-a0be-02760ffc371a)

5. Type: cd, press Spacebar then Tab (until you get "stb-crm-frontend") and then hit Enter key on keyboard.

![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/5bfbf685-d461-42f6-b0fe-85cbada0b638)

7. Type: npm install and hit Enter key on keyboard and wait for packages got installed successfully

![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/cbc2228e-4553-4d0b-bbf2-8e58be247050)

8. Type: "code ." and hit enter. Visual Studio Code will open
#

#### In command prompt 
- Type `npm start` to run app on local server in browser.
- Type `npm build` to make app build.
#

## Project description
- This project has developed by using react.js library and devided into mudules which contains jsx componets, react routes, react redux, custom functions, navigation pages, axios crud apis.
- Component folder again devided into modules which coantains cards components, charts components, filters components, forms components, modals components, prints components and security components.
- Project folders and files structure looks like as shown in following image.

![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/15cba04c-326e-4a29-94e6-480d18178021)

### Dependencies: 
![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/edbe30e1-981b-4dc1-b363-5087a36a69aa)

### App flow >>
- On app load Login component will be shown
- After login Customer page will be default page
- If user is Admin then shows Customer, Trasaction, Users, Statistics and Logout link in Navabar
- If user is User (not admin) then show Customer, Trasaction and Logout link in Navabar
- After Logout Login component will be shown

### Elaboration:
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
       
This is a root component and renders tow components CustomerSection and PackageSection.

- #### /`forms`/`packageForm`
     - /`CustomerSection.jsx`, /`PackageSection.jsx`

This shows details of customer, STB and transactions (bouquets)

- #### /`modals`/`CustomerModal.jsx`
This renders CustomerForm 

- #### /`modals`/`PackageModal.jsx`
This renders PackageForm 

- #### /`prints`/`TransactionsPrint.jsx`
This shows print preview as well prints cusomters and packages summery in tabular form

- #### /`security`/`Login.jsx`
This scrutinize user's credentails if matches then user can use the app else not.

- #### /`security`/`Sinup.jsx`
This is a user registration component, in this user fills his details and if all details validated then he can register himself successfully and wait for approval from admin/authority or request to admin/authority for approval.

- #### /`security`/`ForgotPassword.jsx`
This component let registered and approved user to reset password if he forgot or he want to change password.

- #### /`Header.jsx`
This component renders NavBar component and a routed filter component (CustomersFilter or TransanctionsFilter or UsersFilter) 

- #### /`NavBar.jsx`
This component contains two kind of links 
1. Private Links: These are routed pages links (CustomersPage, TransactionsPage, UsersPage, StatisticsPage and PageNotFound) and logout link.
2. Public Link: For a new user singup.

### ./src/`pages`
- #### /`CustomersPage.js`
This page renders number of CustomerCard as number of customers, it has New button, on cliking this button CustomerModal get visible.

- #### /`TransactionsPage.js`
This page renders number of TransactionCard as number of summerized transaction found on perticular date and time, it has a toggle button Show/Hide Print Preview, on cliking this button TransactionsPrint component can be show and hide.

- #### /`UsersPage.js`
This page renders number of UserCard as number of users.

- #### /`StatisticsPage.js`
This page renders chart components (STBPieChart and STBRCBarChart).

- #### /`PageNotFound.js`
This page get redirected if route not found.

### ./src/`App.js`
This is a parent component in app.
- This renders Header component (has a filter component as child component) and
- Renders a routed page components (CustomersPage or TransactionsPage or UsersPage or StatisticsPage or PageNotFound)

### ./src/`index.js`
This is a main Javascript file of app.
- This file renders App.js component in DOM that has wrapped in HashRouter and Redux Store (Provider)
- In this file I have imported bootstrap css and js modules.

### ./src/`functions`
This folder contains transactions, customers and users related functions

### ./src/`crudAPIs`
- This folder contains transactions, customers and users related APIs
- By using axios these APIs sends HTTP requests to backend server to Create, Read Update and Delete the data.
- And return corresponding response received from backend server.

### ./src/`routes`
This folder contains page and filter components routes
- Public routes:
  
This contains public routes login, signup, forgotpass and "*" (any other route)
- Private route:
  
This allows only predefined routes through the Outlet after successfull login
- pageRoutes:
  
These are customers, transactions and users page's routes used in private route
- filterRoutes:
  
These are customers, transactions and users filter's routes used in private route

### ./src/`redux`
- This folder has following folders
constants, actions, reducers and store

### `Steps to create redux store >>>`

### `constants`
- Create users.js 
- Create constant into it 
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/5d70c672-b09a-4763-940c-bc6b6cd583b4)

### `actions`
- Create index.js and users.js 
- Import constants and create actions into users.js and expot
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/4ac4802c-7888-4111-804e-034f539d3b3c)

- Import all actions into index.js and export 
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/ae35514b-8ec1-4336-bc7e-d947d622937e)


### `reducers`
- Create index.js and users.js 
- Import constants and create reducer into users.js and expot
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/35f39516-4121-4794-b072-c7ab19273c8e)

- Import combineReducers method from redux into index.js
- Import all reducres combine them into index.js and export as rootReducer
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/f82be480-7fc5-49a8-94ba-692c30cb9997)


### `store`
- Create index.js
- Import createStore, applyMiddleware, compose methos from redux into index.js
- Import redux-thunk as thunk into index.js
- Import rootReducer into index.js
- Create store and export
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/e5653d62-b856-46bf-80e1-7700844765d1)

#### How to use redux store?
- Into root index.js file import Provider compoment from react-redux
- Import store
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/936d5f74-38e0-4cab-b65d-1999c214f1d5)

- Wrap root App component inside Provider component as image
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/0187a9d2-8c9c-4d98-b145-aa1f871be878)

#### How to fetch data from redux store?
- Import useSelector method from react-redux
- Create constant of useSelector and fetch data from redux state to it
- ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/b4270e5d-8db1-4272-ab0b-998174974248)
#### How to update data in redux store?
- Import useDispatch method from react-redux
- Import actions ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/1abcdabf-62e0-40cd-abe0-511b310829ea)
- Create an object of useDispatch method ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/94ce39f4-2062-4234-a523-36b981cea975)
- Dispatch action with data ![image](https://github.com/rameshgchavan/stb-crm-frontend/assets/109573381/cf6db8b0-211b-49e3-af25-10664ef3f1c5)
#

### Reflection
- At the begining I developed this app for Local Cable Operator who provides Television entertainment service.
- Previously I used to work with LOCs and I understood the problems they have faced while managing customers and their set top boxes realation so decided to develop a app for them.
#

### About me: 
- Ramesh Chavan, Full Stack Web Developer|MERN|AlmaBetter Trainee .
    - Email: ramesh7452@gmail.com.


