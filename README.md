<!-- README_START -->
# Cosmic Blog

A modern, full-featured blog application built with Next.js 15 and powered by Cosmic CMS. This application showcases a complete blogging platform with posts, authors, categories, and a threaded comment system.

## Features

- 📝 **Blog Posts** - Rich markdown content with featured images
- 👥 **Author Profiles** - Detailed author pages with bio and social links
- 🏷️ **Categories** - Organized content with color-coded categories
- 💬 **Threaded Comments** - Full comment system with replies and moderation
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- ⚡ **Fast Performance** - Server-side rendering with Next.js 15
- 🔍 **SEO Optimized** - Meta tags and structured data
- 🎨 **Modern UI** - Clean, professional design

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=blog-production-d63af320-4d2d-11f0-98bb-9b8763e6d357)

## Original Prompt

This application was built based on the following request:

> Build a Next.js website that uses my existing objects in this bucket. Add apiEnvironment: "staging" to cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **React Markdown** - Markdown rendering
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the required content models

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Posts with Related Data
```typescript
import { cosmic } from '@/lib/cosmic'

// Get posts with authors and categories
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating Comments
```typescript
// Add a new comment
await cosmic.objects.insertOne({
  type: 'comments',
  title: `Comment by ${authorName}`,
  metadata: {
    author_name: authorName,
    author_email: email,
    content: content,
    post: postId,
    status: 'pending'
  }
})
```

## Cosmic CMS Integration

This application integrates seamlessly with [Cosmic](https://www.cosmicjs.com), a headless CMS that provides:

- **Content Models**: Posts, Authors, Categories, Comments
- **Rich Media**: Image optimization and management
- **API Access**: RESTful API with depth queries
- **Real-time Updates**: Content changes reflect immediately

For more information, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js applications.

## Project Structure

```
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                # Utilities and configurations
├── types.ts            # TypeScript type definitions
└── public/             # Static assets
```
<!-- README_END -->