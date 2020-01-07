import {LGraphNodeConstructor} from "./LGraph";

export const LiteGraph: {
    VERSION: number;

    CANVAS_GRID_SIZE: number;

    NODE_TITLE_HEIGHT: number;
    NODE_TITLE_TEXT_Y: number;
    NODE_SLOT_HEIGHT: number;
    NODE_WIDGET_HEIGHT: number;
    NODE_WIDTH: number;
    NODE_MIN_WIDTH: number;
    NODE_COLLAPSED_RADIUS: number;
    NODE_COLLAPSED_WIDTH: number;
    NODE_TITLE_COLOR: string;
    NODE_TEXT_SIZE: number;
    NODE_TEXT_COLOR: string;
    NODE_SUBTEXT_SIZE: number;
    NODE_DEFAULT_COLOR: string;
    NODE_DEFAULT_BGCOLOR: string;
    NODE_DEFAULT_BOXCOLOR: string;
    NODE_DEFAULT_SHAPE: string;
    DEFAULT_SHADOW_COLOR: string;
    DEFAULT_GROUP_FONT: number;

    LINK_COLOR: string;
    EVENT_LINK_COLOR: string;
    CONNECTING_LINK_COLOR: string;

    MAX_NUMBER_OF_NODES: number; //avoid infinite loops
    DEFAULT_POSITION: Vector2; //default node position
    VALID_SHAPES: ["default", "box", "round", "card"]; //,"circle"

    //shapes are used for nodes but also for slots
    BOX_SHAPE: 1;
    ROUND_SHAPE: 2;
    CIRCLE_SHAPE: 3;
    CARD_SHAPE: 4;
    ARROW_SHAPE: 5;

    //enums
    INPUT: 1;
    OUTPUT: 2;

    EVENT: -1; //for outputs
    ACTION: -1; //for inputs

    ALWAYS: 0;
    ON_EVENT: 1;
    NEVER: 2;
    ON_TRIGGER: 3;

    UP: 1;
    DOWN: 2;
    LEFT: 3;
    RIGHT: 4;
    CENTER: 5;

    STRAIGHT_LINK: 0;
    LINEAR_LINK: 1;
    SPLINE_LINK: 2;

    NORMAL_TITLE: 0;
    NO_TITLE: 1;
    TRANSPARENT_TITLE: 2;
    AUTOHIDE_TITLE: 3;

    node_images_path: string;

    debug: boolean;
    catch_exceptions: boolean;
    throw_errors: boolean;
    /** if set to true some nodes like Formula would be allowed to evaluate code that comes from unsafe sources (like node configuration), which could lead to exploits */
    allow_scripts: boolean;
    /** node types by string */
    registered_node_types: Record<string, LGraphNodeConstructor>;
    /** used for dropping files in the canvas */
    node_types_by_file_extension: Record<string, LGraphNodeConstructor>;
    /** node types by class name */
    Nodes: Record<string, LGraphNodeConstructor>;

    /** used to add extra features to the search box */
    searchbox_extras: Record<
        string,
        {
            data: { outputs: string[][]; title: string };
            desc: string;
            type: string;
        }
    >;

    createNode<T extends LGraphNode = LGraphNode>(type: string): T;
    /** Register a node class so it can be listed when the user wants to create a new one */
    registerNodeType(type: string, base: { new (): LGraphNode }): void;
    /**
     * Create a new node type by passing a function, it wraps it with a proper class and generates inputs according to the parameters of the function.
     * Useful to wrap simple methods that do not require properties, and that only process some input to generate an output.
     * @param name node name with namespace (p.e.: 'math/sum')
     * @param func
     * @param param_types an array containing the type of every parameter, otherwise parameters will accept any type
     * @param return_type string with the return type, otherwise it will be generic
     * @param properties properties to be configurable
     */
    wrapFunctionAsNode(
        name: string,
        func: (...args: any[]) => any,
        param_types?: [],
        return_type?: string,
        properties?: object
    ): void;

    /**
     * Adds this method to all node types, existing and to be created
     * (You can add it to LGraphNode.prototype but then existing node types wont have it)
     */
    addNodeMethod(name: string, func: (...args: any[]) => any): void;

    /**
     * Create a node of a given type with a name. The node is not attached to any graph yet.
     * @param type full name of the node class. p.e. "math/sin"
     * @param name a name to distinguish from other nodes
     * @param options to set options
     */
    createNode<T extends LGraphNode>(
        type: string,
        title: string,
        options: object
    ): T;

    /**
     * Returns a registered node type with a given name
     * @param type full name of the node class. p.e. "math/sin"
     */
    getNodeType<T extends LGraphNode>(type: string): LGraphNodeConstructor<T>;

    /**
     * Returns a list of node types matching one category
     * @param category category name
     * @return array with all the node classes
     */
    getNodeTypesInCategory(
        category: string,
        filter: any
    ): LGraphNodeConstructor[];

    /**
     * Returns a list with all the node type categories
     * @return array with all the names of the categories
     */
    getNodeTypesCategories(): string[];

    /** debug purposes: reloads all the js scripts that matches a wildcard */
    reloadNodes(folder_wildcard: string): void;

    getTime(): number;
    LLink: typeof LLink;
    LGraph: typeof LGraph;
    DragAndScale: typeof DragAndScale;
    compareObjects(a: object, b: object): boolean;
    distance(a: Vector2, b: Vector2): number;
    colorToString(c: string): string;
    isInsideRectangle(
        x: number,
        y: number,
        left: number,
        top: number,
        width: number,
        height: number
    ): boolean;
    growBounding(bounding: Vector4, x: number, y: number): Vector4;
    isInsideBounding(p: Vector2, bb: Vector4): boolean;
    hex2num(hex: string): [number, number, number];
    num2hex(triplet: [number, number, number]): string;
    ContextMenu: typeof ContextMenu;
    extendClass<A, B>(target: A, origin: B): A & B;
    getParameterNames(func: string): string[];
};