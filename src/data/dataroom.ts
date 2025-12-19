export interface DataRoomFile {
  name: string;
  key: string; // S3 object key
  description?: string;
}

export interface DataRoomCategory {
  title: string;
  description?: string;
  files: DataRoomFile[];
}

export const dataRoomCategories: DataRoomCategory[] = [
  {
    title: "Investor Materials",
    description: "Executive summary, investor deck, financial overview",
    files: [
      {
        name: "Executive Summary.pdf",
        key: "dataroom/executive-summary.pdf",
      },
      {
        name: "Investor Deck.pdf",
        key: "dataroom/investor-deck.pdf",
      },
      {
        name: "Financial Overview.pdf",
        key: "dataroom/financial-overview.pdf",
      },
    ],
  },
  {
    title: "Regulatory & Filings",
    description: "SEC filings, certifications, compliance docs",
    files: [
      {
        name: "Form D - SEC Filing (link)",
        key: "link:/filings", // internal site link; not presigned
      },
    ],
  },
];


