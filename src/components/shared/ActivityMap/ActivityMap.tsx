interface Location {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface ActivityMapProps {
  location: Location;
  showFullMap?: boolean;
}

export default function ActivityMap({ location, showFullMap = false }: ActivityMapProps) {
  const encodeAddress = encodeURIComponent(`${location.address}, ${location.city}, ${location.country}`);
  
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    location.coordinates 
      ? `${location.coordinates.lng - 0.01},${location.coordinates.lat - 0.01},${location.coordinates.lng + 0.01},${location.coordinates.lat + 0.01}`
      : '-0.15,51.5,-0.1,51.55'
  }&layer=mapnik&marker=${
    location.coordinates 
      ? `${location.coordinates.lat},${location.coordinates.lng}`
      : '51.5074,-0.1278'
  }`;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeAddress}`;

  return (
    <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Location
        </h3>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-300">
            <span className="font-medium">{location.address}</span>
          </p>
          <p className="text-sm text-gray-400">
            {location.city}, {location.country}
          </p>
        </div>
      </div>

      {showFullMap ? (
        <div className="relative w-full h-64">
          <iframe
            title="Activity Location"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={mapUrl}
            className="absolute inset-0 w-full h-full"
          />
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Open in Maps
          </a>
        </div>
      ) : (
        <div className="relative w-full h-32">
          <iframe
            title="Activity Location Preview"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={mapUrl}
            className="absolute inset-0 w-full h-full"
          />
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
          >
            <span className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">
              View Map
            </span>
          </a>
        </div>
      )}
    </div>
  );
}