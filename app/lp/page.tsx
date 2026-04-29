import { redirect } from "next/navigation";

type LandingEntryPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function buildQueryString(searchParams: LandingEntryPageProps["searchParams"]): string {
  const params = new URLSearchParams();

  if (!searchParams) {
    return "";
  }

  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      params.set(key, value);
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item);
      }
    }
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export default function LandingEntryPage({ searchParams }: LandingEntryPageProps) {
  redirect(`/lp/a${buildQueryString(searchParams)}`);
}
