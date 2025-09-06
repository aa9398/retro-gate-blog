import React from 'react';
import { useBlog } from '@/contexts/BlogContext';
import PostCard from '@/components/PostCard';
import { Zap } from 'lucide-react';

const Feed: React.FC = () => {
  const { posts, likePost, addComment } = useBlog();

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="retro-card max-w-md mx-auto">
          <Zap className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="retro-subtitle mb-4">No Posts Yet</h2>
          <p className="font-mono-retro text-muted-foreground">
            The retro feed is empty. Be the first to share something awesome!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Feed Header */}
      <div className="text-center mb-8">
        <h1 className="retro-title mb-4">The Feed</h1>
        <p className="font-mono-retro text-muted-foreground">
          Latest posts from the retro community
        </p>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={likePost}
            onComment={addComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;