// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  bucket?: string;
  status?: string;
  published_at?: string;
  thumbnail?: string;
}

// Specific object types with properly typed metadata
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    publication_date?: string;
    featured_post?: boolean;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    twitter_handle?: string;
    linkedin_url?: string;
    website_url?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

// Utility types for common patterns
export type CreatePostData = Omit<Post, 'id' | 'created_at' | 'modified_at'>;
export type PostSummary = Pick<Post, 'id' | 'title' | 'slug' | 'metadata'>;