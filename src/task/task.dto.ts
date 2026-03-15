

export class TaskDTO {
    id: string;
    title: string;
    description: string;
    status: string;
    expirationDate: string;
}

export class FindAllParameters {
    status: string;
    title: string;
}