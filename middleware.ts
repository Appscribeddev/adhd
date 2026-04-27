import { NextRequest, NextResponse } from "next/server";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const FIRST_TOUCH_KEY = "first_touch_utm";
const CURRENT_TOUCH_KEY = "current_touch_utm";

type UTMRecord = Record<(typeof UTM_KEYS)[number], string>;

function readUTM(searchParams: URLSearchParams): UTMRecord {
  return {
    utm_source: searchParams.get("utm_source") || "",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_content: searchParams.get("utm_content") || ""
  };
}

function hasUTM(utm: UTMRecord): boolean {
  return UTM_KEYS.some((key) => Boolean(utm[key]));
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  const utm = readUTM(request.nextUrl.searchParams);
  if (!hasUTM(utm)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const existingFirstTouch = request.cookies.get(FIRST_TOUCH_KEY)?.value;

  if (!existingFirstTouch) {
    response.cookies.set(FIRST_TOUCH_KEY, JSON.stringify(utm), {
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });
  }

  response.cookies.set(CURRENT_TOUCH_KEY, JSON.stringify(utm), {
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
