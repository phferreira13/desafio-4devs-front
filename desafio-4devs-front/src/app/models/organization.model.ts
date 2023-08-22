export interface Organization {
    id?: number;
    name?: string;
    contactName?: string;
    cnpj?: string;
    createdAt?: Date;
    updatedAt?: Date;
    categoryReview?: string;
}

export interface OrganizationsList {
    organizations?: Organization[];
}