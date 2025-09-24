'use client'

import { useState, useEffect } from 'react';

interface QuickLink {
  "Site Name": string;
  "Address": string;
  "Link_image_id": string;
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

  if (loading) {
    return (
      <div className="container">
        <h1 className="page-title">Quick Links</h1>
        <p className="page-subtitle">Access your frequently used resources and tools</p>
        <div className="data-section">
          <div className="empty-state">Loading quick links...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Quick Links</h1>
      <p className="page-subtitle">Access your frequently used resources and tools</p>
      
      <div className="data-section">
        <h2 className="section-title">Quick Access Links</h2>
        <div className="dashboard-grid">
          {links.length === 0 ? (
            <div className="empty-state">
              No quick links available. Load data from Quick Links.json to display quick access links.
            </div>
          ) : (
            links.map((link, index) => {
              const imageId = link["Link_image_id"] || '';
              const hasImage = imageId && imageId !== 'No image' && imageId !== '';

              return (
                <div key={index} className="app-card">
                  <a href={link["Address"] || '#'} target="_blank" rel="noopener noreferrer">
                    <div className="app-icon">
                      {hasImage ? (
                        <>
                          <img 
                            src={`/images/${imageId}`} 
                            alt={link["Site Name"] || ''} 
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
                    <div className="app-title">{link["Site Name"] || 'Not specified'}</div>
                    <div className="app-url">{link["Address"] || 'Not specified'}</div>
                  </a>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
