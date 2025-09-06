import React, { useState } from 'react';
import { Post } from '@/types';
import { X, Save } from 'lucide-react';

interface PostFormProps {
  post?: Post;
  onSubmit: (data: { title: string; content: string }) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ 
  post, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      onSubmit({ title: title.trim(), content: content.trim() });
      setIsSubmitting(false);
      
      if (!isEditing) {
        setTitle('');
        setContent('');
      }
    }, 500);
  };

  return (
    <div className="retro-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="retro-subtitle">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-muted-foreground hover:text-destructive transition-colors duration-300"
          title="Cancel"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block font-pixel text-sm text-primary mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title..."
            className="retro-input w-full"
            required
            maxLength={100}
          />
          <div className="text-right mt-1">
            <span className="font-mono-retro text-xs text-muted-foreground">
              {title.length}/100
            </span>
          </div>
        </div>

        {/* Content Textarea */}
        <div>
          <label className="block font-pixel text-sm text-primary mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts with the retro community..."
            className="retro-input w-full h-48 resize-vertical"
            required
            maxLength={2000}
          />
          <div className="text-right mt-1">
            <span className="font-mono-retro text-xs text-muted-foreground">
              {content.length}/2000
            </span>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-primary/30">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 font-pixel text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={!title.trim() || !content.trim() || isSubmitting}
            className="retro-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>{isEditing ? 'Updating...' : 'Publishing...'}</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>{isEditing ? 'Update Post' : 'Publish Post'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;