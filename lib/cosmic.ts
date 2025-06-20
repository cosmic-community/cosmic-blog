import { createBucketClient } from '@cosmicjs/sdk';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
});

// Error handling helper
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all posts with related data
export async function getAllPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'posts', 
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch post: ${slug}`);
  }
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by category');
  }
}

// Fetch posts by author
export async function getPostsByAuthor(authorId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by author');
  }
}

// Fetch all authors
export async function getAllAuthors() {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

// Fetch single author by slug
export async function getAuthorBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'authors', 
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch author: ${slug}`);
  }
}

// Fetch all categories
export async function getAllCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Fetch single category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'categories', 
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch category: ${slug}`);
  }
}

// Fetch comments for a post
export async function getCommentsByPost(postId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'comments',
        'metadata.post': postId,
        'metadata.status.value': 'approved'
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch comments');
  }
}

// Create a new comment
export async function createComment(data: {
  author_name: string;
  author_email: string;
  author_website?: string;
  content: string;
  post_id: string;
  parent_comment_id?: string;
}) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'comments',
      title: `Comment by ${data.author_name}`,
      metadata: {
        author_name: data.author_name,
        author_email: data.author_email,
        author_website: data.author_website || "",
        content: data.content,
        post: data.post_id,
        status: 'pending',
        parent_comment: data.parent_comment_id || null
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error('Failed to create comment');
  }
}