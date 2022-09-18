export function event(event: string, opts: object = {}) {
  // eslint-disable-next-line
  // (window as any).gtag?.("event", event, opts);

  console.info("event occurred", { event, ...opts });
}
