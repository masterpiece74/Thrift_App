import React from "react";
import { useParams, Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How to Thrift Like a Pro",
    image: "HACKS.PNG",
    excerpt: "Thrifting lets you save money and find unique treasures. Learn our top strategies!",
    content: `
      <h2>How to Thrift Like a Pro</h2>
      
      <p>Thrifting is more than just shopping for secondhand clothes—it's an art form. Whether you're looking to save money, find unique pieces, or build a sustainable wardrobe, here are our top strategies to help you thrift like a pro.</p>
      
      <h3>1. Know Your Style</h3>
      <p>Before you hit the thrift store, know what you're looking for. Having a clear style in mind will help you avoid impulse purchases and focus on items that actually work for you.</p>
      
      <h3>2. Go Early and Often</h3>
      <p>The best items are usually picked first. Arrive early when the store opens to get first pick of new arrivals. Also, many thrift stores receive new inventory daily or weekly, so visit regularly.</p>
      
      <h3>3. Check Everything Carefully</h3>
      <p>Always inspect items for stains, tears, or damage. Try things on if possible. Remember, thrift stores don't typically offer returns, so be thorough in your selection.</p>
      
      <h3>4. Mix High and Low</h3>
      <p>Pair thrifted pieces with new items to create a balanced, modern look. A vintage jacket with new jeans can look incredibly stylish and budget-friendly.</p>
      
      <h3>5. Don't Be Afraid of Alterations</h3>
      <p>Sometimes a simple alteration can transform a piece. Consider getting items tailored to fit you perfectly.</p>
      
      <h3>6. Shop by Fabric Quality</h3>
      <p>Look for natural fabrics like cotton, linen, and wool. These materials tend to last longer and age better than synthetics.</p>
      
      <p>With these tips, you'll be thrifting like a pro in no time. Happy hunting!</p>
    `
  },
  {
    id: 2,
    title: "Why Thrifting Is the Future of Fashion",
    image: "https://source.unsplash.com/random/800x600?fashion",
    excerpt: "The fashion industry is changing—and thrift is becoming a major trend!",
    content: `
      <h2>Why Thrifting Is the Future of Fashion</h2>
      
      <p>The fashion industry is undergoing a significant transformation. Thrifting and secondhand shopping are no longer niche activities—they're becoming mainstream, and for good reason.</p>
      
      <h3>Sustainability Matters</h3>
      <p>Fast fashion has a massive environmental impact. By choosing thrifted items, you're reducing demand for new production and keeping clothes out of landfills. It's a simple way to make a positive environmental impact.</p>
      
      <h3>Affordability</h3>
      <p>Thrifting allows you to build a quality wardrobe on a budget. Designer pieces, vintage gems, and unique finds are often available at a fraction of their original price.</p>
      
      <h3>Uniqueness</h3>
      <p>Thrift stores offer one-of-a-kind pieces you won't find in mainstream retail. Express your individuality through clothing that tells a story and stands out from the crowd.</p>
      
      <h3>Quality Over Quantity</h3>
      <p>Vintage and secondhand clothing often features better construction and materials than contemporary fast fashion. Invest in quality pieces that last longer.</p>
      
      <h3>The Celebrity Effect</h3>
      <p>Even celebrities and fashion influencers are embracing thrifted fashion. What was once considered "retro" is now celebrated as stylish and trendy.</p>
      
      <h3>The Statistics</h3>
      <p>The secondhand fashion market is growing exponentially. More people than ever are choosing to shop secondhand, and fashion retailers are taking notice.</p>
      
      <p>As we move towards a more conscious future, thrifting will play an increasingly important role in how we consume fashion. The future of style is sustainable, affordable, and undeniably cool.</p>
    `
  }
];

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-indigo-600 font-medium hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link to="/blog" className="text-indigo-600 font-medium hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>

        {/* Blog Post */}
        <article className="bg-white rounded-lg shadow-lg p-8">
          {/* Header Image */}
          <img
            src={post.image}
            alt={post.title}
            className="rounded-lg mb-8 w-full h-96 object-cover"
          />

          {/* Title */}
          <h1 className="text-4xl font-bold text-slate-800 mb-4">{post.title}</h1>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <span>Published on {new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>5 min read</span>
          </div>

          {/* Content */}
          <div className="text-gray-700 leading-relaxed space-y-4 prose prose-lg">
            {post.content.split('\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('<h2>')) {
                return (
                  <h2 key={idx} className="text-3xl font-bold text-slate-800 mt-8 mb-4">
                    {paragraph.replace(/<[^>]*>/g, '')}
                  </h2>
                );
              }
              if (paragraph.trim().startsWith('<h3>')) {
                return (
                  <h3 key={idx} className="text-2xl font-semibold text-slate-700 mt-6 mb-3">
                    {paragraph.replace(/<[^>]*>/g, '')}
                  </h3>
                );
              }
              if (paragraph.trim().startsWith('<p>')) {
                return (
                  <p key={idx} className="text-gray-700 mb-4">
                    {paragraph.replace(/<[^>]*>/g, '')}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Related Posts */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Related Posts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.filter(p => p.id !== post.id).map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">{relatedPost.excerpt}</p>
                  <span className="text-indigo-600 font-medium hover:underline">
                    Read More →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
