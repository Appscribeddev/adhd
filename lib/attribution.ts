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

export function readInitialAttribution(search: string): AttributionPayload {
  const currentTouch = pickFromSearchParams(new URLSearchParams(search));

  if (typeof window === "undefined") {
    return { firstTouch: currentTouch, currentTouch };
  }

  const raw = window.localStorage.getItem("first_touch_utm");
  let firstTouch: UtmFields = {};

  if (raw) {
    try {
      firstTouch = JSON.parse(raw) as UtmFields;
    } catch {
      firstTouch = {};
    }
  }

  if (hasAnyUtm(currentTouch)) {
    if (!hasAnyUtm(firstTouch)) {
      window.localStorage.setItem("first_touch_utm", JSON.stringify(currentTouch));
      firstTouch = currentTouch;
    }
    window.localStorage.setItem("current_touch_utm", JSON.stringify(currentTouch));
  }

  return {
    firstTouch,
    currentTouch: hasAnyUtm(currentTouch)
      ? currentTouch
      : raw
        ? (JSON.parse(window.localStorage.getItem("current_touch_utm") || "{}") as UtmFields)
        : {}
  };
}
