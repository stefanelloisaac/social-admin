import { useEffect } from "react";

interface PageMetadata {
  title: string;
  description?: string;
}

export function usePageMetadata({ title, description }: PageMetadata) {
  useEffect(() => {
    document.title = `Social Admin | ${title}`;

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
    }
  }, [title, description]);
}
