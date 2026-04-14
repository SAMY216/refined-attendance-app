import React, { useEffect, useState } from "react";

export default function App() {
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);

  // 📍 Your target location
  // const targetLat = 30.1137901938551;
  // const targetLng = 31.333789280570294;

  // Home location for testing
  const targetLat = 30.144948108637983;
  const targetLng = 31.394484697869892;

  // 📏 Distance calculator (Haversine)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const toRad = (deg) => (deg * Math.PI) / 180;

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const distance = getDistance(latitude, longitude, targetLat, targetLng);

        console.log("Distance from target:", distance);

        if (distance <= 30) {
          setCheckIn(true);
          setCheckOut(true);
        } else {
          setCheckIn(false);
          setCheckOut(false);
        }
      },
      (error) => {
        console.error("Location error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div>
      {checkIn && <button>Check In</button>}
      {checkOut && <button>Check Out</button>}
      <p className="text-4xl text-red-900 font-bold">Hello</p>
    </div>
  );
}
