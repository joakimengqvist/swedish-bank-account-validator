export const trimTo = (d: number, i: string): string => {
    return i.length > d
      ? i.substr(i.length - d)
      : i;
  };