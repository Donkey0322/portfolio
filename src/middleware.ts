import { geolocation } from "@vercel/functions";
import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/work",
};

export function middleware(req: NextRequest) {
  const geo = geolocation(req);
  const { city = "", countryRegion = "", latitude = "", longitude = "" } = geo;
  const response = NextResponse.next();

  // Set custom headers
  response.headers.set("Analytics-City", city);
  response.headers.set("Analytics-CountryRegion", countryRegion);
  response.headers.set("Analytics-Latitude", latitude);
  response.headers.set("Analytics-Longitude", longitude);

  return response;
}
