// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Choice = {
  "YES": "YES",
  "NO": "NO",
  "DONT_KNOW": "DONT_KNOW"
};

const { Vote } = initSchema(schema);

export {
  Vote,
  Choice
};