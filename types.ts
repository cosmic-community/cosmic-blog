// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
  bucket?: string;
  status?: string;
  published_at?: string;
}

// Post interface
export interface Post extends CosmicObject {
  type_slug: 'posts';
  metadata: {
    content: string;
    excerpt?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    tags?: string;
    published_date?: string;
  };
}

// Author interface
export interface Author extends CosmicObject {
  type_slug: 'authors';
  metadata: {
    full_name?: string;
    bio?: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    twitter_handle?: string;
    linkedin_url?: string;
    website?: string;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type_slug: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// Comment interface
export interface Comment extends CosmicObject {
  type_slug: 'comments';
  metadata: {
    author_name: string;
    author_email: string;
    author_website?: string;
    content: string;
    post: Post | string;
    status: {
      key: string;
      value: CommentStatus;
    };
    parent_comment?: Comment | null;
  };
}

// Type literals for select-dropdown values
export type CommentStatus = 'pending' | 'approved' | 'rejected';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type_slug === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type_slug === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type_slug === 'categories';
}

export function isComment(obj: CosmicObject): obj is Comment {
  return obj.type_slug === 'comments';
}

// Form data types
export interface CreateCommentData {
  author_name: string;
  author_email: string;
  author_website?: string;
  content: string;
  post_id: string;
  parent_comment_id?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
}