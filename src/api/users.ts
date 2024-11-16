import { BASE_URL } from "@/const/url";
import { UsersResponse } from "@/interfaces/users";
import { fetchData } from "@/lib/fetchData";
import { buildUrl } from "@/lib/utils";

export const fetchUsers = (searchTerm: string): Promise<UsersResponse> => {
  const searchUrl = buildUrl(BASE_URL, "/search/users", {
    q: searchTerm,
    per_page: 5,
  });

  return fetchData<UsersResponse>(searchUrl);
};
