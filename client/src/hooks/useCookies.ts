/*
 * useCookies - DesignStron.pl
 * Hook to check cookie consent and load scripts accordingly
 */

// Type declarations for global scripts
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}
import { useEffect } from "react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function useCookies() {
  useEffect(() => {
    const checkAndLoadCookies = () => {
      const saved = localStorage.getItem('cookie-preferences');
      if (!saved) return;

      try {
        const preferences: CookiePreferences = JSON.parse(saved);
        
        // Only load scripts if user has consented
        if (preferences.analytics) {
          // Load Google Analytics
          loadGoogleAnalytics();
        }
        
        if (preferences.marketing) {
          // Load marketing scripts (Facebook Pixel, etc.)
          loadMarketingScripts();
        }
        
        // Always load necessary scripts
        loadNecessaryScripts();
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    };

    checkAndLoadCookies();
  }, []);

  const loadGoogleAnalytics = () => {
    // Load Google Analytics if not already loaded
    if (!document.getElementById('google-analytics')) {
      const script = document.createElement('script');
      script.id = 'google-analytics';
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      script.onload = () => {
        // Initialize GA4
        window.dataLayer = window.dataLayer || [];
        if (window.gtag) {
          window.gtag('js', new Date());
          window.gtag('config', 'GA_MEASUREMENT_ID');
        }
      };
      document.head.appendChild(script);
    }
  };

  const loadMarketingScripts = () => {
    // Load Facebook Pixel if not already loaded
    if (!document.getElementById('facebook-pixel')) {
      const script = document.createElement('script');
      script.id = 'facebook-pixel';
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.onload = () => {
        if (window.fbq) {
          window.fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');
          window.fbq('track', 'PageView');
        }
      };
      document.head.appendChild(script);
    }
  };

  const loadNecessaryScripts = () => {
    // Load necessary scripts (always allowed)
    // These can include essential functionality scripts
  };

  return null;
}

export function getCookiePreferences(): CookiePreferences {
  try {
    const saved = localStorage.getItem('cookie-preferences');
    return saved ? JSON.parse(saved) : { necessary: true, analytics: false, marketing: false };
  } catch {
    return { necessary: true, analytics: false, marketing: false };
  }
}
