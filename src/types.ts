// types.ts
export interface FeedItem {
  id: number;
  time: string; // ISO string datetime
  message: string;
  imageUrl?: string; // optional image URL for grid card visual
}
