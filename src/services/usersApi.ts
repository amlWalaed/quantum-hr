import axios from "axios";

const RANDOM_USER_API = "https://randomuser.me/api/?results=50";

export interface RandomUserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<RandomUserResponse>(RANDOM_USER_API);
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch users: ${error.message || "Unknown error"}`
      );
    }
    throw new Error("Failed to fetch users: Unknown error");
  }
};

