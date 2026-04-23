import { useEffect } from "react";

const DEFAULT_TITLE = "STEFCOS - Cosmétiques Premium Peaux Noires & Mixtes | Lomé, Togo";
const BASE_URL = "https://www.stefcos.com";

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (el) el.setAttribute(attr, value);
};

const setOrCreateLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export const usePageSeo = (title: string, description?: string, path?: string) => {
  useEffect(() => {
    document.title = title;
    const canonical = BASE_URL + (path ?? window.location.pathname);

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[property="og:url"]', "content", canonical);
    setOrCreateLink("canonical", canonical);

    return () => { document.title = DEFAULT_TITLE; };
  }, [title, description, path]);
};
