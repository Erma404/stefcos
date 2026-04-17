import { useEffect } from "react";

const DEFAULT_TITLE = "STEFCOS - Cosmétiques Premium Peaux Noires & Mixtes | Lomé, Togo";

export const usePageSeo = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      let el = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (el) el.setAttribute("content", description);
    }
    return () => { document.title = DEFAULT_TITLE; };
  }, [title, description]);
};
