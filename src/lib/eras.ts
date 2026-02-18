export interface Era {
  id: string;
  label: string;
  yearRange: string;
  years: number[];
  description: string;
  flavor: string; // short evocative phrase for the card
}

export const ERAS: Era[] = [
  {
    id: "1.0",
    label: "Era 1.0",
    yearRange: "1983–2000",
    years: Array.from({ length: 18 }, (_, i) => 1983 + i),
    description: "The formative years through the first hiatus",
    flavor: "Basements → arenas. Pure improvisational fire.",
  },
  {
    id: "2.0",
    label: "Era 2.0",
    yearRange: "2002–2004",
    years: [2002, 2003, 2004],
    description: "The brief, complicated return before the breakup",
    flavor: "A reunion cut short. Raw and searching.",
  },
  {
    id: "3.0",
    label: "Era 3.0",
    yearRange: "2009–2020",
    years: Array.from({ length: 12 }, (_, i) => 2009 + i),
    description: "The triumphant reunion through the pandemic pause",
    flavor: "Reinvented and relentless. Festival summers.",
  },
  {
    id: "4.0",
    label: "Era 4.0",
    yearRange: "2021–Present",
    years: [2021, 2022, 2023, 2024, 2025, 2026],
    description: "Post-pandemic, fully charged",
    flavor: "Back and burning brighter than ever.",
  },
];
