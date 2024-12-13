import { headers } from "next/headers";

export const getBaseUrl = async () => {
  const requestHeaders = headers();
  const host = (await requestHeaders).get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
};
