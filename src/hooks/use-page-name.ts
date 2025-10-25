import { useCallback } from "react";

export function usePageName() {
  const getPageName = useCallback((path: string): string => {
    const pathMap: Record<string, string> = {
      "/": "Posts",
      "/instagram": "Instagram",
      "/facebook": "Facebook",
      "/tiktok": "TikTok",
    };

    return pathMap[path] || "Página";
  }, []);

  return { getPageName };
}
