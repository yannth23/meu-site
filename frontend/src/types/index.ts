export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface FavoriteTeam {
  id: string;
  userId: string;
  teamName: string;
}

export interface UserPreference {
  id: string;
  userId: string;
  receiveDailyNotifications: boolean;
}

export interface FootballMatch {
  id: string;
  date: string;
  championship: string;
  team1: string;
  team2: string;
  status: string;
  externalId?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}