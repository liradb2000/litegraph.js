export type SerializedLGraphNode<T extends LGraphNode = LGraphNode> = {
    id: T["id"];
    type: T["type"];
    pos: T["pos"];
    size: T["size"];
    flags: T["flags"];
    mode: T["mode"];
    inputs: T["inputs"];
    outputs: T["outputs"];
    title: T["title"];
    properties: T["properties"];
    widgets_values?: IWidget["value"][];
};

export declare class LGraphNode {
    static title_color: string;
    static title: string;
    static type: null | string;
    static widgets_up: boolean;
    constructor(title?: string);

    title: string;
    type: null | string;
    size: Vector2;
    graph: null | LGraph;
    graph_version: number;
    pos: Vector2;
    is_selected: boolean;

    id: number;

    //inputs available: array of inputs
    inputs: INodeInputSlot[];
    outputs: INodeOutputSlot[];
    connections: any[];

    //local data
    properties: Record<string, any>;
    properties_info: any[];

    flags: object;

    color: string;
    bgcolor: string;
    boxcolor: string;
    shape:
        | typeof LiteGraph.BOX_SHAPE
        | typeof LiteGraph.ROUND_SHAPE
        | typeof LiteGraph.CIRCLE_SHAPE
        | typeof LiteGraph.CARD_SHAPE
        | typeof LiteGraph.ARROW_SHAPE;

    serialize_widgets: boolean;
    skip_list: boolean;

    /** Used in `LGraphCanvas.onMenuNodeMode` */
    mode?:
        | typeof LiteGraph.ON_EVENT
        | typeof LiteGraph.ON_TRIGGER
        | typeof LiteGraph.NEVER
        | typeof LiteGraph.ALWAYS;

    /** configure a node from an object containing the serialized info */
    configure(info: SerializedLGraphNode): void;
    /** serialize the content */
    serialize(): SerializedLGraphNode;
    /** Creates a clone of this node  */
    clone(): this;
    /** serialize and stringify */
    toString(): string;
    /** get the title string */
    getTitle(): string;
    /** sets the output data */
    setOutputData(slot: number, data: any): void;
    /** sets the output data */
    setOutputDataType(slot: number, type: string): void;
    /**
     * Retrieves the input data (data traveling through the connection) from one slot
     * @param slot
     * @param force_update if set to true it will force the connected node of this slot to output data into this link
     * @return data or if it is not connected returns undefined
     */
    getInputData<T = any>(slot: number, force_update?: boolean): T;
    /**
     * Retrieves the input data type (in case this supports multiple input types)
     * @param slot
     * @return datatype in string format
     */
    getInputDataType(slot: number): string;
    /**
     * Retrieves the input data from one slot using its name instead of slot number
     * @param slot_name
     * @param force_update if set to true it will force the connected node of this slot to output data into this link
     * @return data or if it is not connected returns null
     */
    getInputDataByName<T = any>(slot_name: string, force_update?: boolean): T;
    /** tells you if there is a connection in one input slot */
    isInputConnected(slot: number): boolean;
    /** tells you info about an input connection (which node, type, etc) */
    getInputInfo(
        slot: number
    ): { link: number; name: string; type: string | 0 } | null;
    /** returns the node connected in the input slot */
    getInputNode(slot: number): LGraphNode | null;
    /** returns the value of an input with this name, otherwise checks if there is a property with that name */
    getInputOrProperty<T = any>(name: string): T;
    /** tells you the last output data that went in that slot */
    getOutputData<T = any>(slot: number): T | null;
    /** tells you info about an output connection (which node, type, etc) */
    getOutputInfo(
        slot: number
    ): { name: string; type: string; links: number[] } | null;
    /** tells you if there is a connection in one output slot */
    isOutputConnected(slot: number): boolean;
    /** tells you if there is any connection in the output slots */
    isAnyOutputConnected(): boolean;
    /** retrieves all the nodes connected to this output slot */
    getOutputNodes(slot: number): LGraphNode[];
    /**  Triggers an event in this node, this will trigger any output with the same name */
    trigger(action: string, param: any): void;
    /**
     * Triggers an slot event in this node
     * @param slot the index of the output slot
     * @param param
     * @param link_id in case you want to trigger and specific output link in a slot
     */
    triggerSlot(slot: number, param: any, link_id?: number): void;
    /**
     * clears the trigger slot animation
     * @param slot the index of the output slot
     * @param link_id in case you want to trigger and specific output link in a slot
     */
    clearTriggeredSlot(slot: number, link_id?: number): void;
    /**
     * add a new property to this node
     * @param name
     * @param default_value
     * @param type string defining the output type ("vec3","number",...)
     * @param extra_info this can be used to have special properties of the property (like values, etc)
     */
    addProperty<T = any>(
        name: string,
        default_value: any,
        type: string,
        extra_info?: object
    ): T;
    /**
     * add a new output slot to use in this node
     * @param name
     * @param type string defining the output type ("vec3","number",...)
     * @param extra_info this can be used to have special properties of an output (label, special color, position, etc)
     */
    addOutput(
        name: string,
        type: string,
        extra_info?: Partial<INodeOutputSlot>
    ): void;
    /**
     * add a new output slot to use in this node
     * @param array of triplets like [[name,type,extra_info],[...]]
     */
    addOutputs(
        array: [string, string, Partial<INodeOutputSlot> | undefined][]
    ): void;
    /** remove an existing output slot */
    removeOutput(slot: number): void;
    /**
     * add a new input slot to use in this node
     * @param name
     * @param type string defining the input type ("vec3","number",...), it its a generic one use 0
     * @param extra_info this can be used to have special properties of an input (label, color, position, etc)
     */
    addInput(
        name: string,
        type: string,
        extra_info?: Partial<INodeInputSlot>
    ): void;
    /**
     * add several new input slots in this node
     * @param array of triplets like [[name,type,extra_info],[...]]
     */
    addInputs(
        array: [string, string, Partial<INodeInputSlot> | undefined][]
    ): void;
    /** remove an existing input slot */
    removeInput(slot: number): void;
    /**
     * add an special connection to this node (used for special kinds of graphs)
     * @param name
     * @param type string defining the input type ("vec3","number",...)
     * @param pos position of the connection inside the node
     * @param direction if is input or output
     */
    addConnection(
        name: string,
        type: string,
        pos: Vector2,
        direction: string
    ): {
        name: string;
        type: string;
        pos: Vector2;
        direction: string;
        links: null;
    };
    setValue(v: any): void;
    /** computes the size of a node according to its inputs and output slots */
    computeSize(): [number, number];
    /**
     * https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md#node-widgets
     * @return created widget
     */
    addWidget<T extends IWidget>(
        type: T["type"],
        name: string,
        value: T["value"],
        callback?: WidgetCallback<T>,
        options?: T["options"]
    ): T;

    addCustomWidget<T extends IWidget>(customWidget: T): T;

    /**
     * returns the bounding of the object, used for rendering purposes
     * @return [x, y, width, height]
     */
    getBounding(): Vector4;
    /** checks if a point is inside the shape of a node */
    isPointInside(
        x: number,
        y: number,
        margin?: number,
        skipTitle?: boolean
    ): boolean;
    /** checks if a point is inside a node slot, and returns info about which slot */
    getSlotInPosition(
        x: number,
        y: number
    ): {
        input?: INodeInputSlot;
        output?: INodeOutputSlot;
        slot: number;
        link_pos: Vector2;
    };
    /**
     * returns the input slot with a given name (used for dynamic slots), -1 if not found
     * @param name the name of the slot
     * @return the slot (-1 if not found)
     */
    findInputSlot(name: string): number;
    /**
     * returns the output slot with a given name (used for dynamic slots), -1 if not found
     * @param name the name of the slot
     * @return  the slot (-1 if not found)
     */
    findOutputSlot(name: string): number;
    /**
     * connect this node output to the input of another node
     * @param slot (could be the number of the slot or the string with the name of the slot)
     * @param  targetNode the target node
     * @param  targetSlot the input slot of the target node (could be the number of the slot or the string with the name of the slot, or -1 to connect a trigger)
     * @return {Object} the link_info is created, otherwise null
     */
    connect<T = any>(
        slot: number | string,
        targetNode: LGraphNode,
        targetSlot: number | string
    ): T | null;
    /**
     * disconnect one output to an specific node
     * @param slot (could be the number of the slot or the string with the name of the slot)
     * @param target_node the target node to which this slot is connected [Optional, if not target_node is specified all nodes will be disconnected]
     * @return if it was disconnected successfully
     */
    disconnectOutput(slot: number | string, targetNode: LGraphNode): boolean;
    /**
     * disconnect one input
     * @param slot (could be the number of the slot or the string with the name of the slot)
     * @return if it was disconnected successfully
     */
    disconnectInput(slot: number | string): boolean;
    /**
     * returns the center of a connection point in canvas coords
     * @param is_input true if if a input slot, false if it is an output
     * @param slot (could be the number of the slot or the string with the name of the slot)
     * @param out a place to store the output, to free garbage
     * @return the position
     **/
    getConnectionPos(
        is_input: boolean,
        slot: number | string,
        out?: Vector2
    ): Vector2;
    /** Force align to grid */
    alignToGrid(): void;
    /** Console output */
    trace(msg: string): void;
    /** Forces to redraw or the main canvas (LGraphNode) or the bg canvas (links) */
    setDirtyCanvas(fg: boolean, bg: boolean): void;
    loadImage(url: string): void;
    /** Allows to get onMouseMove and onMouseUp events even if the mouse is out of focus */
    captureInput(v: any): void;
    /** Collapse the node to make it smaller on the canvas */
    collapse(force: boolean): void;
    /** Forces the node to do not move or realign on Z */
    pin(v?: boolean): void;
    localToScreen(x: number, y: number, graphCanvas: LGraphCanvas): Vector2;

    // https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md#custom-node-appearance
    onDrawBackground?(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void;
    onDrawForeground?(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D
    ): void;

    // https://github.com/jagenjo/litegraph.js/blob/master/guides/README.md#custom-node-behaviour
    onMouseDown?(
        event: MouseEvent,
        pos: Vector2,
        graphCanvas: LGraphCanvas
    ): void;
    onMouseMove?(
        event: MouseEvent,
        pos: Vector2,
        graphCanvas: LGraphCanvas
    ): void;
    onMouseUp?(
        event: MouseEvent,
        pos: Vector2,
        graphCanvas: LGraphCanvas
    ): void;
    onMouseEnter?(
        event: MouseEvent,
        pos: Vector2,
        graphCanvas: LGraphCanvas
    ): void;
    onMouseLeave?(
        event: MouseEvent,
        pos: Vector2,
        graphCanvas: LGraphCanvas
    ): void;
    onKey?(event: KeyboardEvent, pos: Vector2, graphCanvas: LGraphCanvas): void;

    /** Called by `LGraphCanvas.selectNodes` */
    onSelected?(): void;
    /** Called by `LGraphCanvas.deselectNode` */
    onDeselected?(): void;
    /** Called by `LGraph.runStep` `LGraphNode.getInputData` */
    onExecute?(): void;
    /** Called by `LGraph.serialize` */
    onSerialize?(o: SerializedLGraphNode): void;
    /** Called by `LGraph.configure` */
    onConfigure?(o: SerializedLGraphNode): void;
    /**
     * when added to graph (warning: this is called BEFORE the node is configured when loading)
     * Called by `LGraph.add`
     */
    onAdded?(graph: LGraph): void;
    /**
     * when removed from graph
     * Called by `LGraph.remove` `LGraph.clear`
     */
    onRemoved?(): void;
    /**
     * if returns false the incoming connection will be canceled
     * Called by `LGraph.connect`
     */
    onConnectInput?(
        inputIndex: number,
        type: INodeOutputSlot["type"],
        outputSlot: INodeOutputSlot
    ): boolean;
    /** Called by `LGraphCanvas.processContextMenu` */
    getMenuOptions?(graphCanvas: LGraphCanvas): ContextMenuItem[];
}