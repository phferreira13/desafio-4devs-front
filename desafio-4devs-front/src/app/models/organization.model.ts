export interface Organization {
    id?: number;
    name?: string;
    contactName?: string;
    cnpj?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrganizationsList {
    organizations?: Organization[];
}