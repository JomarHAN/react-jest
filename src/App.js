import './App.css';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App" data-testid='app'>
      <header className="App-header">
        <Login/>
      </header>
    </div>
  );
}

export default App;
