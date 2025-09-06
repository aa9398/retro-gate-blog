export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  comments: Comment[];
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  user: User;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  user: User;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: Omit<User, 'id' | 'createdAt'>) => void;
  logout: () => void;
}