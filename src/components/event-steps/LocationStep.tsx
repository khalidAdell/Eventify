/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FormData } from "../../types/event";

interface LocationStepProps {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

interface SelectedLocation {
  lat: number;
  lng: number;
}

// Need to declare the Leaflet types to use them with TypeScript
declare global {
  interface Window {
    L: any;
  }
}

const LocationStep: React.FC<LocationStepProps> = ({
  formData,
  handleInputChange,
}) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // Load Leaflet CSS
    const linkElement: HTMLLinkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
    document.head.appendChild(linkElement);

    // Load Leaflet JS
    const script: HTMLScriptElement = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(linkElement);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && mapContainerRef.current) {
      // Initialize the map
      const L = window.L;
      const map = L.map(mapContainerRef.current).setView(
        [40.7128, -74.006],
        13
      );

      // Add OpenStreetMap tiles (free)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a marker
      const marker = L.marker([40.7128, -74.006], {
        draggable: true,
      }).addTo(map);

      // Update when marker is dragged
      marker.on("dragend", function () {
        const position = marker.getLatLng();
        setSelectedLocation({
          lat: position.lat,
          lng: position.lng,
        });
      });

      // Handle click on map to move marker
      map.on("click", function (e: any) {
        marker.setLatLng(e.latlng);
        setSelectedLocation({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      });

      // Store references
      mapRef.current = map;
      markerRef.current = marker;

      // Clean up map on unmount
      return () => {
        map.remove();
      };
    }
  }, [mapLoaded]);

  const handleSetLocation = (): void => {
    // Use browser's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;

          if (mapRef.current && markerRef.current) {
            mapRef.current.setView([latitude, longitude], 15);
            markerRef.current.setLatLng([latitude, longitude]);
            setSelectedLocation({
              lat: latitude,
              lng: longitude,
            });
          }
        },
        (error: GeolocationPositionError) => {
          console.error("Error getting current location:", error);
          alert("Unable to retrieve your location. Please select manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Location</h2>

      <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Interactive Map</h3>
          <button
            type="button"
            className="text-pink-600 text-sm hover:underline"
            onClick={handleSetLocation}
          >
            Set Current Location
          </button>
        </div>
        <div
          ref={mapContainerRef}
          className="w-full h-64 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center"
        >
          {!mapLoaded && <div className="text-gray-500">Loading map...</div>}
        </div>
        {selectedLocation && (
          <div className="mt-2 text-sm text-gray-600">
            Selected: {selectedLocation.lat.toFixed(6)},{" "}
            {selectedLocation.lng.toFixed(6)}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="location" className="block text-gray-700 mb-2">
          Venue Name*
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Example: Hyatt Regency, Conference Hall"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-gray-700 mb-2">
          Detailed Address*
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Full address of the venue..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          required
        ></textarea>
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <FaMapMarkerAlt className="text-pink-500 mr-2" />
        <span>
          You can also use "Current Location" or select from previously saved
          locations
        </span>
      </div>
    </div>
  );
};

export default LocationStep;
