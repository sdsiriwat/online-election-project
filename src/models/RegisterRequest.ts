export interface RegisterRequest {
    nationalId: string;
    firstname: string;
    lastname: string;           
    address: string; 
    province: string;
    district: string;
    subdistrict: string;
    constituency: number;
    password: string;
    confirmPassword: string;
}