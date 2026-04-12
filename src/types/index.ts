import { Timestamp } from "firebase/firestore";

export interface CaseStudy {
  id?: string;
  title: string;
  client: string;
  metrics: string[];
  description: string;
  category: "Studies" | "Success Stories" | "Stills & Motions";
  mediaUrl: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  icon_url: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  company: string;
  service: string;
  projectDetails: string;
  createdAt?: Timestamp;
}

export type CaseStudyCategory = CaseStudy["category"];

export interface SiteSettings {
  heroVideoUrl?: string;
  updatedAt?: Timestamp;
}
