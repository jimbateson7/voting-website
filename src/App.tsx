import Routing from "./Routing";
import awsconfig from './aws-exports';
import {Amplify, Analytics} from "aws-amplify";

Amplify.configure(awsconfig);

const recordWordInAnalytics = (searchWord: string) => {
  if (searchWord !== "") {
    const lowerCaseWord = searchWord?.toLowerCase();
    console.log("recordWordInAnalytics: ", lowerCaseWord);
    try {
      Analytics.record({
        name: "Test_Only",
        attributes: {
          word: lowerCaseWord,
        },
      });
    } catch (err) {
      console.log("Analytics Error: ", err);
    }
  }
};
function App()
{
 // recordWordInAnalytics("testing, testing");
  return <Routing></Routing>
}
export default App;