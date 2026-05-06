import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDDoSProtection } from '@/hooks/useDDoSProtection';
import { useAuth } from '@/contexts/AuthContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { user } = useAuth();
  const { isActionAllowed, recordUserAction } = useDDoSProtection();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Create a debounced search function to prevent rapid API calls
  const debouncedSearch = useCallback((searchQuery: string) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      // Check if search action is allowed
      if (!isActionAllowed('search', user?.id)) {
        console.warn('Search blocked due to rate limiting');
        return;
      }
      
      // Record the search action
      recordUserAction('search', user?.id);
      
      // Perform the search
      onSearch(searchQuery);
    }, 500);
  }, [isActionAllowed, recordUserAction, onSearch, user?.id]);

  // Handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Only search if query has content
    if (newQuery.trim()) {
      debouncedSearch(newQuery);
    } else {
      // Clear search immediately if query is empty
      onSearch('');
    }
  }, [debouncedSearch, onSearch]);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if search action is allowed
    if (!isActionAllowed('search_submit', user?.id)) {
      console.warn('Search submission blocked due to rate limiting');
      return;
    }
    
    // Record the search submission action
    recordUserAction('search_submit', user?.id);
    
    // Perform immediate search
    onSearch(query);
  }, [isActionAllowed, recordUserAction, onSearch, query, user?.id]);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className} py-2`} data-testid="search-form">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        aria-label="Search"
        data-testid="search-input"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-label="Submit search"
        data-testid="search-button"
      >
        Search
      </button>
    </form>
  );
} 