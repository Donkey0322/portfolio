"use client";

import { track } from "@vercel/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

import type { BeforeSend } from "@vercel/analytics";

interface RequestGeoLocation {
  city: string;
  countryRegion: string;
  latitude: string;
  longitude: string;
  time: string;
  host: string;
}

export default function Analytics({ host, city, ...geo }: RequestGeoLocation) {
  const handleBeforeSend: BeforeSend = (event) => {
    if (event.type === "pageview") {
      if (host === "www.donkeylee.com" && city) {
        track(city, geo);
      }
    }
    return event;
  };
  return <VercelAnalytics beforeSend={handleBeforeSend} />;
}
