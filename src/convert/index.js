import {LiteGraph} from "./LiteGraph";
import * as api from "./api";
import { ContextMenu, closeAllContextMenus ,extendClass} from "./ContextMenu"
import {LGraphCanvas} from "./LGraphCanvas";
import {LGraphNode} from "./LGraphNode";
import {LLink} from "./LLink";

LiteGraph.compareObjects = api.compareObjects;
LiteGraph.distance = api.distance;
LiteGraph.colorToString = api.colorToString;
LiteGraph.isInsideRectangle = api.isInsideRectangle;
LiteGraph.growBounding = api.growBounding;
LiteGraph.isInsideBounding = api.isInsideBounding;
LiteGraph.overlapBounding = api.overlapBounding;
LiteGraph.hex2num = api.hex2num;
LiteGraph.num2hex = api.num2hex;
LiteGraph.getParameterNames = api.getParameterNames;

LiteGraph.ContextMenu = ContextMenu;
LiteGraph.closeAllContextMenus = closeAllContextMenus;
LiteGraph.extendClass = extendClass;

LiteGraph.LGraphNode = LGraphNode;

LiteGraph.LLink = LLink;

export default LiteGraph;
export * from "./LGraph";
export * from "./LGraphGroup";