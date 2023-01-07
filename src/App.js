import logo from './logo.svg';
import './App.css';
import { DataStore } from '@aws-amplify/datastore';
//import { Vote } from './models';
function App() {

  /*async function test() {
    await DataStore.save(
        new Vote({
          "choice": Choice.YES
        })
    );
  }
  test();*/
  
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
