import './App.css';
import Header from './components/Header';
import FilterRoutes from './routes/FilterRoutes';
import PagesRoutes from './routes/PageRoutes';

function App() {
  return (
    <div className="App">
      <Header filter={<FilterRoutes />} />

      <PagesRoutes />
    </div>
  );
}

export default App;
