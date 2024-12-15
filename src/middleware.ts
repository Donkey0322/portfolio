import { geolocation } from "@vercel/functions";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/work",
};

const formatTaiwanTime = (date: Date) => {
  const timeZone = "Asia/Taipei";
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, "yyyy/MM/dd HH:mm");
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
  response.headers.set("Analytics-Time", formatTaiwanTime(new Date()));

  return response;
}
