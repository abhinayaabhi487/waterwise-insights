import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchLocations, groundwaterData } from '@/data/groundwaterData';

interface LocationSearchProps {
  variant?: 'hero' | 'compact';
  onSelect?: (locationId: string) => void;
}

const LocationSearch = ({ variant = 'hero', onSelect }: LocationSearchProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof groundwaterData>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      const results = searchLocations(value);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (locationId: string) => {
    setShowSuggestions(false);
    if (onSelect) {
      onSelect(locationId);
    } else {
      navigate(`/dashboard?location=${locationId}`);
    }
  };

  const handleSearch = () => {
    if (suggestions.length > 0) {
      handleSelect(suggestions[0].id);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="relative w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search location or pincode..."
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            className="pl-10"
          />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-50 overflow-hidden">
            {suggestions.map((location) => (
              <button
                key={location.id}
                onClick={() => handleSelect(location.id)}
                className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3 border-b last:border-b-0"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{location.location}</p>
                  <p className="text-sm text-muted-foreground">{location.district}, {location.state} - {location.pincode}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter your location, pincode, or district..."
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-12 h-14 text-lg bg-card border-2 focus:border-primary"
          />
        </div>
        <Button 
          onClick={handleSearch}
          size="lg"
          className="h-14 px-8 font-semibold"
        >
          Search
        </Button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-water-lg z-50 overflow-hidden animate-fade-in">
          {suggestions.slice(0, 5).map((location) => (
            <button
              key={location.id}
              onClick={() => handleSelect(location.id)}
              className="w-full px-5 py-4 text-left hover:bg-muted transition-colors flex items-center gap-4 border-b last:border-b-0"
            >
              <div className="p-2 rounded-lg bg-secondary">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{location.location}</p>
                <p className="text-sm text-muted-foreground">{location.district}, {location.state} - {location.pincode}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-water-lg z-50 p-6 text-center animate-fade-in">
          <p className="text-muted-foreground">No locations found for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-1">Try searching with a different term</p>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
