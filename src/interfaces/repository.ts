export interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  [key: string]: any;
}

export type RepositoryResponse = Repository[];
