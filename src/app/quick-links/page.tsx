'use client'

import { useState, useEffect } from 'react';

interface QuickLink {
  "Site Name": string;
  "Address": string;
  "Link_image_id": string;
  "Category": string;
}

export default function QuickLinksPage() {
  const [links, setLinks] = useState<QuickLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const response = await fetch('/api/data/quick-links');
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error('Error loading quick links:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, []);

  const getAppIcon = (siteName: string) => {
    if (siteName.toLowerCase().includes('brightspace') || siteName.toLowerCase().includes('d2l')) {
      return 'B';
    } else if (siteName.toLowerCase().includes('microsoft')) {
      return 'M';
    } else if (siteName.toLowerCase().includes('sait')) {
      return 'S';
    } else if (siteName.toLowerCase().includes('pearson') || siteName.toLowerCase().includes('mylab')) {
      return 'P';
    }
    return siteName.charAt(0).toUpperCase();
  };

  const renderAppIcon = (link: any) => {
    const imageId = link['Link_image_id'] || '';
    const hasImage = imageId && imageId !== 'No image' && imageId !== '';
    
    if (hasImage) {
      return (
        <img 
          src={`/images/${imageId}`} 
          alt={link['Site Name'] || ''} 
          className="app-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
      );
    }
    
    return (
      <div className="fallback-icon">
        {getAppIcon(link['Site Name'] || '')}
      </div>
    );
  };

  // Group links by category
  const groupedLinks = links.reduce((acc, link) => {
    const category = link.Category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(link);
    return acc;
  }, {} as Record<string, QuickLink[]>);

  const categories = Object.keys(groupedLinks).sort();

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Links</h1>
        <p className="page-subtitle">Access your frequently used resources and tools</p>
        <div className="data-section">
          <div className="empty-state">Loading links...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Quick Links</h1>
        <p className="page-subtitle">Access your frequently used resources and tools</p>
      </div>
      
      {links.length === 0 ? (
        <div className="data-section">
          <div className="empty-state">
            <div className="empty-icon">🔗</div>
            <h3>No links available</h3>
            <p>Load data from Quick Links.json to display quick access links.</p>
          </div>
        </div>
      ) : (
        <div className="quick-links-container">
          {categories.map((category, categoryIndex) => (
            <div key={category} className="category-section">
              <div className="category-header">
                <h2 className="category-title">{category}</h2>
                <div className="category-count">{groupedLinks[category].length} link{groupedLinks[category].length !== 1 ? 's' : ''}</div>
              </div>
              <div className="links-grid">
                {groupedLinks[category].map((link, index) => {
                  const imageId = link["Link_image_id"] || '';
                  const hasImage = imageId && imageId !== 'No image' && imageId !== '';

                  return (
                    <div key={index} className="link-card">
                      <a href={link["Address"] || '#'} target="_blank" rel="noopener noreferrer" className="link-card-link">
                        <div className="link-icon">
                          {hasImage ? (
                            <>
                              <img 
                                src={`/images/${imageId}`} 
                                alt={link["Site Name"] || ''} 
                                className="link-image"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <div className="fallback-icon" style={{ display: 'none' }}>
                                {getAppIcon(link["Site Name"] || '')}
                              </div>
                            </>
                          ) : (
                            <div className="fallback-icon">
                              {getAppIcon(link["Site Name"] || '')}
                            </div>
                          )}
                        </div>
                        <div className="link-content">
                          <h3 className="link-title">{link["Site Name"] || 'Not specified'}</h3>
                          <p className="link-url">{link["Address"] || 'Not specified'}</p>
                        </div>
                        <div className="link-arrow">→</div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
