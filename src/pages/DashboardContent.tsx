import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';
import StatsCard from '@/components/StatsCard';
import { Post } from '@/types';
import { User, Heart, MessageCircle, PenTool, Calendar, Trophy, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const DashboardContent: React.FC = () => {
  const { user } = useAuth();
  const { posts, getUserPosts, getUserLikes, getUserComments, updatePost, deletePost, likePost, addComment } = useBlog();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'likes' | 'comments'>('overview');

  if (!user) return null;

  const userPosts = getUserPosts(user.id);
  const userLikes = getUserLikes(user.id);
  const userComments = getUserComments(user.id);

  // Calculate user stats
  const totalLikesReceived = userPosts.reduce((total, post) => total + post.likes.length, 0);
  const totalCommentsReceived = userPosts.reduce((total, post) => total + post.comments.length, 0);

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = (data: { title: string; content: string }) => {
    if (editingPost) {
      updatePost(editingPost.id, data);
      setEditingPost(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  if (editingPost) {
    return (
      <div className="max-w-2xl mx-auto">
        <PostForm
          post={editingPost}
          onSubmit={handleUpdatePost}
          onCancel={handleCancelEdit}
          isEditing={true}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Dashboard Header */}
      <div className="text-center mb-8">
        <div className="retro-card max-w-md mx-auto mb-8 hover-glow">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 mx-auto mb-4 border-4 border-primary image-pixelated"
          />
          <h1 className="retro-title mb-2 animate-neon-glow">{user.name}</h1>
          <p className="font-mono-retro text-sm text-muted-foreground mb-4">
            {user.email}
          </p>
          <div className="flex items-center justify-center space-x-2 text-xs font-pixel text-accent">
            <Calendar size={14} />
            <span>
              Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-1 border-2 border-primary bg-secondary/20">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center space-x-2 px-4 py-2 font-pixel text-xs uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'overview'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Trophy size={14} />
            <span>Overview</span>
          </button>
          
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center space-x-2 px-4 py-2 font-pixel text-xs uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'posts'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <PenTool size={14} />
            <span>Posts ({userPosts.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('likes')}
            className={`flex items-center space-x-2 px-4 py-2 font-pixel text-xs uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'likes'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <Heart size={14} />
            <span>Likes ({userLikes.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('comments')}
            className={`flex items-center space-x-2 px-4 py-2 font-pixel text-xs uppercase tracking-wider transition-all duration-300 ${
              activeTab === 'comments'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <MessageCircle size={14} />
            <span>Comments ({userComments.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                icon={PenTool}
                title="Posts Created"
                count={userPosts.length}
                description="Total blog posts"
                color="primary"
              />
              
              <StatsCard
                icon={Heart}
                title="Likes Given"
                count={userLikes.length}
                description="Posts you liked"
                color="destructive"
              />
              
              <StatsCard
                icon={MessageCircle}
                title="Comments Made"
                count={userComments.length}
                description="Your comments"
                color="accent"
              />
              
              <StatsCard
                icon={Zap}
                title="Engagement"
                count={totalLikesReceived + totalCommentsReceived}
                description="Total interactions"
                color="primary"
              />
            </div>

            {/* Recent Activity */}
            <div className="retro-card">
              <h3 className="retro-subtitle mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {userPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border border-primary/20 bg-secondary/20">
                    <div>
                      <h4 className="font-pixel text-sm text-primary mb-1">{post.title}</h4>
                      <p className="font-mono-retro text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Heart size={12} className="text-destructive" />
                        <span>{post.likes.length}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle size={12} className="text-accent" />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {userPosts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="font-mono-retro text-muted-foreground">
                      No posts yet. Start sharing your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div>
            {userPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="retro-card max-w-md mx-auto">
                  <PenTool className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                  <h3 className="retro-subtitle mb-4">No Posts Yet</h3>
                  <p className="font-mono-retro text-muted-foreground">
                    You haven't created any posts. Share your first retro thought!
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-6">
                {userPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={likePost}
                    onComment={addComment}
                    onEdit={handleEditPost}
                    onDelete={deletePost}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Likes Tab */}
        {activeTab === 'likes' && (
          <div>
            {userLikes.length === 0 ? (
              <div className="text-center py-16">
                <div className="retro-card max-w-md mx-auto">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                  <h3 className="retro-subtitle mb-4">No Likes Yet</h3>
                  <p className="font-mono-retro text-muted-foreground">
                    You haven't liked any posts. Show some love to the community!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {userLikes.map((like) => {
                  const post = posts.find(p => p.id === like.postId);
                  return (
                    <div key={like.id} className="retro-card hover-glow">
                      <div className="flex items-center space-x-3 mb-2">
                        <Heart size={16} className="text-destructive" fill="currentColor" />
                        <span className="font-pixel text-xs text-muted-foreground">
                          You liked this post {formatDistanceToNow(new Date(like.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="font-mono-retro text-sm text-foreground">
                        "{post?.title || 'Unknown post'}" by {post?.author.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div>
            {userComments.length === 0 ? (
              <div className="text-center py-16">
                <div className="retro-card max-w-md mx-auto">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                  <h3 className="retro-subtitle mb-4">No Comments Yet</h3>
                  <p className="font-mono-retro text-muted-foreground">
                    You haven't commented on any posts. Join the conversation!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {userComments.map((comment) => {
                  const post = posts.find(p => p.id === comment.postId);
                  return (
                    <div key={comment.id} className="retro-card hover-glow">
                      <div className="flex items-center space-x-3 mb-2">
                        <MessageCircle size={16} className="text-accent" />
                        <span className="font-pixel text-xs text-muted-foreground">
                          You commented {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="font-mono-retro text-sm text-foreground mb-2">
                        "{comment.content}"
                      </p>
                      <p className="font-pixel text-xs text-primary">
                        On "{post?.title || 'Unknown post'}" by {post?.author.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;