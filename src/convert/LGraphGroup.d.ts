export type SerializedLGraphGroup = {
    title: LGraphGroup["title"];
    bounding: LGraphGroup["_bounding"];
    color: LGraphGroup["color"];
    font: LGraphGroup["font"];
};
export declare class LGraphGroup {
    title: string;
    private _bounding: Vector4;
    color: string;
    font: string;

    configure(o: SerializedLGraphGroup): void;
    serialize(): SerializedLGraphGroup;
    move(deltaX: number, deltaY: number, ignoreNodes?: boolean): void;
    recomputeInsideNodes(): void;
    isPointInside: LGraphNode["isPointInside"];
    setDirtyCanvas: LGraphNode["setDirtyCanvas"];
}