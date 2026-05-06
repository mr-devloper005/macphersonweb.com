"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Download, Eye, Search, Filter, Grid, List, Calendar, Clock, Tag, ChevronRight, BookOpen, FileText as FileIcon, Archive, Users, TrendingUp } from 'lucide-react';
import { TaskPostCard } from '@/components/shared/task-post-card';
import { buildPostUrl } from '@/lib/task-data';

interface PdfEnhancedClientProps {
  initialPosts: any[];
  category: string;
}

export function PdfEnhancedClient({ initialPosts, category }: PdfEnhancedClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'alphabetical'>('recent');
  const [stats, setStats] = useState({ total: 0, categories: 0, downloads: 0 });

  // Calculate stats on mount and when posts change
  useEffect(() => {
    const uniqueCategories = new Set(posts.map(post => post.content?.category).filter(Boolean));
    setStats({
      total: posts.length,
      categories: uniqueCategories.size,
      downloads: Math.floor(posts.length * 12.5) // Mock download count
    });
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === 'all' || 
                             post.content?.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'popular':
          return (b.content?.downloads || 0) - (a.content?.downloads || 0);
        case 'recent':
        default:
          return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
      }
    });

  const categories = [
    { name: 'All Documents', slug: 'all', icon: Grid, count: posts.length },
    { name: 'Guides', slug: 'guides', icon: BookOpen, count: posts.filter(p => p.content?.category === 'guides').length },
    { name: 'Policies', slug: 'policies', icon: FileIcon, count: posts.filter(p => p.content?.category === 'policies').length },
    { name: 'Research', slug: 'research', icon: Archive, count: posts.filter(p => p.content?.category === 'research').length },
    { name: 'Reports', slug: 'reports', icon: TrendingUp, count: posts.filter(p => p.content?.category === 'reports').length },
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Stats Section */}
      <section className="grid gap-6 md:grid-cols-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Total Documents</p>
              <p className="mt-2 text-3xl font-bold text-orange-900">{stats.total}</p>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Categories</p>
              <p className="mt-2 text-3xl font-bold text-blue-900">{stats.categories}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Grid className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Downloads</p>
              <p className="mt-2 text-3xl font-bold text-green-900">{stats.downloads}</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <Download className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Active Users</p>
              <p className="mt-2 text-3xl font-bold text-purple-900">1.2k</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search and Filter Section */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents by title, content, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
            
            <div className="flex items-center border border-gray-300 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-500'} transition-colors`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-500'} transition-colors`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
                <span className={`text-xs ${selectedCategory === cat.slug ? 'bg-orange-500' : 'bg-gray-300'} px-2 py-0.5 rounded-full`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Documents Grid/List */}
      <section>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={viewMode === 'list' ? 'flex-1 flex' : ''}>
                  {viewMode === 'grid' && (
                    <div className="h-48 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-orange-600" />
                    </div>
                  )}
                  
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex items-center justify-between' : ''}`}>
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {post.content?.category || 'Document'}
                        </span>
                        {post.content?.downloads && (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <Download className="h-3 w-3" />
                            {post.content.downloads}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      {post.summary && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.publishedAt || '').toLocaleDateString()}
                          </span>
                          {post.content?.pages && (
                            <span className="flex items-center gap-1">
                              <FileIcon className="h-3 w-3" />
                              {post.content.pages} pages
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 mt-4 ${viewMode === 'list' ? 'ml-4 mt-0' : ''}`}>
                      <Link
                        href={buildPostUrl("pdf", post.slug)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-xl hover:bg-orange-700 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                      {post.content?.fileUrl && (
                        <a
                          href={post.content.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
