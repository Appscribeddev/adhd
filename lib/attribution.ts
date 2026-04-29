export type UtmFields = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export type AttributionPayload = {
  firstTouch: UtmFields;
  currentTouch: UtmFields;
};

const FIELDS: Array<keyof UtmFields> = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
const FIRST_TOUCH_KEY = "first_touch_utm";
const CURRENT_TOUCH_KEY = "current_touch_utm";

function pickFromSearchParams(searchParams: URLSearchParams): UtmFields {
  const fields: UtmFields = {};

  for (const key of FIELDS) {
    const value = searchParams.get(key);
    if (value) {
      fields[key] = value;
    }
  }

  return fields;
}

function hasAnyUtm(value: UtmFields): boolean {
  return FIELDS.some((key) => Boolean(value[key]));
}

function parseUtmJson(raw: string | null): UtmFields {
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as UtmFields;
  } catch {
    return {};
  }
}

function readCookieValue(key: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const encodedKey = `${key}=`;
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(encodedKey));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(encodedKey.length));
}

function writeCookieJson(key: string, value: UtmFields): void {
  if (typeof document === "undefined") {
    return;
  }

  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${key}=${encoded}; Path=/; Max-Age=2592000; SameSite=Lax`;
}

function persistTouch(key: string, value: UtmFields): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  writeCookieJson(key, value);
}

export function readInitialAttribution(search: string): AttributionPayload {
  const searchTouch = pickFromSearchParams(new URLSearchParams(search));

  if (typeof window === "undefined") {
    return { firstTouch: searchTouch, currentTouch: searchTouch };
  }

  const storedFirstTouch = parseUtmJson(window.localStorage.getItem(FIRST_TOUCH_KEY));
  const storedCurrentTouch = parseUtmJson(window.localStorage.getItem(CURRENT_TOUCH_KEY));
  const cookieFirstTouch = parseUtmJson(readCookieValue(FIRST_TOUCH_KEY));
  const cookieCurrentTouch = parseUtmJson(readCookieValue(CURRENT_TOUCH_KEY));

  let firstTouch = hasAnyUtm(storedFirstTouch) ? storedFirstTouch : cookieFirstTouch;
  let currentTouch = hasAnyUtm(storedCurrentTouch) ? storedCurrentTouch : cookieCurrentTouch;

  if (hasAnyUtm(searchTouch)) {
    if (!hasAnyUtm(firstTouch)) {
      firstTouch = searchTouch;
      persistTouch(FIRST_TOUCH_KEY, firstTouch);
    }
    currentTouch = searchTouch;
    persistTouch(CURRENT_TOUCH_KEY, currentTouch);
  }

  if (hasAnyUtm(firstTouch) && !hasAnyUtm(parseUtmJson(window.localStorage.getItem(FIRST_TOUCH_KEY)))) {
    persistTouch(FIRST_TOUCH_KEY, firstTouch);
  }

  if (hasAnyUtm(currentTouch) && !hasAnyUtm(parseUtmJson(window.localStorage.getItem(CURRENT_TOUCH_KEY)))) {
    persistTouch(CURRENT_TOUCH_KEY, currentTouch);
  }

  return {
    firstTouch,
    currentTouch
  };
}
