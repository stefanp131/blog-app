import { Commentary } from "./commentary";

export interface Post {
 id: number;
 title: string;
 content: string;
 dateCreated: Date;
 summary: string;
 lastUpdated: string;
 category: string;
 commentaries: Commentary[]
}