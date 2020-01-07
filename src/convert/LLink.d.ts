export declare class LLink {
    id: number;
    type: string;
    origin_id: number;
    origin_slot: number;
    target_id: number;
    target_slot: number;
    constructor(
        id: number,
        type: string,
        origin_id: number,
        origin_slot: number,
        target_id: number,
        target_slot: number
    );
    configure(o: LLink | SerializedLLink): void;
    serialize(): SerializedLLink;
}