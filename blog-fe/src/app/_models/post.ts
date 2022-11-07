import { Commentary } from "./commentary";

export interface Post {
 id: number;
 title: string;
 content: string;
 dateCreated: Date;
 summary: string;
 lastUpdated: Date;
 category: string;
 commentaries: Commentary[]
}