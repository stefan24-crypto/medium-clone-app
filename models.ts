import { Timestamp } from "firebase/firestore";

type Person = { id: string; name: string; pic: string };

export interface Post {
  id: string;
  author_name: string;
  author_profile_pic: string;
  title: string;
  description: string;
  liked_by: Person[];
  body: any;
  category: string;
  main_image: string;
  time: Timestamp;
}

export interface User {
  id: string;
  name: string;
  pic: string;
  bio: string;
  posts: Post[];
}

export const categories = [
  "Coding",
  "Sports",
  "Food",
  "Travel",
  "Fitness",
  "Fashion",
  "Music",
  "Web Development",
  "Artificial Intelligence",
  "CryptoCurrencies",
  "Mobile Development",
];
