export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Long: any;
  ObjectID: any;
};

export type BrokenRice = {
  __typename?: "BrokenRice";
  description: Scalars["String"];
  id: Scalars["ObjectID"];
  imgSrc: Scalars["String"];
  name: Scalars["String"];
  priceCents: Scalars["Int"];
  sideDishes: Array<SideDish>;
};

export type BrokenRiceConnection = {
  __typename?: "BrokenRiceConnection";
  cursor?: Maybe<Scalars["String"]>;
  hasNextPage?: Maybe<Scalars["Boolean"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type BrokenRiceDocument = {
  __typename?: "BrokenRiceDocument";
  description: Scalars["String"];
  imgSrc: Scalars["String"];
  name: Scalars["String"];
  priceCents: Scalars["Int"];
  sideDishes: Array<SideDish>;
};

export type BrokenRiceQueryArgs = {
  id: Scalars["ObjectID"];
};

export type BrokenRiceResponse = {
  __typename?: "BrokenRiceResponse";
  brokenRices?: Maybe<Array<Maybe<BrokenRiceDocument>>>;
  connection?: Maybe<BrokenRiceConnection>;
};

export type CreateBrokenRiceInput = {
  description: Scalars["String"];
  imgSrc: Scalars["String"];
  name: Scalars["String"];
  sideDishIds: Array<Scalars["ObjectID"]>;
};

export type CreateSideDishInput = {
  name: Scalars["String"];
  priceCents: Scalars["Int"];
};

export type DeleteBrokenRiceInput = {
  id: Scalars["ObjectID"];
};

export type DeleteSideDishInput = {
  id: Scalars["ObjectID"];
};

export type Mutation = {
  __typename?: "Mutation";
  createBrokenRice: BrokenRice;
  createSideDish: SideDish;
  deleteBrokenRice: Scalars["ObjectID"];
  deleteSideDish: Scalars["ObjectID"];
  updateBrokenRice: BrokenRice;
  updateSideDish: SideDish;
};

export type MutationCreateBrokenRiceArgs = {
  input: CreateBrokenRiceInput;
};

export type MutationCreateSideDishArgs = {
  input: CreateSideDishInput;
};

export type MutationDeleteBrokenRiceArgs = {
  input: DeleteBrokenRiceInput;
};

export type MutationDeleteSideDishArgs = {
  input: DeleteSideDishInput;
};

export type MutationUpdateBrokenRiceArgs = {
  input: UpdateBrokenRiceInput;
};

export type MutationUpdateSideDishArgs = {
  input: UpdateSideDishInput;
};

export type Query = {
  __typename?: "Query";
  brokenRicePage?: Maybe<BrokenRiceResponse>;
  brokenRices: Array<BrokenRice>;
  sideDishes: Array<SideDish>;
};

export type QueryBrokenRicePageArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
  totalCount?: InputMaybe<Scalars["Int"]>;
};

export type SideDish = {
  __typename?: "SideDish";
  id: Scalars["ObjectID"];
  name: Scalars["String"];
  priceCents: Scalars["Int"];
};

export type SideDishQueryArgs = {
  id: Scalars["ObjectID"];
};

export type UpdateBrokenRiceInput = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ObjectID"];
  imgSrc?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  sideDishIds?: InputMaybe<Array<InputMaybe<Scalars["ObjectID"]>>>;
};

export type UpdateSideDishInput = {
  id: Scalars["ObjectID"];
  name?: InputMaybe<Scalars["String"]>;
  priceCents?: InputMaybe<Scalars["Int"]>;
};
