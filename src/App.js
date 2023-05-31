import './App.css';
import Header from './components/Header';
import FilterRoutes from './routes/FilterRoutes';
import AllRoutes from './routes';

function App() {
  return (
    <div className="App">
      <Header filter={<FilterRoutes />} />

      <AllRoutes />
    </div>
  );
}

export default App;
