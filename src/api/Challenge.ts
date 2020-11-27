export interface Challenge {
    door: number,
    content: string,
    author: string,
    title: string,
    answer: string,
}

export interface SolvedStatus {
    [key: string]: boolean;
}
