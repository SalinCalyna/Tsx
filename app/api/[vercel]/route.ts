// app/api/[vercel]/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const blogResponse = await fetch('https://api.vercel.app/blog');
    const blogPosts = await blogResponse.json();

    const photoResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
    const photoTitles = await photoResponse.json();

    // Extract titles from photos
    const titles = photoTitles.map((photo: { id: number; title: string }) => ({
        id: photo.id,
        title: photo.title,
    }));

    // Combine data
    const combinedData = blogPosts.map((post: { id: number; content: string; author: string; date: string; category: string }) => ({
        id: post.id,
        title: titles[post.id - 1]?.title || 'No Title', // Get title based on post ID
        content: post.content,
        author: post.author,
        date: post.date,
        category: post.category,
    }));

    return NextResponse.json(combinedData);
}
