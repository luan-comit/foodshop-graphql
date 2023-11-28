import { BrokenRice } from '../brokenRices/brokenRice.provider.types';

export interface BrokenRiceResponse {
  brokenRices: BrokenRice[];
  connection: BrokenRiceConnection;
}
export interface BrokenRiceConnection {
  cursor: string;
  totalCount: number;
  hasNextPage: boolean;
}
