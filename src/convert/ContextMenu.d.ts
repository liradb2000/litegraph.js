export declare class ContextMenu {
    static trigger(
        element: HTMLElement,
        event_name: string,
        params: any,
        origin: any
    ): void;
    static isCursorOverElement(event: MouseEvent, element: HTMLElement): void;
    static closeAllContextMenus(window: Window): void;
    constructor(values: ContextMenuItem[], options?: IContextMenuOptions);
    options: IContextMenuOptions;
    parentMenu?: ContextMenu;
    lock: boolean;
    current_submenu?: ContextMenu;
    addItem(
        name: string,
        value: ContextMenuItem,
        options?: IContextMenuOptions
    ): void;
    close(e?: MouseEvent, ignore_parent_menu?: boolean): void;
    getTopMenu(): void;
    getFirstEvent(): void;
}