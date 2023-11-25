const mockToArray =
  (resultArray: any[]): any =>
  (): any =>
    ({ toArray: (): any => resultArray } as any);

const mockSortToArray =
  (resultArray: any[]): any =>
  (): any =>
    ({ sort: () => ({ toArray: (): any => resultArray }) } as any);

const mockLimit =
  (resultArray: any[]): any =>
  (): any =>
    ({ skip: () => ({ limit: (): any => ({ toArray: (): any => resultArray }) }) } as any);

const mockCount =
  (index: number): any =>
  (): number =>
    ({ count: (): number => index } as any);

export { mockToArray, mockSortToArray, mockLimit, mockCount };
