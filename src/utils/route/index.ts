"use server";

import { track } from "@vercel/analytics/server";
import { headers } from "next/headers";

export interface GeoLocation extends Record<string, string> {
  city: string;
  countryRegion: string;
  latitude: string;
  longitude: string;
  time: string;
}

export const getBaseUrl = async () => {
  const requestHeaders = headers();
  const host = (await requestHeaders).get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
};

export const tracking = async ({ city, ...rest }: GeoLocation) => {
  await track(city, rest);
};
