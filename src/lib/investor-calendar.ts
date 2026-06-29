/**
 * GHL / LeadConnector booking widget URL (iframe or new tab).
 * Override via NEXT_PUBLIC_INVESTOR_CALENDAR_URL or NEXT_PUBLIC_INVESTOR_BOOKING_URL.
 */
export function getInvestorCalendarUrl(): string {
  return (
    process.env.NEXT_PUBLIC_INVESTOR_CALENDAR_URL ||
    process.env.NEXT_PUBLIC_INVESTOR_BOOKING_URL ||
    "https://api.leadconnectorhq.com/widget/bookings/airpower-investor-call"
  );
}
