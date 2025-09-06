import React from 'react';
import { Post } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, MessageCircle, Edit2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onLike, 
  onComment, 
  onEdit, 
  onDelete 
}) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  
  const isLiked = post.likes.some(like => like.userId === user?.id);
  const isOwnPost = post.authorId === user?.id;

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText.trim());
      setCommentText('');
    }
  };

  return (
    <article className="retro-card mb-6 animate-retro-bounce">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 border-2 border-primary image-pixelated"
          />
          <div>
            <h3 className="font-pixel text-sm text-primary">
              {post.author.name}
            </h3>
            <p className="font-mono-retro text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Edit/Delete buttons for own posts */}
        {isOwnPost && (
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(post)}
                className="p-2 text-accent hover:text-accent/80 transition-colors duration-300"
                title="Edit Post"
              >
                <Edit2 size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(post.id)}
                className="p-2 text-destructive hover:text-destructive/80 transition-colors duration-300"
                title="Delete Post"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h2 className="retro-subtitle mb-3">{post.title}</h2>
        <div className="font-mono-retro text-sm text-foreground leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-primary/30 pt-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-2 px-3 py-2 font-pixel text-xs uppercase tracking-wider transition-all duration-300 ${
              isLiked
                ? 'text-destructive border border-destructive/50'
                : 'text-muted-foreground hover:text-destructive'
            }`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{post.likes.length}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-3 py-2 font-pixel text-xs uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors duration-300"
          >
            <MessageCircle size={16} />
            <span>{post.comments.length}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-primary/30">
          {/* Add Comment Form */}
          <form onSubmit={handleComment} className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="retro-input flex-1"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="retro-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-6 h-6 border border-primary/50 image-pixelated"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-pixel text-xs text-accent">
                      {comment.user.name}
                    </span>
                    <span className="font-mono-retro text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="font-mono-retro text-sm text-foreground">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default PostCard;