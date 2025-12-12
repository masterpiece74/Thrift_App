import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCalendar, FaClock, FaUser, FaTag, FaArrowRight, FaGem } from "react-icons/fa";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogs = [
    {
      id: 1,
      title: "How to Thrift Like a Pro",
      excerpt: "Thrifting lets you save money and find unique treasures. Learn our top strategies for maximizing your thrift store visits!",
      category: "Tips & Guides",
      author: "Sarah Johnson",
      date: "December 8, 2025",
      readTime: "5 min read",
      image: "HACKS.PNG",
      featured: true
    },
    {
      id: 2,
      title: "Why Thrifting Is the Future of Fashion",
      excerpt: "The fashion industry is changing—and thrift is becoming a major trend! Discover why sustainable fashion matters.",
      category: "Trends",
      author: "Michael Chen",
      date: "December 5, 2025",
      readTime: "7 min read",
      image: "https://source.unsplash.com/random/800x600?fashion",
      featured: true
    },
    {
      id: 3,
      title: "Building Your Emergency Savings Fund Through Ajo",
      excerpt: "Learn how rotating savings groups (Ajo) can help you build wealth consistently. A practical guide to financial discipline.",
      category: "Financial Tips",
      author: "Chioma Okonkwo",
      date: "December 3, 2025",
      readTime: "6 min read",
      image: "https://source.unsplash.com/random/800x600?money",
      featured: false
    },
    {
      id: 4,
      title: "Solo Thrifting vs Group Thrifting: Which is Right for You?",
      excerpt: "Explore the differences between personal savings (Solo Thrift) and group savings (Group Thrift) models.",
      category: "Financial Tips",
      author: "James Adeyemi",
      date: "November 30, 2025",
      readTime: "8 min read",
      image: "https://source.unsplash.com/random/800x600?team",
      featured: false
    },
    {
      id: 5,
      title: "Top 10 Fashion Finds from Thrift Stores in Lagos",
      excerpt: "Discover the best thrift stores in Lagos and the amazing pieces you can find without breaking the bank.",
      category: "Tips & Guides",
      author: "Amara Ejiro",
      date: "November 27, 2025",
      readTime: "6 min read",
      image: "https://source.unsplash.com/random/800x600?shopping",
      featured: false
    },
    {
      id: 6,
      title: "Understanding Financial Literacy and Smart Money Management",
      excerpt: "Master the basics of personal finance and learn how apps like RubiesThrift can help you achieve your financial goals.",
      category: "Financial Tips",
      author: "Dr. Emmanuel Obi",
      date: "November 24, 2025",
      readTime: "9 min read",
      image: "https://source.unsplash.com/random/800x600?finance",
      featured: false
    }
  ];

  const categories = ["all", "Tips & Guides", "Trends", "Financial Tips"];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs.find(blog => blog.featured);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
              <FaGem className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">RubiesThrift Insights</h1>
          </div>
          <p className="text-lg text-emerald-100 ml-16">
            Expert tips on thrifting, financial wellness, and building wealth through smart saving
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-emerald-600"
                }`}
              >
                {category === "all" ? "All Articles" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredBlog && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Article</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="grid md:grid-cols-2">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="h-80 w-full object-cover"
                />
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <FaTag size={12} /> {featuredBlog.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">{featuredBlog.title}</h3>
                    <p className="text-gray-600 text-lg mb-6">{featuredBlog.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><FaUser size={14} /> {featuredBlog.author}</span>
                      <span className="flex items-center gap-1"><FaCalendar size={14} /> {featuredBlog.date}</span>
                      <span className="flex items-center gap-1"><FaClock size={14} /> {featuredBlog.readTime}</span>
                    </div>
                    <Link
                      to={`/blog/${featuredBlog.id}`}
                      className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                      Read <FaArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Articles</h2>
          {filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredBlogs.map(blog => (
                <div key={blog.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                        <FaTag size={12} /> {blog.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex flex-col gap-3 mb-4 text-xs text-gray-500">
                      <span className="flex items-center gap-2">
                        <FaUser size={12} /> {blog.author}
                      </span>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1">
                          <FaCalendar size={12} /> {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock size={12} /> {blog.readTime}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors flex items-center gap-2"
                    >
                      Read More <FaArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-gray-600 text-lg">No articles match your search. Try a different keyword or category.</p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="text-emerald-100 mb-6">Subscribe to our newsletter for the latest tips and updates</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
            />
            <button className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
