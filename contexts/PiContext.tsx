
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Platform } from 'react-native';

interface PiUser {
  uid: string;
  username: string;
}

interface PiContextType {
  piUser: PiUser | null;
  loading: boolean;
  authenticated: boolean;
  piSDKLoaded: boolean;
  signInWithPi: () => Promise<void>;
  signOut: () => void;
}

const PiContext = createContext<PiContextType | undefined>(undefined);

export const usePi = () => {
  const context = useContext(PiContext);
  if (!context) {
    throw new Error('usePi must be used within PiProvider');
  }
  return context;
};

interface PiProviderProps {
  children: ReactNode;
}

export function PiProvider({ children }: PiProviderProps) {
  const [piUser, setPiUser] = useState<PiUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [piSDKLoaded, setPiSDKLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) {
      return;
    }

    console.log('PiProvider: Starting initialization');
    setInitialized(true);

    // For non-web platforms, skip Pi SDK loading
    if (Platform.OS !== 'web') {
      console.log('PiProvider: Running on native platform - Pi SDK not available');
      setLoading(false);
      setPiSDKLoaded(false);
      return;
    }

    // For web platform, try to load Pi SDK with timeout
    const loadPiSDKWithTimeout = async () => {
      try {
        console.log('PiProvider: Checking for Pi SDK on web platform');
        
        // Check if Pi SDK is already available
        // @ts-expect-error - Pi SDK is loaded dynamically
        if (typeof window !== 'undefined' && window.Pi) {
          console.log('PiProvider: Pi SDK already available, initializing...');
          try {
            // @ts-expect-error - Pi SDK is loaded dynamically
            await window.Pi.init({ 
              version: "2.0", 
              sandbox: true 
            });
            console.log('PiProvider: Pi SDK initialized successfully');
            setPiSDKLoaded(true);
          } catch (initError) {
            console.warn('PiProvider: Pi SDK init failed, continuing without it:', initError);
            setPiSDKLoaded(false);
          }
          setLoading(false);
          return;
        }

        // Try to load Pi SDK script
        console.log('PiProvider: Loading Pi SDK script...');
        const script = document.createElement('script');
        script.src = 'https://sdk.minepi.com/pi-sdk.js';
        script.async = true;

        // Set timeout for script loading
        const timeoutId = setTimeout(() => {
          console.warn('PiProvider: Pi SDK loading timeout - continuing without it');
          setPiSDKLoaded(false);
          setLoading(false);
        }, 5000);

        script.onload = async () => {
          clearTimeout(timeoutId);
          console.log('PiProvider: Pi SDK script loaded');
          
          try {
            // @ts-expect-error - Pi SDK is loaded dynamically
            if (window.Pi) {
              // @ts-expect-error - Pi SDK is loaded dynamically
              await window.Pi.init({ 
                version: "2.0", 
                sandbox: true 
              });
              console.log('PiProvider: Pi SDK initialized successfully');
              setPiSDKLoaded(true);
            }
          } catch (initError) {
            console.warn('PiProvider: Pi SDK init failed:', initError);
            setPiSDKLoaded(false);
          }
          setLoading(false);
        };

        script.onerror = () => {
          clearTimeout(timeoutId);
          console.warn('PiProvider: Failed to load Pi SDK script - continuing without it');
          setPiSDKLoaded(false);
          setLoading(false);
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('PiProvider: Error in Pi SDK loading:', error);
        setPiSDKLoaded(false);
        setLoading(false);
      }
    };

    loadPiSDKWithTimeout();
  }, [initialized]);

  const signInWithPi = useCallback(async () => {
    console.log('PiProvider: User initiated sign in with Pi');
    
    if (Platform.OS !== 'web') {
      console.warn('PiProvider: Pi authentication only available on web platform');
      alert('Pi authentication is only available in Pi Browser on web.');
      return;
    }

    if (!piSDKLoaded) {
      console.warn('PiProvider: Cannot authenticate - Pi SDK not loaded');
      alert('Pi SDK is not available. Please open this app in Pi Browser to use Pi Authentication.');
      return;
    }

    try {
      // @ts-expect-error - Pi SDK is loaded dynamically
      if (typeof window !== 'undefined' && window.Pi) {
        console.log('PiProvider: Calling Pi.authenticate');
        setLoading(true);
        
        // @ts-expect-error - Pi SDK is loaded dynamically
        const authResult = await window.Pi.authenticate(['username'], (payment) => {
          console.log('PiProvider: Incomplete payment found:', payment);
        });
        
        console.log('PiProvider: Authentication successful:', authResult.user.username);
        
        setPiUser({
          uid: authResult.user.uid,
          username: authResult.user.username,
        });
        setAuthenticated(true);
      } else {
        console.error('PiProvider: Pi SDK not available');
        alert('Pi SDK is not available. Please try again.');
      }
    } catch (error) {
      console.error('PiProvider: Authentication error:', error);
      alert('Failed to authenticate with Pi. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [piSDKLoaded]);

  const signOut = useCallback(() => {
    console.log('PiProvider: User signed out');
    setPiUser(null);
    setAuthenticated(false);
  }, []);

  const value = {
    piUser,
    loading,
    authenticated,
    piSDKLoaded,
    signInWithPi,
    signOut,
  };

  console.log('PiProvider: Rendering with state:', { 
    loading, 
    authenticated, 
    piSDKLoaded, 
    hasUser: !!piUser,
    initialized
  });

  return (
    <PiContext.Provider value={value}>
      {children}
    </PiContext.Provider>
  );
}
