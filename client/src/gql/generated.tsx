import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  Post: Post;
  User: UserResponseStrict;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  error?: Maybe<ErrorType>;
  user: UserResponseStrict;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  deleteComment: Comment;
  deletePost: Post;
  likePost: Like;
  login: LoginResponse;
  logout: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  register: RegisterResponse;
  unLikePost: Like;
  updatedUserProfile: UserResponseStrict;
};


export type MutationCreateCommentArgs = {
  postId: Scalars['Float']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  text: Scalars['String']['input'];
  video: Scalars['Upload']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLikePostArgs = {
  postId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginDto;
};


export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};


export type MutationUnLikePostArgs = {
  postId: Scalars['Float']['input'];
};


export type MutationUpdatedUserProfileArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  Likes?: Maybe<Array<Like>>;
  User: UserResponseStrict;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  video: Scalars['String']['output'];
};

export type PostDetails = {
  __typename?: 'PostDetails';
  Likes?: Maybe<Array<Like>>;
  User: UserResponseStrict;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  otherPostIds?: Maybe<Array<Scalars['Float']['output']>>;
  text: Scalars['String']['output'];
  video: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCommentByPostId: Array<Comment>;
  getPostById: PostDetails;
  getPosts: Array<Post>;
  getPostsByUserId: Array<Post>;
  getUsers: Array<UserResponseStrict>;
  hello: Scalars['String']['output'];
};


export type QueryGetCommentByPostIdArgs = {
  postId: Scalars['Float']['input'];
};


export type QueryGetPostByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetPostsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryGetPostsByUserIdArgs = {
  userId: Scalars['Float']['input'];
};

export type RegisterDto = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  error?: Maybe<ErrorType>;
  user?: Maybe<UserResponseStrict>;
};

export type UserResponseStrict = {
  __typename?: 'UserResponseStrict';
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterDto;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', user?: { __typename?: 'UserResponseStrict', id: number, name: string, email: string } | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginDto;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', user: { __typename?: 'UserResponseStrict', image?: string | null, email: string, name: string, bio?: string | null, id: number } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'UserResponseStrict', id: number, name: string, image?: string | null, email: string }> };

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String']['input'];
  video: Scalars['Upload']['input'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, text: string, video: string } };

export type GetPostsQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', id: number, text: string, video: string, User: { __typename?: 'UserResponseStrict', id: number, name: string, email: string }, Likes?: Array<{ __typename?: 'Like', id: number, userId: number, postId: number }> | null }> };

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Float']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, text: string, createdAt: any, User: { __typename?: 'UserResponseStrict', id: number, name: string, email: string }, Post: { __typename?: 'Post', id: number, text: string, video: string } } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['Float']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename: 'Comment', id: number } };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['Float']['input'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: { __typename?: 'Like', id: number, postId: number, userId: number } };

export type UnLikePostMutationVariables = Exact<{
  postId: Scalars['Float']['input'];
}>;


export type UnLikePostMutation = { __typename?: 'Mutation', unLikePost: { __typename?: 'Like', id: number, postId: number, userId: number } };

export type GetCommentByPostIdQueryVariables = Exact<{
  postId: Scalars['Float']['input'];
}>;


export type GetCommentByPostIdQuery = { __typename?: 'Query', getCommentByPostId: Array<{ __typename?: 'Comment', id: number, text: string, createdAt: any, User: { __typename?: 'UserResponseStrict', id: number, name: string, email: string, image?: string | null }, Post: { __typename?: 'Post', id: number, text: string, video: string } }> };

export type GetPostsByUserIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetPostsByUserIdQuery = { __typename?: 'Query', getPostsByUserId: Array<{ __typename?: 'Post', id: number, text: string, video: string, createdAt: any, User: { __typename?: 'UserResponseStrict', name: string, email: string, id: number } }> };

export type GetPostByIdQueryVariables = Exact<{
  getPostByIdId: Scalars['Float']['input'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPostById: { __typename?: 'PostDetails', id: number, text: string, video: string, createdAt: any, otherPostIds?: Array<number> | null, User: { __typename?: 'UserResponseStrict', id: number, email: string, name: string, image?: string | null }, Likes?: Array<{ __typename?: 'Like', id: number, postId: number, userId: number }> | null } };

export type UpdatedUserProfileMutationVariables = Exact<{
  bio?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdatedUserProfileMutation = { __typename?: 'Mutation', updatedUserProfile: { __typename?: 'UserResponseStrict', id: number, name: string, bio?: string | null, image?: string | null } };

export const namedOperations = {
  Query: {
    GetUsers: 'GetUsers',
    GetPosts: 'GetPosts',
    GetCommentByPostId: 'GetCommentByPostId',
    GetPostsByUserId: 'GetPostsByUserId',
    GetPostById: 'GetPostById'
  },
  Mutation: {
    Register: 'Register',
    Login: 'Login',
    Logout: 'Logout',
    CreatePost: 'CreatePost',
    CreateComment: 'CreateComment',
    DeleteComment: 'DeleteComment',
    LikePost: 'LikePost',
    UnLikePost: 'UnLikePost',
    UpdatedUserProfile: 'UpdatedUserProfile'
  }
}

export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"video"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"video"},"value":{"kind":"Variable","name":{"kind":"Name","value":"video"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"video"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"video"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteCommentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteCommentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const LikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<LikePostMutation, LikePostMutationVariables>;
export const UnLikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnLikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unLikePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<UnLikePostMutation, UnLikePostMutationVariables>;
export const GetCommentByPostIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCommentByPostId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCommentByPostId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"video"}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables>;
export const GetPostsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>;
export const GetPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getPostByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getPostByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"otherPostIds"}}]}}]}}]} as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const UpdatedUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatedUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<UpdatedUserProfileMutation, UpdatedUserProfileMutationVariables>;