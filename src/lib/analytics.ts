interface AnalyticsEventPayload {
  [key: string]: string | number | boolean | undefined;
}

export function track(event: string, payload: AnalyticsEventPayload = {}) {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[analytics] ${event}`, payload);
  }
}
