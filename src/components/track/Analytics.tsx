"use client";

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const formatTaiwanTime = (date: Date) => {
  const timeZone = "Asia/Taipei";
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, "yyyy/MM/dd HH:mm");
};

import { track } from "@vercel/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

export interface GeoLocation {
  city: string;
  countryRegion: string;
  latitude: string;
  longitude: string;
}

export default function Analytics({ geo }: { geo: GeoLocation }) {
  return (
    <VercelAnalytics
      beforeSend={(event) => {
        track("view", { ...geo, time: formatTaiwanTime(new Date()) });
        return event;
      }}
    />
  );
}
