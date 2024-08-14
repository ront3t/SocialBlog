import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post } from './types';

interface PostContextProps {
    posts: Post[];
    addPost: (post: Post) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const usePost = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Fetch posts from the backend
        fetch('http://localhost:5000/api/posts')
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    const addPost = (post: Post) => {
        setPosts([...posts, post]);
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
};
