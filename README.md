# Minimal Blog

![Minimal Blog](https://imgix.cosmicjs.com/d7c8bec0-fe58-11f0-a969-0bcd7c3c4c42-photo-1559136555-9303baea8ebd-1769831797494.jpg?w=1200&h=400&fit=crop&auto=format,compress)

A clean, minimal blog built with Next.js 16 and Tailwind CSS. Features a mobile-responsive design with the Inter font, category filtering, author pages, and reading time estimates.

## Features

- ✨ Clean, minimal design focused on readability
- 📱 Fully responsive mobile-first layout
- 🏷️ Category filtering with color-coded badges
- 👤 Author profile pages with their articles
- ⏱️ Reading time estimates
- 🖼️ Optimized images via imgix
- 🎨 Dynamic category colors from CMS
- ⚡ Fast page loads with Next.js 16

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=697d7cab168f6301f399602f&clone_repository=697d81ab168f6301f3996034)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Basic blog from content in the bucket, minimal, inter font, mobile responsive, next.js, tailwind css

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com/docs) - Headless CMS
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Inter Font](https://fonts.google.com/specimen/Inter) - Modern typography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your content bucket

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

## Cosmic SDK Examples

### Fetching Blog Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'blog-posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This blog uses the following content types from your Cosmic bucket:

- **Blog Posts** (`blog-posts`) - Articles with markdown content, featured images, authors, and categories
- **Authors** (`authors`) - Writer profiles with avatars, bios, and social links
- **Categories** (`categories`) - Content organization with custom colors

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Connect the repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->