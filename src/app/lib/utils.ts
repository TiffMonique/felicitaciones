import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import mixpanel from "mixpanel-browser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MIXPANEL_TOKEN =
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "2641eb16e13e41ed95ebe40265b599ee";

if (typeof window !== "undefined") {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: true,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackEvent = (eventName: string, properties?: any) => {
  if (typeof window !== "undefined") {
    mixpanel.track(eventName, properties);
  }
};

export default mixpanel;
