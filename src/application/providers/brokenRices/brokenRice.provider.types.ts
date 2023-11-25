import { BrokenRiceDocument } from 'src/entities/brokenRice';
import { SideDish } from '../sideDishes/sideDish.provider.types';

export interface BrokenRice {
  id: string;
  name: string;
  description: string;
  sideDishes: SideDish[];
  imgSrc: string;
  priceCents: number;
}
export interface CreateBrokenRiceInput {
  name: string;
  description: string;
  imgSrc: string;
  sideDishIds: string[];
}

export type UpdateBrokenRiceInput = {
  description?: string | null;
  id: string;
  imgSrc?: string | null;
  name?: string | null;
  sideDishIds?: string[] | null;
};

export type BrokenRiceResponse = {
  brokenRices: BrokenRiceDocument[];
  connection: BrokenRiceConnection;
};

export type BrokenRiceConnection = {
  cursor: string;
  totalCount: number;
  hasNextPage: boolean;
};
