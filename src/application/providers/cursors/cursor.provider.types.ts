import { BrokenRiceDocument } from 'src/entities/brokenRice';

export interface BrokenRiceResponse {
  brokenRices: BrokenRiceDocument[];
  connection: BrokenRiceConnection;
}
export interface BrokenRiceConnection {
  cursor: string;
  totalCount: number;
  hasNextPage: boolean;
}
