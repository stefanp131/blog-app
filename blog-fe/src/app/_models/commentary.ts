export interface Commentary {
  id: number;
  approved: boolean;
  title: string;
  content: string;
  dateCreated: Date;
  lastUpdated: Date;
  createdBy: number;
}