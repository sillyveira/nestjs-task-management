export class AuthResponseDTO {
    token: string;
    expiresAt: number;
}

export class AuthBodyDTO {
    username: string;
    password: string;
}