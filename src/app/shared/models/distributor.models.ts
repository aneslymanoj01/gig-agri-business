export interface DistributorRequest {
  name: string;
  userName: string;
  email: string;
  contactNo: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  contactPerson: string;
}

export interface DistributorResponse {
  resultCode: number;
  resultDescription: string;
  data?: {
    id: number;
    name: string;
    userName: string;
    email: string;
    contactNo: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    contactPerson: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UsernameCheckResponse {
  errorCode: number;
  errorDescription?: string;
}

export interface Distributor {
  id: number;
  name: string;
  email: string;
  contactNo: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  contactPerson: string;
}

export interface GetAllDistributorsResponse {
  resultCode: number;
  resultDescription: string;
  data?: {
    content: Distributor[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}
