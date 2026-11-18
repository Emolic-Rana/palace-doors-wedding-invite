import { describe, expect, it } from "vitest";
import { WEDDING_DATE, getTimeLeft, googleCalendarUrl } from "@/lib/wedding";

describe("wedding date", () => {
  it("is 12 Feb 2027 at 7:30 PM India time (14:00 UTC)", () => {
    expect(WEDDING_DATE.toISOString()).toBe("2027-02-12T14:00:00.000Z");
  });

  it("counts down exact days, hours, minutes and seconds", () => {
    const now = new Date("2027-02-10T12:58:55+05:30");
    expect(getTimeLeft(WEDDING_DATE, now)).toEqual({ days: 2, hours: 6, minutes: 31, seconds: 5 });
  });

  it("stops at zero once the muhurat has passed", () => {
    const after = new Date("2027-02-13T00:00:00+05:30");
    expect(getTimeLeft(WEDDING_DATE, after)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it("adds the muhurat to the calendar in UTC", () => {
    expect(googleCalendarUrl()).toContain("dates=20270212T140000Z%2F20270212T190000Z");
  });
});
