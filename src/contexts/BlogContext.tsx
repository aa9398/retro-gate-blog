import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post, Like, Comment, User } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface BlogState {
  posts: Post[];
  createPost: (data: { title: string; content: string }) => void;
  updatePost: (postId: string, data: { title: string; content: string }) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  getUserPosts: (userId: string) => Post[];
  getUserLikes: (userId: string) => Like[];
  getUserComments: (userId: string) => Comment[];
}

const BlogContext = createContext<BlogState | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Pixel Pete',
    email: 'pete@retroblock.com',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=pete&backgroundColor=8b5cf6',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user2',
    name: 'Neon Nancy',
    email: 'nancy@retroblock.com',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=nancy&backgroundColor=a855f7',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'user3',
    name: 'Cyber Sam',
    email: 'sam@retroblock.com',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=sam&backgroundColor=c084fc',
    createdAt: new Date('2024-01-25'),
  },
];

const initialPosts: Post[] = [
  {
    id: 'post1',
    title: 'Welcome to the Retro Future',
    content: `Just discovered this amazing retro blog platform! The pixelated design brings back memories of the good old days when games were simple but incredibly fun.\n\nLove the neon purple theme and the chunky UI elements. It's like blogging in a cyberpunk universe! 🕹️`,
    authorId: 'user1',
    author: mockUsers[0],
    createdAt: new Date('2024-01-30T10:00:00'),
    updatedAt: new Date('2024-01-30T10:00:00'),
    likes: [],
    comments: [
      {
        id: 'comment1',
        content: 'Totally agree! This design is fire 🔥',
        userId: 'user2',
        postId: 'post1',
        user: mockUsers[1],
        createdAt: new Date('2024-01-30T11:00:00'),
      },
    ],
  },
  {
    id: 'post2',
    title: 'The Art of Pixel Perfect Design',
    content: `Been thinking about what makes retro design so appealing. There's something about the constraints of pixel art that forces creativity.\n\nEvery pixel matters when you're working with limited resolution. It's like poetry - saying more with less.`,
    authorId: 'user2',
    author: mockUsers[1],
    createdAt: new Date('2024-01-29T15:30:00'),
    updatedAt: new Date('2024-01-29T15:30:00'),
    likes: [
      {
        id: 'like1',
        userId: 'user1',
        postId: 'post2',
        user: mockUsers[0],
        createdAt: new Date('2024-01-29T16:00:00'),
      },
    ],
    comments: [],
  },
  {
    id: 'post3',
    title: 'Cyberpunk Aesthetics in Modern UI',
    content: `The cyberpunk aesthetic isn't just about looks - it's about attitude. The rebellion against clean, sterile designs. The embrace of digital grit and neon dreams.\n\nThis platform perfectly captures that spirit. Black backgrounds, electric purple accents, and that distinctive pixelated charm.`,
    authorId: 'user3',
    author: mockUsers[2],
    createdAt: new Date('2024-01-28T20:15:00'),
    updatedAt: new Date('2024-01-28T20:15:00'),
    likes: [
      {
        id: 'like2',
        userId: 'user1',
        postId: 'post3',
        user: mockUsers[0],
        createdAt: new Date('2024-01-28T21:00:00'),
      },
      {
        id: 'like3',
        userId: 'user2',
        postId: 'post3',
        user: mockUsers[1],
        createdAt: new Date('2024-01-28T21:30:00'),
      },
    ],
    comments: [
      {
        id: 'comment2',
        content: 'This is exactly why I love retro design!',
        userId: 'user1',
        postId: 'post3',
        user: mockUsers[0],
        createdAt: new Date('2024-01-28T22:00:00'),
      },
    ],
  },
];

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const createPost = (data: { title: string; content: string }) => {
    if (!user) return;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      title: data.title,
      content: data.content,
      authorId: user.id,
      author: user,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [],
      comments: [],
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    toast.success('Post published successfully!');
  };

  const updatePost = (postId: string, data: { title: string; content: string }) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, title: data.title, content: data.content, updatedAt: new Date() }
          : post
      )
    );
    toast.success('Post updated successfully!');
  };

  const deletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    toast.success('Post deleted successfully!');
  };

  const likePost = (postId: string) => {
    if (!user) return;

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id !== postId) return post;

        const existingLike = post.likes.find(like => like.userId === user.id);
        
        if (existingLike) {
          // Unlike
          return {
            ...post,
            likes: post.likes.filter(like => like.userId !== user.id),
          };
        } else {
          // Like
          const newLike: Like = {
            id: `like_${Date.now()}`,
            userId: user.id,
            postId: postId,
            user: user,
            createdAt: new Date(),
          };
          return {
            ...post,
            likes: [...post.likes, newLike],
          };
        }
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!user) return;

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      content: content,
      userId: user.id,
      postId: postId,
      user: user,
      createdAt: new Date(),
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.authorId === userId);
  };

  const getUserLikes = (userId: string) => {
    return posts.flatMap(post => 
      post.likes.filter(like => like.userId === userId)
    );
  };

  const getUserComments = (userId: string) => {
    return posts.flatMap(post => 
      post.comments.filter(comment => comment.userId === userId)
    );
  };

  const value: BlogState = {
    posts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    getUserPosts,
    getUserLikes,
    getUserComments,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};