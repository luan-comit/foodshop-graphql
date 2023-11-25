export interface SideDish {
  id: string;
  name: string;
  priceCents: number;
}

export interface CreateSideDishInput {
  name: string;
  priceCents: number;
}

export interface UpdateSideDishInput {
  id: string;
  name?: string | null;
  priceCents?: number | null;
}
