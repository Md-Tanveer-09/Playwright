const pageUrls: Record<string, string> = {
  'Home page': 'https://testheon.com/practice/apps/ecommerce/',
  'Cart page': 'https://testheon.com/practice/apps/ecommerce/cart/',
};

export function getPageUrl(pageName: string): string {
  const url = Object.hasOwn(pageUrls, pageName) ? pageUrls[pageName] : undefined;
  if (typeof url !== 'string') {
    throw new Error(`Unknown page "${pageName}". Add its URL to pageUrls.`);
  }
  return url;
}
