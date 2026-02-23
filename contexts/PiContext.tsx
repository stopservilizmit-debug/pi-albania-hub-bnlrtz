
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
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [piSDKLoaded, setPiSDKLoaded] = useState(false);

  const initializePiSDK = useCallback(async () => {
    try {
      console.log('PiProvider: Checking for Pi SDK on window object');
      // @ts-expect-error - Pi SDK is loaded dynamically
      if (typeof window !== 'undefined' && window.Pi) {
        console.log('PiProvider: Pi SDK found, initializing...');
        // @ts-expect-error - Pi SDK is loaded dynamically
        await window.Pi.init({ 
          version: "2.0", 
          sandbox: true 
        });
        console.log('PiProvider: Pi SDK initialized successfully');
        setPiSDKLoaded(true);
      } else {
        console.log('PiProvider: Pi SDK not found on window object');
        setPiSDKLoaded(false);
      }
    } catch (error) {
      console.error('PiProvider: Error initializing Pi SDK:', error);
      setPiSDKLoaded(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPiSDK = useCallback(async () => {
    try {
      if (Platform.OS === 'web') {
        console.log('PiProvider: Loading Pi SDK script for web platform');
        
        // Check if script is already loaded
        // @ts-expect-error - Pi SDK is loaded dynamically
        if (typeof window !== 'undefined' && window.Pi) {
          console.log('PiProvider: Pi SDK already loaded');
          await initializePiSDK();
          return;
        }

        // Load Pi SDK script dynamically
        const script = document.createElement('script');
        script.src = 'https://sdk.minepi.com/pi-sdk.js';
        script.async = true;
        
        script.onload = () => {
          console.log('PiProvider: Pi SDK script loaded successfully');
          initializePiSDK();
        };
        
        script.onerror = (error) => {
          console.warn('PiProvider: Failed to load Pi SDK script:', error);
          console.log('PiProvider: Continuing without Pi SDK - app will work in limited mode');
          setPiSDKLoaded(false);
          setLoading(false);
        };
        
        document.head.appendChild(script);
      } else {
        // For native platforms, Pi SDK is not available
        console.log('PiProvider: Running on native platform - Pi SDK not available');
        setPiSDKLoaded(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('PiProvider: Error in loadPiSDK:', error);
      setPiSDKLoaded(false);
      setLoading(false);
    }
  }, [initializePiSDK]);

  useEffect(() => {
    console.log('PiProvider: Component mounted, starting Pi SDK initialization');
    loadPiSDK();
  }, [loadPiSDK]);

  const onIncompletePaymentFound = useCallback((payment: any) => {
    console.log('PiProvider: Incomplete payment found:', payment);
  }, []);

  const signInWithPi = useCallback(async () => {
    console.log('PiProvider: User initiated sign in with Pi');
    try {
      if (!piSDKLoaded) {
        console.warn('PiProvider: Cannot authenticate - Pi SDK not loaded');
        const message = 'Pi SDK is not available. Please open this app in Pi Browser to use Pi Authentication.';
        if (Platform.OS === 'web') {
          alert(message);
        }
        return;
      }

      // @ts-expect-error - Pi SDK is loaded dynamically
      if (typeof window !== 'undefined' && window.Pi) {
        console.log('PiProvider: Calling Pi.authenticate with username scope');
        // @ts-expect-error - Pi SDK is loaded dynamically
        const scopes = ['username'];
        // @ts-expect-error - Pi SDK is loaded dynamically
        const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
        
        console.log('PiProvider: Authentication successful for user:', authResult.user.username);
        
        setPiUser({
          uid: authResult.user.uid,
          username: authResult.user.username,
        });
        setAuthenticated(true);
      } else {
        console.error('PiProvider: Pi SDK not available on window object');
        if (Platform.OS === 'web') {
          alert('Pi SDK is not available. Please try again.');
        }
      }
    } catch (error) {
      console.error('PiProvider: Authentication error:', error);
      if (Platform.OS === 'web') {
        alert('Failed to authenticate with Pi. Please try again.');
      }
    }
  }, [piSDKLoaded, onIncompletePaymentFound]);

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
    hasUser: !!piUser 
  });

  return (
    <PiContext.Provider value={value}>
      {children}
    </PiContext.Provider>
  );
}
