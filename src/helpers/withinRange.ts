export const withinRange = (v: string, o: string, t: string): boolean => {
    if (Number(v) >= Number(o) && Number(v) <=  Number(t)) return true;
    return false;
  };
  