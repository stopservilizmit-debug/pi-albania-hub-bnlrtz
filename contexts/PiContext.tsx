
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
      // @ts-expect-error - Pi SDK is loaded dynamically
      if (typeof window !== 'undefined' && window.Pi) {
        console.log('PiProvider: Initializing Pi SDK');
        // @ts-expect-error - Pi SDK is loaded dynamically
        await window.Pi.init({ 
          version: "2.0", 
          sandbox: true 
        });
        console.log('PiProvider: Pi SDK initialized successfully');
        setPiSDKLoaded(true);
      } else {
        console.warn('PiProvider: Pi SDK not found on window object');
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
        console.log('PiProvider: Loading Pi SDK for web');
        // Load Pi SDK script dynamically
        const script = document.createElement('script');
        script.src = 'https://sdk.minepi.com/pi-sdk.js';
        script.async = true;
        
        script.onload = () => {
          console.log('PiProvider: Pi SDK script loaded successfully');
          initializePiSDK();
        };
        
        script.onerror = () => {
          console.warn('PiProvider: Failed to load Pi SDK script, continuing without it');
          setPiSDKLoaded(false);
          setLoading(false);
        };
        
        document.head.appendChild(script);
      } else {
        // For native platforms, Pi SDK is not available
        console.log('PiProvider: Pi SDK not available on native platforms');
        setPiSDKLoaded(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('PiProvider: Error loading Pi SDK:', error);
      setPiSDKLoaded(false);
      setLoading(false);
    }
  }, [initializePiSDK]);

  useEffect(() => {
    console.log('PiProvider: Initializing Pi SDK');
    loadPiSDK();
  }, [loadPiSDK]);

  const onIncompletePaymentFound = useCallback((payment: any) => {
    console.log('PiProvider: Incomplete payment found:', payment);
    // Handle incomplete payment if needed
  }, []);

  const signInWithPi = useCallback(async () => {
    console.log('PiProvider: Attempting to sign in with Pi');
    try {
      if (!piSDKLoaded) {
        console.warn('PiProvider: Pi SDK not loaded, cannot authenticate');
        alert('Pi SDK is not available. Please try again later.');
        return;
      }

      // @ts-expect-error - Pi SDK is loaded dynamically
      if (typeof window !== 'undefined' && window.Pi) {
        console.log('PiProvider: Calling Pi.authenticate');
        // @ts-expect-error - Pi SDK is loaded dynamically
        const scopes = ['username'];
        // @ts-expect-error - Pi SDK is loaded dynamically
        const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
        
        console.log('PiProvider: Authentication successful', authResult);
        
        setPiUser({
          uid: authResult.user.uid,
          username: authResult.user.username,
        });
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('PiProvider: Authentication error:', error);
      alert('Failed to authenticate with Pi. Please try again.');
    }
  }, [piSDKLoaded, onIncompletePaymentFound]);

  const signOut = useCallback(() => {
    console.log('PiProvider: Signing out user');
    setPiUser(null);
    setAuthenticated(false);
  }, []);

  return (
    <PiContext.Provider
      value={{
        piUser,
        loading,
        authenticated,
        piSDKLoaded,
        signInWithPi,
        signOut,
      }}
    >
      {children}
    </PiContext.Provider>
  );
}
