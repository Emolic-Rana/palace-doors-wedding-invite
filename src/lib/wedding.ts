/** All invitation content lives here so names, dates and venue change in one place. */

export const COUPLE = {
  bride: "Ananya",
  groom: "Arjun",
} as const;

/** Wedding muhurat: 12 February 2027, 7:30 PM India Standard Time. */
export const WEDDING_DATE = new Date("2027-02-12T19:30:00+05:30");

export const WEDDING_DISPLAY = {
  weekday: "Friday",
  day: "12",
  month: "February",
  year: "2027",
  short: "12 · 02 · 2027",
  muhurat: "7:30 PM",
} as const;

export const VENUE = {
  name: "City Palace",
  city: "Udaipur",
  address: "City Palace Complex, Old City, Udaipur, Rajasthan 313001",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace+Udaipur+Rajasthan",
  note: "Complimentary valet at the Badi Pol gate. Boat transfers from Lake Pichola jetty run every 20 minutes from 6 PM.",
} as const;

export type EventIcon = "mehendi" | "haldi" | "sangeet" | "pheras" | "reception";

export const EVENTS: {
  icon: EventIcon;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
}[] = [
  {
    icon: "mehendi",
    title: "Mehendi",
    subtitle: "Henna & folk melodies",
    date: "Wed, 10 Feb 2027",
    time: "4:00 PM onwards",
    venue: "Zenana Mahal Courtyard",
    dressCode: "Pastel Florals",
  },
  {
    icon: "haldi",
    title: "Haldi",
    subtitle: "Turmeric blessings",
    date: "Thu, 11 Feb 2027",
    time: "10:30 AM",
    venue: "Manak Chowk",
    dressCode: "Sunshine Yellow",
  },
  {
    icon: "sangeet",
    title: "Sangeet",
    subtitle: "A night of music & dance",
    date: "Thu, 11 Feb 2027",
    time: "7:30 PM onwards",
    venue: "Durbar Hall",
    dressCode: "Indo-Western Glamour",
  },
  {
    icon: "pheras",
    title: "Wedding",
    subtitle: "The sacred pheras",
    date: "Fri, 12 Feb 2027",
    time: "Muhurat 7:30 PM",
    venue: "Mor Chowk",
    dressCode: "Royal Traditional",
  },
  {
    icon: "reception",
    title: "Reception",
    subtitle: "Dinner under the stars",
    date: "Sat, 13 Feb 2027",
    time: "8:00 PM onwards",
    venue: "Fateh Prakash Terrace",
    dressCode: "Black Tie Regal",
  },
];

export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

/** Time remaining until `target`, never negative. */
export function getTimeLeft(target: Date, now: Date = new Date()): TimeLeft {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function toCalendarStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Google Calendar link for the wedding muhurat (5 hour block). */
export function googleCalendarUrl(): string {
  const end = new Date(WEDDING_DATE.getTime() + 5 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Wedding of ${COUPLE.bride} & ${COUPLE.groom}`,
    dates: `${toCalendarStamp(WEDDING_DATE)}/${toCalendarStamp(end)}`,
    details: `Join us for the sacred pheras of ${COUPLE.bride} & ${COUPLE.groom}.`,
    location: `${VENUE.name}, ${VENUE.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
