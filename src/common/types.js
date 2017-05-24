// @flow

// Algebraic types are composable, so it makes sense to have them at one place.
// blog.ploeh.dk/2016/11/28/easy-domain-modelling-with-types

// Core

export type Deps = {
  FBSDK: any,
  firebase: any,
  firebaseAuth: Function,
  firebaseDatabase: any,
  getState: () => Object,
  getUid: () => string,
  now: () => number,
  uuid: Object,
  validate: (json: Object) => any,
};

// Models

export type Todo = {|
  completed: boolean,
  createdAt: number,
  id: string,
  title: string,
|};

export type User = {|
  displayName: string,
  email: ?string,
  id: string,
  photoURL: ?string,
|};

export type Room = {|
  title: string,
  createdAt: number,
  messages: ?Array<Message>,
  members: ?Array<User>,
  id: string,
|};

export type Message = {|
  text: string,
  createdAt: number,
  id: string,
  roomId: string,
  authorId: string,
  authorName: string,
|};


// Reducers
// We can't use exact object type, because spread is not supported yet.
// We can't use Strict<T> = T & $Shape<T>, because it breaks autocomplete.
// TODO: Wait for Flow.

export type AppState = {
  baselineShown: boolean,
  currentTheme: string,
  error: ?Error,
  menuShown: boolean,
  online: boolean,
  started: boolean,
};

export type AuthState = {
  formDisabled: boolean,
  error: ?Error,
};

export type ConfigState = {
  appName: string,
  appVersion: string,
  firebase: ?Object,
  sentryUrl: string,
};

export type DeviceState = {
  host: string,
};

export type IntlState = {
  currentLocale: ?string,
  defaultLocale: ?string,
  initialNow: ?number,
  locales: ?Array<string>,
  messages: ?Object,
};

export type TodosState = {
  all: { [id: string]: Todo },
};

export type UsersState = {
  online: ?Array<User>,
  viewer: ?User,
};

export type ChatState = {
  rooms: ?Object,
  currentRoomId: ?string,
  isFetching: boolean,
};

// State

export type State = {
  app: AppState,
  auth: AuthState,
  config: ConfigState,
  device: DeviceState,
  fields: any,
  found: Object, // found router
  intl: IntlState,
  todos: TodosState,
  users: UsersState,
  chat: ChatState,
};

// Actions

export type Action =
  | { type: 'APP_ERROR', payload: { error: Error } }
  | { type: 'ADD_HUNDRED_TODOS', payload: { todos: Array<Todo> } }
  | { type: 'ADD_TODO', payload: { todo: Todo } }
  | { type: 'APP_ONLINE', payload: { online: boolean } }
  | { type: 'APP_SHOW_MENU', payload: { menuShown: boolean } }
  | { type: 'APP_STARTED' }
  | { type: 'CLEAR_ALL_COMPLETED_TODOS' }
  | { type: 'CLEAR_ALL_TODOS' }
  | { type: 'DELETE_TODO', payload: { id: string } }
  | { type: 'ON_AUTH', payload: { firebaseUser: ?Object } }
  | { type: 'ON_USERS_PRESENCE', payload: { presence: Object } }
  | { type: 'RESET_PASSWORD', payload: { email: string } }
  | { type: 'SAVE_USER_DONE' }
  | { type: 'SET_CURRENT_LOCALE', payload: { locale: string } }
  | { type: 'SET_THEME', payload: { theme: string } }
  | { type: 'SIGN_IN', payload: { providerName: string, options?: Object } }
  | { type: 'SIGN_IN_DONE', payload: { user: ?User } }
  | { type: 'SIGN_IN_FAIL', payload: { error: Error } }
  | { type: 'SIGN_OUT' }
  | { type: 'SIGN_UP', payload: { providerName: string, options?: Object } }
  | { type: 'SIGN_UP_DONE', payload: { user: ?User } }
  | { type: 'SIGN_UP_FAIL', payload: { error: Error } }
  | { type: 'TOGGLE_TODO_COMPLETED', payload: { todo: Todo } }
  | { type: 'TOGGLE_BASELINE' }
  | { type: 'QUERY_FIREBASE', payload: { ref: string } }
  | { type: 'CREATE_ROOM', payload: { room: Room } }
  | { type: 'SELECT_ROOM', payload: { room: Room } }
  | { type: 'SEND_MESSAGE', payload: { message: Message } }
  | { type: 'JOIN_ROOM', payload: { roomId: string, user: User } }
  | { type: 'LEAVE_ROOM', payload: { roomId: string, userId: string } }
  | { type: 'ROOMS_FETCHED', payload: { rooms: Object } }
  | { type: 'FETCH_ROOMS' }
  | { type: 'ROOM_CREATED' }
  | { type: 'MESSAGE_SENT' }
  | { type: 'ROOM_FETCHED' };
