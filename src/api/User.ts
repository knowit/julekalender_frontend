export interface CurrentUser {
  uuid: string;
}

export interface Whoami {
  user: CurrentUser;
};

export default CurrentUser;
