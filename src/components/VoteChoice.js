import { Choice } from "../models";

export const voteChoices = [
  {
    _id: 1,
    logo: "./assets/tick.svg",
    choice: Choice.YES,
    name: "Yes",
    votes: 0,
  },
  {
    _id: 2,
    logo: "/assets/cross.svg",
    choice: Choice.NO,
    name: "No",
    votes: 0,
  },
];
