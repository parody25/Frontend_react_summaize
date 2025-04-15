type RatioEntry = {
    year: number;
    value: number;
    threshold:number;
  };
   
  type RatiosResponse = {
    [key: string]: RatioEntry[];
  };
   
  type RatioListItem = {
    label: string;
    value: RatioEntry[];
  };
   
  export const mapRatiosToList = (ratios: RatiosResponse): RatioListItem[] => {
    return Object.entries(ratios).map(([key, entries]) => ({
      label: key,
      value: entries.map(entry => ({
        ...entry,
        covenant: entry.threshold, // default covenant to 0 if missing
      })),
    }));
  };