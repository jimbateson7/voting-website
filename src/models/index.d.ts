import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum Choice {
  YES = "YES",
  NO = "NO"
}



type EagerVote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Vote, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly voterId?: string | null;
  readonly choice: Choice | keyof typeof Choice;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Vote, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly voterId?: string | null;
  readonly choice: Choice | keyof typeof Choice;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Vote = LazyLoading extends LazyLoadingDisabled ? EagerVote : LazyVote

export declare const Vote: (new (init: ModelInit<Vote>) => Vote) & {
  copyOf(source: Vote, mutator: (draft: MutableModel<Vote>) => MutableModel<Vote> | void): Vote;
}