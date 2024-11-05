'use client'
import { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    category: string;
}

export default function FetchDataPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/vercel');
                if (!response.ok) {
                    throw new Error('Failed to fetch data: ' + response.statusText);
                }
                const data: Post[] = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-blue-500">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent" />
                    <p className="mt-2 text-white">Loading posts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700">
                <div className="text-center text-white">
                    <p className="text-xl font-semibold">Error</p>
                    <p className="mt-2">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: 'url(/path/to/your/background-image.png)' }}  // Update with your image path
        >
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white">My Blog</h1> {/* Changed to text-white */}
                    <div className="space-x-4">
                        <a href="#" className="text-gray-700 hover:text-green-600">Home</a>
                        <a href="#" className="text-gray-700 hover:text-green-600">About</a>
                        <a href="#" className="text-gray-700 hover:text-green-600">Contact</a>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-12 mt-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            className="mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="6" x2="12" y2="12" />
                            <line x1="12" y1="12" x2="15" y2="15" />
                        </svg>
                        Latest Posts
                    </h1>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        Explore our collection of carefully curated articles and insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 border-l-4 border-green-600"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-full">
                                        {post.category}
                                    </span>
                                    <time className="text-sm text-gray-500">{post.date}</time>
                                </div>

                                <h2 id={`post-title-${post.id}`} className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.content}
                                </p>

                                <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-600 font-medium">
                                                {post.author[0].toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto text-center">
                    <p className="text-sm">© {new Date().getFullYear()} My Blog. All rights reserved.</p>
                    <p className="text-sm">Follow us on social media.</p>
                </div>
            </footer>
        </div>
    );
}
