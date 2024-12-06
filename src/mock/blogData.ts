import ReactImg from '../../public/react.png'; // Replace with your actual image path

export const blogData = Array.from({ length: 10 }, (_, index) => ({
  id: `${index + 1}`,
  title: `Blog Post Title ${index + 1}`,
  description: `This is a brief description of blog post ${index + 1}. It highlights the essence of the content.`,
  content: `In-depth content of blog post ${index + 1}. This includes detailed information, discussions, and insights.`,
  bannerImg: ReactImg.src, // Replace with your image path
  author: {
    id: `${index + 1}`, // Add the `id` field
    name: `User ${index + 1}`,
    avatar: 'https://via.placeholder.com/50' // Example avatar URL
  },
  category: index % 2 === 0 ? 'Technology' : 'News', // Alternating categories
  likesCount: Math.floor(Math.random() * 100), // Randomized likes for demo
  createdAt: new Date(Date.now() - index * 1000000).toISOString() // Staggered creation dates
}));
