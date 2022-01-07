import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Chat = {
  __typename?: 'Chat';
  id?: Maybe<Scalars['Int']>;
  imgs?: Maybe<Array<Maybe<Img>>>;
  seen: Scalars['Boolean'];
  sender: Scalars['String'];
  status: Scalars['String'];
  text: Scalars['String'];
  trainer: Trainer;
  trainerId: Scalars['Int'];
  user: User;
  userId: Scalars['Int'];
};

export type CreateChatInput = {
  imgIds?: InputMaybe<Array<Scalars['Int']>>;
  sender: Scalars['String'];
  text: Scalars['String'];
  trainerId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type CreateExerciseCategoryInput = {
  name: Scalars['String'];
  trainerId: Scalars['Int'];
};

export type CreateExerciseInput = {
  exerciseCategoryId: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateImgInput = {
  chatId?: InputMaybe<Scalars['Int']>;
  url: Scalars['String'];
};

export type CreateInbodyInput = {
  bodyFat: Scalars['Float'];
  bodyWeight: Scalars['Float'];
  measuredDate: Scalars['DateTime'];
  muscleWeight: Scalars['Float'];
  userId: Scalars['Int'];
};

export type CreateNonRegisteredUserInput = {
  gender?: InputMaybe<Scalars['String']>;
  graduate?: InputMaybe<Scalars['Boolean']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  trainerId: Scalars['Int'];
  userCategoryId: Scalars['Int'];
  userName: Scalars['String'];
};

export type CreateSessionExerciseInput = {
  exerciseCategoryName: Scalars['String'];
  name: Scalars['String'];
  sessionId: Scalars['Int'];
};

export type CreateSessionExerciseVolumeInput = {
  reps: Scalars['Int'];
  sessionExerciseId: Scalars['Int'];
  sets: Scalars['Int'];
  weight: Scalars['Float'];
};

export type CreateSessionHistoryInput = {
  commission?: InputMaybe<Scalars['Int']>;
  costPerSession: Scalars['Int'];
  date: Scalars['DateTime'];
  status?: InputMaybe<Scalars['String']>;
  totalCount: Scalars['Int'];
  userId: Scalars['Int'];
};

export type CreateSessionInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  feedback?: InputMaybe<Scalars['String']>;
  status: Scalars['String'];
  trainerId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type CreateSocialTrainerInput = {
  email: Scalars['String'];
  gender: Scalars['String'];
  interests?: InputMaybe<Array<Scalars['String']>>;
  loginType: Scalars['String'];
  userName: Scalars['String'];
};

export type CreateSocialUserInput = {
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  gender: Scalars['String'];
  loginType: Scalars['String'];
  phoneNumber: Scalars['String'];
  userName: Scalars['String'];
};

export type CreateTrainerInput = {
  email: Scalars['String'];
  gender: Scalars['String'];
  interests?: InputMaybe<Array<Scalars['String']>>;
  loginType: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type CreateUserCategoryInput = {
  name: Scalars['String'];
  status?: InputMaybe<Scalars['String']>;
  trainerId: Scalars['Int'];
};

export type CreateUserInput = {
  birthDate: Scalars['DateTime'];
  email: Scalars['String'];
  gender: Scalars['String'];
  loginType: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  userName: Scalars['String'];
};

export type Exercise = {
  __typename?: 'Exercise';
  exerciseCategory: ExerciseCategory;
  exerciseCategoryId: Scalars['Int'];
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type ExerciseCategory = {
  __typename?: 'ExerciseCategory';
  exercises?: Maybe<Array<Maybe<Exercise>>>;
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  trainer: Trainer;
  trainerId: Scalars['Int'];
};

export type FindChatsInput = {
  page: Scalars['Int'];
  per: Scalars['Int'];
  trainerId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type FindImgsInput = {
  page: Scalars['Int'];
  per: Scalars['Int'];
  trainerId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type Img = {
  __typename?: 'Img';
  chat: Chat;
  chatId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  id?: Maybe<Scalars['Int']>;
  trainerId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  userId?: Maybe<Scalars['Int']>;
};

export type Inbody = {
  __typename?: 'Inbody';
  bodyFat: Scalars['Float'];
  bodyWeight: Scalars['Float'];
  id: Scalars['Int'];
  measuredDate: Scalars['DateTime'];
  muscleWeight: Scalars['Float'];
  status: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  userType: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bulkCreateSessionExercises: Array<SessionExercise>;
  bulkDeleteExerciseCategory: Scalars['Boolean'];
  createChat: Chat;
  createExercise: Exercise;
  createExerciseCategory: ExerciseCategory;
  createImg: Img;
  createInbody: Inbody;
  createNonRegisteredUser: NonRegisteredUser;
  createSession: Session;
  createSessionExercise: SessionExercise;
  createSessionExerciseVolume: SessionExerciseVolume;
  createSessionHistory: SessionHistory;
  createSocialTrainer: Trainer;
  createSocialUser: User;
  createTrainer: Trainer;
  createUser: User;
  createUserCategory: UserCategory;
  loginAuth: LoginResponse;
  removeChat: Scalars['Boolean'];
  removeExercise: Exercise;
  removeExerciseCategory: Scalars['Boolean'];
  removeInbody: Inbody;
  removeNonRegisteredUser: NonRegisteredUser;
  removeSession: Session;
  removeSessionExercise: SessionExercise;
  removeSessionExerciseVolume: Scalars['Boolean'];
  removeSessionHistory: SessionHistory;
  removeTrainer: Trainer;
  removeUser: User;
  removeUserCategory: UserCategory;
  updateChat: Chat;
  updateExercise: Exercise;
  updateExerciseCategory: ExerciseCategory;
  updateInbody: Inbody;
  updateNonRegisteredUser: NonRegisteredUser;
  updatePasswordTrainer: Trainer;
  updatePasswordUser: User;
  updateSession: Session;
  updateSessionExerciseVolume: SessionExerciseVolume;
  updateSessionHistory: SessionHistory;
  updateTrainer: Trainer;
  updateUser: User;
  updateUserCategory: UserCategory;
};


export type MutationBulkCreateSessionExercisesArgs = {
  exerciseCategoryNames: Array<Scalars['String']>;
  names: Array<Scalars['String']>;
  sessionId: Scalars['Int'];
};


export type MutationBulkDeleteExerciseCategoryArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationCreateChatArgs = {
  createChatInput: CreateChatInput;
};


export type MutationCreateExerciseArgs = {
  createExerciseInput: CreateExerciseInput;
};


export type MutationCreateExerciseCategoryArgs = {
  createExerciseCategoryInput: CreateExerciseCategoryInput;
};


export type MutationCreateImgArgs = {
  createImgInput: CreateImgInput;
};


export type MutationCreateInbodyArgs = {
  createInbodyInput: CreateInbodyInput;
};


export type MutationCreateNonRegisteredUserArgs = {
  createNonRegisteredUserInput: CreateNonRegisteredUserInput;
};


export type MutationCreateSessionArgs = {
  createSessionInput: CreateSessionInput;
};


export type MutationCreateSessionExerciseArgs = {
  createSessionExerciseInput: CreateSessionExerciseInput;
};


export type MutationCreateSessionExerciseVolumeArgs = {
  createSessionExerciseVolumeInput: CreateSessionExerciseVolumeInput;
};


export type MutationCreateSessionHistoryArgs = {
  createSessionHistoryInput: CreateSessionHistoryInput;
};


export type MutationCreateSocialTrainerArgs = {
  createSocialTrainerInput: CreateSocialTrainerInput;
};


export type MutationCreateSocialUserArgs = {
  createSocialUserInput: CreateSocialUserInput;
};


export type MutationCreateTrainerArgs = {
  createTrainerInput: CreateTrainerInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateUserCategoryArgs = {
  createUserCategoryInput: CreateUserCategoryInput;
};


export type MutationLoginAuthArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRemoveChatArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveExerciseArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveExerciseCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveInbodyArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveNonRegisteredUserArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSessionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSessionExerciseArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSessionExerciseVolumeArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSessionHistoryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveTrainerArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateChatArgs = {
  updateChatInput: UpdateChatInput;
};


export type MutationUpdateExerciseArgs = {
  updateExerciseInput: UpdateExerciseInput;
};


export type MutationUpdateExerciseCategoryArgs = {
  updateExerciseCategoryInput: UpdateExerciseCategoryInput;
};


export type MutationUpdateInbodyArgs = {
  updateInbodyInput: UpdateInbodyInput;
};


export type MutationUpdateNonRegisteredUserArgs = {
  updateNonRegisteredUserInput: UpdateNonRegisteredUserInput;
};


export type MutationUpdatePasswordTrainerArgs = {
  updatePasswordTrainerInput: UpdatePasswordTrainerInput;
};


export type MutationUpdatePasswordUserArgs = {
  updatePasswordUserInput: UpdatePasswordUserInput;
};


export type MutationUpdateSessionArgs = {
  updateSessionInput: UpdateSessionInput;
};


export type MutationUpdateSessionExerciseVolumeArgs = {
  updateSessionExerciseVolumeInput: UpdateSessionExerciseVolumeInput;
};


export type MutationUpdateSessionHistoryArgs = {
  updateSessionHistoryInput: UpdateSessionHistoryInput;
};


export type MutationUpdateTrainerArgs = {
  updateTrainerInput: UpdateTrainerInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserCategoryArgs = {
  updateUserCategoryInput: UpdateUserCategoryInput;
};

export type NonRegisteredUser = {
  __typename?: 'NonRegisteredUser';
  createdAt: Scalars['DateTime'];
  gender: Scalars['String'];
  graduate: Scalars['Boolean'];
  id?: Maybe<Scalars['Int']>;
  phoneNumber: Scalars['String'];
  status: Scalars['String'];
  trainer: Trainer;
  trainerId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  userCategory: UserCategory;
  userCategoryId: Scalars['Int'];
  userName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  chat: Chat;
  chats: Array<Chat>;
  exercise: Exercise;
  exerciseCategories: Array<ExerciseCategory>;
  exerciseCategory: ExerciseCategory;
  exercises: Array<Exercise>;
  findAllSessionsByTrainerId: Array<Session>;
  findAllSessionsByUserId: Array<Session>;
  findChatsByUserIdAndTrainerId: Array<Chat>;
  findImgsByUserIdAndTrainerId: Array<Img>;
  findOneUserByPhoneNumber: User;
  findOneUserByPhoneNumberTemp: User;
  getImg: Img;
  inbodies: Array<Inbody>;
  inbody: Inbody;
  nonRegisteredUser: NonRegisteredUser;
  nonRegisteredUsers: Array<NonRegisteredUser>;
  session: Session;
  sessionExercise: SessionExercise;
  sessionExerciseVolume: SessionExerciseVolume;
  sessionExerciseVolumes: Array<SessionExerciseVolume>;
  sessionExercises: Array<SessionExercise>;
  sessionHistories: Array<SessionHistory>;
  sessionHistory: SessionHistory;
  sessions: Array<Session>;
  trainer: Trainer;
  trainers: Array<Trainer>;
  user: User;
  userCategories: Array<UserCategory>;
  userCategory: UserCategory;
  userEmail: User;
  users: Array<User>;
};


export type QueryChatArgs = {
  id: Scalars['Int'];
};


export type QueryExerciseArgs = {
  id: Scalars['Int'];
};


export type QueryExerciseCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryFindAllSessionsByTrainerIdArgs = {
  trainerId: Scalars['Int'];
};


export type QueryFindAllSessionsByUserIdArgs = {
  userId: Scalars['Int'];
};


export type QueryFindChatsByUserIdAndTrainerIdArgs = {
  findChatsInput: FindChatsInput;
};


export type QueryFindImgsByUserIdAndTrainerIdArgs = {
  findImgsInput: FindImgsInput;
};


export type QueryFindOneUserByPhoneNumberArgs = {
  phoneNumber: Scalars['String'];
};


export type QueryFindOneUserByPhoneNumberTempArgs = {
  phoneNumber: Scalars['String'];
  trainerId: Scalars['String'];
};


export type QueryGetImgArgs = {
  id: Scalars['Int'];
};


export type QueryInbodyArgs = {
  id: Scalars['Int'];
};


export type QueryNonRegisteredUserArgs = {
  id: Scalars['Int'];
};


export type QuerySessionArgs = {
  id: Scalars['Int'];
};


export type QuerySessionExerciseArgs = {
  id: Scalars['Int'];
};


export type QuerySessionExerciseVolumeArgs = {
  id: Scalars['Int'];
};


export type QuerySessionHistoryArgs = {
  id: Scalars['Int'];
};


export type QueryTrainerArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryUserEmailArgs = {
  email: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  completedSession: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  feedback?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  sentFeedback: Scalars['Boolean'];
  sessionExercises?: Maybe<Array<Maybe<SessionExercise>>>;
  status: Scalars['String'];
  trainer: Trainer;
  trainerId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Int'];
};

export type SessionExercise = {
  __typename?: 'SessionExercise';
  exerciseCategoryName: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  session: Session;
  sessionExerciseVolumes?: Maybe<Array<Maybe<SessionExerciseVolume>>>;
  sessionId: Scalars['Int'];
};

export type SessionExerciseVolume = {
  __typename?: 'SessionExerciseVolume';
  id: Scalars['Int'];
  reps: Scalars['Int'];
  seq: Scalars['Int'];
  sessionExercise: SessionExercise;
  sessionExerciseId: Scalars['Int'];
  sets: Scalars['Int'];
  weight: Scalars['Float'];
};

export type SessionHistory = {
  __typename?: 'SessionHistory';
  commission: Scalars['Int'];
  costPerSession: Scalars['Int'];
  date: Scalars['DateTime'];
  id?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
  totalCount: Scalars['Int'];
  trainer: Trainer;
  trainerId: Scalars['Int'];
  usedCount: Scalars['Int'];
  user: User;
  userId: Scalars['Int'];
};

export type Trainer = {
  __typename?: 'Trainer';
  birthDate?: Maybe<Scalars['DateTime']>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  createdAt: Scalars['DateTime'];
  dbPasswordSalt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  exerciseCategories?: Maybe<Array<Maybe<ExerciseCategory>>>;
  gender: Scalars['String'];
  id: Scalars['Int'];
  loginType: Scalars['String'];
  nonRegisteredUsers?: Maybe<Array<Maybe<NonRegisteredUser>>>;
  password?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  sessionHistories: Array<SessionHistory>;
  sessions?: Maybe<Array<Maybe<Session>>>;
  status: Scalars['String'];
  trainerInterests?: Maybe<Array<Maybe<TrainerInterest>>>;
  updatedAt: Scalars['DateTime'];
  userCategories?: Maybe<Array<Maybe<UserCategory>>>;
  userName: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type TrainerInterest = {
  __typename?: 'TrainerInterest';
  createdAt: Scalars['DateTime'];
  id?: Maybe<Scalars['Int']>;
  interest: Scalars['String'];
  status: Scalars['String'];
  trainer: Trainer;
  trainerId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateChatInput = {
  id: Scalars['Int'];
  imgIds?: InputMaybe<Array<Scalars['Int']>>;
  sender?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  trainerId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type UpdateExerciseCategoryInput = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  trainerId?: InputMaybe<Scalars['Int']>;
};

export type UpdateExerciseInput = {
  exerciseCategoryId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateInbodyInput = {
  bodyFat?: InputMaybe<Scalars['Float']>;
  bodyWeight?: InputMaybe<Scalars['Float']>;
  id: Scalars['Int'];
  measuredDate?: InputMaybe<Scalars['DateTime']>;
  muscleWeight?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type UpdateNonRegisteredUserInput = {
  gender?: InputMaybe<Scalars['String']>;
  graduate?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  trainerId?: InputMaybe<Scalars['Int']>;
  userCategoryId?: InputMaybe<Scalars['Int']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type UpdatePasswordTrainerInput = {
  id: Scalars['Int'];
  nowPassword: Scalars['String'];
  prevPassword: Scalars['String'];
};

export type UpdatePasswordUserInput = {
  id: Scalars['Int'];
  nowPassword: Scalars['String'];
  prevPassword: Scalars['String'];
};

export type UpdateSessionExerciseVolumeInput = {
  id: Scalars['Int'];
  reps?: InputMaybe<Scalars['Int']>;
  seq?: InputMaybe<Scalars['Int']>;
  sessionExerciseId?: InputMaybe<Scalars['Int']>;
  sets?: InputMaybe<Scalars['Int']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type UpdateSessionHistoryInput = {
  commission: Scalars['Int'];
  costPerSession: Scalars['Int'];
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  status: Scalars['String'];
  totalCount: Scalars['Int'];
  usedCount: Scalars['Int'];
  userId?: InputMaybe<Scalars['Int']>;
};

export type UpdateSessionInput = {
  completedSession?: InputMaybe<Scalars['Boolean']>;
  date?: InputMaybe<Scalars['DateTime']>;
  feedback?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  sentFeedback?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Scalars['String']>;
  trainerId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type UpdateTrainerInput = {
  birthDate?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  interests?: InputMaybe<Array<Scalars['String']>>;
  loginType?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type UpdateUserCategoryInput = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  trainerId?: InputMaybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  birthDate?: InputMaybe<Scalars['DateTime']>;
  gender?: InputMaybe<Scalars['String']>;
  graduate?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  status?: InputMaybe<Scalars['String']>;
  trainerId?: InputMaybe<Scalars['Int']>;
  userCategoryId?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  birthDate: Scalars['DateTime'];
  chats: Array<Chat>;
  createdAt: Scalars['DateTime'];
  dbPasswordSalt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  gender: Scalars['String'];
  graduate: Scalars['Boolean'];
  id: Scalars['Int'];
  inbodies: Array<Inbody>;
  loginType: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  sessionHistories: Array<SessionHistory>;
  sessions: Array<Session>;
  status: Scalars['String'];
  trainer: Trainer;
  trainerId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  userCategory: UserCategory;
  userCategoryId?: Maybe<Scalars['Int']>;
  userName: Scalars['String'];
};

export type UserCategory = {
  __typename?: 'UserCategory';
  createdAt: Scalars['DateTime'];
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  nonRegisteredUsers?: Maybe<Array<Maybe<NonRegisteredUser>>>;
  status: Scalars['String'];
  trainer: Trainer;
  trainerId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type BulkCreateSessionExercisesMutationVariables = Exact<{
  exerciseCategoryNames: Array<Scalars['String']> | Scalars['String'];
  names: Array<Scalars['String']> | Scalars['String'];
  sessionId: Scalars['Int'];
}>;


export type BulkCreateSessionExercisesMutation = { __typename?: 'Mutation', bulkCreateSessionExercises: Array<{ __typename?: 'SessionExercise', id: number, name: string, sessionId: number, exerciseCategoryName: string }> };

export type CreateExerciseMutationVariables = Exact<{
  createExerciseInput: CreateExerciseInput;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'Exercise', id?: number | null | undefined, name: string, exerciseCategoryId: number } };

export type CreateExerciseCategoryMutationVariables = Exact<{
  createExerciseCategoryInput: CreateExerciseCategoryInput;
}>;


export type CreateExerciseCategoryMutation = { __typename?: 'Mutation', createExerciseCategory: { __typename?: 'ExerciseCategory', id?: number | null | undefined, name: string, trainerId: number } };

export type CreateInbodyMutationVariables = Exact<{
  createInbodyInput: CreateInbodyInput;
}>;


export type CreateInbodyMutation = { __typename?: 'Mutation', createInbody: { __typename?: 'Inbody', id: number, bodyWeight: number, muscleWeight: number, bodyFat: number } };

export type CreateNonRegisteredUserMutationVariables = Exact<{
  createNonRegisteredUserInput: CreateNonRegisteredUserInput;
}>;


export type CreateNonRegisteredUserMutation = { __typename?: 'Mutation', createNonRegisteredUser: { __typename?: 'NonRegisteredUser', id?: number | null | undefined, userName: string, phoneNumber: string, gender: string, trainerId: number } };

export type CreateSessionMutationVariables = Exact<{
  createSessionInput: CreateSessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession: { __typename?: 'Session', id?: number | null | undefined, userId: number, date: any, trainerId: number, feedback?: string | null | undefined } };

export type CreateSessionExerciseMutationVariables = Exact<{
  createSessionExerciseInput: CreateSessionExerciseInput;
}>;


export type CreateSessionExerciseMutation = { __typename?: 'Mutation', createSessionExercise: { __typename?: 'SessionExercise', id: number, name: string, sessionId: number, exerciseCategoryName: string } };

export type CreateSessionExerciseVolumeMutationVariables = Exact<{
  createSessionExerciseVolumeInput: CreateSessionExerciseVolumeInput;
}>;


export type CreateSessionExerciseVolumeMutation = { __typename?: 'Mutation', createSessionExerciseVolume: { __typename?: 'SessionExerciseVolume', id: number, reps: number, sets: number, weight: number, seq: number } };

export type CreateSessionHistoryMutationVariables = Exact<{
  createSessionHistoryInput: CreateSessionHistoryInput;
}>;


export type CreateSessionHistoryMutation = { __typename?: 'Mutation', createSessionHistory: { __typename?: 'SessionHistory', id?: number | null | undefined, date: any, costPerSession: number, totalCount: number, usedCount: number, commission: number, userId: number } };

export type CreateSocialTrainerMutationVariables = Exact<{
  createSocialTrainerInput: CreateSocialTrainerInput;
}>;


export type CreateSocialTrainerMutation = { __typename?: 'Mutation', createSocialTrainer: { __typename?: 'Trainer', id: number, email: string, userName: string, birthDate?: any | null | undefined, gender: string } };

export type CreateSocialUserMutationVariables = Exact<{
  createSocialUserInput: CreateSocialUserInput;
}>;


export type CreateSocialUserMutation = { __typename?: 'Mutation', createSocialUser: { __typename?: 'User', id: number, email: string, userName: string, birthDate: any, phoneNumber: string, gender: string } };

export type CreateTrainerMutationVariables = Exact<{
  createTrainerInput: CreateTrainerInput;
}>;


export type CreateTrainerMutation = { __typename?: 'Mutation', createTrainer: { __typename?: 'Trainer', id: number, email: string, userName: string, birthDate?: any | null | undefined, phoneNumber?: string | null | undefined, gender: string } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string, userName: string, birthDate: any, phoneNumber: string, gender: string, graduate: boolean } };

export type CreateUserCategoryMutationVariables = Exact<{
  createUserCategoryInput: CreateUserCategoryInput;
}>;


export type CreateUserCategoryMutation = { __typename?: 'Mutation', createUserCategory: { __typename?: 'UserCategory', id?: number | null | undefined, status: string, trainerId: number } };

export type RemoveExerciseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveExerciseMutation = { __typename?: 'Mutation', removeExercise: { __typename?: 'Exercise', id?: number | null | undefined, name: string, exerciseCategoryId: number } };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', removeSession: { __typename?: 'Session', id?: number | null | undefined, userId: number, date: any, trainerId: number, feedback?: string | null | undefined } };

export type RemoveSessionExerciseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveSessionExerciseMutation = { __typename?: 'Mutation', removeSessionExercise: { __typename?: 'SessionExercise', id: number, name: string, sessionId: number } };

export type RemoveTrainerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveTrainerMutation = { __typename?: 'Mutation', removeTrainer: { __typename?: 'Trainer', id: number, email: string, userName: string, birthDate?: any | null | undefined, phoneNumber?: string | null | undefined, gender: string } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: number, email: string, userName: string, birthDate: any, phoneNumber: string, gender: string } };

export type UpdatePasswordTrainerMutationVariables = Exact<{
  updatePasswordTrainerInput: UpdatePasswordTrainerInput;
}>;


export type UpdatePasswordTrainerMutation = { __typename?: 'Mutation', updatePasswordTrainer: { __typename?: 'Trainer', id: number, email: string, userName: string, birthDate?: any | null | undefined, phoneNumber?: string | null | undefined, gender: string } };

export type UpdatePasswordUserMutationVariables = Exact<{
  updatePasswordUserInput: UpdatePasswordUserInput;
}>;


export type UpdatePasswordUserMutation = { __typename?: 'Mutation', updatePasswordUser: { __typename?: 'User', id: number, email: string, userName: string, birthDate: any, phoneNumber: string, gender: string } };

export type UpdateSessionMutationVariables = Exact<{
  updateSessionInput: UpdateSessionInput;
}>;


export type UpdateSessionMutation = { __typename?: 'Mutation', updateSession: { __typename?: 'Session', id?: number | null | undefined, userId: number, date: any, trainerId: number, feedback?: string | null | undefined } };

export type UpdateTrainerMutationVariables = Exact<{
  updateTrainerInput: UpdateTrainerInput;
}>;


export type UpdateTrainerMutation = { __typename?: 'Mutation', updateTrainer: { __typename?: 'Trainer', id: number, email: string, userName: string, birthDate?: any | null | undefined, phoneNumber?: string | null | undefined, gender: string } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, email: string, userName: string, birthDate: any, phoneNumber: string, gender: string, graduate: boolean, userCategoryId?: number | null | undefined } };

export type FindOneUserByPhoneNumberQueryVariables = Exact<{
  phoneNumber: Scalars['String'];
}>;


export type FindOneUserByPhoneNumberQuery = { __typename?: 'Query', findOneUserByPhoneNumber: { __typename?: 'User', id: number, email: string, userName: string, birthDate: any, phoneNumber: string, gender: string, graduate: boolean } };

export type FindImgsByUserIdAndTrainerIdQueryVariables = Exact<{
	findImgsInput: FindImgsInput
}>

export type FindImgsByUserIdAndTrainerIdQuery = {
	__typename?: 'Query'
	findImgsByUserIdAndTrainerId: Array<{
		__typename?: 'Img'
		id?: number | null | undefined
		url: string
		chatId?: number | null | undefined
		userId?: number | null | undefined
		trainerId?: number | null | undefined
		createdAt: any
		updatedAt: any
	}>
}

export type SessionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SessionQuery = { __typename?: 'Query', session: { __typename?: 'Session', id?: number | null | undefined, userId: number, trainerId: number, feedback?: string | null | undefined, sentFeedback: boolean, date: any, sessionExercises?: Array<{ __typename?: 'SessionExercise', id: number, name: string, sessionId: number, exerciseCategoryName: string, sessionExerciseVolumes?: Array<{ __typename?: 'SessionExerciseVolume', id: number, reps: number, sets: number, weight: number, seq: number } | null | undefined> | null | undefined } | null | undefined> | null | undefined } };

export type SessionHistoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionHistoriesQuery = { __typename?: 'Query', sessionHistories: Array<{ __typename?: 'SessionHistory', id?: number | null | undefined, date: any, costPerSession: number, totalCount: number, usedCount: number, commission: number, userId: number }> };

export type TrainerQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TrainerQuery = { __typename?: 'Query', trainer: { __typename?: 'Trainer', id: number, email: string, userName: string, birthDate?: any | null | undefined, phoneNumber?: string | null | undefined, gender: string, users?: Array<{ __typename?: 'User', id: number, email: string, userName: string, birthDate: any, phoneNumber: string, gender: string, graduate: boolean, userCategoryId?: number | null | undefined, sessionHistories: Array<{ __typename?: 'SessionHistory', id?: number | null | undefined, date: any, costPerSession: number, totalCount: number, usedCount: number, commission: number, userId: number, user: { __typename?: 'User', userName: string } }> } | null | undefined> | null | undefined, sessions?: Array<{ __typename?: 'Session', id?: number | null | undefined, userId: number, trainerId: number, feedback?: string | null | undefined, sentFeedback: boolean, completedSession: boolean, date: any, user: { __typename?: 'User', id: number, userName: string, gender: string }, sessionExercises?: Array<{ __typename?: 'SessionExercise', name: string, sessionExerciseVolumes?: Array<{ __typename?: 'SessionExerciseVolume', id: number, reps: number, sets: number, weight: number, seq: number } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined, exerciseCategories?: Array<{ __typename?: 'ExerciseCategory', id?: number | null | undefined, name: string, trainerId: number, exercises?: Array<{ __typename?: 'Exercise', id?: number | null | undefined, name: string, exerciseCategoryId: number } | null | undefined> | null | undefined } | null | undefined> | null | undefined, userCategories?: Array<{ __typename?: 'UserCategory', id?: number | null | undefined, name: string, trainerId: number, users?: Array<{ __typename?: 'User', id: number, email: string, userName: string, gender: string, graduate: boolean, sessionHistories: Array<{ __typename?: 'SessionHistory', id?: number | null | undefined, date: any, costPerSession: number, totalCount: number, usedCount: number, commission: number }> } | null | undefined> | null | undefined } | null | undefined> | null | undefined } };

export type UserCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCategoriesQuery = { __typename?: 'Query', userCategories: Array<{ __typename?: 'UserCategory', id?: number | null | undefined, name: string, trainerId: number }> };

export type UserCategoryQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserCategoryQuery = { __typename?: 'Query', userCategory: { __typename?: 'UserCategory', id?: number | null | undefined, name: string, trainerId: number } };


export const BulkCreateSessionExercisesDocument = gql`
    mutation BulkCreateSessionExercises($exerciseCategoryNames: [String!]!, $names: [String!]!, $sessionId: Int!) {
  bulkCreateSessionExercises(
    exerciseCategoryNames: $exerciseCategoryNames
    names: $names
    sessionId: $sessionId
  ) {
    id
    name
    sessionId
    exerciseCategoryName
  }
}
    `;
export type BulkCreateSessionExercisesMutationFn = Apollo.MutationFunction<BulkCreateSessionExercisesMutation, BulkCreateSessionExercisesMutationVariables>;

/**
 * __useBulkCreateSessionExercisesMutation__
 *
 * To run a mutation, you first call `useBulkCreateSessionExercisesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkCreateSessionExercisesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkCreateSessionExercisesMutation, { data, loading, error }] = useBulkCreateSessionExercisesMutation({
 *   variables: {
 *      exerciseCategoryNames: // value for 'exerciseCategoryNames'
 *      names: // value for 'names'
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useBulkCreateSessionExercisesMutation(baseOptions?: Apollo.MutationHookOptions<BulkCreateSessionExercisesMutation, BulkCreateSessionExercisesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkCreateSessionExercisesMutation, BulkCreateSessionExercisesMutationVariables>(BulkCreateSessionExercisesDocument, options);
      }
export type BulkCreateSessionExercisesMutationHookResult = ReturnType<typeof useBulkCreateSessionExercisesMutation>;
export type BulkCreateSessionExercisesMutationResult = Apollo.MutationResult<BulkCreateSessionExercisesMutation>;
export type BulkCreateSessionExercisesMutationOptions = Apollo.BaseMutationOptions<BulkCreateSessionExercisesMutation, BulkCreateSessionExercisesMutationVariables>;
export const CreateExerciseDocument = gql`
    mutation CreateExercise($createExerciseInput: CreateExerciseInput!) {
  createExercise(createExerciseInput: $createExerciseInput) {
    id
    name
    exerciseCategoryId
  }
}
    `;
export type CreateExerciseMutationFn = Apollo.MutationFunction<CreateExerciseMutation, CreateExerciseMutationVariables>;

/**
 * __useCreateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseMutation, { data, loading, error }] = useCreateExerciseMutation({
 *   variables: {
 *      createExerciseInput: // value for 'createExerciseInput'
 *   },
 * });
 */
export function useCreateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseMutation, CreateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseMutation, CreateExerciseMutationVariables>(CreateExerciseDocument, options);
      }
export type CreateExerciseMutationHookResult = ReturnType<typeof useCreateExerciseMutation>;
export type CreateExerciseMutationResult = Apollo.MutationResult<CreateExerciseMutation>;
export type CreateExerciseMutationOptions = Apollo.BaseMutationOptions<CreateExerciseMutation, CreateExerciseMutationVariables>;
export const CreateExerciseCategoryDocument = gql`
    mutation CreateExerciseCategory($createExerciseCategoryInput: CreateExerciseCategoryInput!) {
  createExerciseCategory(
    createExerciseCategoryInput: $createExerciseCategoryInput
  ) {
    id
    name
    trainerId
  }
}
    `;
export type CreateExerciseCategoryMutationFn = Apollo.MutationFunction<CreateExerciseCategoryMutation, CreateExerciseCategoryMutationVariables>;

/**
 * __useCreateExerciseCategoryMutation__
 *
 * To run a mutation, you first call `useCreateExerciseCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseCategoryMutation, { data, loading, error }] = useCreateExerciseCategoryMutation({
 *   variables: {
 *      createExerciseCategoryInput: // value for 'createExerciseCategoryInput'
 *   },
 * });
 */
export function useCreateExerciseCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseCategoryMutation, CreateExerciseCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseCategoryMutation, CreateExerciseCategoryMutationVariables>(CreateExerciseCategoryDocument, options);
      }
export type CreateExerciseCategoryMutationHookResult = ReturnType<typeof useCreateExerciseCategoryMutation>;
export type CreateExerciseCategoryMutationResult = Apollo.MutationResult<CreateExerciseCategoryMutation>;
export type CreateExerciseCategoryMutationOptions = Apollo.BaseMutationOptions<CreateExerciseCategoryMutation, CreateExerciseCategoryMutationVariables>;
export const CreateInbodyDocument = gql`
    mutation CreateInbody($createInbodyInput: CreateInbodyInput!) {
  createInbody(createInbodyInput: $createInbodyInput) {
    id
    bodyWeight
    muscleWeight
    bodyFat
  }
}
    `;
export type CreateInbodyMutationFn = Apollo.MutationFunction<CreateInbodyMutation, CreateInbodyMutationVariables>;

/**
 * __useCreateInbodyMutation__
 *
 * To run a mutation, you first call `useCreateInbodyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInbodyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInbodyMutation, { data, loading, error }] = useCreateInbodyMutation({
 *   variables: {
 *      createInbodyInput: // value for 'createInbodyInput'
 *   },
 * });
 */
export function useCreateInbodyMutation(baseOptions?: Apollo.MutationHookOptions<CreateInbodyMutation, CreateInbodyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInbodyMutation, CreateInbodyMutationVariables>(CreateInbodyDocument, options);
      }
export type CreateInbodyMutationHookResult = ReturnType<typeof useCreateInbodyMutation>;
export type CreateInbodyMutationResult = Apollo.MutationResult<CreateInbodyMutation>;
export type CreateInbodyMutationOptions = Apollo.BaseMutationOptions<CreateInbodyMutation, CreateInbodyMutationVariables>;
export const CreateNonRegisteredUserDocument = gql`
    mutation CreateNonRegisteredUser($createNonRegisteredUserInput: CreateNonRegisteredUserInput!) {
  createNonRegisteredUser(
    createNonRegisteredUserInput: $createNonRegisteredUserInput
  ) {
    id
    userName
    phoneNumber
    gender
    trainerId
  }
}
    `;
export type CreateNonRegisteredUserMutationFn = Apollo.MutationFunction<CreateNonRegisteredUserMutation, CreateNonRegisteredUserMutationVariables>;

/**
 * __useCreateNonRegisteredUserMutation__
 *
 * To run a mutation, you first call `useCreateNonRegisteredUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNonRegisteredUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNonRegisteredUserMutation, { data, loading, error }] = useCreateNonRegisteredUserMutation({
 *   variables: {
 *      createNonRegisteredUserInput: // value for 'createNonRegisteredUserInput'
 *   },
 * });
 */
export function useCreateNonRegisteredUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateNonRegisteredUserMutation, CreateNonRegisteredUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNonRegisteredUserMutation, CreateNonRegisteredUserMutationVariables>(CreateNonRegisteredUserDocument, options);
      }
export type CreateNonRegisteredUserMutationHookResult = ReturnType<typeof useCreateNonRegisteredUserMutation>;
export type CreateNonRegisteredUserMutationResult = Apollo.MutationResult<CreateNonRegisteredUserMutation>;
export type CreateNonRegisteredUserMutationOptions = Apollo.BaseMutationOptions<CreateNonRegisteredUserMutation, CreateNonRegisteredUserMutationVariables>;
export const CreateSessionDocument = gql`
    mutation CreateSession($createSessionInput: CreateSessionInput!) {
  createSession(createSessionInput: $createSessionInput) {
    id
    userId
    date
    trainerId
    feedback
  }
}
    `;
export type CreateSessionMutationFn = Apollo.MutationFunction<CreateSessionMutation, CreateSessionMutationVariables>;

/**
 * __useCreateSessionMutation__
 *
 * To run a mutation, you first call `useCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionMutation, { data, loading, error }] = useCreateSessionMutation({
 *   variables: {
 *      createSessionInput: // value for 'createSessionInput'
 *   },
 * });
 */
export function useCreateSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument, options);
      }
export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = Apollo.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = Apollo.BaseMutationOptions<CreateSessionMutation, CreateSessionMutationVariables>;
export const CreateSessionExerciseDocument = gql`
    mutation CreateSessionExercise($createSessionExerciseInput: CreateSessionExerciseInput!) {
  createSessionExercise(createSessionExerciseInput: $createSessionExerciseInput) {
    id
    name
    sessionId
    exerciseCategoryName
  }
}
    `;
export type CreateSessionExerciseMutationFn = Apollo.MutationFunction<CreateSessionExerciseMutation, CreateSessionExerciseMutationVariables>;

/**
 * __useCreateSessionExerciseMutation__
 *
 * To run a mutation, you first call `useCreateSessionExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionExerciseMutation, { data, loading, error }] = useCreateSessionExerciseMutation({
 *   variables: {
 *      createSessionExerciseInput: // value for 'createSessionExerciseInput'
 *   },
 * });
 */
export function useCreateSessionExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionExerciseMutation, CreateSessionExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSessionExerciseMutation, CreateSessionExerciseMutationVariables>(CreateSessionExerciseDocument, options);
      }
export type CreateSessionExerciseMutationHookResult = ReturnType<typeof useCreateSessionExerciseMutation>;
export type CreateSessionExerciseMutationResult = Apollo.MutationResult<CreateSessionExerciseMutation>;
export type CreateSessionExerciseMutationOptions = Apollo.BaseMutationOptions<CreateSessionExerciseMutation, CreateSessionExerciseMutationVariables>;
export const CreateSessionExerciseVolumeDocument = gql`
    mutation CreateSessionExerciseVolume($createSessionExerciseVolumeInput: CreateSessionExerciseVolumeInput!) {
  createSessionExerciseVolume(
    createSessionExerciseVolumeInput: $createSessionExerciseVolumeInput
  ) {
    id
    reps
    sets
    weight
    seq
  }
}
    `;
export type CreateSessionExerciseVolumeMutationFn = Apollo.MutationFunction<CreateSessionExerciseVolumeMutation, CreateSessionExerciseVolumeMutationVariables>;

/**
 * __useCreateSessionExerciseVolumeMutation__
 *
 * To run a mutation, you first call `useCreateSessionExerciseVolumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionExerciseVolumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionExerciseVolumeMutation, { data, loading, error }] = useCreateSessionExerciseVolumeMutation({
 *   variables: {
 *      createSessionExerciseVolumeInput: // value for 'createSessionExerciseVolumeInput'
 *   },
 * });
 */
export function useCreateSessionExerciseVolumeMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionExerciseVolumeMutation, CreateSessionExerciseVolumeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSessionExerciseVolumeMutation, CreateSessionExerciseVolumeMutationVariables>(CreateSessionExerciseVolumeDocument, options);
      }
export type CreateSessionExerciseVolumeMutationHookResult = ReturnType<typeof useCreateSessionExerciseVolumeMutation>;
export type CreateSessionExerciseVolumeMutationResult = Apollo.MutationResult<CreateSessionExerciseVolumeMutation>;
export type CreateSessionExerciseVolumeMutationOptions = Apollo.BaseMutationOptions<CreateSessionExerciseVolumeMutation, CreateSessionExerciseVolumeMutationVariables>;
export const CreateSessionHistoryDocument = gql`
    mutation CreateSessionHistory($createSessionHistoryInput: CreateSessionHistoryInput!) {
  createSessionHistory(createSessionHistoryInput: $createSessionHistoryInput) {
    id
    date
    costPerSession
    totalCount
    usedCount
    commission
    usedCount
    userId
  }
}
    `;
export type CreateSessionHistoryMutationFn = Apollo.MutationFunction<CreateSessionHistoryMutation, CreateSessionHistoryMutationVariables>;

/**
 * __useCreateSessionHistoryMutation__
 *
 * To run a mutation, you first call `useCreateSessionHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionHistoryMutation, { data, loading, error }] = useCreateSessionHistoryMutation({
 *   variables: {
 *      createSessionHistoryInput: // value for 'createSessionHistoryInput'
 *   },
 * });
 */
export function useCreateSessionHistoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionHistoryMutation, CreateSessionHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSessionHistoryMutation, CreateSessionHistoryMutationVariables>(CreateSessionHistoryDocument, options);
      }
export type CreateSessionHistoryMutationHookResult = ReturnType<typeof useCreateSessionHistoryMutation>;
export type CreateSessionHistoryMutationResult = Apollo.MutationResult<CreateSessionHistoryMutation>;
export type CreateSessionHistoryMutationOptions = Apollo.BaseMutationOptions<CreateSessionHistoryMutation, CreateSessionHistoryMutationVariables>;
export const CreateSocialTrainerDocument = gql`
    mutation CreateSocialTrainer($createSocialTrainerInput: CreateSocialTrainerInput!) {
  createSocialTrainer(createSocialTrainerInput: $createSocialTrainerInput) {
    id
    email
    userName
    birthDate
    gender
  }
}
    `;
export type CreateSocialTrainerMutationFn = Apollo.MutationFunction<CreateSocialTrainerMutation, CreateSocialTrainerMutationVariables>;

/**
 * __useCreateSocialTrainerMutation__
 *
 * To run a mutation, you first call `useCreateSocialTrainerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSocialTrainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSocialTrainerMutation, { data, loading, error }] = useCreateSocialTrainerMutation({
 *   variables: {
 *      createSocialTrainerInput: // value for 'createSocialTrainerInput'
 *   },
 * });
 */
export function useCreateSocialTrainerMutation(baseOptions?: Apollo.MutationHookOptions<CreateSocialTrainerMutation, CreateSocialTrainerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSocialTrainerMutation, CreateSocialTrainerMutationVariables>(CreateSocialTrainerDocument, options);
      }
export type CreateSocialTrainerMutationHookResult = ReturnType<typeof useCreateSocialTrainerMutation>;
export type CreateSocialTrainerMutationResult = Apollo.MutationResult<CreateSocialTrainerMutation>;
export type CreateSocialTrainerMutationOptions = Apollo.BaseMutationOptions<CreateSocialTrainerMutation, CreateSocialTrainerMutationVariables>;
export const CreateSocialUserDocument = gql`
    mutation CreateSocialUser($createSocialUserInput: CreateSocialUserInput!) {
  createSocialUser(createSocialUserInput: $createSocialUserInput) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
  }
}
    `;
export type CreateSocialUserMutationFn = Apollo.MutationFunction<CreateSocialUserMutation, CreateSocialUserMutationVariables>;

/**
 * __useCreateSocialUserMutation__
 *
 * To run a mutation, you first call `useCreateSocialUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSocialUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSocialUserMutation, { data, loading, error }] = useCreateSocialUserMutation({
 *   variables: {
 *      createSocialUserInput: // value for 'createSocialUserInput'
 *   },
 * });
 */
export function useCreateSocialUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateSocialUserMutation, CreateSocialUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSocialUserMutation, CreateSocialUserMutationVariables>(CreateSocialUserDocument, options);
      }
export type CreateSocialUserMutationHookResult = ReturnType<typeof useCreateSocialUserMutation>;
export type CreateSocialUserMutationResult = Apollo.MutationResult<CreateSocialUserMutation>;
export type CreateSocialUserMutationOptions = Apollo.BaseMutationOptions<CreateSocialUserMutation, CreateSocialUserMutationVariables>;
export const CreateTrainerDocument = gql`
    mutation CreateTrainer($createTrainerInput: CreateTrainerInput!) {
  createTrainer(createTrainerInput: $createTrainerInput) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
  }
}
    `;
export type CreateTrainerMutationFn = Apollo.MutationFunction<CreateTrainerMutation, CreateTrainerMutationVariables>;

/**
 * __useCreateTrainerMutation__
 *
 * To run a mutation, you first call `useCreateTrainerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrainerMutation, { data, loading, error }] = useCreateTrainerMutation({
 *   variables: {
 *      createTrainerInput: // value for 'createTrainerInput'
 *   },
 * });
 */
export function useCreateTrainerMutation(baseOptions?: Apollo.MutationHookOptions<CreateTrainerMutation, CreateTrainerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTrainerMutation, CreateTrainerMutationVariables>(CreateTrainerDocument, options);
      }
export type CreateTrainerMutationHookResult = ReturnType<typeof useCreateTrainerMutation>;
export type CreateTrainerMutationResult = Apollo.MutationResult<CreateTrainerMutation>;
export type CreateTrainerMutationOptions = Apollo.BaseMutationOptions<CreateTrainerMutation, CreateTrainerMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
    graduate
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateUserCategoryDocument = gql`
    mutation CreateUserCategory($createUserCategoryInput: CreateUserCategoryInput!) {
  createUserCategory(createUserCategoryInput: $createUserCategoryInput) {
    id
    status
    trainerId
  }
}
    `;
export type CreateUserCategoryMutationFn = Apollo.MutationFunction<CreateUserCategoryMutation, CreateUserCategoryMutationVariables>;

/**
 * __useCreateUserCategoryMutation__
 *
 * To run a mutation, you first call `useCreateUserCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserCategoryMutation, { data, loading, error }] = useCreateUserCategoryMutation({
 *   variables: {
 *      createUserCategoryInput: // value for 'createUserCategoryInput'
 *   },
 * });
 */
export function useCreateUserCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserCategoryMutation, CreateUserCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserCategoryMutation, CreateUserCategoryMutationVariables>(CreateUserCategoryDocument, options);
      }
export type CreateUserCategoryMutationHookResult = ReturnType<typeof useCreateUserCategoryMutation>;
export type CreateUserCategoryMutationResult = Apollo.MutationResult<CreateUserCategoryMutation>;
export type CreateUserCategoryMutationOptions = Apollo.BaseMutationOptions<CreateUserCategoryMutation, CreateUserCategoryMutationVariables>;
export const RemoveExerciseDocument = gql`
    mutation RemoveExercise($id: Int!) {
  removeExercise(id: $id) {
    id
    name
    exerciseCategoryId
  }
}
    `;
export type RemoveExerciseMutationFn = Apollo.MutationFunction<RemoveExerciseMutation, RemoveExerciseMutationVariables>;

/**
 * __useRemoveExerciseMutation__
 *
 * To run a mutation, you first call `useRemoveExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeExerciseMutation, { data, loading, error }] = useRemoveExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveExerciseMutation(baseOptions?: Apollo.MutationHookOptions<RemoveExerciseMutation, RemoveExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveExerciseMutation, RemoveExerciseMutationVariables>(RemoveExerciseDocument, options);
      }
export type RemoveExerciseMutationHookResult = ReturnType<typeof useRemoveExerciseMutation>;
export type RemoveExerciseMutationResult = Apollo.MutationResult<RemoveExerciseMutation>;
export type RemoveExerciseMutationOptions = Apollo.BaseMutationOptions<RemoveExerciseMutation, RemoveExerciseMutationVariables>;
export const RemoveSessionDocument = gql`
    mutation RemoveSession($id: Int!) {
  removeSession(id: $id) {
    id
    userId
    date
    trainerId
    feedback
  }
}
    `;
export type RemoveSessionMutationFn = Apollo.MutationFunction<RemoveSessionMutation, RemoveSessionMutationVariables>;

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSessionMutation, RemoveSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSessionMutation, RemoveSessionMutationVariables>(RemoveSessionDocument, options);
      }
export type RemoveSessionMutationHookResult = ReturnType<typeof useRemoveSessionMutation>;
export type RemoveSessionMutationResult = Apollo.MutationResult<RemoveSessionMutation>;
export type RemoveSessionMutationOptions = Apollo.BaseMutationOptions<RemoveSessionMutation, RemoveSessionMutationVariables>;
export const RemoveSessionExerciseDocument = gql`
    mutation RemoveSessionExercise($id: Int!) {
  removeSessionExercise(id: $id) {
    id
    name
    sessionId
  }
}
    `;
export type RemoveSessionExerciseMutationFn = Apollo.MutationFunction<RemoveSessionExerciseMutation, RemoveSessionExerciseMutationVariables>;

/**
 * __useRemoveSessionExerciseMutation__
 *
 * To run a mutation, you first call `useRemoveSessionExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionExerciseMutation, { data, loading, error }] = useRemoveSessionExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionExerciseMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSessionExerciseMutation, RemoveSessionExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSessionExerciseMutation, RemoveSessionExerciseMutationVariables>(RemoveSessionExerciseDocument, options);
      }
export type RemoveSessionExerciseMutationHookResult = ReturnType<typeof useRemoveSessionExerciseMutation>;
export type RemoveSessionExerciseMutationResult = Apollo.MutationResult<RemoveSessionExerciseMutation>;
export type RemoveSessionExerciseMutationOptions = Apollo.BaseMutationOptions<RemoveSessionExerciseMutation, RemoveSessionExerciseMutationVariables>;
export const RemoveTrainerDocument = gql`
    mutation RemoveTrainer($id: Int!) {
  removeTrainer(id: $id) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
  }
}
    `;
export type RemoveTrainerMutationFn = Apollo.MutationFunction<RemoveTrainerMutation, RemoveTrainerMutationVariables>;

/**
 * __useRemoveTrainerMutation__
 *
 * To run a mutation, you first call `useRemoveTrainerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTrainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTrainerMutation, { data, loading, error }] = useRemoveTrainerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTrainerMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTrainerMutation, RemoveTrainerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTrainerMutation, RemoveTrainerMutationVariables>(RemoveTrainerDocument, options);
      }
export type RemoveTrainerMutationHookResult = ReturnType<typeof useRemoveTrainerMutation>;
export type RemoveTrainerMutationResult = Apollo.MutationResult<RemoveTrainerMutation>;
export type RemoveTrainerMutationOptions = Apollo.BaseMutationOptions<RemoveTrainerMutation, RemoveTrainerMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($id: Int!) {
  removeUser(id: $id) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
  }
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UpdatePasswordTrainerDocument = gql`
    mutation UpdatePasswordTrainer($updatePasswordTrainerInput: UpdatePasswordTrainerInput!) {
  updatePasswordTrainer(updatePasswordTrainerInput: $updatePasswordTrainerInput) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
  }
}
    `;
export type UpdatePasswordTrainerMutationFn = Apollo.MutationFunction<UpdatePasswordTrainerMutation, UpdatePasswordTrainerMutationVariables>;

/**
 * __useUpdatePasswordTrainerMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordTrainerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordTrainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordTrainerMutation, { data, loading, error }] = useUpdatePasswordTrainerMutation({
 *   variables: {
 *      updatePasswordTrainerInput: // value for 'updatePasswordTrainerInput'
 *   },
 * });
 */
export function useUpdatePasswordTrainerMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordTrainerMutation, UpdatePasswordTrainerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordTrainerMutation, UpdatePasswordTrainerMutationVariables>(UpdatePasswordTrainerDocument, options);
      }
export type UpdatePasswordTrainerMutationHookResult = ReturnType<typeof useUpdatePasswordTrainerMutation>;
export type UpdatePasswordTrainerMutationResult = Apollo.MutationResult<UpdatePasswordTrainerMutation>;
export type UpdatePasswordTrainerMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordTrainerMutation, UpdatePasswordTrainerMutationVariables>;
export const UpdatePasswordUserDocument = gql`
    mutation UpdatePasswordUser($updatePasswordUserInput: UpdatePasswordUserInput!) {
  updatePasswordUser(updatePasswordUserInput: $updatePasswordUserInput) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
  }
}
    `;
export type UpdatePasswordUserMutationFn = Apollo.MutationFunction<UpdatePasswordUserMutation, UpdatePasswordUserMutationVariables>;

/**
 * __useUpdatePasswordUserMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordUserMutation, { data, loading, error }] = useUpdatePasswordUserMutation({
 *   variables: {
 *      updatePasswordUserInput: // value for 'updatePasswordUserInput'
 *   },
 * });
 */
export function useUpdatePasswordUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordUserMutation, UpdatePasswordUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordUserMutation, UpdatePasswordUserMutationVariables>(UpdatePasswordUserDocument, options);
      }
export type UpdatePasswordUserMutationHookResult = ReturnType<typeof useUpdatePasswordUserMutation>;
export type UpdatePasswordUserMutationResult = Apollo.MutationResult<UpdatePasswordUserMutation>;
export type UpdatePasswordUserMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordUserMutation, UpdatePasswordUserMutationVariables>;
export const UpdateSessionDocument = gql`
    mutation UpdateSession($updateSessionInput: UpdateSessionInput!) {
  updateSession(updateSessionInput: $updateSessionInput) {
    id
    userId
    date
    trainerId
    feedback
  }
}
    `;
export type UpdateSessionMutationFn = Apollo.MutationFunction<UpdateSessionMutation, UpdateSessionMutationVariables>;

/**
 * __useUpdateSessionMutation__
 *
 * To run a mutation, you first call `useUpdateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSessionMutation, { data, loading, error }] = useUpdateSessionMutation({
 *   variables: {
 *      updateSessionInput: // value for 'updateSessionInput'
 *   },
 * });
 */
export function useUpdateSessionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSessionMutation, UpdateSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSessionMutation, UpdateSessionMutationVariables>(UpdateSessionDocument, options);
      }
export type UpdateSessionMutationHookResult = ReturnType<typeof useUpdateSessionMutation>;
export type UpdateSessionMutationResult = Apollo.MutationResult<UpdateSessionMutation>;
export type UpdateSessionMutationOptions = Apollo.BaseMutationOptions<UpdateSessionMutation, UpdateSessionMutationVariables>;
export const UpdateTrainerDocument = gql`
    mutation UpdateTrainer($updateTrainerInput: UpdateTrainerInput!) {
  updateTrainer(updateTrainerInput: $updateTrainerInput) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
  }
}
    `;
export type UpdateTrainerMutationFn = Apollo.MutationFunction<UpdateTrainerMutation, UpdateTrainerMutationVariables>;

/**
 * __useUpdateTrainerMutation__
 *
 * To run a mutation, you first call `useUpdateTrainerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTrainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTrainerMutation, { data, loading, error }] = useUpdateTrainerMutation({
 *   variables: {
 *      updateTrainerInput: // value for 'updateTrainerInput'
 *   },
 * });
 */
export function useUpdateTrainerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTrainerMutation, UpdateTrainerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTrainerMutation, UpdateTrainerMutationVariables>(UpdateTrainerDocument, options);
      }
export type UpdateTrainerMutationHookResult = ReturnType<typeof useUpdateTrainerMutation>;
export type UpdateTrainerMutationResult = Apollo.MutationResult<UpdateTrainerMutation>;
export type UpdateTrainerMutationOptions = Apollo.BaseMutationOptions<UpdateTrainerMutation, UpdateTrainerMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
    graduate
    userCategoryId
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */

export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const FindOneUserByPhoneNumberDocument = gql`
    query FindOneUserByPhoneNumber($phoneNumber: String!) {
  findOneUserByPhoneNumber(phoneNumber: $phoneNumber) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
    graduate
  }
}
    `;

/**
 * __useFindOneUserByPhoneNumberQuery__
 *
 * To run a query within a React component, call `useFindOneUserByPhoneNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneUserByPhoneNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties

 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneUserByPhoneNumberQuery({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useFindOneUserByPhoneNumberQuery(baseOptions: Apollo.QueryHookOptions<FindOneUserByPhoneNumberQuery, FindOneUserByPhoneNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneUserByPhoneNumberQuery, FindOneUserByPhoneNumberQueryVariables>(FindOneUserByPhoneNumberDocument, options);
      }
export function useFindOneUserByPhoneNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneUserByPhoneNumberQuery, FindOneUserByPhoneNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneUserByPhoneNumberQuery, FindOneUserByPhoneNumberQueryVariables>(FindOneUserByPhoneNumberDocument, options);
        }
export type FindOneUserByPhoneNumberQueryHookResult = ReturnType<typeof useFindOneUserByPhoneNumberQuery>;
export type FindOneUserByPhoneNumberLazyQueryHookResult = ReturnType<typeof useFindOneUserByPhoneNumberLazyQuery>;
export type FindOneUserByPhoneNumberQueryResult = Apollo.QueryResult<FindOneUserByPhoneNumberQuery, FindOneUserByPhoneNumberQueryVariables>;

export const SessionDocument = gql`
    query Session($id: Int!) {
  session(id: $id) {
    id
    userId
    trainerId
    feedback
    sentFeedback
    date
    sessionExercises {
      id
      name
      sessionId
      exerciseCategoryName
      sessionExerciseVolumes {
        id
        reps
        sets
        weight
        seq
      }
    }
  }
}
    `;

/**
 * __useSessionQuery__
 *
 * To run a query within a React component, call `useSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSessionQuery(baseOptions: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
      }
export function useSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionQuery, SessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
        }
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionQueryResult = Apollo.QueryResult<SessionQuery, SessionQueryVariables>;
export const SessionHistoriesDocument = gql`
    query SessionHistories {
  sessionHistories {
    id
    date
    costPerSession
    totalCount
    usedCount
    commission
    userId
  }
}
    `;

/**
 * __useSessionHistoriesQuery__
 *
 * To run a query within a React component, call `useSessionHistoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionHistoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionHistoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionHistoriesQuery(baseOptions?: Apollo.QueryHookOptions<SessionHistoriesQuery, SessionHistoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionHistoriesQuery, SessionHistoriesQueryVariables>(SessionHistoriesDocument, options);
      }
export function useSessionHistoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionHistoriesQuery, SessionHistoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionHistoriesQuery, SessionHistoriesQueryVariables>(SessionHistoriesDocument, options);
        }
export type SessionHistoriesQueryHookResult = ReturnType<typeof useSessionHistoriesQuery>;
export type SessionHistoriesLazyQueryHookResult = ReturnType<typeof useSessionHistoriesLazyQuery>;
export type SessionHistoriesQueryResult = Apollo.QueryResult<SessionHistoriesQuery, SessionHistoriesQueryVariables>;
export const TrainerDocument = gql`
    query Trainer($id: Int!) {
  trainer(id: $id) {
    id
    email
    userName
    birthDate
    phoneNumber
    gender
    users {
      id
      email
      userName
      birthDate
      phoneNumber
      gender
      graduate
      userCategoryId
      sessionHistories {
        id
        date
        costPerSession
        totalCount
        usedCount
        commission
        userId
        user {
          userName
        }
      }
    }
    sessions {
      id
      userId
      trainerId
      feedback
      sentFeedback
      completedSession
      date
      user {
        id
        userName
        gender
      }
      sessionExercises {
        name
        sessionExerciseVolumes {
          id
          reps
          sets
          weight
          seq
        }
      }
    }
    exerciseCategories {
      id
      name
      trainerId
      exercises {
        id
        name
        exerciseCategoryId
      }
    }
    userCategories {
      id
      name
      trainerId
      users {
        id
        email
        userName
        gender
        graduate
        sessionHistories {
          id
          date
          costPerSession
          totalCount
          usedCount
          commission
        }
      }
    }
  }
}
    `;

/**
 * __useTrainerQuery__
 *
 * To run a query within a React component, call `useTrainerQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrainerQuery(baseOptions: Apollo.QueryHookOptions<TrainerQuery, TrainerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrainerQuery, TrainerQueryVariables>(TrainerDocument, options);
      }
export function useTrainerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrainerQuery, TrainerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrainerQuery, TrainerQueryVariables>(TrainerDocument, options);
        }
export type TrainerQueryHookResult = ReturnType<typeof useTrainerQuery>;
export type TrainerLazyQueryHookResult = ReturnType<typeof useTrainerLazyQuery>;
export type TrainerQueryResult = Apollo.QueryResult<TrainerQuery, TrainerQueryVariables>;
export const UserCategoriesDocument = gql`
    query UserCategories {
  userCategories {
    id
    name
    trainerId
  }
}
    `;

/**
 * __useUserCategoriesQuery__
 *
 * To run a query within a React component, call `useUserCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<UserCategoriesQuery, UserCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCategoriesQuery, UserCategoriesQueryVariables>(UserCategoriesDocument, options);
      }
export function useUserCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCategoriesQuery, UserCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCategoriesQuery, UserCategoriesQueryVariables>(UserCategoriesDocument, options);
        }
export type UserCategoriesQueryHookResult = ReturnType<typeof useUserCategoriesQuery>;
export type UserCategoriesLazyQueryHookResult = ReturnType<typeof useUserCategoriesLazyQuery>;
export type UserCategoriesQueryResult = Apollo.QueryResult<UserCategoriesQuery, UserCategoriesQueryVariables>;
export const UserCategoryDocument = gql`
    query UserCategory($id: Int!) {
  userCategory(id: $id) {
    id
    name
    trainerId
  }
}
    `;

/**
 * __useUserCategoryQuery__
 *
 * To run a query within a React component, call `useUserCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserCategoryQuery(baseOptions: Apollo.QueryHookOptions<UserCategoryQuery, UserCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCategoryQuery, UserCategoryQueryVariables>(UserCategoryDocument, options);
      }
export function useUserCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCategoryQuery, UserCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCategoryQuery, UserCategoryQueryVariables>(UserCategoryDocument, options);
        }
export type UserCategoryQueryHookResult = ReturnType<typeof useUserCategoryQuery>;
export type UserCategoryLazyQueryHookResult = ReturnType<typeof useUserCategoryLazyQuery>;
export type UserCategoryQueryResult = Apollo.QueryResult<UserCategoryQuery, UserCategoryQueryVariables>;