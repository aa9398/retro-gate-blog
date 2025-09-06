import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import PostForm from '@/components/PostForm';
import Layout from '@/components/Layout';
import { Navigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { createPost } = useBlog();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (data: { title: string; content: string }) => {
    createPost(data);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="retro-title mb-4">Create Post</h1>
          <p className="font-mono-retro text-muted-foreground">
            Share your thoughts with the retro community
          </p>
        </div>

        {/* Post Form */}
        <PostForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </Layout>
  );
};

export default CreatePost;