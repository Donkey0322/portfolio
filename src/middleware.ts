import { track } from "@vercel/analytics/server";
import { geolocation } from "@vercel/functions";
import { format } from "date-fns";
import { type NextRequest } from "next/server";
import { toZonedTime } from "date-fns-tz";

const formatTaiwanTime = (date: Date) => {
  const timeZone = "Asia/Taipei";
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, "yyyy/MM/dd HH:mm");
};

export const config = {
  matcher: "/work",
};

export async function middleware(req: NextRequest) {
  const geo = geolocation(req);
  const { city = "", countryRegion = "", latitude = "", longitude = "" } = geo;
  const userAgent = req.headers.get("user-agent");

  if (
    city &&
    userAgent &&
    !userAgent.includes("vercel") &&
    req.method === "GET"
  ) {
    await track("view", {
      city,
      countryRegion,
      latitude,
      longitude,
      time: formatTaiwanTime(new Date()),
    });
  }
}
