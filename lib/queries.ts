import { client } from "@/sanity/client";

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export async function getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  if (!category) {
    console.warn("getMenuItemsByCategory called with undefined category");
    return [];
  }
  const query = `*[_type == "menuItem" && category == $category] {
    _id,
    name,
    price,
    category,
    "imageUrl": image.asset->url
  }`;
  return client.fetch(query, { category });
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  const query = `*[_type == "menuItem"] | order(category asc) {
    _id,
    name,
    price,
    category,
    "imageUrl": image.asset->url
  }`;
  // By default Next.js caches fetch requests. We bypass this to always get fresh Sanity data.
  return client.fetch(query, {}, { cache: 'no-store' });
}
