"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  Clock, 
  Calendar, 
  Tag, 
  User, 
  ArrowLeft,
  Bookmark,
  Heart,
  MessageSquare,
  FileIcon,
  BookOpen,
  Archive,
  TrendingUp,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';

interface PdfDetailEnhancedProps {
  post: any;
  fileUrl: string;
  related: any[];
}

export function PdfDetailEnhanced({ post, fileUrl, related }: PdfDetailEnhancedProps) {
  const [viewMode, setViewMode] = useState<'embed' | 'preview'>('embed');
  const [zoom, setZoom] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag and initialize random values
  useEffect(() => {
    setIsClient(true);
    setDownloadCount(Math.floor(Math.random() * 500) + 50);
    setViewCount(Math.floor(Math.random() * 2000) + 200);
  }, []);

  // Format date consistently to avoid hydration mismatch
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Remove username patterns from text
  const removeUsername = (text: string) => {
    return text.replace(/@\w+/g, '').trim();
  };

  const content = post.content || {};
  const category = content.category || 'document';
  const author = content.author || 'Unknown Author';
  const publishDate = post.publishedAt || new Date().toISOString();
  const description = post.summary || 'No description available';

  const categoryInfo = {
    guides: { icon: BookOpen, color: 'blue', label: 'Guide' },
    policies: { icon: FileIcon, color: 'red', label: 'Policy' },
    research: { icon: Archive, color: 'green', label: 'Research' },
    reports: { icon: TrendingUp, color: 'purple', label: 'Report' },
  };

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.guides;
  const CategoryIcon = currentCategory.icon;

  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
    window.open(fileUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      setZoom(prev => Math.min(prev + 25, 200));
    } else {
      setZoom(prev => Math.max(prev - 25, 50));
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/pdf"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Library
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Document Info */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{removeUsername(post.title)}</h1>
                  <p className="text-gray-600 leading-relaxed">{removeUsername(description)}</p>
                </div>
              </div>

              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </button>
                
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  Open in New Tab
                </a>
                
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => handleZoom('out')}
                    className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center">
                    {zoom}%
                  </span>
                  <button
                    onClick={() => handleZoom('in')}
                    className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                                                    </div>
              </div>
            </section>

            {/* PDF Viewer */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode(viewMode === 'embed' ? 'preview' : 'embed')}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {viewMode === 'embed' ? 'Preview Mode' : 'Full View'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-gray-100" style={{ height: '75vh' }}>
                <iframe
                  src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&zoom=${zoom}`}
                  title={post.title}
                  className="w-full h-full"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Tags */}
            {content.tags && content.tags.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Related Documents */}
            {related.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Related Documents</h3>
                <div className="space-y-3">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      href={`/pdf/${item.slug}`}
                      className="block p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {item.summary}
                      </p>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/pdf"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  View all documents
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
