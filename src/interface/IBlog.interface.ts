// types.ts
export interface IBlog {
  id: string | null | undefined;
  author: {
    id: string;
    name: string;
  };
  title: string;
  content: string;
  bannerImg: string;
  likesCount: number;
  category: string; // Add this line
}
