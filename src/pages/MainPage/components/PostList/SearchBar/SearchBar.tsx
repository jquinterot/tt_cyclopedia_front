import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts..."
        data-testid="post-search-input"
        className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 
                   text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 
                   transition-colors duration-300"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <svg
          data-testid="search-icon"
          className={`h-5 w-5 ${value ? "text-blue-400" : "text-gray-400"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
} 