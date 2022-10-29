import { Commentary } from "./commentary";

export interface Post {
 id: number;
 title: string;
 content: string;
 dateCreated: Date;
 createdBy: string;
 category: string;
 commentaries: Commentary[]
}