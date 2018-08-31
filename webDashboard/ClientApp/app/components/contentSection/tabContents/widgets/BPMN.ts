import {BaseWidget} from "./base.widget";
import BPMNGateways = ej.datavisualization.Diagram.BPMNGateways;
import BPMNShapes = ej.datavisualization.Diagram.BPMNShapes;
import BPMNEvents = ej.datavisualization.Diagram.BPMNEvents;
import BPMNLoops = ej.datavisualization.Diagram.BPMNLoops;


export class BPMNWidget extends BaseWidget {
    widget: ej.datavisualization.Diagram | undefined;
    public value: any = {};
    public diagramID!: string;

    constructor() {
        super();
        this.value.nodes = [
            {
                name: "node1",
                width: 60,
                height: 60,
                offsetX: 250,
                offsetY: 40,
                labels: [{"text": "Select Support Ticket", offset: {x: 0.50, y: 0.50}}],
                type: "bpmn",
                shape: BPMNShapes.Gateway/*.Start*/
            },
            {
                name: "node2",
                width: 110,
                height: 70,
                offsetX: 250,
                offsetY: 140,
                labels: [{"text": "Handle Support Ticket", offset: {x: 0.50, y: 0.50}}],
                type: "bpmn",
                shape: BPMNShapes.Activity,
                activity: ej.datavisualization.Diagram.BPMNActivity.Task
            },
            {
                name: "node3",
                width: 90,
                height: 70,
                offsetX: 250,
                offsetY: 245,
                type: "bpmn",
                shape: BPMNShapes.Gateway,
                gateway: BPMNGateways.Exclusive
            },
            {
                name: "node4",
                width: 110,
                height: 70,
                offsetX: 100,
                offsetY: 350,
                labels: [{"text": "Respond to customer", offset: {x: 0.50, y: 0.50}}],
                type: "bpmn",
                shape: BPMNShapes.Activity,
                activity: ej.datavisualization.Diagram.BPMNActivity.Task,
                task: {type: ej.datavisualization.Diagram.BPMNTasks.Service}
            },
            {
                name: "node5",
                width: 110,
                height: 70,
                offsetX: 250,
                offsetY: 350,
                labels: [{"text": "Close ticket", offset: {x: 0.50, y: 0.50}}],
                type: "bpmn",
                shape: BPMNShapes.Activity,
                activity: ej.datavisualization.Diagram.BPMNActivity.Task,
                task: {type: ej.datavisualization.Diagram.BPMNTasks.Service}
            },
            {
                name: "node6",
                width: 110,
                height: 70,
                offsetX: 390,
                offsetY: 350,
                labels: [{"text": "Escalate ticket", offset: {x: 0.50, y: 0.50}}],
                type: "bpmn",
                shape: BPMNShapes.Activity,
                activity: ej.datavisualization.Diagram.BPMNActivity.Task,
                task: {type: ej.datavisualization.Diagram.BPMNTasks.Service}
            },
            {
                name: "node7",
                width: 60,
                height: 60,
                offsetX: 100,
                offsetY: 460,
                type: "bpmn",
                shape: BPMNShapes.Gateway/*.Start*/,
                event: BPMNEvents.End
            },
            {
                name: "node8",
                width: 60,
                height: 60,
                offsetX: 250,
                offsetY: 460,
                type: "bpmn",
                shape: BPMNShapes.Gateway/*.Start*/,
                event: BPMNEvents.End
            },
            {
                name: "node9",
                width: 60,
                height: 60,
                offsetX: 390,
                offsetY: 460,
                type: "bpmn",
                shape: BPMNShapes.Gateway/*.Start*/,
                event: BPMNEvents.End
            },
        ];
        this.value.connectors = [
            {name: "connector1", sourceNode: "node1", targetNode: "node2"},
            {name: "connector2", sourceNode: "node2", targetNode: "node3"},
            {
                name: "connector3",
                sourceNode: "node3",
                targetNode: "node4",
                labels: [{
                    "text": "Respond",
                    fillColor: "white",
                    wrapping: ej.datavisualization.Diagram.TextWrapping.Wrap
                }]
            },
            {
                name: "connector4",
                sourceNode: "node3",
                targetNode: "node5",
                labels: [{
                    "text": "Close",
                    offset: {x: 0.5, y: 0.9},
                    fillColor: "white",
                    wrapping: ej.datavisualization.Diagram.TextWrapping.Wrap
                }]
            },
            {
                name: "connector5", sourceNode: "node3", targetNode: "node6",
                labels: [{"text": "Escalate", fillColor: "white"}]
            },
            {name: "connector6", sourceNode: "node4", targetNode: "node7"},
            {name: "connector7", sourceNode: "node5", targetNode: "node8"},
            {name: "connector8", sourceNode: "node6", targetNode: "node9"},
        ];
        this.setValues(this.value);
    }

    init(containerID: string) {
        let el = $('#' + containerID);
        el.css('direction', 'ltr');
        el.append(this.rootEl);
    }

    createWidget(): void {
        let list: any = ["Event", "Gateway", "Message", "DataSource", "DataObject", "Group"];
        let items = [];
        for (let i = 0; i < list.length; i++) {
            items.push({
                name: list[i], height: 100, width: 100,
                type: ej.datavisualization.Diagram.Shapes.BPMN, shape: ej.datavisualization.Diagram.BPMNShapes[list[i]]
            });
        }
        items.push({
            name: "Task", height: 100, width: 100,
            type: ej.datavisualization.Diagram.Shapes.BPMN,
            shape: ej.datavisualization.Diagram.BPMNShapes.Activity,
            activity: ej.datavisualization.Diagram.BPMNActivity.Task
        });
        items.push({
            name: "SubprocessEventBased", height: 100, width: 100,
            type: ej.datavisualization.Diagram.Shapes.BPMN,
            shape: ej.datavisualization.Diagram.BPMNShapes.Activity,
            activity: ej.datavisualization.Diagram.BPMNActivity.SubProcess,
            subProcess: {type: "event", event: "start"}
        });
        items.push({
            name: "SubprocessTransaction", height: 100, width: 100,
            type: ej.datavisualization.Diagram.Shapes.BPMN,
            shape: ej.datavisualization.Diagram.BPMNShapes.Activity,
            activity: ej.datavisualization.Diagram.BPMNActivity.SubProcess,
            subProcess: {type: "transaction", collapsed: true}
        });

        let list1: any = ["None", "Message", "Timer"];

        for (let i = 0; i < list1.length; i++) {
            items.push({
                name: list1[i], width: 100, height: 100, offsetX: 100, offsetY: 100,
                type: ej.datavisualization.Diagram.Shapes.BPMN, shape: ej.datavisualization.Diagram.BPMNShapes.Event,
                event: ej.datavisualization.Diagram.BPMNEvents.Start,
                trigger: ej.datavisualization.Diagram.BPMNTriggers[list1[i]]
            });
        }


        let list2: any = ["Exclusive", "Inclusive"];
        for (let i = 0; i < list2.length; i++) {
            items.push({
                name: list2[i] + "GateWays" + [i], width: 100, height: 100, offsetX: 100, offsetY: 100,
                borderWidth: 2, borderColor: "black",
                type: ej.datavisualization.Diagram.Shapes.BPMN, shape: ej.datavisualization.Diagram.BPMNShapes.Gateway,
                gateway: ej.datavisualization.Diagram.BPMNGateways[list2[i]],
            });
        }

        let list3: any = ["Service", "Receive"];
        for (let i = 0; i < list3.length; i++) {
            items.push({
                name: list3[i] + "Tasks" + i, width: 100, height: 100, offsetX: 100, offsetY: 100,
                type: ej.datavisualization.Diagram.Shapes.BPMN, shape: ej.datavisualization.Diagram.BPMNShapes.Activity,
                activity: ej.datavisualization.Diagram.BPMNActivity.Task,
                task: {
                    type: ej.datavisualization.Diagram.BPMNTasks[list3[i]]
                }
            });
        }
        let bPMNLoops: any = BPMNLoops;
        for (let i = 0; i < bPMNLoops.length; i++) {
            items.push({
                name: bPMNLoops[i] + "SubProcess", width: 100, height: 100, offsetX: 100, offsetY: 100,
                type: ej.datavisualization.Diagram.Shapes.BPMN,
                shape: ej.datavisualization.Diagram.BPMNShapes.Activity,
                activity: ej.datavisualization.Diagram.BPMNActivity.SubProcess,
                subProcess: {
                    loop: ej.datavisualization.Diagram.BPMNLoops.Standard
                }
            });

            items.push({
                name: "compensation_compensation1", width: 100, height: 100, offsetX: 100, offsetY: 100,
                type: ej.datavisualization.Diagram.Shapes.BPMN,
                shape: ej.datavisualization.Diagram.BPMNShapes.Activity,
                activity: ej.datavisualization.Diagram.BPMNActivity.Task,
                task: {
                    compensation: true
                }
            });

            items.push({
                name: "callList" + i, width: 100, height: 100, offsetX: 100, offsetY: 100,
                type: ej.datavisualization.Diagram.Shapes.BPMN,
                shape: ej.datavisualization.Diagram.BPMNShapes.Activity,
                activity: ej.datavisualization.Diagram.BPMNActivity.SubProcess,
                subProcess: {
                    boundary: ej.datavisualization.Diagram.BPMNBoundary.Default
                }
            });
        }
        $("#symbolpalette").ejSymbolPalette({
            diagramId: "diagram",
            palettes: [{name: "BPMN Shapes", expanded: true, items: items}],
            height: "600px", width: "100%",
            paletteItemWidth: 50, paletteItemHeight: 50,
            previewWidth: 100, previewHeight: 100,
            showPaletteItemText: false
        });
        let el1 = $("#diagram");
        el1.ejDiagram({
            width: "100%",
            height: "600px",
            nodes: this.getValues().nodes,
            connectors: this.getValues().connectors,
            pageSettings: {scrollLimit: "diagram"},
            defaultSettings: {
                connector: {
                    segments: [{"type": "orthogonal"}]
                }
            },
            selectionChange: "diagramSelectionChange",
        });

        let data = [{text: "Event"}, {text: "Gateway"}, {text: "Message"}, {text: "DataObject"}, {text: "DataSource"}, {text: "Activity"}, {text: "Group"}];
        $('#basic_shape').ejDropDownList({
            dataSource: data, text: "Event",
            width: "100%", change: "dropDownChanged",
            visible: false,
            cssClass: "basic_shape"
        });

        data = [{text: "Start"}, {text: "Intermediate"}, {text: "End"}, {text: "NonInterruptingStart"}, {text: "NonInterruptingIntermediate"}, {text: "ThrowingIntermediate"}];
        $('#BPMNEvents').ejDropDownList({
            dataSource: data, text: "Start",
            width: "100%", change: "dropDownChanged",
            cssClass: "BPMNEvents"
        });

        data = [{text: "None"}, {text: "Message"}, {text: "Timer"}, {text: "Escalation"}, {text: "Link"}, {text: "Error"}, {text: "Compensation"}, {text: "Signal"}, {text: "Multiple"}, {text: "Parallel"}, {text: "Cancel"}, {text: "Conditional"}, {text: "Terminate"}];
        $('#BPMNTriggers').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged",
            cssClass: "BPMNTriggers"
        });

        data = [{text: "None"}, {text: "Exclusive"}, {text: "Inclusive"}, {text: "Parallel"}, {text: "Complex"}, {text: "EventBased"}, {text: "ExclusiveEventBased"}, {text: "ParallelEventBased"}];
        $('#BPMNGateways').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "BPMNGateways"
        });

        data = [{text: "None"}, {text: "Input"}, {text: "Output"}];
        $('#BPMNDataObjects').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "BPMNDataObjects"
        });

        data = [{text: "None"}, {text: "Task"}, {text: "SubProcess"}];
        $('#BPMNActivity').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "BPMNActivity"
        });

        data = [{text: "None"}, {text: "Standard"}, {text: "ParallelMultiInstance"}, {text: "SequenceMultiInstance"}];
        $('#BPMNLoops').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "BPMNLoops"
        });

        data = [{text: "None"}, {text: "Service"}, {text: "Receive"}, {text: "Send"}, {text: "InstantiatingReceive"}, {text: "Manual"}, {text: "BusinessRule"}, {text: "User"}, {text: "Script"}, {text: "Parallel"}];
        $('#BPMNTasks').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "BPMNTasks"
        });

        data = [{text: "None"}, {text: "Transaction"}, {text: "Event"}];
        $('#BPMNSubProcess').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "BPMNSubProcess"
        });

        data = [{text: "Default"}, {text: "Call"}, {text: "Event"}];
        $('#BPMNBoundary').ejDropDownList({
            dataSource: data,
            text: "Default",
            width: "100%", change: "dropDownChanged", cssClass: "BPMNBoundary"
        });

        data = [{text: "Top"}, {text: "Left"}, {text: "Right"}, {text: "Bottom"}];
        $('#BPMNFlows').ejDropDownList({
            dataSource: data,
            text: "Top",
            width: "100%", change: "dropDownChanged", cssClass: "BPMNFlows"
        });

        data = [{text: "None"}, {text: "Compensation"}];
        $('#CompensationShape').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "CompensationShape"
        });

        data = [{text: "None"}, {text: "Call"}];
        $('#TaskCall').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "TaskCall"
        });

        data = [{text: "None"}, {text: "Ad-Hoc"}];
        $('#AddHoc').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "AddHoc"
        });

        data = [{text: "None"}, {text: "Collection"}];
        $('#BPMNCollection').ejDropDownList({
            dataSource: data,
            text: "None",
            width: "100%", change: "dropDownChanged", cssClass: "BPMNCollection"
        });

        //  $("#sampleProperties").ejPropertiesPanel();
        // let diagram = el1.ejDiagram("instance");
    }

}