/*
API response model for review
      "referenceMonth": "string",
      "referenceYear": "string",
      "promoters": 0,
      "neutrals": 0,
      "detractors": 0,
      "total": 0,
      "nps": 0,
      "resultColor": 0,
      "resultColorDescription": "string"
*/

import { Organization } from "./organization.model";

export interface ReviewResult {
    referenceMonth?: string;
    referenceYear?: string;
    promoters?: number;
    neutrals?: number;
    detractors?: number;
    total?: number;
    nps?: number;
    resultColor?: ResultColor;
    resultColorDescription?: string;
}

export enum ResultColor {
    Red = 0,
    Yellow = 1,
    Green = 2

}

export interface ReviewResultList {
    reviewResults?: ReviewResult[];
}

/*
API Body model for review
{
  "userId": 0,
  "referenceMonth": "string",
  "referenceYear": "string",
  "organizationReviews": [
    {
      "organizationId": 0,
      "comment": "string",
      "rating": 0
    }
  ]
}
*/

export interface OrganizationReview extends Organization {
    organizationId?: number;
    comment?: string;
    rating?: number;
}

export class Review {
    userId?: number;
    referenceMonth: string = '';
    referenceYear: string = '';
    organizationReviews: OrganizationReview[] = [];
}