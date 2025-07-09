import { useState, useEffect } from 'react';
import { businesses } from '@/mocks/businesses';
import { Business } from '@/types/business';
import { useLocation } from './use-location';

// Calculate distance between two coordinates in meters
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371000; // Radius of the earth in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in meters
  return Math.round(d);
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const useBusinesses = (categoryId?: string, searchQuery?: string) => {
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.loading) return;

    setLoading(true);
    
    // Filter businesses based on category and search query
    let filtered = [...businesses];
    
    if (categoryId) {
      filtered = filtered.filter(business => business.categoryId === categoryId);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        business =>
          business.name.toLowerCase().includes(query) ||
          business.description.toLowerCase().includes(query) ||
          business.features.some(feature => feature.toLowerCase().includes(query))
      );
    }
    
    // Calculate distance for each business
    if (!location.error && location.latitude && location.longitude) {
      filtered = filtered.map(business => ({
        ...business,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          business.latitude,
          business.longitude
        ),
      }));
      
      // Sort by distance
      filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
    
    setFilteredBusinesses(filtered);
    setLoading(false);
  }, [categoryId, searchQuery, location]);

  return { businesses: filteredBusinesses, loading };
};