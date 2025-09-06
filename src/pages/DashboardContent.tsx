import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';
import { Post } from '@/types';
import { User, Heart, MessageCircle, Edit2, PenTool, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const DashboardContent: React.FC = () => {
  const { user } = useAuth();
  const { getUserPosts, getUserLikes, getUserComments, updatePost, deletePost, likePost, addComment } = useBlog();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'comments'>('posts');

  if (!user) return null;

  const userPosts = getUserPosts(user.id);
  const userLikes = getUserLikes(user.id);
  const userComments = getUserComments(user.id);

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
    <div className="max-w-4xl mx-auto">
      {/* Dashboard Header */}
      <div className="text-center mb-8">
        <div className="retro-card max-w-md mx-auto mb-8">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 mx-auto mb-4 border-4 border-primary image-pixelated"
          />
          <h1 className="retro-title mb-2">{user.name}</h1>
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
                  const post = getUserPosts(like.postId);
                  return (
                    <div key={like.id} className="retro-card">
                      <div className="flex items-center space-x-3 mb-2">
                        <Heart size={16} className="text-destructive" fill="currentColor" />
                        <span className="font-pixel text-xs text-muted-foreground">
                          You liked this post {formatDistanceToNow(new Date(like.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="font-mono-retro text-sm text-foreground">
                        From post: "{post[0]?.title || 'Unknown post'}"
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
                {userComments.map((comment) => (
                  <div key={comment.id} className="retro-card">
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
                      On post: "{comment.postId}" {/* You could enhance this with actual post title */}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;