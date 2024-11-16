export interface User {
  avatar_url: string;
  login: string;
  id: number;
  [key: string]: any;
}

export interface UsersResponse {
  total_count: number;
  items: User[];
}
