// this file is used to declare the types so that it follows strict type

export interface Player {
    id: string;
    name: string;
}

export enum RsvpStatus {
    YES = "Yes",
    NO = "No",
    MAYBE = "Maybe"
}

export interface RsvpEntry {
    player: Player;
    status: RsvpStatus;
    updatedAt: Date;

}

export interface RsvpCounts {
    total: number;
    confirmed: number;
    declined: number;
    maybe: number;
}