import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

export interface LocationData {
  latitude: number;
  longitude: number;
  error: string | null;
  loading: boolean;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData>({
    latitude: 5.6037, // Default to Accra coordinates
    longitude: -0.1870,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setLocation(prev => ({
            ...prev,
            error: 'Permission to access location was denied',
            loading: false,
          }));
          return;
        }

        if (Platform.OS === 'web') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                loading: false,
              });
            },
            (error) => {
              setLocation(prev => ({
                ...prev,
                error: error.message,
                loading: false,
              }));
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          const locationData = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
            error: null,
            loading: false,
          });
        }
      } catch (error) {
        setLocation(prev => ({
          ...prev,
          error: 'Error getting location',
          loading: false,
        }));
      }
    };

    getLocation();
  }, []);

  return location;
};