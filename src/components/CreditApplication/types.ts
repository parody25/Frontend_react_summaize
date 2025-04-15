export type Application = {
    name: string;
    appNo: string;
    borrower: string;
    status: "Completed" | "Review" | "Submitted";
    sources: string;
  };
  
  export type FormData = {
    borrowerName: string;
    registrationNumber: string;
    borrowerType: string;
  };
  
  export type MenuItem = {
    text: string;
    icon: React.ReactNode;
    path: string;
  };


export type Document = {
  id: string;
  name: string;
  category: string;
  type: 'PDF' | 'Excel' | 'Word';
  file: File;
  uploaded: boolean;
};

export type DocumentCategory = {
  id: string;
  name: string;
  required: boolean;
};

export type UrlItem = {
  id: string;
  name: string;
  url: string;
};