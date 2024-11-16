import { BASE_URL } from "@/const/url";
import { RepositoryResponse } from "@/interfaces/repository";
import { UsersResponse } from "@/interfaces/user";
import { fetchData } from "@/lib/fetchData";
import { buildUrl } from "@/lib/utils";

export const fetchUsers = (searchTerm: string): Promise<UsersResponse> => {
  const searchUrl = buildUrl(BASE_URL, "/search/users", {
    q: searchTerm,
    per_page: 5,
  });

  return fetchData<UsersResponse>(searchUrl);
};

export const fetchUserRepositories = (
  username: string,
  page: number = 1,
): Promise<RepositoryResponse> => {
  const searchUrl = buildUrl(BASE_URL, `/users/${username}/repos`, {
    page,
    per_page: 10,
  });

  return fetchData<RepositoryResponse>(searchUrl);
};
