import './App.css';
import Header from './components/Header';
import filterRoutes from './routes/filterRoutes';
import pageRoutes from './routes/pageRoutes';
import { useSelector } from 'react-redux';

function App() {
  // Get scrutinized user from redux store
  const { scrutinizedUser } = useSelector(state => state.usersReducer);

  return (
    <div className="App">
      {/* Passed routed filer component to Header componet */}
      <Header filter={filterRoutes(scrutinizedUser)} />

      {/* Here rendering routed page component*/}
      <div className='mt-3'>
        {pageRoutes(scrutinizedUser)}
      </div>
    </div>
  );
}

export default App;
