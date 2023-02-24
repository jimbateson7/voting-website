import Routing from "./Routing";
import { Amplify, Analytics } from 'aws-amplify';
import awsconfig from './aws-exports';

export const analyticsEnabled = true;
Amplify.configure(awsconfig);

Analytics.autoTrack('session', {
  // REQUIRED, turn on/off the auto tracking
  enable: analyticsEnabled,
  autoSessionRecord: analyticsEnabled,
  provider: 'AWSPinpoint'
});

function App()
{
  return <Routing></Routing>
}
export default App;