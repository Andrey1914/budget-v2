export interface FAQSection {
  question: string;
  subItems?: FAQSubItem[];
}

export interface FAQSubItem {
  question: string;
  answer: string;
}
