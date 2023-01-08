import './App.scss';
import Layout from "../src/pages/Layout";
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
        <Layout />
    );
}

// component not used anywhere
export default App;
