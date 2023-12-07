import logo from './logo.svg';
import './App.css';
import DesPage from "./components/des-page/des-page";

function App() {
  return (
    <div className="App dark min-h-screen h-screen flex flex-col">
      <header className="App-header h-32">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React <code>DES ALGO</code> app.
        </p>
      </header>
      <DesPage />
    </div>
  );
}

export default App;
