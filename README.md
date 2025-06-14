<!-- README_START -->
# Cosmic Blog

A modern, responsive blog website built with Next.js 15 and powered by [Cosmic](https://www.cosmicjs.com). Features a clean design with category filtering, author profiles, and responsive layout optimized for all devices.

## ✨ Features

- **Responsive Design**: Mobile-first design that works beautifully on all devices
- **Category Filtering**: Browse posts by Technology, Lifestyle, and Travel categories
- **Author Profiles**: Detailed author pages with social links and bio information
- **Featured Posts**: Highlight important content with featured post system
- **Modern UI**: Clean, professional design with Tailwind CSS
- **SEO Optimized**: Proper meta tags and structured data
- **Fast Performance**: Server-side rendering with Next.js 15
- **Image Optimization**: Automatic image optimization with Imgix

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=my-project-production-ec78df60-48cf-11f0-a997-b3fb7e8a757b)

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Content Management**: [Cosmic](https://www.cosmicjs.com) headless CMS
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Deployment**: Vercel-ready configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with content

### Installation

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

3. **Run the development server**
   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Posts with Category Filter
```typescript
const posts = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.category': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Getting Featured Posts
```typescript
const featuredPosts = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.featured_post': true
  })
  .limit(3)
  .depth(1);
```

### Fetching Single Post with Author and Category
```typescript
const post = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: postSlug
  })
  .depth(1);
```

## 🎨 Cosmic CMS Integration

This application leverages three main content types from your Cosmic bucket:

- **Posts**: Blog articles with title, content, featured images, and relationships
- **Authors**: Writer profiles with bio, photo, and social links
- **Categories**: Content organization with names, descriptions, and colors

The application uses Cosmic's object relationships to automatically connect posts with their authors and categories, providing a seamless content management experience.

## 🚀 Deployment Options

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

For production deployment, ensure you set the following environment variables in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->