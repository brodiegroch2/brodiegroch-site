'use client'

import { useState, useEffect } from 'react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export default function PasswordProtection({ children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCheckingIP, setIsCheckingIP] = useState(true);

  // Generate device fingerprint
  const generateDeviceFingerprint = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.textBaseline && (ctx.textBaseline = 'top');
    ctx?.font && (ctx.font = '14px Arial');
    ctx?.fillText && ctx.fillText('Device fingerprint', 2, 2);
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    return btoa(fingerprint).slice(0, 32); // Base64 encode and truncate
  };

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authStatus = sessionStorage.getItem('authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setIsCheckingIP(false);
      return;
    }

    // Check IP address and device fingerprint to bypass password
    const checkDeviceAccess = async () => {
      try {
        // Check IP address
        const response = await fetch('https://ipinfo.io/ip');
        const userIP = await response.text();
        const allowedIPs = [
          '161.184.170.120', // Your current IP address
          // Add more IP addresses here for trusted devices
          // '192.168.1.100', // Example: Home router IP
          // '10.0.0.50',     // Example: Office network IP
        ];
        
        // Check device fingerprint
        const deviceFingerprint = generateDeviceFingerprint();
        const allowedDevices = [
          // Add device fingerprints here for trusted devices
          // You can get these by logging the fingerprint on trusted devices
          // Example: 'aGVsbG8gd29ybGQgdGhpcyBpcyBhIGZpbmdlcnByaW50'
        ];
        
        // Allow access if IP matches OR device fingerprint matches
        if (allowedIPs.includes(userIP.trim()) || allowedDevices.includes(deviceFingerprint)) {
          setIsAuthenticated(true);
          sessionStorage.setItem('authenticated', 'true');
          console.log('Device access granted:', { ip: userIP.trim(), fingerprint: deviceFingerprint });
        } else {
          console.log('Device not recognized:', { ip: userIP.trim(), fingerprint: deviceFingerprint });
          // Uncomment the line below to see the fingerprint for adding new devices
          // console.log('Add this fingerprint to allowedDevices:', deviceFingerprint);
        }
      } catch (error) {
        console.log('Could not check device access');
      } finally {
        setIsCheckingIP(false);
      }
    };

    checkDeviceAccess();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '$408621geidorB') {
      setIsAuthenticated(true);
      sessionStorage.setItem('authenticated', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Show loading state while checking IP
  if (isCheckingIP) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', margin: 0 }}>Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '32px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Protected Site
          </h1>
          <p style={{ color: '#6b7280' }}>
            Please enter the password to access this site
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label htmlFor="password" style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Enter password"
              required
            />
          </div>
          
          {error && (
            <div style={{ color: '#dc2626', fontSize: '14px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            Access Site
          </button>
        </form>
      </div>
    </div>
  );
}
