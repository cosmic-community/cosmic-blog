import { cosmic, safeCosmicQuery } from './cosmic'
import type { Post, Category, Author, CosmicResponse } from '../types'

// Fetch all posts with author and category data
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.publication_date');
    
    return response.objects as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.publication_date');
    
    return response.objects as Post[];
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

// Fetch featured posts
export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.featured_post': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(3)
      .sort('-metadata.publication_date');
    
    return response.objects as Post[];
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await safeCosmicQuery(async () => {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug
      })
      .depth(1);
    
    return response.object as Post;
  });

  return result;
}

// Fetch all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'categories'
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const result = await safeCosmicQuery(async () => {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug
      });
    
    return response.object as Category;
  });

  return result;
}

// Fetch all authors
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'authors'
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Author[];
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

// Fetch single author by slug
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const result = await safeCosmicQuery(async () => {
    const response = await cosmic.objects
      .findOne({
        type: 'authors',
        slug
      });
    
    return response.object as Author;
  });

  return result;
}

// Fetch posts by author
export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.publication_date');
    
    return response.objects as Post[];
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    return [];
  }
}