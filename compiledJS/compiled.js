"use strict";
var _vector;
(function (_vector) {
    function standardise(inVectors, ...moreVectors) {
        if (typeof inVectors === "number") {
            return { x: inVectors, y: inVectors };
        }
        const vectorsAsArray = ((isVectorArray(inVectors)) ? inVectors : [inVectors]);
        const moreVectorsAsArray = ((moreVectors !== undefined) ? moreVectors : []);
        const standardised = (vectorsAsArray.concat(moreVectorsAsArray)).map(inVector => {
            if (_vector.isLVector(inVector)) {
                return { x: inVector.x, y: inVector.y };
            }
            else if (_vector.isUVector(inVector)) {
                return { x: inVector.X, y: inVector.Y };
            }
            else if (inVector instanceof Array && (typeof inVector[0] === "number") && (typeof inVector[1] === "number")) {
                return { x: inVector[0], y: inVector[1] };
            }
            else {
                console.error("IS NOT A VECTOR");
                return { x: NaN, y: NaN };
            }
        });
        if (standardised.length > 1 || isVectorArray(inVectors)) {
            return standardised;
        }
        else {
            return standardised[0];
        }
    }
    _vector.standardise = standardise;
    function isVectorArray(inVectors) {
        return (inVectors instanceof Array &&
            !(typeof inVectors[0] === "number" &&
                typeof inVectors[1] === "number"));
    }
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function sumWithS(inVector) {
        return (...sumVectors) => {
            return _vector.vector(add(inVector, sum(sumVectors)));
        };
    }
    _vector.sumWithS = sumWithS;
    function sumWithM(inVectors) {
        return (...sumVectors) => {
            let b = sum(sumVectors);
            return _vector.vector(inVectors.map(a => {
                return add(a, b);
            }));
        };
    }
    _vector.sumWithM = sumWithM;
    function add(a, b) {
        return {
            x: (a.x || 0) + (b.x || 0),
            y: (a.y || 0) + (b.y || 0)
        };
    }
    function sum(inVectors) {
        let sum = { x: 0, y: 0 };
        inVectors.forEach(inVector => {
            sum = add(sum, inVector);
        });
        return sum;
    }
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function centreWith(inVector) {
        return (...vectors) => {
            let sum = { x: 0, y: 0 };
            let count = 0;
            vectors.forEach(vectorSet => {
                let asArray = vectorSet instanceof Array ? vectorSet : [vectorSet];
                asArray.forEach(vector => {
                    count += 1;
                    sum.x += vector.x;
                    sum.y += vector.y;
                });
            });
            const mean = {
                x: sum.x / count,
                y: sum.y / count
            };
            return _vector.vector(mean);
        };
    }
    _vector.centreWith = centreWith;
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function rotateS(inVector) {
        return (angle) => {
            return _vector.vector(curriedRotate(angle)(inVector));
        };
    }
    _vector.rotateS = rotateS;
    function rotateM(inVectors) {
        return (angle) => {
            return _vector.vector(inVectors.map(curriedRotate(angle)));
        };
    }
    _vector.rotateM = rotateM;
    function curriedRotate(angle) {
        const radians = (Math.PI / 180) * angle;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return (inVector) => {
            return {
                x: (cos * inVector.x) - (sin * inVector.y),
                y: (cos * inVector.y) + (sin * inVector.x)
            };
        };
    }
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function snapToGridS(inVector) {
        return (grid = { x: 10, y: 10 }) => {
            return _vector.vector({
                x: Math.round(inVector.x / (grid.x)) * (grid.x),
                y: Math.round(inVector.y / (grid.y)) * (grid.y)
            });
        };
    }
    _vector.snapToGridS = snapToGridS;
    function snapToGridM(inVectors) {
        return (grid = { x: 10, y: 10 }) => {
            return _vector.vector(inVectors.map(inVector => ({
                x: Math.round(inVector.x / (grid.x)) * (grid.x),
                y: Math.round(inVector.y / (grid.y)) * (grid.y)
            })));
        };
    }
    _vector.snapToGridM = snapToGridM;
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function getAngleTo(inVector) {
        return (compareVector) => {
            return Math.atan2(compareVector.y - inVector.y, compareVector.x - inVector.x) * 180 / Math.PI;
        };
    }
    _vector.getAngleTo = getAngleTo;
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function asPolar(inVector) {
        return () => {
            return {
                radius: Math.sqrt(Math.pow(inVector.x, 2) + Math.pow(inVector.y, 2)),
                angle: Utility.radiansToDegrees(Math.atan2(inVector.y, inVector.x))
            };
        };
    }
    _vector.asPolar = asPolar;
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function isCloseTo(inVector) {
        return (compareVector, boundary = 5) => {
            const vectorXisClose = (Math.abs(inVector.x - compareVector.x) < boundary);
            const vectorYisClose = (Math.abs(inVector.y - compareVector.y) < boundary);
            return (vectorXisClose && vectorYisClose);
        };
    }
    _vector.isCloseTo = isCloseTo;
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function sum(inVectors) {
        return () => {
            let sum = { x: 0, y: 0 };
            inVectors.forEach(inVector => {
                sum.x += inVector.x;
                sum.y += inVector.y;
            });
            return _vector.vector(sum);
        };
    }
    _vector.sum = sum;
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function centre(inVectors) {
        return () => {
            let sum = { x: 0, y: 0 };
            let count = 0;
            inVectors.forEach(inVector => {
                count += 1;
                sum.x += inVector.x;
                sum.y += inVector.y;
            });
            const mean = {
                x: sum.x / count,
                y: sum.y / count
            };
            return _vector.vector(mean);
        };
    }
    _vector.centre = centre;
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    function isVector(inVector) {
        return inVector && (isLVector(inVector) || isUVector(inVector));
    }
    _vector.isVector = isVector;
    function isVectorArray(inVectors) {
        return (inVectors instanceof Array &&
            inVectors.every(isVector));
    }
    _vector.isVectorArray = isVectorArray;
    function isLVector(inVector) {
        return ((typeof inVector.x === 'number') &&
            (typeof inVector.y === 'number'));
    }
    _vector.isLVector = isLVector;
    function isUVector(inVector) {
        return ((typeof inVector.X === 'number') &&
            (typeof inVector.Y === 'number'));
    }
    _vector.isUVector = isUVector;
})(_vector || (_vector = {}));
var _vector;
(function (_vector) {
    const singleExtension = (inVector) => {
        return {
            vector: inVector,
            x: inVector.x,
            y: inVector.y,
            getAngleTo: _vector.getAngleTo(inVector),
            asPolar: _vector.asPolar(inVector),
            isCloseTo: _vector.isCloseTo(inVector),
            sumWith: _vector.sumWithS(inVector),
            scaleWith: _vector.scaleWithS(inVector),
            scaleMap: _vector.scaleMapS(inVector),
            centreWith: _vector.centreWith(inVector),
            rotate: _vector.rotateS(inVector),
            snapToGrid: _vector.snapToGridS(inVector)
        };
    };
    const multiExtension = (inVectors) => {
        return {
            vectors: inVectors,
            sum: _vector.sum(inVectors),
            sumWith: _vector.sumWithM(inVectors),
            scaleWith: _vector.scaleWithM(inVectors),
            rotate: _vector.rotateM(inVectors),
            centre: _vector.centre(inVectors),
            snapToGrid: _vector.snapToGridM(inVectors)
        };
    };
    function vectorFunction(inVectors, ...moreVectors) {
        const vCopy = _vector.standardise(inVectors, ...moreVectors);
        const ext = (vCopy instanceof Array)
            ? multiExtension(vCopy)
            : singleExtension(vCopy);
        return Object.assign({}, ext);
    }
    const vectorObject = {
        sumWith: _vector.sumWithS,
        scaleWith: _vector.scaleWithS,
        getAngleTo: _vector.getAngleTo,
        isCloseTo: _vector.isCloseTo,
        centreWith: _vector.centreWith,
        rotate: _vector.rotateS,
        snapToGrid: _vector.snapToGridS,
        asPolar: _vector.asPolar,
        standardise: _vector.standardise,
        isVector: _vector.isVector,
        isVectorArray: _vector.isVectorArray,
    };
    _vector.vector = Object.assign(vectorFunction, vectorObject);
})(_vector || (_vector = {}));
const vector = _vector.vector;
var SOFTWARE_VERSION = "v25";
$(document).ready(() => {
    NodeElements.init();
    Active.init();
    Ui.init();
    Circuit.Mappings.init();
});
var Active;
(function (Active) {
    function init() {
        Active.layout = new Circuit.Parts.Diagram(NodeElements.layoutContainer);
        $(Active.layout.root.group.element).addClass("layout");
        Active.schematic = new Circuit.Parts.Diagram(NodeElements.schematicContainer);
        $(Active.schematic.root.group.element).addClass("schematic");
    }
    Active.init = init;
})(Active || (Active = {}));
var Constants;
(function (Constants) {
    Constants.gridSpacing = 20;
    Constants.svgURI = "http://www.w3.org/2000/svg";
    Constants.schematicManipulationEnabled = false;
})(Constants || (Constants = {}));
var NodeElements;
(function (NodeElements) {
    function init() {
        NodeElements.fileInput = $("input#fileInput")[0];
        NodeElements.fileSave = $("input#fileSave")[0];
        NodeElements.fileStatusText = $("p#fileStatusText")[0];
        NodeElements.stripboardRows = $("input#stripboardRows")[0];
        NodeElements.stripboardColumns = $("input#stripboardColumns")[0];
        NodeElements.boardDraggingDisabled = $("input#boardDraggingDisabled")[0];
        NodeElements.checkCircuitButton = $("input#checkCircuitButton")[0];
        NodeElements.checkShowCorrect = $("input#checkShowCorrect")[0];
        NodeElements.checkShowIncorrect = $("input#checkShowIncorrect")[0];
        NodeElements.checkStatusText = $("p#checkStatusText")[0];
        NodeElements.layoutContainer = $("div#layoutContainer")[0];
        NodeElements.schematicContainer = $("div#schematicContainer")[0];
    }
    NodeElements.init = init;
})(NodeElements || (NodeElements = {}));
var _vector;
(function (_vector) {
    function scaleWithS(inVector) {
        return (scaleIn) => {
            const scaleVector = (typeof scaleIn === "number") ? { x: scaleIn, y: scaleIn } : scaleIn;
            return _vector.vector(scale(inVector, scaleVector));
        };
    }
    _vector.scaleWithS = scaleWithS;
    function scaleMapS(inVector) {
        return (scaleIns) => {
            return _vector.vector(scaleIns.map(scaleIn => {
                const scaleVector = (typeof scaleIn === "number") ? { x: scaleIn, y: scaleIn } : scaleIn;
                return scale(inVector, scaleVector);
            }));
        };
    }
    _vector.scaleMapS = scaleMapS;
    function scaleWithM(inVectors) {
        return (scaleIn) => {
            const scaleVector = (typeof scaleIn === "number") ? { x: scaleIn, y: scaleIn } : scaleIn;
            return _vector.vector(inVectors.map(a => {
                return scale(a, scaleVector);
            }));
        };
    }
    _vector.scaleWithM = scaleWithM;
    function scale(a, b) {
        let bV = {
            x: ((b.x !== undefined) ? b.x : 1),
            y: ((b.y !== undefined) ? b.y : 1)
        };
        return {
            x: a.x * bV.x,
            y: a.y * bV.y
        };
    }
})(_vector || (_vector = {}));
var Utility;
(function (Utility) {
    Utility.is = (check) => (test) => test === check;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    ;
    function validateType(test, fallback) {
        const predicate = ((typeof test === "string")
            ? (v) => typeof v === test
            : (test instanceof Array)
                ? (v) => test.some(Utility.is(v))
                : test);
        const validator = (value, log = false) => {
            if (predicate(value)) {
                if (log) {
                    console.log(`Value '%o' passed test '%o`, value, test);
                }
                return value;
            }
            else {
                if (log) {
                    console.log(`Validation failure, value '%o' did not pass test '%o',
                fallback '%o' used.`, value, test, fallback);
                }
                return fallback;
            }
        };
        return validator;
    }
    Utility.validateType = validateType;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    function testType(test) {
        const predicate = ((typeof test === "string")
            ? (v) => typeof v === test
            : (test instanceof Array)
                ? (v) => test.some(Utility.is(v))
                : test);
        return predicate;
    }
    Utility.testType = testType;
})(Utility || (Utility = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var ValueCheck;
        (function (ValueCheck) {
            ValueCheck.test = Utility.testType;
            ValueCheck.validate = Utility.validateType;
            const integerTest = (n) => ValueCheck.test("number")(n) && Number.isInteger(n);
            function integer(fallback) {
                const result = (value, log = false) => {
                    return ValueCheck.validate(integerTest, fallback)(value, log);
                };
                return result;
            }
            ValueCheck.integer = integer;
            function where(fallback) {
                const result = (value, log = false) => {
                    const anyVector = ValueCheck.validate(vector.isVector, fallback)(value, log);
                    return vector.standardise(anyVector);
                };
                return result;
            }
            ValueCheck.where = where;
            function joints(fallback, lengthTest = l => l === fallback.length) {
                const jointTest = (value) => vector.isVectorArray(value) && lengthTest(value.length);
                const result = (value, log = false) => {
                    const anyVectors = ValueCheck.validate(jointTest, fallback)(value, log);
                    return vector.standardise(anyVectors);
                };
                return result;
            }
            ValueCheck.joints = joints;
            const maxValidCSSColorLength = 25;
            const colorTest = (s) => ValueCheck.test("string")(s) && s.length <= maxValidCSSColorLength;
            function color(fallback) {
                const result = (value, log = false) => {
                    return ValueCheck.validate(colorTest, fallback)(value, log);
                };
                return result;
            }
            ValueCheck.color = color;
        })(ValueCheck = Component.ValueCheck || (Component.ValueCheck = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        let Types;
        (function (Types) {
            ;
            ;
            ;
            ;
        })(Types = Component.Types || (Component.Types = {}));
        class Instance {
            constructor(values) {
                this.group = Svg.Element.Group.make();
                this.connectorSets = [];
                this.name = values.name;
                this.disabled = values.disabled || false;
            }
        }
        Component.Instance = Instance;
        function getMaker(instanceClass, defaulter, initialiser) {
            return (partialValues, log = true) => {
                if (log) {
                    console.groupCollapsed("Loading...");
                }
                const values = loadObjectWithDefaults(defaulter, partialValues, log);
                if (log) {
                    console.groupEnd();
                }
                const component = new instanceClass(values);
                if (initialiser)
                    initialiser(component);
                component.draw();
                component.makeConnectors();
                if (log) {
                    console.groupCollapsed("%s: %o", component.name, component.group.element);
                    console.log(component);
                    console.groupEnd();
                }
                $(component.group.element).addClass(component.name);
                return component;
            };
        }
        Component.getMaker = getMaker;
        function loadObjectWithDefaults(defaulter, partial, log = true) {
            const result = Object.keys(defaulter).reduce((acc, key) => {
                if (log) {
                    console.group(key);
                }
                const defaultFn = defaulter[key];
                const partialValue = (partial) ? partial[key] : undefined;
                acc[key] = defaultFn(partialValue, log);
                if (log) {
                    console.groupEnd();
                }
                return acc;
            }, {});
            return result;
        }
        function makeMap(map, correspondsTo) {
            return Object.assign(map, { correspondsTo });
        }
        Component.makeMap = makeMap;
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Events;
    (function (Events) {
        Events.rotate = "rotate";
        Events.drag = "dragSVG";
        Events.dragStart = "dragstart";
        Events.dragStop = "dragstop";
        Events.moved = [Events.rotate, Events.drag, Events.dragStart, Events.dragStop].join(" ");
        Events.place = "place";
        Events.select = "svgSelect";
        Events.deselect = "svgDeselect";
        Events.draw = "draw";
    })(Events = Circuit.Events || (Circuit.Events = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var _History;
    (function (_History) {
        function init(...participants) {
            const events = [];
            const currentIdx = -1, lastIdx = -1;
            return _History.addEvent({ events, currentIdx, lastIdx }, ...participants);
        }
        _History.init = init;
    })(_History = Circuit._History || (Circuit._History = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var _History;
    (function (_History) {
        function addEvent(state, ...participants) {
            const currentIdx = state.currentIdx + 1, lastIdx = currentIdx;
            const previousEvents = state.events.slice(0, lastIdx);
            const newEvent = participants.map(participant => ({
                participant,
                state: participant.getState()
            }));
            const events = [...previousEvents, newEvent];
            return { events, currentIdx, lastIdx };
        }
        _History.addEvent = addEvent;
    })(_History = Circuit._History || (Circuit._History = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var _History;
    (function (_History) {
        function undoEvent(state) {
            if (state.currentIdx <= 0)
                return state;
            const currentEvent = state.events[state.currentIdx];
            const redoEvent = currentEvent.map(development => development.participant).map(participant => ({
                participant,
                state: participant.getState()
            }));
            currentEvent.forEach(development => {
                Object.assign(development.participant, development.state);
                if (development.participant.group) {
                    $(development.participant.group.element).trigger(Circuit.Events.draw);
                }
            });
            const previousEvents = state.events.slice(0, state.currentIdx);
            const nextEvents = state.events.slice(state.currentIdx + 1);
            const events = [...previousEvents, redoEvent, ...nextEvents];
            const currentIdx = state.currentIdx - 1;
            return { events, currentIdx, lastIdx: state.lastIdx };
        }
        _History.undoEvent = undoEvent;
    })(_History = Circuit._History || (Circuit._History = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var _History;
    (function (_History) {
        function redoEvent(state) {
            if (state.currentIdx >= state.lastIdx)
                return state;
            const currentIdx = state.currentIdx + 1;
            const currentEvent = state.events[state.currentIdx];
            const undoEvent = currentEvent.map(development => development.participant).map(participant => ({
                participant,
                state: participant.getState()
            }));
            currentEvent.forEach(development => {
                Object.assign(development.participant, development.state);
                if (development.participant.group) {
                    $(development.participant.group.element).trigger(Circuit.Events.draw);
                }
            });
            const previousEvents = state.events.slice(0, state.currentIdx);
            const nextEvents = state.events.slice(state.currentIdx + 1);
            const events = [...previousEvents, undoEvent, ...nextEvents];
            return { events, currentIdx, lastIdx: state.lastIdx };
        }
        _History.redoEvent = redoEvent;
    })(_History = Circuit._History || (Circuit._History = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var _History;
    (function (_History) {
        function mergeEvents(state, mergeCount) {
            const mergeStartIdx = Math.max(0, state.lastIdx - mergeCount);
            const eventsToMerge = state.events.slice(mergeStartIdx);
            const previousEvents = state.events.slice(0, mergeStartIdx);
            const mergedEvent = [];
            eventsToMerge.forEach(event => {
                event.forEach(dev => {
                    if (!mergedEvent.some(mDev => mDev.participant === dev.participant)) {
                        mergedEvent.push(dev);
                    }
                });
            });
            const events = [...previousEvents, mergedEvent];
            const lastIdx = mergeStartIdx;
            const currentIdx = (state.currentIdx > state.lastIdx)
                ? state.lastIdx
                : state.currentIdx;
            return { events, currentIdx, lastIdx };
        }
        _History.mergeEvents = mergeEvents;
    })(_History = Circuit._History || (Circuit._History = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var _History;
    (function (_History) {
        function factory(...initialParticipants) {
            let state = _History.init(...initialParticipants);
            return {
                reInit(...participants) {
                    state = _History.init(...participants);
                },
                addEvent(...participants) {
                    state = _History.addEvent(state, ...participants);
                },
                undo() {
                    state = _History.undoEvent(state);
                },
                redo() {
                    state = _History.redoEvent(state);
                },
                mergeLast(mergeCount = 1) {
                    state = _History.mergeEvents(state, mergeCount);
                },
                getState() {
                    return Object.assign({}, state, { events: [...state.events] });
                }
            };
        }
        _History.factory = factory;
    })(_History = Circuit._History || (Circuit._History = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    Circuit.historyFactory = Circuit._History.factory;
    Circuit.history = Circuit.historyFactory();
})(Circuit || (Circuit = {}));
var Utility;
(function (Utility) {
    var Curry;
    (function (Curry) {
        function makeOptional(fn) {
            function curried(A, B) {
                if (B !== undefined) {
                    return fn(A, B);
                }
                else {
                    return (B) => fn(A, B);
                }
            }
            return curried;
        }
        Curry.makeOptional = makeOptional;
    })(Curry = Utility.Curry || (Utility.Curry = {}));
})(Utility || (Utility = {}));
var Circuit;
(function (Circuit) {
    Circuit.manifest = (() => {
        const clear = () => {
            Circuit.manifest.layout = Circuit.manifest.layout.filter(component => {
                component.group.element.remove();
                return false;
            });
            Circuit.manifest.schematic = Circuit.manifest.schematic.filter(component => {
                component.group.element.remove();
                return false;
            });
            $(Active.layout.root.element).children().remove();
            $(Active.schematic.root.element).children().remove();
        };
        let activeBoard;
        const constructFrom = (savedManifest) => {
            Circuit.manifest.clear();
            Circuit.manifest.schematic = savedManifest.schematic;
            Circuit.manifest.layout = savedManifest.layout;
            if (!savedManifest.layout || savedManifest.layout.length === 0)
                completeManifestLayout();
            Circuit.manifest.activeBoard = Circuit.manifest.layout.find(component => Circuit.mappings.getComponentMapSafe(component).isBoard === true);
            draw();
        };
        const addComponent = (manifestSection, ...components) => {
            let diagram;
            if (manifestSection === Circuit.manifest.schematic) {
                diagram = Active.schematic;
            }
            else {
                diagram = Active.layout;
            }
            components.forEach(component => component.disabled = true);
            Circuit.history.addEvent(Circuit.manifest, ...components);
            components.forEach(component => {
                component.disabled = false;
                manifestSection.push(component);
                placeComponent(component, diagram);
            });
        };
        const placeComponent = (component, diagram) => {
            component.insertInto(diagram.root.group.element);
            $(component.group.element).trigger(Circuit.Events.place);
        };
        const draw = () => {
            Circuit.manifest.schematic.forEach(component => placeComponent(component, Active.schematic));
            Circuit.manifest.layout.forEach(component => placeComponent(component, Active.layout));
        };
        const removeComponent = (...components) => {
            Circuit.history.addEvent(Circuit.manifest, ...components);
            Circuit.manifest.layout = Circuit.manifest.layout.filter(el => !components.includes(el));
            Circuit.manifest.schematic = Circuit.manifest.schematic.filter(el => !components.includes(el));
            components.forEach(component => {
                $(component.group.element).hide();
                component.disabled = true;
            });
        };
        const findCorresponding = (component) => {
            if (!Circuit.mappings.getComponentMapSafe(component).correspondsTo)
                return [];
            if (Circuit.manifest.layout.includes(component)) {
                return Circuit.manifest.schematic.filter(areComponentsSimilar(component));
            }
            else if (Circuit.manifest.schematic.includes(component)) {
                return Circuit.manifest.layout.filter(areComponentsSimilar(component));
            }
            else {
                return [];
            }
        };
        const checkAll = () => {
            console.groupCollapsed("Check Data");
            let layComponents = Circuit.manifest.layout.filter(c => Circuit.mappings.getComponentMapSafe(c).correspondsTo);
            let schComponents = Circuit.manifest.schematic.filter(c => Circuit.mappings.getComponentMapSafe(c).correspondsTo);
            let schConnectorData = schComponents.map(schComponent => ({
                component: schComponent,
                connectorSets: getMinConnections(schComponent)
            }));
            let split = Utility.split(layComponents, (layComponent) => {
                if (schConnectorData.length === 0)
                    return false;
                let layConnectorSets = getMinConnections(layComponent);
                let schConnectorMinData = schConnectorData.filter(datum => areComponentsSimilar(layComponent)(datum.component));
                const componentIsUnique = Circuit.mappings.getComponentMapSafe(layComponent).isUnique;
                if (componentIsUnique) {
                    let merged = mergeConnectorsSets(schConnectorMinData.map(datum => datum.connectorSets));
                    schConnectorMinData.forEach(datum => {
                        datum.connectorSets = merged;
                    });
                }
                let found = schConnectorMinData.filter(datum => connectorSetsHaveMatch(layConnectorSets, datum.connectorSets));
                if (componentIsUnique) {
                    schConnectorData = schConnectorData.filter(datum => !found.includes(datum));
                    console.log("Layout %s '%o, matched with '%o'", layComponent.name, [layComponent], found);
                }
                else {
                    schConnectorData = schConnectorData.filter(datum => datum !== found[0]);
                    console.log("Layout %s '%o, matched with '%o'", layComponent.name, [layComponent], [found[0]]);
                }
                return found.length > 0;
            });
            console.log("Unmatched schematic components: %o", schConnectorData.map(datum => datum.component));
            console.log("Unmatched layout components: %o", split.fails);
            console.groupEnd();
            return {
                corrects: split.passes,
                incorrects: split.fails
            };
        };
        const getState = () => {
            return {
                schematic: [...Circuit.manifest.schematic],
                layout: [...Circuit.manifest.layout],
                activeBoard: Circuit.manifest.activeBoard
            };
        };
        return {
            schematic: [],
            layout: [],
            addComponent: addComponent,
            constructFrom: constructFrom,
            removeComponent: removeComponent,
            findCorresponding: findCorresponding,
            checkAll: checkAll,
            activeBoard: activeBoard,
            getState: getState,
            clear: clear
        };
    })();
    const arePropertiesEqual = Utility.Curry.makeOptional((A, B) => {
        let Akeys = Object.keys(A);
        let Bkeys = Object.keys(B);
        return ((Akeys.length === Bkeys.length) &&
            Akeys.every(key => {
                return (B.hasOwnProperty(key) && A[key] === B[key]);
            }));
    });
    const areComponentsSimilar = Utility.Curry.makeOptional((componentA, componentB) => {
        return (componentA.name === componentB.name &&
            arePropertiesEqual(componentA.getProperties(), componentB.getProperties()));
    });
    const createMissingLayoutElements = () => {
        let layoutCopy = Circuit.manifest.layout.slice();
        Circuit.manifest.schematic.forEach(schematicElement => {
            let properties = schematicElement.getProperties();
            let match = layoutCopy.find(layoutElement => arePropertiesEqual(properties, layoutElement.getProperties()));
            if (match) {
                if (!Circuit.mappings.getComponentMapSafe(match).isUnique) {
                    layoutCopy = layoutCopy.filter(Utility.is(match));
                }
            }
            else {
                const correspondsTo = Circuit.mappings.getComponentMapSafe(schematicElement).correspondsTo;
                if (correspondsTo !== undefined) {
                    const newComponentMaker = correspondsTo.make;
                    const newComponent = newComponentMaker(schematicElement.getProperties());
                    Circuit.manifest.layout.push(newComponent);
                    if (Circuit.mappings.getComponentMapSafe(newComponent).isUnique) {
                        layoutCopy.push(newComponent);
                    }
                }
            }
        });
    };
    const mergeSingleOpAmps = () => {
        let layoutOpAmps = Circuit.manifest.layout.filter(layoutElement => (layoutElement["constructor"] === Circuit.Component.opAmp.layout.instance));
        let opAmpGroups = [];
        layoutOpAmps.forEach((opAmp, i) => {
            let groupIdx = opAmpGroups.findIndex(group => arePropertiesEqual(opAmp.getProperties(), group[0].getProperties()));
            if (groupIdx >= 0) {
                opAmpGroups[groupIdx].push(opAmp);
            }
            else {
                opAmpGroups.push([opAmp]);
            }
        });
        opAmpGroups.forEach(group => {
            while (group.length >= 2) {
                group[0].replaceWithDual();
                Circuit.manifest.removeComponent(group[1]);
                group = group.splice(2);
            }
        });
    };
    const completeManifestLayout = () => {
        createMissingLayoutElements();
        mergeSingleOpAmps();
    };
    const mergeConnectorSets = (connectorSets) => {
        return connectorSets.reduce((mergedConnectorSet, connectorSet) => {
            connectorSet.forEach(connector => {
                let found = mergedConnectorSet.find((mConnector) => mConnector.name === connector.name);
                if (found) {
                    found.connections.push(...connector.connections);
                }
                else {
                    mergedConnectorSet.push(connector);
                }
            });
            return mergedConnectorSet;
        });
    };
    const mergeConnectorsSets = (connectorSetGroups) => {
        return connectorSetGroups.reduce((mergedConnectorSetGroup, connectorSetGroup) => {
            connectorSetGroup.forEach((connectorSet, i) => {
                mergedConnectorSetGroup[i] = mergeConnectorSets([(mergedConnectorSetGroup[i] || []), connectorSet]);
            });
            return mergedConnectorSetGroup;
        });
    };
    const getMinConnections = (component) => {
        return (component.getConnections().map(connectorSet => {
            return (connectorSet.map(connections => {
                let connectorName = connections[0].name;
                connections.shift();
                let blackHole = connections.find(connection => Circuit.mappings.getComponentMapSafe(connection.component).isUnique === true);
                if (blackHole)
                    connections = connections.filter(Utility.is(blackHole));
                return {
                    name: connectorName,
                    connections: connections.filter((connection) => Circuit.mappings.getComponentMapSafe(connection.component).correspondsTo)
                };
            })).filter(c => c.connections.length !== 0);
        }));
    };
    const connectorSetsHaveMatch = Utility.Curry.makeOptional((connectorSetsA, connectorSetsB) => {
        return connectorSetsA.some(connectorSetA => {
            return connectorSetsB.some(connectorSetMatch(connectorSetA));
        });
    });
    const connectorSetMatch = Utility.Curry.makeOptional((connectorSetA, connectorSetB) => {
        return Utility.isUnaryMap(connectorSetA, connectorSetB, (connectorA, connectorB) => {
            if (connectorA.name !== connectorB.name)
                return false;
            const connectionsA = connectorA.connections;
            const connectionsB = connectorB.connections;
            return Utility.isUnaryMap(connectionsA, connectionsB, (connectionA, connectionB) => {
                return (connectionA.name === connectionB.name
                    && areComponentsSimilar(connectionA.component, connectionB.component));
            });
        });
    });
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    const mappingsBuilder = (() => {
        const componentMaps = Utility.tuple(Circuit.Component.wire.schematic, Circuit.Component.resistor.schematic, Circuit.Component.capacitor.schematic, Circuit.Component.inductor.schematic, Circuit.Component.diode.schematic, Circuit.Component.opAmp.schematic, Circuit.Component.power.schematic, Circuit.Component.bipolar.schematic, Circuit.Component.wire.layout, Circuit.Component.resistor.layout, Circuit.Component.capacitor.layout, Circuit.Component.inductor.layout, Circuit.Component.diode.layout, Circuit.Component.opAmp.layout, Circuit.Component.power.layout, Circuit.Component.bipolar.layout, Circuit.Component.stripboard.layout, Circuit.Component.breadboard.layoutSmall, Circuit.Component.breadboard.layoutLarge, Circuit.Component.track);
        function getComponentMapSafe(data) {
            const result = (typeof data === "string")
                ? componentMaps.find(map => map.savename === data)
                : componentMaps.find(map => map.instance === data["constructor"]);
            if (result !== undefined) {
                return result;
            }
            else {
                console.error("Component map not found with data %o", data);
                throw new Error("Component map does not exist!");
            }
        }
        function getComponentMap(data) {
            return (typeof data === "string")
                ? componentMaps.find(map => map.savename === data)
                : componentMaps.find(map => map.instance === data["constructor"]);
        }
        const connectorAcceptedTypes = {
            "pin": ["hole"],
            "hole": ["pin"],
            "brokenhole": [],
            "node": ["node"],
        };
        return {
            getComponentMap: getComponentMap,
            getComponentMapSafe: getComponentMapSafe,
            connectorAcceptedTypes: connectorAcceptedTypes,
        };
    });
    let Mappings;
    (function (Mappings) {
        function init() {
            Circuit.mappings = mappingsBuilder();
        }
        Mappings.init = init;
    })(Mappings = Circuit.Mappings || (Circuit.Mappings = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        $(this.group.element).addClass("component " + this.name);
                        this.joints = values.joints;
                        this.type = values.type;
                        this.currentGain = values.currentGain;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            currentGain: this.currentGain,
                            type: this.type
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    draw() {
                        this.group.prepend(_Bipolar.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.schematic);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "emitter", "node", this.joints[_Bipolar.INDEXEMITTER], "e"),
                                Component.Generics.makeConnector(this, "collector", "node", this.joints[_Bipolar.INDEXCOLLECTOR], "c"),
                                Component.Generics.makeConnector(this, "base", "node", this.joints[_Bipolar.INDEXBASE], "b")
                            ]];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Bipolar.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "emitter", "pin", this.joints[_Bipolar.INDEXEMITTER], "e"),
                                Component.Generics.makeConnector(this, "collector", "pin", this.joints[_Bipolar.INDEXCOLLECTOR], "c"),
                                Component.Generics.makeConnector(this, "base", "pin", this.joints[_Bipolar.INDEXBASE], "b")
                            ]];
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Bipolar.Classes || (_Bipolar.Classes = {}));
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            const defaulterSchematic = {
                name: Component.ValueCheck.validate("string", "bipolar"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: -50, y: 0 }, { x: +10, y: -50 }, { x: +10, y: +50 }]),
                currentGain: Component.ValueCheck.validate("number", 0),
                type: Component.ValueCheck.validate(["NPN", "PNP"], "NPN")
            };
            _Bipolar.makeSchematic = Component.getMaker(_Bipolar.Classes.Schematic, defaulterSchematic, (component) => {
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, false);
                Component.Addins.Graphical.init(component);
                if (Constants.schematicManipulationEnabled) {
                    Component.Addins.Draggable.init(component);
                    Component.Addins.Extendable.init(component);
                }
            });
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            _Bipolar.loadSchematic = (raw) => {
                const name = (raw.name);
                const currentGain = (raw.currentGain);
                const type = (raw.type);
                const orientation = Component.ValueCheck.validate(["LR", "RL"], "LR")(raw.orientation);
                const where = Component.ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(orientation, type, where));
                return _Bipolar.makeSchematic({ name, currentGain, type, joints });
            };
            const deriveJoints = (orientation, type, where) => {
                const [emitter, collector] = type === "PNP"
                    ? [{ x: 0, y: -50 }, { x: 0, y: +50 }]
                    : [{ x: 0, y: +50 }, { x: 0, y: -50 }];
                const [base, offset] = orientation === "LR"
                    ? [{ x: -60, y: 0 }, { x: +10 }]
                    : [{ x: +60, y: 0 }, { x: -10 }];
                return vector([emitter, collector, base]).sumWith(where, offset).vectors;
            };
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            const defaulterLayout = {
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 20, y: -20 }, { x: 40, y: 0 }]),
                disabled: Component.ValueCheck.validate("boolean", false),
                name: Component.ValueCheck.validate("string", "bipolar"),
                currentGain: Component.ValueCheck.validate("number", 0),
                type: Component.ValueCheck.validate(["NPN", "PNP"], "NPN")
            };
            _Bipolar.makeLayout = Component.getMaker(_Bipolar.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.Extendable.init(component);
                Component.Addins.ConnectionHighlights.init(component);
            });
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            _Bipolar.loadLayout = (raw) => {
                const name = (raw.name);
                const currentGain = (raw.currentGain);
                const type = (raw.type);
                const joints = (raw.joints);
                return _Bipolar.makeLayout({ name, currentGain, type, joints });
            };
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeBipolar",
            diagramType: "schematic",
            instance: Component._Bipolar.Classes.Schematic,
            make: Component._Bipolar.makeSchematic,
            load: Component._Bipolar.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutBipolar",
            diagramType: "layout",
            instance: Component._Bipolar.Classes.Layout,
            make: Component._Bipolar.makeLayout,
            load: Component._Bipolar.loadLayout,
        };
        Component.bipolar = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.tracks = [];
                        this.connectorSets = [];
                        this.joints = values.joints;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    makeConnectors() { }
                    insertInto(element) {
                        Utility.Insert.first(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                }
                class Small extends Base {
                    draw() {
                        this.tracks = _Breadboard.makeTracks(this, "small");
                        this.group.prepend(_Breadboard.drawSmall(this), this.tracks.map(t => t.group));
                    }
                }
                Classes.Small = Small;
                class Large extends Base {
                    draw() {
                        this.tracks = _Breadboard.makeTracks(this, "large");
                        this.group.prepend(_Breadboard.drawLarge(this), this.tracks.map(t => t.group));
                    }
                }
                Classes.Large = Large;
            })(Classes = _Breadboard.Classes || (_Breadboard.Classes = {}));
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            const defaulterSmall = {
                name: Component.ValueCheck.validate("string", "breadboardsmall"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
            };
            _Breadboard.makeSmall = Component.getMaker(_Breadboard.Classes.Small, defaulterSmall, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Board.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.WireCreation.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Rotatable.init(component);
            });
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            _Breadboard.loadSmall = (raw) => {
                const name = (raw.name);
                const joints = (raw.joints);
                return _Breadboard.makeSmall({ name, joints });
            };
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            const defaulterLarge = {
                name: Component.ValueCheck.validate("string", "breadboardlarge"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
            };
            _Breadboard.makeLarge = Component.getMaker(_Breadboard.Classes.Large, defaulterLarge, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Board.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.WireCreation.init(component);
                Component.Addins.Draggable.init(component);
            });
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            _Breadboard.loadLarge = (raw) => {
                const name = (raw.name);
                const joints = (raw.joints);
                return _Breadboard.makeLarge({ name, joints });
            };
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const smallMap = {
            savename: "makeLayoutBreadboardSmall",
            diagramType: "layout",
            instance: Component._Breadboard.Classes.Small,
            make: Component._Breadboard.makeSmall,
            load: Component._Breadboard.loadSmall,
            isBoard: true
        };
        const largeMap = {
            savename: "makeLayoutBreadboardLarge",
            diagramType: "layout",
            instance: Component._Breadboard.Classes.Large,
            make: Component._Breadboard.makeLarge,
            load: Component._Breadboard.loadLarge,
            isBoard: true
        };
        Component.breadboard = {
            layoutSmall: Component.makeMap(smallMap),
            layoutLarge: Component.makeMap(largeMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.capacitance = values.capacitance;
                        this.isPolarised = values.isPolarised;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            capacitance: this.capacitance,
                            isPolarised: this.isPolarised
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    draw() {
                        this.group.prepend(_Capacitor.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.schematic);
                    }
                    makeConnectors() {
                        if (this.isPolarised) {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "cathode", "node", this.joints[_Capacitor.INDEXCATHODE], "-"),
                                    Component.Generics.makeConnector(this, "anode", "node", this.joints[_Capacitor.INDEXANODE], "+"),
                                ]];
                        }
                        else {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "", "node", this.joints[_Capacitor.INDEXCATHODE]),
                                    Component.Generics.makeConnector(this, "", "node", this.joints[_Capacitor.INDEXANODE]),
                                ]];
                        }
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Capacitor.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                    makeConnectors() {
                        if (this.isPolarised) {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "cathode", "pin", this.joints[_Capacitor.INDEXCATHODE], "-"),
                                    Component.Generics.makeConnector(this, "anode", "pin", this.joints[_Capacitor.INDEXANODE], "+"),
                                ]];
                        }
                        else {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "", "pin", this.joints[_Capacitor.INDEXCATHODE]),
                                    Component.Generics.makeConnector(this, "", "pin", this.joints[_Capacitor.INDEXANODE]),
                                ]];
                        }
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Capacitor.Classes || (_Capacitor.Classes = {}));
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            const defaulterSchematic = {
                name: Component.ValueCheck.validate("string", "capacitor"),
                disabled: Component.ValueCheck.validate("boolean", false),
                isPolarised: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
                capacitance: Component.ValueCheck.validate("number", 0)
            };
            _Capacitor.makeSchematic = Component.getMaker(_Capacitor.Classes.Schematic, defaulterSchematic, (component) => {
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, false);
                Component.Addins.Graphical.init(component);
                if (Constants.schematicManipulationEnabled) {
                    Component.Addins.Draggable.init(component);
                    Component.Addins.Extendable.init(component);
                }
            });
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            _Capacitor.loadSchematic = (raw) => {
                const name = (raw.name);
                const capacitance = (raw.capacitance || raw.value);
                const isPolarised = (raw.isPolarised || derivePolarisation(capacitance, raw.polarised));
                const orientations = ["LR", "RL", "UD", "DU"];
                const orientation = Component.ValueCheck.validate(orientations, "LR")(raw.orientation);
                const where = Component.ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(orientation, where));
                return _Capacitor.makeSchematic({ name, capacitance, isPolarised, joints });
            };
            const derivePolarisation = (capacitance, polarisation) => {
                const isPolarValid = Component.ValueCheck.test(["polar", "non-polar"]);
                return isPolarValid(polarisation) ? polarisation === "polar" : (capacitance > 1e-6);
            };
            const deriveJoints = (orientation, where) => {
                const baseJoints = ({
                    LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
                    UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
                    RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
                    DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
                })[orientation];
                return vector(baseJoints).sumWith(where).vectors;
            };
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            const defaulterLayout = {
                name: Component.ValueCheck.validate("string", "capacitor"),
                disabled: Component.ValueCheck.validate("boolean", false),
                isPolarised: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 80, y: 0 }]),
                capacitance: Component.ValueCheck.validate("number", 0)
            };
            _Capacitor.makeLayout = Component.getMaker(_Capacitor.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.Extendable.init(component);
                Component.Addins.ConnectionHighlights.init(component);
            });
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            _Capacitor.loadLayout = (raw) => {
                const name = (raw.name);
                const capacitance = (raw.capacitance);
                const isPolarised = (raw.isPolarised);
                const joints = (raw.joints);
                return _Capacitor.makeLayout({ name, capacitance, isPolarised, joints });
            };
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeCapacitor",
            diagramType: "schematic",
            instance: Component._Capacitor.Classes.Schematic,
            make: Component._Capacitor.makeSchematic,
            load: Component._Capacitor.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutCapacitor",
            diagramType: "layout",
            instance: Component._Capacitor.Classes.Layout,
            make: Component._Capacitor.makeLayout,
            load: Component._Capacitor.loadLayout,
        };
        Component.capacitor = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.saturationCurrent = values.saturationCurrent;
                        this.breakdownVoltage = values.breakdownVoltage;
                        this.color = values.color;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            breakdownVoltage: this.breakdownVoltage,
                            saturationCurrent: this.saturationCurrent,
                            color: this.color
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    draw() {
                        this.group.prepend(_Diode.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.schematic);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "anode", "node", this.joints[_Diode.INDEXANODE], "+"),
                                Component.Generics.makeConnector(this, "cathode", "node", this.joints[_Diode.INDEXCATHODE], "-"),
                            ]];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Diode.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "anode", "pin", this.joints[_Diode.INDEXANODE], "+"),
                                Component.Generics.makeConnector(this, "cathode", "pin", this.joints[_Diode.INDEXCATHODE], "-"),
                            ]];
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Diode.Classes || (_Diode.Classes = {}));
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            const defaulterSchematic = {
                name: Component.ValueCheck.validate("string", "diode"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
                breakdownVoltage: Component.ValueCheck.validate("number", 0),
                saturationCurrent: Component.ValueCheck.validate("number", 0),
                color: Component.ValueCheck.color("N/A")
            };
            _Diode.makeSchematic = Component.getMaker(_Diode.Classes.Schematic, defaulterSchematic, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, false);
                if (Constants.schematicManipulationEnabled) {
                    Component.Addins.Draggable.init(component);
                    Component.Addins.Extendable.init(component);
                }
            });
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            _Diode.loadSchematic = (raw) => {
                const name = (raw.name);
                const breakdownVoltage = (raw.breakdownVoltage);
                const saturationCurrent = (raw.saturationCurrent);
                const color = (raw.color || raw.colour);
                const orientations = ["LR", "RL", "UD", "DU"];
                const orientation = Component.ValueCheck.validate(orientations, "LR")(raw.orientation);
                const where = Component.ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(orientation, where));
                return _Diode.makeSchematic({ name, breakdownVoltage, saturationCurrent, color, joints });
            };
            const deriveJoints = (orientation, where) => {
                const baseJoints = ({
                    LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
                    UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
                    RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
                    DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
                })[orientation];
                return vector(baseJoints).sumWith(where).vectors;
            };
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            const defaulterLayout = {
                name: Component.ValueCheck.validate("string", "diode"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 80, y: 0 }]),
                breakdownVoltage: Component.ValueCheck.validate("number", 0),
                saturationCurrent: Component.ValueCheck.validate("number", 0),
                color: Component.ValueCheck.color("N/A")
            };
            _Diode.makeLayout = Component.getMaker(_Diode.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Extendable.init(component);
                Component.Addins.ConnectionHighlights.init(component);
            });
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            _Diode.loadLayout = (raw) => {
                const name = (raw.name);
                const breakdownVoltage = (raw.breakdownVoltage);
                const saturationCurrent = (raw.saturationCurrent);
                const color = (raw.color);
                const joints = (raw.joints);
                return _Diode.makeLayout({ name, breakdownVoltage, saturationCurrent, color, joints });
            };
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeDiode",
            diagramType: "schematic",
            instance: Component._Diode.Classes.Schematic,
            make: Component._Diode.makeSchematic,
            load: Component._Diode.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutDiode",
            diagramType: "layout",
            instance: Component._Diode.Classes.Layout,
            make: Component._Diode.makeLayout,
            load: Component._Diode.loadLayout,
        };
        Component.diode = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Inductor;
        (function (_Inductor) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.inductance = values.inductance;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            inductance: this.inductance,
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    draw() {
                        this.group.prepend(_Inductor.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.schematic);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "node", this.joints[_Inductor.INDEXEND1]),
                                Component.Generics.makeConnector(this, "", "node", this.joints[_Inductor.INDEXEND2]),
                            ]];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Inductor.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "pin", this.joints[_Inductor.INDEXEND1]),
                                Component.Generics.makeConnector(this, "", "pin", this.joints[_Inductor.INDEXEND2]),
                            ]];
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Inductor.Classes || (_Inductor.Classes = {}));
        })(_Inductor = Component._Inductor || (Component._Inductor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Inductor;
        (function (_Inductor) {
            const defaulterSchematic = {
                name: Component.ValueCheck.validate("string", "inductor"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
                inductance: Component.ValueCheck.validate("number", 0)
            };
            _Inductor.makeSchematic = Component.getMaker(_Inductor.Classes.Schematic, defaulterSchematic, (component) => {
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, false);
                Component.Addins.Graphical.init(component);
                if (Constants.schematicManipulationEnabled) {
                    Component.Addins.Draggable.init(component);
                    Component.Addins.Extendable.init(component);
                }
            });
        })(_Inductor = Component._Inductor || (Component._Inductor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Inductor;
        (function (_Inductor) {
            _Inductor.loadSchematic = (raw) => {
                const name = (raw.name);
                const inductance = (raw.inductance || raw.value);
                const orientations = ["LR", "RL", "UD", "DU"];
                const orientation = Component.ValueCheck.validate(orientations, "LR")(raw.orientation);
                const where = Component.ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(orientation, where));
                return _Inductor.makeSchematic({ name, inductance, joints, });
            };
            const deriveJoints = (orientation, where) => {
                const baseJoints = ({
                    LR: [{ x: -30, y: 0 }, { x: 30, y: 0 }],
                    UD: [{ x: 0, y: -30 }, { x: 0, y: 30 }],
                    RL: [{ x: 30, y: 0 }, { x: -30, y: 0 }],
                    DU: [{ x: 0, y: 30 }, { x: 0, y: -30 }]
                })[orientation];
                return vector(baseJoints).sumWith(where).vectors;
            };
        })(_Inductor = Component._Inductor || (Component._Inductor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Inductor;
        (function (_Inductor) {
            const defaulterLayout = {
                name: Component.ValueCheck.validate("string", "inductor"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 80, y: 0 }]),
                inductance: Component.ValueCheck.validate("number", 0)
            };
            _Inductor.makeLayout = Component.getMaker(_Inductor.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.Extendable.init(component);
                Component.Addins.ConnectionHighlights.init(component);
            });
        })(_Inductor = Component._Inductor || (Component._Inductor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Inductor;
        (function (_Inductor) {
            _Inductor.loadLayout = (raw) => {
                const name = (raw.name);
                const inductance = (raw.inductance);
                const joints = (raw.joints);
                return _Inductor.makeLayout({ name, inductance, joints });
            };
        })(_Inductor = Component._Inductor || (Component._Inductor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeInductor",
            diagramType: "schematic",
            instance: Component._Inductor.Classes.Schematic,
            make: Component._Inductor.makeSchematic,
            load: Component._Inductor.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutInductor",
            diagramType: "layout",
            instance: Component._Inductor.Classes.Layout,
            make: Component._Inductor.makeLayout,
            load: Component._Inductor.loadLayout,
        };
        Component.inductor = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.offsetVoltage = values.offsetVoltage;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            offsetVoltage: this.offsetVoltage
                        });
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    constructor(values) {
                        super(values);
                        this.offsetVoltage = values.offsetVoltage;
                        this.joints = values.joints;
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_OpAmp.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.schematic);
                    }
                    makeConnectors() {
                        let [posPower, negPower] = (this.joints[_OpAmp.INDEXPOW1].y < this.joints[_OpAmp.INDEXPOW2].y)
                            ? [this.joints[_OpAmp.INDEXPOW1], this.joints[_OpAmp.INDEXPOW2]]
                            : [this.joints[_OpAmp.INDEXPOW2], this.joints[_OpAmp.INDEXPOW1]];
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "vcc+", "node", posPower, "v+"),
                                Component.Generics.makeConnector(this, "out", "node", this.joints[_OpAmp.INDEXOUT], "o"),
                                Component.Generics.makeConnector(this, "in-", "node", this.joints[_OpAmp.INDEXINNEG], "i-"),
                                Component.Generics.makeConnector(this, "in+", "node", this.joints[_OpAmp.INDEXINPOS], "i+"),
                                Component.Generics.makeConnector(this, "vcc-", "node", negPower, "v-"),
                            ]];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    constructor(values) {
                        super(values);
                        this.offsetVoltage = values.offsetVoltage;
                        this.isDual = values.isDual;
                        this.joints = values.joints;
                    }
                    getState() {
                        return Utility.deepCopy({
                            isDual: this.isDual,
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_OpAmp.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                    makeConnectors() {
                        let gs = Constants.gridSpacing;
                        let c = this.joints[_OpAmp.INDEXCENTRE];
                        let r = vector(this.joints[_OpAmp.INDEXCENTRE]).getAngleTo(this.joints[_OpAmp.INDEXROTATION]);
                        let connectorPoints = vector([
                            { x: 0 * gs, y: 3 * gs },
                            { x: 1 * gs, y: 3 * gs },
                            { x: 2 * gs, y: 3 * gs },
                            { x: 3 * gs, y: 3 * gs },
                            { x: 3 * gs, y: 0 * gs },
                            { x: 2 * gs, y: 0 * gs },
                            { x: 1 * gs, y: 0 * gs },
                            { x: 0 * gs, y: 0 * gs }
                        ]).sumWith(vector(-30)).rotate(r).sumWith(c).vectors;
                        if (this.isDual) {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),
                                    Component.Generics.makeConnector(this, "out", "pin", connectorPoints[6], "1o"),
                                    Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[5], "1i-"),
                                    Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[4], "1i+"),
                                    Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),
                                ], [
                                    Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),
                                    Component.Generics.makeConnector(this, "out", "pin", connectorPoints[0], "2o"),
                                    Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[1], "2i-"),
                                    Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[2], "2i+"),
                                    Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),
                                ]];
                        }
                        else {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[6], "v+"),
                                    Component.Generics.makeConnector(this, "out", "pin", connectorPoints[5], "o"),
                                    Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[1], "i-"),
                                    Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[2], "i+"),
                                    Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),
                                    Component.Generics.makeConnector(this, "nc", "pin", connectorPoints[7], "nc"),
                                    Component.Generics.makeConnector(this, "offset n1", "pin", connectorPoints[4], "nc"),
                                    Component.Generics.makeConnector(this, "offset n2", "pin", connectorPoints[0], "nc"),
                                ]];
                        }
                    }
                    replaceWithDual() {
                        this.isDual = true;
                        this.group.clearChildren();
                        this.draw();
                        this.makeConnectors();
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _OpAmp.Classes || (_OpAmp.Classes = {}));
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            const defaulterSchematic = {
                name: Component.ValueCheck.validate("string", "opAmp"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: -30, y: -10 }, { x: -30, y: +10 }, { x: 40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: 20 }]),
                offsetVoltage: Component.ValueCheck.validate("number", 0)
            };
            _OpAmp.makeSchematic = Component.getMaker(_OpAmp.Classes.Schematic, defaulterSchematic, (component) => {
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, false);
                Component.Addins.Graphical.init(component);
                if (Constants.schematicManipulationEnabled) {
                    Component.Addins.Draggable.init(component);
                    Component.Addins.Extendable.init(component);
                }
            });
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            _OpAmp.loadSchematic = (raw) => {
                const name = (raw.name);
                const offsetVoltage = (raw.offsetVoltage);
                const orientations = ["LR", "RL"];
                const orientation = Component.ValueCheck.validate(orientations, "LR")(raw.orientation);
                const inputsAtTop = ["inverting", "non-inverting"];
                const inputAtTop = Component.ValueCheck.validate(inputsAtTop, "non-inverting")(raw.whichInputAtTop);
                const where = Component.ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(orientation, inputAtTop, where));
                const opAmp = _OpAmp.makeSchematic({ name, offsetVoltage, joints });
                const isNumber = Component.ValueCheck.test("number");
                const [minOutput, maxOutput] = [raw.minOutput, raw.maxOutput];
                if (isNumber(minOutput) && isNumber(maxOutput)) {
                    const topPower = Component.power.schematic.make({
                        voltage: maxOutput,
                        joints: vector([{ x: 0, y: -20 }]).sumWith(where).vectors
                    });
                    const bottomPower = Component.power.schematic.make({
                        voltage: minOutput,
                        joints: vector([{ x: 0, y: 20 }]).sumWith(where).vectors
                    });
                    return [topPower, bottomPower, opAmp];
                }
                else {
                    return opAmp;
                }
            };
            const deriveJoints = (orientation, inputAtTop, where) => {
                const [inHigh, inLow] = orientation === "LR"
                    ? [{ x: -30, y: -10 }, { x: -30, y: +10 }]
                    : [{ x: +30, y: -10 }, { x: +30, y: +10 }];
                const [inInverting, inNonInverting] = inputAtTop === "inverting"
                    ? [inHigh, inLow] : [inLow, inHigh];
                const [out] = orientation === "LR"
                    ? [{ x: +40, y: 0 }]
                    : [{ x: -40, y: 0 }];
                const [powPositive, powNegative] = inputAtTop === "inverting"
                    ? [{ x: 0, y: -20 }, { x: 0, y: +20 }]
                    : [{ x: 0, y: +20 }, { x: 0, y: -20 }];
                return vector([inInverting, inNonInverting, out, powPositive, powNegative]).sumWith(where).vectors;
            };
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            const defaulterLayout = {
                name: Component.ValueCheck.validate("string", "opAmp"),
                disabled: Component.ValueCheck.validate("boolean", false),
                isDual: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 30, y: 30 }, { x: 40, y: 30 }]),
                offsetVoltage: Component.ValueCheck.validate("number", 0)
            };
            _OpAmp.makeLayout = Component.getMaker(_OpAmp.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Rotatable.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component);
            });
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            _OpAmp.loadLayout = (raw) => {
                const name = (raw.name);
                const offsetVoltage = (raw.offsetVoltage);
                const isDual = (raw.isDual);
                const joints = (raw.joints);
                return _OpAmp.makeLayout({ name, offsetVoltage, isDual, joints });
            };
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeOpAmp",
            diagramType: "schematic",
            instance: Component._OpAmp.Classes.Schematic,
            make: Component._OpAmp.makeSchematic,
            load: Component._OpAmp.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutOpAmp",
            diagramType: "layout",
            instance: Component._OpAmp.Classes.Layout,
            make: Component._OpAmp.makeLayout,
            load: Component._OpAmp.loadLayout,
        };
        Component.opAmp = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.voltage = values.voltage;
                        this.joints = values.joints;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            voltage: this.voltage
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    makeConnectors() {
                        this.connectorSets = [
                            [Component.Generics.makeConnector(this, "", "node", this.joints[0])]
                        ];
                    }
                    draw() {
                        this.group.prepend(_Power.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.schematic);
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    constructor() {
                        super(...arguments);
                        this.connectorSets = [];
                    }
                    insertInto(element) {
                        Utility.Insert.after(this.group.element, element, ".board");
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "hole", this.joints[0])
                            ]];
                    }
                    draw() {
                        this.group.prepend(_Power.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Power.Classes || (_Power.Classes = {}));
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            const defaulterSchematic = {
                name: Component.ValueCheck.validate("string", "power"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }]),
                voltage: Component.ValueCheck.validate("number", 0)
            };
            _Power.makeSchematic = Component.getMaker(_Power.Classes.Schematic, defaulterSchematic, (component) => {
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, false);
                Component.Addins.Graphical.init(component);
                if (Constants.schematicManipulationEnabled) {
                    Component.Addins.Draggable.init(component);
                }
            });
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            _Power.loadSchematic = (raw) => {
                const name = (raw.name);
                const voltage = (raw.voltage || raw.value);
                const where = Component.ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(voltage, where));
                return _Power.makeSchematic({ name, voltage, joints, });
            };
            const deriveJoints = (voltage, where) => {
                const baseJoints = (voltage < 0)
                    ? [{ x: 0, y: -10 }]
                    : (voltage > 0)
                        ? [{ x: 0, y: 10 }]
                        : [{ x: 0, y: -10 }];
                return vector(baseJoints).sumWith(where).vectors;
            };
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            const defaulterLayout = {
                name: Component.ValueCheck.validate("string", "power"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 40 }]),
                voltage: Component.ValueCheck.validate("number", 0)
            };
            _Power.makeLayout = Component.getMaker(_Power.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, true, getHighlightColor(component));
                Component.Addins.WireCreation.init(component);
            });
            function getHighlightColor(component) {
                return [(component.voltage < 0)
                        ? "blue"
                        : (component.voltage > 0)
                            ? "red"
                            : "black"
                ];
            }
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            _Power.loadLayout = (raw) => {
                const name = (raw.name);
                const voltage = (raw.voltage);
                const joints = (raw.joints);
                return _Power.makeLayout({ name, voltage, joints });
            };
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makePower",
            diagramType: "schematic",
            instance: Component._Power.Classes.Schematic,
            make: Component._Power.makeSchematic,
            load: Component._Power.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutPower",
            diagramType: "layout",
            instance: Component._Power.Classes.Layout,
            make: Component._Power.makeLayout,
            load: Component._Power.loadLayout,
            isUnique: true
        };
        Component.power = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.resistance = values.resistance;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            resistance: this.resistance
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    draw() {
                        this.group.prepend(_Resistor.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.schematic);
                    }
                    makeConnectors() {
                        this.connectorSets = [
                            [Component.Generics.makeConnector(this, "", "node", this.joints[_Resistor.INDEXEND1]),
                                Component.Generics.makeConnector(this, "", "node", this.joints[_Resistor.INDEXEND2]),]
                        ];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Resistor.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                    makeConnectors() {
                        this.connectorSets = [
                            [Component.Generics.makeConnector(this, "", "pin", this.joints[_Resistor.INDEXEND1]),
                                Component.Generics.makeConnector(this, "", "pin", this.joints[_Resistor.INDEXEND2]),]
                        ];
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Resistor.Classes || (_Resistor.Classes = {}));
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            const defaulterSchematic = {
                name: Component.ValueCheck.validate("string", "resistor"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
                resistance: Component.ValueCheck.validate("number", 0)
            };
            _Resistor.makeSchematic = Component.getMaker(_Resistor.Classes.Schematic, defaulterSchematic, (component) => {
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, false);
                Component.Addins.Graphical.init(component);
                if (Constants.schematicManipulationEnabled) {
                    Component.Addins.Draggable.init(component);
                    Component.Addins.Extendable.init(component);
                }
            });
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            _Resistor.loadSchematic = (raw) => {
                const name = (raw.name);
                const resistance = (raw.resistance || raw.value);
                const orientations = ["LR", "RL", "UD", "DU"];
                const orientation = Component.ValueCheck.validate(orientations, "LR")(raw.orientation);
                const where = Component.ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(orientation, where));
                return _Resistor.makeSchematic({ name, resistance, joints, });
            };
            const deriveJoints = (orientation, where) => {
                const baseJoints = ({
                    LR: [{ x: -30, y: 0 }, { x: 30, y: 0 }],
                    UD: [{ x: 0, y: -30 }, { x: 0, y: 30 }],
                    RL: [{ x: 30, y: 0 }, { x: -30, y: 0 }],
                    DU: [{ x: 0, y: 30 }, { x: 0, y: -30 }]
                })[orientation];
                return vector(baseJoints).sumWith(where).vectors;
            };
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            const defaulterLayout = {
                name: Component.ValueCheck.validate("string", "resistor"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
                resistance: Component.ValueCheck.validate("number", 0)
            };
            _Resistor.makeLayout = Component.getMaker(_Resistor.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.Extendable.init(component);
                Component.Addins.ConnectionHighlights.init(component);
            });
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            _Resistor.loadLayout = (raw) => {
                const name = (raw.name);
                const resistance = (raw.resistance);
                const joints = (raw.joints);
                return _Resistor.makeLayout({ name, resistance, joints });
            };
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeResistor",
            diagramType: "schematic",
            instance: Component._Resistor.Classes.Schematic,
            make: Component._Resistor.makeSchematic,
            load: Component._Resistor.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutResistor",
            diagramType: "layout",
            instance: Component._Resistor.Classes.Layout,
            make: Component._Resistor.makeLayout,
            load: Component._Resistor.loadLayout,
        };
        Component.resistor = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Stripboard;
        (function (_Stripboard) {
            var Classes;
            (function (Classes) {
                class Layout extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.tracks = [];
                        this.connectorSets = [];
                        this.rows = values.rows;
                        this.columns = values.columns;
                        this.trackBreaks = values.trackBreaks;
                        this.joints = values.joints;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            rows: this.rows,
                            columns: this.columns
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled,
                            trackBreaks: this.trackBreaks
                        });
                    }
                    makeConnectors() {
                        this.tracks.forEach(track => track.makeConnectors());
                        this.tracks.forEach((track, trackIdx) => {
                            let trackBreaks = this.trackBreaks.filter(trackBreak => trackBreak.track === trackIdx);
                            track.connectorSets[0].forEach((hole, holeIdx) => {
                                if (trackBreaks.some(trackBreak => trackBreak.hole === holeIdx)) {
                                    hole.type = "brokenhole";
                                }
                            });
                        });
                    }
                    draw() {
                        let rotation = vector(this.joints[0]).getAngleTo(this.joints[1]);
                        this.tracks = _Stripboard.makeTracks(this);
                        const gS = Constants.gridSpacing;
                        const size = { width: (this.columns + 0.5) * gS, height: (this.rows + 0.5) * gS };
                        const cornerRounding = { x: 3, y: 3 };
                        this.group.append(Svg.Element.Rect.make(vector(0), size, cornerRounding, "body highlight").translate(this.joints[0]).rotate(rotation), this.tracks.map(t => t.group));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                    insertInto(element) {
                        Utility.Insert.first(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                Classes.Layout = Layout;
            })(Classes = _Stripboard.Classes || (_Stripboard.Classes = {}));
        })(_Stripboard = Component._Stripboard || (Component._Stripboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Stripboard;
        (function (_Stripboard) {
            const defaulterLayout = {
                name: Component.ValueCheck.validate("string", "stripboard"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
                rows: Component.ValueCheck.integer(1),
                columns: Component.ValueCheck.integer(1),
                trackBreaks: validateTrackBreaks([]),
            };
            function validateTrackBreaks(fallback) {
                const result = (value, log = true) => {
                    const predicate = (v) => ((value && Array.isArray(value) && value.every((tB) => {
                        return (('track' in tB) && ('hole' in tB) && (typeof tB.track === 'number') && (typeof tB.hole === 'number'));
                    })));
                    return Component.ValueCheck.validate(predicate, fallback)(value);
                };
                return result;
            }
            _Stripboard.makeLayout = Component.getMaker(_Stripboard.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Board.init(component, true);
                Component.Addins.Selectable.init(component);
                Component.Addins.WireCreation.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Rotatable.init(component);
            });
        })(_Stripboard = Component._Stripboard || (Component._Stripboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Stripboard;
        (function (_Stripboard) {
            _Stripboard.loadLayout = (raw) => {
                const name = (raw.name);
                const rows = (raw.rows);
                const columns = (raw.columns);
                const trackBreaks = (raw.trackBreaks);
                const joints = (raw.joints);
                return _Stripboard.makeLayout({ name, rows, columns, trackBreaks, joints });
            };
        })(_Stripboard = Component._Stripboard || (Component._Stripboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const layoutMap = {
            savename: "makeLayoutStripboard",
            diagramType: "layout",
            instance: Component._Stripboard.Classes.Layout,
            make: Component._Stripboard.makeLayout,
            load: Component._Stripboard.loadLayout,
            isBoard: true
        };
        Component.stripboard = {
            layout: Component.makeMap(layoutMap),
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Track;
        (function (_Track) {
            var Classes;
            (function (Classes) {
                class Layout extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.connectorSets = [];
                        this.name = values.name;
                        this.holeSpacings = values.holeSpacings;
                        this.style = values.style;
                        this.joints = values.joints;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            holeSpacings: this.holeSpacings,
                            style: this.style
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_Track.drawLayout(this));
                    }
                    makeConnectors() {
                        const start = this.joints[0];
                        const step = this.joints[1];
                        this.connectorSets = [[]];
                        let accHs = 0;
                        this.holeSpacings.forEach((hS) => {
                            accHs += hS;
                            let holePos = vector(step)
                                .scaleWith(accHs)
                                .sumWith(start)
                                .vector;
                            this.connectorSets[0].push(Component.Generics.makeConnector(this, "", "hole", holePos));
                        });
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction(from) {
                        let fromIdx = this.connectorSets[0].indexOf(from);
                        let connected = [];
                        for (let i = fromIdx + 1; i < this.connectorSets[0].length; i++) {
                            if (this.connectorSets[0][i].type === "brokenhole")
                                break;
                            connected.push(this.connectorSets[0][i]);
                        }
                        for (let i = fromIdx - 1; i >= 0; i--) {
                            if (this.connectorSets[0][i].type === "brokenhole")
                                break;
                            connected.push(this.connectorSets[0][i]);
                        }
                        return connected;
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Track.Classes || (_Track.Classes = {}));
        })(_Track = Component._Track || (Component._Track = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Track;
        (function (_Track) {
            _Track.defaulter = {
                name: Component.ValueCheck.validate("string", "track"),
                style: Component.ValueCheck.validate(["breadboard", "stripboard"], "breadboard"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
                holeSpacings: Component.ValueCheck.validate(v => Array.isArray(v) && v.every(Component.ValueCheck.test("number")), [0]),
            };
            _Track.makeLayout = Component.getMaker(_Track.Classes.Layout, _Track.defaulter, (component) => {
                Component.Addins.Graphical.init(component);
            });
        })(_Track = Component._Track || (Component._Track = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Track;
        (function (_Track) {
            _Track.loadLayout = (raw) => {
                return _Track.makeLayout({});
            };
        })(_Track = Component._Track || (Component._Track = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        Component.track = Component.makeMap({
            savename: "makeLayoutTrack",
            diagramType: "layout",
            instance: Component._Track.Classes.Layout,
            make: Component._Track.makeLayout,
            load: Component._Track.loadLayout
        });
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name
                        });
                    }
                    transferFunction(from) {
                        return Utility.flatten2d(this.connectorSets.map(connectorSet => connectorSet.filter(Utility.isNot(from))));
                    }
                }
                class Schematic extends Base {
                    constructor(values) {
                        super(values);
                        this.connectorSets = [];
                        this.joints = values.joints;
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_Wire.drawSchematic(this));
                    }
                    insertInto(element) {
                        Utility.Insert.first(this.group.element, element);
                    }
                    makeConnectors() {
                        const end1 = this.joints[0];
                        const end2 = this.joints[this.joints.length - 1];
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "node", end1),
                                Component.Generics.makeConnector(this, "", "node", end2)
                            ]
                        ];
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.schematic);
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.color = values.color;
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            color: this.color,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_Wire.drawLayout(this));
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
                                Component.Generics.makeConnector(this, "", "pin", this.joints[this.joints.length - 1]),
                            ]
                        ];
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, Circuit.manifest.layout);
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Wire.Classes || (_Wire.Classes = {}));
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            const defaulterSchematic = {
                name: Component.ValueCheck.validate("string", "wire"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 10, y: 10 }], l => l >= 2)
            };
            _Wire.makeSchematic = Component.getMaker(_Wire.Classes.Schematic, defaulterSchematic, (component) => {
                Component.Addins.Junctions.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.Graphical.init(component);
                if (Constants.schematicManipulationEnabled) {
                    Component.Addins.Draggable.init(component);
                    Component.Addins.Extendable.init(component, true, true);
                }
            });
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            _Wire.loadSchematic = (raw) => {
                const name = (raw.name);
                const joints = (raw.joints);
                return _Wire.makeSchematic({ name, joints });
            };
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            const defaulterLayout = {
                name: Component.ValueCheck.validate("string", "wire"),
                disabled: Component.ValueCheck.validate("boolean", false),
                joints: Component.ValueCheck.joints([{ x: 0, y: 0 }, { x: 80, y: 0 }], l => l >= 2),
                color: Component.ValueCheck.color("#545454")
            };
            _Wire.makeLayout = Component.getMaker(_Wire.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.Extendable.init(component, true, true, true);
                Component.Addins.ConnectionHighlights.init(component);
                Component.Addins.Recolorable.init(component, () => getRecolorPosition(component));
            });
            function getRecolorPosition(component) {
                const angle = vector(component.joints[0]).getAngleTo(component.joints[1]);
                const offset = Utility.Polar.toVector(12, angle + 45);
                return vector(component.joints[0]).sumWith(offset).vector;
            }
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            _Wire.loadLayout = (raw) => {
                const name = (raw.name);
                const color = (raw.color || raw.colour);
                const joints = (raw.joints);
                return _Wire.makeLayout({ name, color, joints });
            };
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeWire",
            diagramType: "schematic",
            instance: Component._Wire.Classes.Schematic,
            make: Component._Wire.makeSchematic,
            load: Component._Wire.loadSchematic
        };
        const layoutMap = {
            savename: "makeLayoutWire",
            diagramType: "layout",
            instance: Component._Wire.Classes.Layout,
            make: Component._Wire.makeLayout,
            load: Component._Wire.loadLayout
        };
        Component.wire = {
            schematic: Component.makeMap(schematicMap),
            layout: Component.makeMap(layoutMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            function drawLayout(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const emitterEnd = instance.joints[_Bipolar.INDEXEMITTER];
                const collectorEnd = instance.joints[_Bipolar.INDEXCOLLECTOR];
                const baseEnd = instance.joints[_Bipolar.INDEXBASE];
                const centre = vector(emitterEnd, collectorEnd, baseEnd).centre().vector;
                const rotation = vector(emitterEnd).getAngleTo(baseEnd);
                const [emitterStart, collectorStart, baseStart] = vector({ x: -12, y: 3 }, { x: 0, y: -2 }, { x: 12, y: 3 }).rotate(rotation).sumWith(centre).vectors;
                const joints = [
                    [emitterStart, emitterEnd],
                    [collectorStart, collectorEnd],
                    [baseStart, baseEnd],
                ];
                const semiCircleString = "M " + (16) + " " + (4) +
                    "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (-32) + " " + (0) +
                    "v " + (3) +
                    "h " + (32) +
                    "v " + (-3) +
                    "Z";
                bodyGroup.append(Svg.Element.Path.make(semiCircleString, "body highlight"), Svg.Element.Text.make(instance.type, { x: 0, y: 4 }, "text"));
                return [
                    Svg.Element.Path.make(joints, "lead"),
                    bodyGroup.translate(centre).rotate(rotation),
                    Svg.Element.Path.make(joints, "leadguide")
                ];
            }
            _Bipolar.drawLayout = drawLayout;
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            function drawSchematic(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const emitterEnd = instance.joints[_Bipolar.INDEXEMITTER];
                const collectorEnd = instance.joints[_Bipolar.INDEXCOLLECTOR];
                const baseEnd = instance.joints[_Bipolar.INDEXBASE];
                const arrowJoints = (instance.type === "PNP")
                    ? [{ x: 15, y: -18 }, { x: 9, y: -7.5 }, { x: 24, y: -5.5 }, { x: 15, y: -18 }]
                    : [{ x: 9, y: -7.5 }, { x: 15, y: -18 }, { x: 0, y: -20 }, { x: 9, y: -7.5 }];
                bodyGroup.append(Svg.Element.Circle.make({ x: 10, y: 0 }, 30, "extrathick highlight"), Svg.Element.Line.make({ x: 25, y: -15 }, { x: 25, y: +15 }, "line medium-thick nocap"), Svg.Element.Line.make({ x: 25, y: -5 }, { x: 0, y: -20 }, "line thin"), Svg.Element.Line.make({ x: 25, y: 5 }, { x: 0, y: 20 }, "line thin"), Svg.Element.Line.make({ x: 25, y: 0 }, { x: 40, y: 0 }, "line thin"), Svg.Element.Line.make({ x: 0, y: -20 }, { x: 0, y: -28 }, "line thin"), Svg.Element.Line.make({ x: 0, y: 20 }, { x: 0, y: 28 }, "line thin"), Svg.Element.Path.make(arrowJoints, "body black thin"), Svg.Element.Circle.make({ x: 10, y: 0 }, 30, "line medium nofill"));
                const centre = vector(emitterEnd, collectorEnd).centre().vector;
                const angleCentreBase = vector(centre).getAngleTo(baseEnd);
                const angleEmitterCollector = vector(emitterEnd).getAngleTo(collectorEnd);
                const rotation = angleEmitterCollector - 90;
                const scale = (((angleEmitterCollector - angleCentreBase + 360) % 360) > 180)
                    ? { x: -1 }
                    : { x: 1 };
                const [emitterStart, collectorStart, baseStart] = vector({ x: 0, y: -28 }, { x: 0, y: 28 }, { x: 40, y: 0 }).scaleWith(scale).rotate(rotation).sumWith(centre).vectors;
                const joints = [
                    [emitterStart, emitterEnd],
                    [collectorStart, collectorEnd],
                    [baseStart, baseEnd],
                ];
                const text = Utility.getStandardForm(instance.currentGain, '');
                const textEl = Svg.Element.Text.make(text, vector({ x: -40, y: 0 }).scaleWith(scale), "text");
                return [
                    bodyGroup.translate(centre).rotate(rotation).scale(scale, false),
                    Svg.Element.Path.make(joints, "line thin"),
                    textEl.translate(centre).rotatePosition(rotation),
                ];
            }
            _Bipolar.drawSchematic = drawSchematic;
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            _Bipolar.INDEXEMITTER = 0;
            _Bipolar.INDEXCOLLECTOR = 1;
            _Bipolar.INDEXBASE = 2;
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            function drawLarge(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const centre = instance.joints[_Breadboard.INDEXCENTRE];
                const rotationPoint = instance.joints[_Breadboard.INDEXROTATION];
                let rotation = vector(centre).getAngleTo(rotationPoint);
                const gS = Constants.gridSpacing;
                const railPairPathString = [
                    "M" + (gS * -29.7) + " " + (gS * -10.5),
                    "H" + (gS * -1),
                    "M" + (gS * +29.7) + " " + (gS * -10.5),
                    "H" + (gS * 1),
                    "M" + (gS * -29.7) + " " + (gS * 7.5),
                    "H" + (gS * -1),
                    "M" + (gS * +29.7) + " " + (gS * 7.5),
                    "H" + (gS * 1)
                ].join();
                const plus = "m-5 0 h10 m-5 -5 v10 m0 -5";
                const plussesPathString = [
                    "M" + (gS * -30.5) + " " + (gS * -10),
                    "M" + (gS * 30.5) + " " + (gS * -10),
                    "M" + (gS * -30.5) + " " + (gS * 8),
                    "M" + (gS * 30.5) + " " + (gS * 8),
                    ""
                ].join(plus);
                const minus = "m0 -5 v10 m0 -5";
                const minusesPathString = [
                    "M" + (gS * -30.5) + " " + (gS * -11),
                    "M" + (gS * 30.5) + " " + (gS * -11),
                    "M" + (gS * -30.5) + " " + (gS * 7),
                    "M" + (gS * 30.5) + " " + (gS * 7),
                    ""
                ].join(minus);
                const size = {
                    width: 67 * gS,
                    height: 22 * gS
                };
                bodyGroup.append([
                    Svg.Element.Rect.make({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body"),
                    Svg.Element.Rect.make({ x: 0, y: 0 }, { width: size.width, height: gS * 0.75, }, { x: 0, y: 0 }, "rut"),
                    Svg.Element.Rect.make({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body highlight"),
                    Svg.Element.Path.make(railPairPathString + plussesPathString, "rail positive"),
                    Svg.Element.Path.make(railPairPathString + minusesPathString, "rail negative").translate({ x: 0, y: gS * 3 }),
                    Svg.Element.Group.TextSequence.make({ x: 31.5 * gS - gS / 6, y: -6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 64 }).rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: 31.5 * gS - gS / 6, y: 6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 64 }).rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: 32.5 * gS - gS / 4, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: -32.5 * gS, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: 32.5 * gS - gS / 4, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: -32.5 * gS, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
                ]);
                return [
                    bodyGroup.translate(centre).rotate(rotation)
                ];
            }
            _Breadboard.drawLarge = drawLarge;
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            function drawSmall(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const centre = instance.joints[_Breadboard.INDEXCENTRE];
                const rotationPoint = instance.joints[_Breadboard.INDEXROTATION];
                let rotation = vector(centre).getAngleTo(rotationPoint);
                const gS = Constants.gridSpacing;
                const railPairPathString = [
                    "M" + (gS * -14.2) + " " + (gS * -10.5),
                    "H" + (gS * 14.2),
                    "M" + (gS * -14.2) + " " + (gS * 7.5),
                    "H" + (gS * 14.2)
                ].join();
                const plus = "m-5 0 h10 m-5 -5 v10 m0 -5";
                const plussesPathString = [
                    "M" + (gS * -15) + " " + (gS * -10),
                    "M" + (gS * 15) + " " + (gS * -10),
                    "M" + (gS * -15) + " " + (gS * 8),
                    "M" + (gS * 15) + " " + (gS * 8),
                    ""
                ].join(plus);
                const minus = "m0 -5 v10 m0 -5";
                const minusesPathString = [
                    "M" + (gS * -15) + " " + (gS * -11),
                    "M" + (gS * 15) + " " + (gS * -11),
                    "M" + (gS * -15) + " " + (gS * 7),
                    "M" + (gS * 15) + " " + (gS * 7),
                    ""
                ].join(minus);
                const size = {
                    width: 32 * gS,
                    height: 22 * gS
                };
                bodyGroup.append([
                    Svg.Element.Rect.make({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body"),
                    Svg.Element.Rect.make({ x: 0, y: 0 }, { width: size.width, height: gS * 0.75, }, { x: 0, y: 0 }, "rut"),
                    Svg.Element.Rect.make({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body highlight"),
                    Svg.Element.Path.make(railPairPathString + plussesPathString, "rail positive"),
                    Svg.Element.Path.make(railPairPathString + minusesPathString, "rail negative").translate({ x: 0, y: gS * 3 }),
                    Svg.Element.Group.TextSequence.make({ x: 14.5 * gS - gS / 6, y: -6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 30 }).rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: 14.5 * gS - gS / 6, y: 6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 30 }).rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: 15.5 * gS - gS / 4, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: -15.5 * gS, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: 15.5 * gS - gS / 4, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
                    Svg.Element.Group.TextSequence.make({ x: -15.5 * gS, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
                ]);
                return [
                    bodyGroup.translate(centre).rotate(rotation)
                ];
            }
            _Breadboard.drawSmall = drawSmall;
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            function makeTracks(parent, size) {
                return (size === "small") ? makeTracksSmall(parent) : makeTracksLarge(parent);
            }
            _Breadboard.makeTracks = makeTracks;
            function makeTracksSmall(parent) {
                let tracks = [];
                let gS = Constants.gridSpacing;
                let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);
                let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
                for (let y of powerTrackYPositions) {
                    const start = vector({ x: gS * -14, y: y * gS })
                        .rotate(rotation)
                        .sumWith(parent.joints[0]);
                    const step = vector({ x: gS, y: 0 }).rotate(rotation);
                    let track = Component.track.make({
                        holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
                        joints: [start, step]
                    }, false);
                    tracks.push(track);
                }
                let mainGridTrackXPositions = [...Array(30).keys()];
                let mainGridTrackYPositions = [-5.5, +1.5];
                for (let x of mainGridTrackXPositions) {
                    for (let y of mainGridTrackYPositions) {
                        const start = vector({ x: (x - 14.5) * gS, y: y * gS })
                            .rotate(rotation)
                            .sumWith(parent.joints[0]);
                        const step = vector({ x: 0, y: gS }).rotate(rotation);
                        let track = Component.track.make({
                            holeSpacings: [0, 1, 1, 1, 1],
                            joints: [start, step]
                        }, false);
                        tracks.push(track);
                    }
                }
                return tracks;
            }
            function makeTracksLarge(parent) {
                let tracks = [];
                let gS = Constants.gridSpacing;
                let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);
                let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
                let powerTrackXPositions = [-29.5, 1.5];
                for (let x of powerTrackXPositions) {
                    for (let y of powerTrackYPositions) {
                        const start = vector({ x: x * gS, y: y * gS })
                            .rotate(rotation)
                            .sumWith(parent.joints[0]);
                        const step = vector({ x: gS, y: 0 }).rotate(rotation);
                        let track = Component.track.make({
                            holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
                            joints: [start, step]
                        }, false);
                        tracks.push(track);
                    }
                }
                let mainGridTrackXPositions = [...Array(64).keys()];
                let mainGridTrackYPositions = [-5.5, +1.5];
                for (let x of mainGridTrackXPositions) {
                    for (let y of mainGridTrackYPositions) {
                        const start = vector({ x: (x - 31.5) * gS, y: y * gS })
                            .rotate(rotation)
                            .sumWith(parent.joints[0]);
                        const step = vector({ x: 0, y: gS }).rotate(rotation);
                        let track = Component.track.make({
                            holeSpacings: [0, 1, 1, 1, 1],
                            joints: [start, step]
                        }, false);
                        tracks.push(track);
                    }
                }
                return tracks;
            }
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            _Breadboard.INDEXCENTRE = 0;
            _Breadboard.INDEXROTATION = 1;
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            function drawLayout(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const cathodeEnd = instance.joints[_Capacitor.INDEXCATHODE];
                const anodeEnd = instance.joints[_Capacitor.INDEXANODE];
                const centre = vector(cathodeEnd, anodeEnd).centre().vector;
                const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);
                const text = Utility.getStandardForm(instance.capacitance, 'F');
                if (instance.isPolarised) {
                    $(bodyGroup.element).addClass("electrolytic");
                    const bodyArcEndPoint = 14 / Math.SQRT2;
                    const textArcEndPoint = 12.5 / Math.SQRT2;
                    const bodyPathString = "m14 0 A14 14 0 1 0 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
                    const minusPathString = "m14 0 A14 14 0 0 1 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
                    const pathForTextString = "m" + (textArcEndPoint) + " " + (textArcEndPoint) + "A12.5 12.5 0 1 1 12.5 0";
                    bodyGroup.append(Svg.Element.Circle.make({ x: 0, y: 0 }, 16, "highlight nofill"), Svg.Element.Path.make(bodyPathString, "body").rotate(157.5), Svg.Element.Path.make(minusPathString, "minus").rotate(157.5), Svg.Element.Text.make(text, { x: 1, y: 0 }, "text").followPath(pathForTextString).rotate(157.5));
                }
                else {
                    $(bodyGroup.element).addClass("ceramic");
                    bodyGroup.append(Svg.Element.Ellipse.make({ x: 0, y: 0 }, { x: 16, y: 8 }, "body highlight nofill"), Svg.Element.Text.make(text, { x: 0, y: 0 }, "text"));
                }
                return [
                    Svg.Element.Path.make([cathodeEnd, anodeEnd], "lead"),
                    bodyGroup.translate(centre).rotate(rotation)
                ];
            }
            _Capacitor.drawLayout = drawLayout;
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            function drawSchematic(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const cathodeEnd = instance.joints[_Capacitor.INDEXCATHODE];
                const anodeEnd = instance.joints[_Capacitor.INDEXANODE];
                let centre = vector(cathodeEnd, anodeEnd).centre().vector;
                let rotation = vector(cathodeEnd).getAngleTo(anodeEnd);
                let [cathodeStart, anodeStart] = vector({ x: -6, y: 0 }, { x: 6, y: 0 }).rotate(rotation).sumWith(centre).vectors;
                let text = Utility.getStandardForm(instance.capacitance, 'F');
                bodyGroup.append(Svg.Element.Rect.make(vector(0), { width: 15, height: 30 }, vector(2), "highlight highlightwithfill extrathick"), Svg.Element.Line.make({ x: -4, y: -15 }, { x: -4, y: +15 }, "line thick nocap"), Svg.Element.Line.make({ x: +4, y: -15 }, { x: +4, y: +15 }, "line thick nocap"));
                if (instance.isPolarised) {
                    bodyGroup.append(Svg.Element.Path.make([
                        [{ x: +15, y: -10 }, { x: +7, y: -10 }],
                        [{ x: +11, y: -6 }, { x: +11, y: -14 }]
                    ], "line thin"));
                }
                return [
                    Svg.Element.Path.make([[cathodeStart, cathodeEnd], [anodeStart, anodeEnd]], "line thin"),
                    bodyGroup.translate(centre).rotate(rotation),
                    Svg.Element.Text.make(text, { x: 0, y: -20 }, "text").translate(centre).rotatePosition(rotation)
                ];
            }
            _Capacitor.drawSchematic = drawSchematic;
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            _Capacitor.INDEXCATHODE = 0;
            _Capacitor.INDEXANODE = 1;
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            function drawLayout(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const cathodeEnd = instance.joints[_Diode.INDEXCATHODE];
                const anodeEnd = instance.joints[_Diode.INDEXANODE];
                const centre = vector(cathodeEnd, anodeEnd).centre().vector;
                const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);
                if (instance.color === "N/A") {
                    bodyGroup.append(Svg.Element.Rect.make({ x: -5.5, y: 0 }, { width: 29, height: 15 }, { x: 0, y: 0 }, "body"), Svg.Element.Rect.make({ x: 17.5, y: 0 }, { width: 5, height: 15 }, { x: 0, y: 0 }, "body"), Svg.Element.Rect.make({ x: 12, y: 0 }, { width: 6, height: 15 }, { x: 0, y: 0 }, "cathode"), Svg.Element.Rect.make({ x: 0, y: 0 }, { width: 40, height: 15 }, { x: 1, y: 1 }, "highlight nofill"));
                }
                else {
                    $(bodyGroup.element).addClass("led");
                    const bodyString = "M " + (10) + " " + (15) +
                        "a " + (18) + " " + (18) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
                        "Z";
                    const highlightString = "M " + (10) + " " + (16) +
                        "a " + (18.8) + " " + (18.8) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
                        "Z";
                    const edge = Svg.Element.Path.make(bodyString, "edge");
                    const middle = Svg.Element.Circle.make({ x: 0, y: 0 }, 14, "centre");
                    $([edge.element, middle.element]).css("fill", instance.color);
                    bodyGroup.append(edge, Svg.Element.Path.make(bodyString, "darkener"), middle, Svg.Element.Circle.make({ x: 0, y: 0 }, 8, "lightener"), Svg.Element.Path.make(highlightString, "nofill highlight")).rotate(-90);
                }
                return [
                    Svg.Element.Path.make([cathodeEnd, anodeEnd], "lead"),
                    bodyGroup.translate(centre).rotate(rotation)
                ];
            }
            _Diode.drawLayout = drawLayout;
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            function drawSchematic(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const cathodeEnd = instance.joints[_Diode.INDEXCATHODE];
                const anodeEnd = instance.joints[_Diode.INDEXANODE];
                const centre = vector(cathodeEnd, anodeEnd).centre().vector;
                const rotation = vector(cathodeEnd).getAngleTo(anodeEnd);
                let [cathodeStart, anodeStart] = vector({ x: -12, y: 0 }, { x: 12, y: 0 }).rotate(rotation).sumWith(centre).vectors;
                let text = (instance.breakdownVoltage < 51)
                    ? Utility.getStandardForm(instance.breakdownVoltage, 'V')
                    : Utility.getStandardForm(instance.saturationCurrent, 'A');
                const bodyPath = 'M 12 0 L -12 12 L -12 -12 L 12 0 Z';
                bodyGroup.append(Svg.Element.Path.make(bodyPath, "body highlight highlightwithfill extrathick"), Svg.Element.Path.make(bodyPath, "body black"));
                if (instance.color === "N/A") {
                    if (instance.breakdownVoltage < 51) {
                        bodyGroup.append(Svg.Element.Path.make('M 18 -12 L 12 -12 L 12 12 L 6 12', "line medium"));
                    }
                    else {
                        bodyGroup.append(Svg.Element.Path.make('M 12 -12 L 12 12', "line medium"));
                    }
                }
                else {
                    const arrowJointsBase = vector([{ x: 0, y: 3 }, { x: -4, y: 0 }, { x: 0, y: -3 }, { x: -4, y: 0 }, { x: 8, y: 0 }]);
                    const arrowJoints1 = arrowJointsBase.sumWith({ x: -16, y: -10 }).rotate(-116.43).vectors;
                    const arrowJoints2 = arrowJointsBase.sumWith({ x: -16, y: 0 }).rotate(-116.43).vectors;
                    const colorCircle = Svg.Element.Circle.make({ x: -4, y: 0 }, 4, "line thin");
                    $(colorCircle.element).css("fill", instance.color);
                    $(colorCircle.element).css("stroke", instance.color);
                    bodyGroup.append(Svg.Element.Path.make(arrowJoints1, "line black thin"), Svg.Element.Path.make(arrowJoints2, "line black thin"), colorCircle);
                }
                const textEl = Svg.Element.Text.make(text, { x: 0, y: -15 }, "text");
                return [
                    Svg.Element.Path.make([[cathodeStart, cathodeEnd], [anodeStart, anodeEnd]], "line thin"),
                    bodyGroup.translate(centre).rotate(rotation),
                    textEl.translate(centre).rotatePosition(rotation),
                ];
            }
            _Diode.drawSchematic = drawSchematic;
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            _Diode.INDEXCATHODE = 0;
            _Diode.INDEXANODE = 1;
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Inductor;
        (function (_Inductor) {
            function drawLayout(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const end1 = instance.joints[_Inductor.INDEXEND1];
                const end2 = instance.joints[_Inductor.INDEXEND2];
                let centre = vector(end1, end2).centre().vector;
                let rotation = vector(end1).getAngleTo(end2);
                const nCoils = 4;
                const wireWidth = 8;
                const coilTop = -15;
                const coilBottom = 15;
                const coilStart = (-(nCoils * wireWidth) / 2 + wireWidth / 4);
                let bodyPath = "M" + (coilStart) + " " + (coilBottom);
                let bodyEdgePath = "";
                for (let i = 1; i < nCoils; i++) {
                    let x0 = coilStart + wireWidth * (i - 0.5);
                    let x1 = coilStart + wireWidth * (i);
                    bodyPath += "L" + (x0) + " " + (coilTop) + "L" + (x1) + " " + (coilBottom);
                    bodyEdgePath += "M" + (x0) + " " + (coilBottom) + "L" + (x1) + " " + (coilTop);
                }
                bodyPath += "L" + (-coilStart) + " " + (coilTop);
                bodyGroup.append(Svg.Element.Path.make(bodyPath, "highlight highlightwithfill"), Svg.Element.Path.make(bodyPath, "body"), Svg.Element.Path.make(bodyEdgePath, "bodyEdge"));
                return [
                    Svg.Element.Path.make([end1, end2], "lead"),
                    bodyGroup.translate(centre).rotate(rotation)
                ];
            }
            _Inductor.drawLayout = drawLayout;
        })(_Inductor = Component._Inductor || (Component._Inductor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Inductor;
        (function (_Inductor) {
            function drawSchematic(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const end1 = instance.joints[_Inductor.INDEXEND1];
                const end2 = instance.joints[_Inductor.INDEXEND2];
                let centre = vector(end1, end2).centre().vector;
                let rotation = vector(end1).getAngleTo(end2);
                let [start1, start2] = vector({ x: -20, y: 0 }, { x: 20, y: 0 }).rotate(rotation).sumWith(centre).vectors;
                let text = Utility.getStandardForm(instance.inductance, 'H');
                bodyGroup.append(Svg.Element.Rect.make({ x: 0, y: -2 }, { width: 40, height: 12 }, vector(2), "highlight highlightwithfill extrathick"), Svg.Element.Path.make('M-20 0 q5 -12, 10 0 q5 -12, 10 0 q5 -12, 10 0 q5 -12, 10 0', "line medium"));
                let textEl = Svg.Element.Text.make(text, { x: 0, y: -13 }, "text");
                return [
                    Svg.Element.Path.make([[start1, end1], [start2, end2]], "line thin"),
                    bodyGroup.translate(centre).rotate(rotation),
                    textEl.translate(centre).rotatePosition(rotation),
                ];
            }
            _Inductor.drawSchematic = drawSchematic;
        })(_Inductor = Component._Inductor || (Component._Inductor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Inductor;
        (function (_Inductor) {
            _Inductor.INDEXEND1 = 0;
            _Inductor.INDEXEND2 = 1;
        })(_Inductor = Component._Inductor || (Component._Inductor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            function drawLayout(instance) {
                const centre = instance.joints[_OpAmp.INDEXCENTRE];
                const rotationPoint = instance.joints[_OpAmp.INDEXROTATION];
                const rotation = vector(centre).getAngleTo(rotationPoint);
                if (instance.isDual) {
                    return Svg.Element.Group.Dip.make(4, "", "TL072", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
                }
                else {
                    return Svg.Element.Group.Dip.make(4, "", "TL071", "").translate(vector(-30)).rotate(rotation, vector(30)).translate(centre);
                }
            }
            _OpAmp.drawLayout = drawLayout;
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            function drawSchematic(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const inPEnd = instance.joints[_OpAmp.INDEXINPOS];
                const inNEnd = instance.joints[_OpAmp.INDEXINNEG];
                const outEnd = instance.joints[_OpAmp.INDEXOUT];
                const pow1End = instance.joints[_OpAmp.INDEXPOW1];
                const pow2End = instance.joints[_OpAmp.INDEXPOW2];
                const bodyJoints = [{ x: -25, y: -25 }, { x: 25, y: 0 }, { x: -25, y: 25 }, { x: -25, y: -25 }];
                bodyGroup.append(Svg.Element.Path.make(bodyJoints, "highlight highlightwithfill extrathick"), Svg.Element.Path.make(bodyJoints, "body white"), Svg.Element.Line.make({ x: -22, y: -10 }, { x: -14, y: -10 }, "line thin"), Svg.Element.Line.make({ x: -18, y: -6 }, { x: -18, y: -14 }, "line thin"), Svg.Element.Line.make({ x: -22, y: +10 }, { x: -14, y: +10 }, "line thin"));
                let centre = vector(pow1End, pow2End).centre().vector;
                let angleCentreBase = vector(centre).getAngleTo(outEnd);
                let angleInPInN = vector(pow1End).getAngleTo(pow2End);
                let rotation = angleInPInN - 90;
                let scale = (((angleInPInN - angleCentreBase + 360) % 360) > 180)
                    ? { x: -1 }
                    : { x: 1 };
                let [inPStart, inNStart, outStart, powPStart, powNStart] = vector({ x: -25, y: -10 }, { x: -25, y: 10 }, { x: 25, y: 0 }, { x: 0, y: -13 }, { x: 0, y: 13 }).scaleWith(scale).rotate(rotation).sumWith(centre).vectors;
                let joints = [
                    [inPStart, inPEnd],
                    [inNStart, inNEnd],
                    [outStart, outEnd],
                    [powPStart, pow1End],
                    [powNStart, pow2End],
                ];
                return [
                    bodyGroup.translate(centre).rotate(rotation).scale(scale, false),
                    Svg.Element.Path.make(joints, "line thin"),
                ];
            }
            _OpAmp.drawSchematic = drawSchematic;
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            _OpAmp.INDEXINPOS = 0;
            _OpAmp.INDEXINNEG = 1;
            _OpAmp.INDEXOUT = 2;
            _OpAmp.INDEXPOW1 = 3;
            _OpAmp.INDEXPOW2 = 4;
            _OpAmp.INDEXCENTRE = 0;
            _OpAmp.INDEXROTATION = 1;
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            function drawLayout(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const text = instance.voltage.toFixed(1);
                bodyGroup.append(Svg.Element.Rect.make({ x: 0, y: -35 }, { width: 180, height: 95 }, { x: 10, y: 10 }, "body highlight"), Svg.Element.Rect.make({ x: 0, y: -45 }, { width: 160, height: 65 }, { x: 10, y: 10 }, "screen"), Svg.Element.Text.make("8".repeat(text.length - 1), { x: 0, y: -20 }, "screentext off"), Svg.Element.Text.make(text, { x: 0, y: -20 }, "screentext on"), Svg.Element.Circle.make({ x: 0, y: 0 }, 5, "hole"));
                return [
                    bodyGroup.translate(instance.joints[_Power.INDEXCONNECTION])
                ];
            }
            _Power.drawLayout = drawLayout;
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            function drawSchematic(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                if (instance.voltage < 0) {
                    bodyGroup.append(powerNegativeGraphics(instance.voltage));
                }
                else if (instance.voltage > 0) {
                    bodyGroup.append(powerPositiveGraphics(instance.voltage));
                }
                else {
                    bodyGroup.append(powerGroundGraphics());
                }
                return [
                    bodyGroup.translate(instance.joints[_Power.INDEXCONNECTION])
                ];
            }
            _Power.drawSchematic = drawSchematic;
            function powerNegativeGraphics(voltage) {
                const text = Utility.getStandardForm(voltage, "V");
                return [
                    Svg.Element.Rect.make({ x: 0, y: 18 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
                    Svg.Element.Line.make({ x: -12, y: 15 }, { x: 12, y: 15 }, "line medium"),
                    Svg.Element.Text.make(text, { x: 0, y: 27 }, "text bold"),
                    Svg.Element.Line.make({ x: 0, y: 15 }, { x: 0, y: 0 }, "line thin")
                ];
            }
            function powerPositiveGraphics(voltage) {
                const text = Utility.getStandardForm(voltage, "V");
                return [
                    Svg.Element.Rect.make({ x: 0, y: -18 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
                    Svg.Element.Line.make({ x: -12, y: -15 }, { x: 12, y: -15 }, "line medium"),
                    Svg.Element.Text.make(text, { x: 0, y: -17 }, "text bold"),
                    Svg.Element.Line.make({ x: 0, y: -15 }, { x: 0, y: 0 }, "line thin")
                ];
            }
            function powerGroundGraphics() {
                return [
                    Svg.Element.Rect.make({ x: 0, y: 15 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
                    Svg.Element.Line.make({ x: -18, y: 10 }, { x: 18, y: 10 }, "line medium"),
                    Svg.Element.Line.make({ x: -12, y: 15 }, { x: 12, y: 15 }, "line medium"),
                    Svg.Element.Line.make({ x: -6, y: 20 }, { x: 6, y: 20 }, "line medium"),
                    Svg.Element.Line.make({ x: 0, y: 10 }, { x: 0, y: 0 }, "line thin")
                ];
            }
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            _Power.INDEXCONNECTION = 0;
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            function drawLayout(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const end1 = instance.joints[_Resistor.INDEXEND1];
                const end2 = instance.joints[_Resistor.INDEXEND2];
                let centre = vector(end1, end2).centre().vector;
                let rotation = vector(end1).getAngleTo(end2);
                let bodyPath = "m-12.5 -6" + "h25" + "c15 -8 15 20 0 12" + "h-25" + "c-15 +8 -15 -20 0 -12" + "Z";
                bodyGroup.append(Svg.Element.Path.make(bodyPath, "body"), getBands(instance.resistance), Svg.Element.Path.make(bodyPath, "highlight nofill"));
                return [
                    Svg.Element.Path.make([end1, end2], "lead"),
                    bodyGroup.translate(centre).rotate(rotation)
                ];
            }
            _Resistor.drawLayout = drawLayout;
            function getBands(num) {
                let exp = num.toExponential(1);
                let sigFig1 = exp.slice(exp.indexOf(".") - 1)[0];
                let sigFig2 = exp.slice(exp.indexOf(".") + 1)[0];
                let multiplier = (parseInt(exp.slice(exp.indexOf("e") + 1), 10) - 1).toString();
                let colours = {
                    "-3": "pink",
                    "-2": "silver",
                    "-1": "gold",
                    "0": "black",
                    "1": "brown",
                    "2": "red",
                    "3": "#FF7F26",
                    "4": "yellow",
                    "5": "green",
                    "6": "blue",
                    "7": "violet",
                    "8": "grey",
                    "9": "white"
                };
                let b1 = Svg.Element.Rect.make({ x: -17.5, y: 0 }, { width: 3, height: 18 }, undefined, "band1");
                let b2 = Svg.Element.Rect.make({ x: -11, y: 0 }, { width: 3, height: 12 }, undefined, "band2");
                let b3 = Svg.Element.Rect.make({ x: -4, y: 0 }, { width: 3, height: 12 }, undefined, "band3");
                let b4 = Svg.Element.Rect.make({ x: 3.5, y: 0 }, { width: 4, height: 12 }, undefined, "band4");
                $(b1.element).css("fill", colours[sigFig1]);
                $(b2.element).css("fill", colours[sigFig2]);
                $(b3.element).css("fill", colours[multiplier]);
                $(b4.element).css("fill", "transparent");
                return [b1, b2, b3, b4];
            }
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            function drawSchematic(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const end1 = instance.joints[_Resistor.INDEXEND1];
                const end2 = instance.joints[_Resistor.INDEXEND2];
                let centre = vector(end1, end2).centre().vector;
                let rotation = vector(end1).getAngleTo(end2);
                let [start1, start2] = vector({ x: -24, y: 0 }, { x: 24, y: 0 }).rotate(rotation).sumWith(centre).vectors;
                let text = Utility.getStandardForm(instance.resistance, 'Ω');
                bodyGroup.append(Svg.Element.Rect.make(vector(0), { width: 46, height: 18 }, vector(2), "highlight highlightwithfill extrathick"), Svg.Element.Rect.make(vector(0), { width: 46, height: 18 }, vector(2), "body white"));
                let textEl = Svg.Element.Text.make(text, { x: 0, y: -15 }, "text");
                return [
                    Svg.Element.Path.make([[start1, end1], [start2, end2]], "line thin"),
                    bodyGroup.translate(centre).rotate(rotation),
                    textEl.translate(centre).rotatePosition(rotation),
                ];
            }
            _Resistor.drawSchematic = drawSchematic;
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            _Resistor.INDEXEND1 = 0;
            _Resistor.INDEXEND2 = 1;
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Stripboard;
        (function (_Stripboard) {
            function makeTracks(parent) {
                let gS = Constants.gridSpacing;
                let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);
                let start = vector({
                    x: -((parent.columns - 1) * gS / 2),
                    y: -((parent.rows - 1) * gS / 2)
                }).rotate(rotation).sumWith(parent.joints[0]);
                let step = vector({ x: gS, y: 0 }).rotate(rotation);
                let tracks = [];
                for (let row = 0; row < parent.rows; row++) {
                    let rowStart = start.sumWith(vector({ x: 0, y: row * gS }).rotate(rotation)).vector;
                    let holeSpacings = [0].concat(Array(parent.columns - 1).fill(1));
                    let track = Component.track.make({
                        holeSpacings: holeSpacings,
                        style: "stripboard",
                        joints: [rowStart, step]
                    }, false);
                    tracks.push(track);
                }
                return tracks;
            }
            _Stripboard.makeTracks = makeTracks;
        })(_Stripboard = Component._Stripboard || (Component._Stripboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Stripboard;
        (function (_Stripboard) {
            _Stripboard.INDEXCENTRE = 0;
            _Stripboard.INDEXROTATION = 1;
        })(_Stripboard = Component._Stripboard || (Component._Stripboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Track;
        (function (_Track) {
            const drawStripboardHole = (position) => Svg.Element.Circle.make(position, 4, "hole");
            const drawBreadboardHole = (position) => Svg.Element.Rect.make(position, { width: 8, height: 8 }, vector(0.5), "hole");
            function drawLayout(instance) {
                const holeFunc = (instance.style === "breadboard") ? drawBreadboardHole : drawStripboardHole;
                const start = instance.joints[_Track.INDEXSTART];
                const step = instance.joints[_Track.INDEXSTEP];
                const holePositions = vector(step).scaleMap(Utility.cumulativeSum(...instance.holeSpacings)).sumWith(start).vectors;
                const holes = holePositions.map(hp => holeFunc(hp));
                const track = drawTrack(holePositions);
                return [track, ...holes];
            }
            _Track.drawLayout = drawLayout;
            const drawTrack = (holePositions) => {
                let start = holePositions[0];
                let end = holePositions[holePositions.length - 1];
                let relativeEnd = vector(end, vector(start).scaleWith(-1)).sum();
                let { radius, angle } = relativeEnd.asPolar();
                let centre = vector(start, start, relativeEnd).sum().scaleWith(0.5).vector;
                let size = {
                    width: radius + Constants.gridSpacing * 0.8,
                    height: Constants.gridSpacing * 14 / 16
                };
                return Svg.Element.Rect.make(centre, size, vector(0), 'body').rotate(angle, centre);
            };
        })(_Track = Component._Track || (Component._Track = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Track;
        (function (_Track) {
            _Track.INDEXSTART = 0;
            _Track.INDEXSTEP = 1;
        })(_Track = Component._Track || (Component._Track = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            function drawLayout(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const joints = instance.joints;
                let coverPath, leadPath = "";
                let coverRatio = 0.6;
                coverPath = leadPath = "M " + joints[0].x + " " + joints[0].y;
                coverPath += getSegmentTowardsJointMid(joints[0], joints[1], -coverRatio);
                leadPath += getSegmentTowardsJointMid(joints[0], joints[1], 1);
                let pathMid = getBezierBetweenJoints(joints);
                coverPath += pathMid;
                leadPath += pathMid;
                coverPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], coverRatio);
                leadPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], 1);
                let cover = Svg.Element.Path.make(coverPath, "cover");
                $(cover.element).css("stroke", instance.color);
                bodyGroup.append(Svg.Element.Path.make(leadPath, "lead"), Svg.Element.Path.make(coverPath, "leadhighlight highlight"), cover);
                return bodyGroup;
            }
            _Wire.drawLayout = drawLayout;
            function getBezierBetweenJoints(joints) {
                let path = "";
                for (let j = 1; j < joints.length - 1; j++) {
                    let p3 = {
                        x: (joints[j + 1].x + joints[j].x) / 2,
                        y: (joints[j + 1].y + joints[j].y) / 2
                    };
                    path += "Q " + joints[j].x + " " + joints[j].y +
                        " " + p3.x + " " + p3.y;
                }
                return path;
            }
            function getSegmentTowardsJointMid(j0, j1, ratio) {
                let changeMid = {
                    x: (j1.x - j0.x) / 2,
                    y: (j1.y - j0.y) / 2
                };
                if (Math.sign(ratio) >= 0) {
                    return 'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio) +
                        'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio));
                }
                else {
                    ratio = Math.abs(ratio);
                    return 'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio)) +
                        'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio);
                }
            }
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            function drawSchematic(instance) {
                return [
                    Svg.Element.Path.make(instance.joints, "line thin")
                ];
            }
            _Wire.drawSchematic = drawSchematic;
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Group;
        (function (Group) {
            var Wire;
            (function (Wire) {
                var Layout;
                (function (Layout) {
                    function make(joints, color, classes = "") {
                        const bodyGroup = Group.make(classes);
                        let coverPath, leadPath = "";
                        let coverRatio = 0.6;
                        coverPath = leadPath = "M " + joints[0].x + " " + joints[0].y;
                        coverPath += getSegmentTowardsJointMid(joints[0], joints[1], -coverRatio);
                        leadPath += getSegmentTowardsJointMid(joints[0], joints[1], 1);
                        let pathMid = getBezierBetweenJoints(joints);
                        coverPath += pathMid;
                        leadPath += pathMid;
                        coverPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], coverRatio);
                        leadPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], 1);
                        let cover = Svg.Element.Path.make(coverPath, "cover");
                        $(cover.element).css("stroke", color);
                        bodyGroup.append(Svg.Element.Path.make(leadPath, "lead"), Svg.Element.Path.make(coverPath, "leadhighlight highlight"), cover);
                        return bodyGroup;
                    }
                    Layout.make = make;
                    function getBezierBetweenJoints(joints) {
                        let path = "";
                        for (let j = 1; j < joints.length - 1; j++) {
                            let p3 = {
                                x: (joints[j + 1].x + joints[j].x) / 2,
                                y: (joints[j + 1].y + joints[j].y) / 2
                            };
                            path += "Q " + joints[j].x + " " + joints[j].y +
                                " " + p3.x + " " + p3.y;
                        }
                        return path;
                    }
                    function getSegmentTowardsJointMid(j0, j1, ratio) {
                        let changeMid = {
                            x: (j1.x - j0.x) / 2,
                            y: (j1.y - j0.y) / 2
                        };
                        if (Math.sign(ratio) >= 0) {
                            return 'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio) +
                                'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio));
                        }
                        else {
                            ratio = Math.abs(ratio);
                            return 'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio)) +
                                'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio);
                        }
                    }
                })(Layout = Wire.Layout || (Wire.Layout = {}));
            })(Wire = Group.Wire || (Group.Wire = {}));
        })(Group = Element.Group || (Element.Group = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Group;
        (function (Group) {
            var Wire;
            (function (Wire) {
                var Schematic;
                (function (Schematic) {
                    function make(joints, classes = "") {
                        return [
                            Svg.Element.Path.make(joints, "line thin")
                        ];
                    }
                    Schematic.make = make;
                })(Schematic = Wire.Schematic || (Wire.Schematic = {}));
            })(Wire = Group.Wire || (Group.Wire = {}));
        })(Group = Element.Group || (Element.Group = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Board;
            (function (Board) {
                function init(component, isReversible) {
                    $(component.group.element).addClass("board");
                    Object.defineProperty(component, 'connectorSets', {
                        get: () => Utility.flatten2d(component.tracks.map(track => track.connectorSets))
                    });
                    if (isReversible) {
                        Reversible.init(component);
                    }
                }
                Board.init = init;
                let Reversible;
                (function (Reversible) {
                    Reversible.init = (component) => {
                        let element = component.group;
                        $(element.element).on(Circuit.Events.select, () => {
                            createGhost(component);
                        });
                        $(element.element).on(Circuit.Events.dragStart, () => {
                            clearGhost(component);
                        });
                        $(element.element).on(Circuit.Events.rotate, () => {
                            clearGhost(component);
                            createGhost(component);
                        });
                        $(element.element).on(Circuit.Events.dragStop, () => {
                            createGhost(component);
                        });
                        $(element.element).on(Circuit.Events.deselect, () => {
                            clearGhost(component);
                        });
                        $(element.element).on(Circuit.Events.draw, () => {
                            if ($(element.element).hasClass("selected")) {
                                clearGhost(component);
                                createGhost(component);
                            }
                        });
                    };
                    const createGhost = (component) => {
                        let ghostGroup = component.group.element.cloneNode();
                        let bbox = component.group.element.getBBox();
                        Svg.addTransform(ghostGroup, t => t.setScale(-1, 1), false);
                        Svg.addTransform(ghostGroup, t => t.setTranslate(-(bbox.width + bbox.x) * 2 - 1, 0), false);
                        ghostGroup.appendChild($(component.group.element).children(".body").clone()[0]);
                        $(ghostGroup).addClass("reverseghost");
                        $(ghostGroup).data("selects", component);
                        let parent = (component.group.element.parentElement);
                        if (parent)
                            parent.appendChild(ghostGroup);
                        let allValidConnectors = Utility.flatten2d(Circuit.manifest.layout.map(el => Utility.flatten2d(el.connectorSets.map(connectorSet => connectorSet.filter(connector => connector.type === "pin")))));
                        component.tracks.forEach((track, trackIdx) => {
                            let trackGhostGroup = $(track.group.element).clone()[0];
                            ghostGroup.appendChild(trackGhostGroup);
                            track.connectorSets[0].forEach((hole, holeIdx) => {
                                let point = hole.point;
                                let breaker = Svg.Element.Circle.make(point, 6, "breaker");
                                if (hole.type === "brokenhole") {
                                    $(breaker.element).addClass("broken");
                                }
                                if (getPinsAtHole(hole, allValidConnectors).length) {
                                    $(breaker.element).addClass("withPin");
                                }
                                ;
                                trackGhostGroup.appendChild(breaker.element);
                                let holePosition = { track: trackIdx, hole: holeIdx };
                                $(breaker.element).click(() => {
                                    Circuit.history.addEvent(component);
                                    if (hole.type === "hole") {
                                        $(breaker.element).addClass("broken");
                                        hole.type = "brokenhole";
                                        component.trackBreaks.push(holePosition);
                                    }
                                    else if (hole.type === "brokenhole") {
                                        $(breaker.element).removeClass("broken");
                                        hole.type = "hole";
                                        component.trackBreaks = component.trackBreaks.filter(trackBreak => (trackBreak.hole !== holePosition.hole || trackBreak.track !== holePosition.track));
                                    }
                                });
                            });
                        });
                    };
                    const clearGhost = (component) => {
                        let parent = (component.group.element.parentElement);
                        if (parent)
                            $(parent).children(".reverseghost").remove();
                    };
                    function getPinsAtHole(connector, allConnectors) {
                        let acceptedTypes = ["pin"];
                        let point = connector.point;
                        let attachedConnectors = allConnectors.filter(other => {
                            return (acceptedTypes.includes(other.type)
                                && vector(point).isCloseTo(other.point));
                        });
                        return attachedConnectors;
                    }
                })(Reversible || (Reversible = {}));
            })(Board = Addins.Board || (Addins.Board = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var ConnectionHighlights;
            (function (ConnectionHighlights) {
                ConnectionHighlights.init = (component, propogate = true, colorPalette = defaultColorPalette) => {
                    let element = component.group.element;
                    $(element).on(Circuit.Events.select, () => {
                        createConnectionsHighlights(component, propogate, colorPalette);
                    });
                    $(element).on(Circuit.Events.draw, () => {
                        clearConnectionsHighlights(component);
                        if ($(component.group.element).hasClass("selected")) {
                            createConnectionsHighlights(component, propogate, colorPalette);
                        }
                    });
                    $(element).on(Circuit.Events.deselect, () => {
                        clearConnectionsHighlights(component);
                    });
                };
                const createConnectorHighlights = (component, connection, color) => {
                    let highlight = Svg.Element.Circle.make(connection.point, 4, "highlight highlightwithfill connectivityhighlight");
                    $(highlight.element).css({ "fill": color, "stroke": color });
                    component.group.append(highlight);
                    if (connection.symbol !== undefined) {
                        let symbol = Svg.Element.Text.make(connection.symbol, connection.point, "text connectivityhighlight");
                        component.group.append(symbol);
                    }
                };
                const createConnectionsHighlights = (component, propogate, colorPalette) => {
                    let connectionSets = component.getConnections();
                    connectionSets.forEach(connectionSet => {
                        connectionSet.forEach((connectorConnections, i) => {
                            let color = colorPalette[i % colorPalette.length];
                            if (connectorConnections.length > 1 && propogate) {
                                connectorConnections.slice(1).forEach(connector => {
                                    createConnectorHighlights(component, connector, color);
                                });
                            }
                            createConnectorHighlights(component, connectorConnections[0], color);
                        });
                    });
                };
                const clearConnectionsHighlights = (component) => {
                    $(component.group.element).find(".connectivityhighlight").remove();
                };
                const defaultColorPalette = [
                    "red",
                    "#8bc34a",
                    "pink",
                    "yellow",
                    "cyan",
                    "orange",
                    "purple",
                    "magenta"
                ];
            })(ConnectionHighlights = Addins.ConnectionHighlights || (Addins.ConnectionHighlights = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Draggable;
            (function (Draggable) {
                Draggable.init = (component) => {
                    Svg.Addins.Draggable.init(component.group.element, {
                        disableMovement: true,
                        onStart: () => {
                            Circuit.history.addEvent(component);
                            component.insertInto(component.group.element);
                        },
                        onDrag: (drag) => {
                            component.joints.forEach(joint => {
                                joint.x += drag.x;
                                joint.y += drag.y;
                            });
                            $(component.group.element).trigger(Circuit.Events.draw);
                        },
                        onStop: () => {
                            component.joints.forEach(joint => {
                                joint.x = Math.round(joint.x);
                                joint.y = Math.round(joint.y);
                            });
                        }
                    });
                    if (Circuit.mappings.getComponentMapSafe(component).isBoard &&
                        NodeElements.boardDraggingDisabled.checked) {
                        Draggable.disable(component);
                    }
                };
                Draggable.disable = (component) => {
                    if ($(component.group.element).draggable("instance") !== undefined) {
                        $(component.group.element).draggable("disable");
                    }
                };
                Draggable.enable = (component) => {
                    if ($(component.group.element).draggable("instance") !== undefined) {
                        $(component.group.element).draggable("enable");
                    }
                };
            })(Draggable = Addins.Draggable || (Addins.Draggable = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Extendable;
            (function (Extendable) {
                Extendable.init = (component, canAddJoints = false, canRemoveJoints = false, canRemoveComponent = false) => {
                    let element = component.group.element;
                    $(element).on(Circuit.Events.select, () => {
                        createHandles(component);
                    });
                    $(element).on(Circuit.Events.draw, (e, eOrigin) => {
                        if (!(eOrigin !== undefined && $(eOrigin.target).hasClass("dragHandle"))) {
                            clearHandles(component);
                            createHandles(component);
                        }
                    });
                    $(element).on(Circuit.Events.dragStop, () => {
                        clearHandles(component);
                        createHandles(component);
                    });
                    $(element).on(Circuit.Events.deselect, () => {
                        clearHandles(component);
                    });
                    if (canAddJoints)
                        initHandleInsertion(component);
                    if (canRemoveJoints)
                        initJointRemoval(component);
                    if (canRemoveComponent)
                        initComponentRemoval(component);
                };
                const createHandles = (component) => {
                    initHandles(component);
                };
                const clearHandles = (component) => {
                    $(component.group.element).children(".dragHandle").remove();
                };
                const initHandles = (component) => {
                    component.joints.forEach(joint => {
                        addHandle(component, joint);
                    });
                };
                const initHandleInsertion = (component) => {
                    $(component.group.element).dblclick(e => {
                        if ($(e.target).closest(".handle").length < 1) {
                            const position = vector(component.group.convertVector({ x: e.clientX, y: e.clientY }, "DomToSvg", "relToGroup")).snapToGrid().vector;
                            const jointIdx = getJointInsertionIdx(component, position);
                            component.joints.splice(jointIdx, 0, position);
                            addHandle(component, position);
                            $(component.group.element).trigger(Circuit.Events.draw, [e]);
                        }
                    });
                };
                const initJointRemoval = (component) => {
                    $(component.group.element).on(Circuit.Events.drag, ".dragHandle", (e) => {
                        removeExcessJoints(component, $(e.target).data("point"));
                        $(component.group.element).trigger(Circuit.Events.draw, [e]);
                    });
                    $(component.group.element).on("dblclick", ".dragHandle", (e) => {
                        if (component.joints.length > 2) {
                            const point = $(e.target).data("point");
                            component.joints = component.joints.filter(Utility.isNot(point));
                            e.target.remove();
                            $(component.group.element).trigger(Circuit.Events.draw, [e]);
                        }
                    });
                };
                const initComponentRemoval = (component) => {
                    $(component.group.element).on(Circuit.Events.dragStop, ".dragHandle", (e) => {
                        if (component.joints.length === 2 && vector(component.joints[0]).isCloseTo(component.joints[1])) {
                            Circuit.manifest.removeComponent(component);
                            Circuit.history.mergeLast();
                        }
                    });
                };
                const addHandle = (component, point) => {
                    let dragHandle = Svg.Element.Circle.make(point, 5, "handle dragHandle highlight");
                    $(dragHandle.element).data('point', point);
                    component.group.append(dragHandle);
                    Svg.Addins.Draggable.init(dragHandle.element);
                    $(dragHandle.element).on(Circuit.Events.drag, (e, ui, drag) => {
                        point.x += drag.x;
                        point.y += drag.y;
                        $(component.group.element).trigger(Circuit.Events.draw, [e]);
                    });
                    $(dragHandle.element).on(Circuit.Events.dragStop, (e, ui, drag) => {
                        point.x = Math.round(point.x);
                        point.y = Math.round(point.y);
                    });
                    return dragHandle;
                };
                const removeExcessJoints = (component, point) => {
                    if (component.joints.length > 2) {
                        component.joints = component.joints.filter((joint) => {
                            return (joint === point) || !vector(point).isCloseTo(joint);
                        });
                        $(component.group.element).children(".dragHandle").not(".dragging").filter((i, el) => {
                            return vector(point).isCloseTo($(el).data('point'));
                        }).remove();
                    }
                    ;
                };
                const getJointInsertionIdx = (component, point) => {
                    let jointAngles = component.joints.map((j) => Math.atan2(point.y - j.y, point.x - j.x) * 180 / Math.PI);
                    let bestAnglePair = 180;
                    let bestJointIdx = 0;
                    for (let i = 1; i < jointAngles.length; i++) {
                        let anglePair = Math.abs(Math.abs((jointAngles[i - 1] - jointAngles[i])) - 180);
                        if (anglePair < bestAnglePair) {
                            bestAnglePair = anglePair;
                            bestJointIdx = i;
                        }
                    }
                    return bestJointIdx;
                };
            })(Extendable = Addins.Extendable || (Addins.Extendable = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Graphical;
            (function (Graphical) {
                Graphical.init = (component) => {
                    let element = component.group.element;
                    $(element).on(Circuit.Events.draw, () => {
                        if (component.disabled === false) {
                            $(component.group.element).show();
                            component.group.clearChildren(":not(.handle,.connectivityhighlight)");
                            component.draw();
                            component.makeConnectors();
                        }
                        else {
                            $(component.group.element).hide();
                        }
                    });
                };
            })(Graphical = Addins.Graphical || (Addins.Graphical = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Junctions;
            (function (Junctions) {
                Junctions.init = (component) => {
                    let element = component.group;
                    $(element.element).on(Circuit.Events.moved + " " + Circuit.Events.place, () => {
                        clearJunctions(component);
                        createJunctions(component);
                    });
                };
                const createJunctions = (component) => {
                    let otherConnectors = Utility.flatten2d(Circuit.manifest.schematic.map(component => Utility.flatten2d(component.connectorSets).filter(connector => (connector.type === "node"))));
                    component.connectorSets.forEach(connectorSet => connectorSet.forEach(connector => {
                        let point = connector.point;
                        let attachedConnectors = otherConnectors.filter(other => {
                            return vector(point).isCloseTo(other.point);
                        });
                        if (attachedConnectors.length === 3) {
                            component.group.prepend(Svg.Element.Circle.make(point, 5, "junction black"));
                        }
                    }));
                };
                const clearJunctions = (component) => {
                    $(component.group.element).find(".junction").remove();
                };
            })(Junctions = Addins.Junctions || (Addins.Junctions = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Recolorable;
            (function (Recolorable) {
                Recolorable.init = (component, where, colorPalette = defaultColorPalette) => {
                    const element = component.group.element;
                    $(element).on(Circuit.Events.select, () => {
                        createRecolorHandle(component, where(), colorPalette);
                    });
                    $(element).on(Circuit.Events.draw, () => {
                        clearRecolorHandle(component);
                        createRecolorHandle(component, where(), colorPalette);
                    });
                    $(element).on(Circuit.Events.deselect, () => {
                        clearRecolorHandle(component);
                    });
                };
                const refreshComponent = (component) => {
                    component.group.clearChildren(":not(.handle,.connectivityhighlight)");
                    component.makeConnectors();
                    $(component.group.element).trigger(Circuit.Events.draw);
                };
                const createRecolorHandle = (component, position, colorPalette) => {
                    let recolorSegmentGroup = Svg.Element.Group.make("recolorSegmentGroup");
                    let recolorHandle = Svg.Element.Circle.make(position, 7, "handle recolorHandle");
                    let segment1 = Svg.Element.Rect.make(position, { width: 10, height: 20 }, undefined, "recolorHandleSegment").rotate(45, position).translate({ x: -4, y: -4 });
                    let segment2 = Svg.Element.Rect.make(position, { width: 10, height: 20 }, undefined, "recolorHandleSegment").rotate(45, position).translate({ x: 4, y: 4 });
                    $(segment1.element).css("fill", "#4fd56b");
                    $(segment2.element).css("fill", "#d54f6b");
                    recolorSegmentGroup.append(segment1, segment2);
                    component.group.append(recolorHandle, recolorSegmentGroup);
                    $(recolorHandle.element).on("click", () => {
                        let colorIndex = colorPalette.indexOf(component.color);
                        let color;
                        if (colorIndex >= 0) {
                            color = colorPalette[(colorIndex + 1) % colorPalette.length];
                        }
                        else {
                            color = colorPalette[0];
                        }
                        ;
                        component.color = color;
                        refreshComponent(component);
                    });
                };
                const clearRecolorHandle = (component) => {
                    $(component.group.element).find(".recolorHandle").remove();
                    $(component.group.element).find(".recolorSegmentGroup").remove();
                };
                const defaultColorPalette = [
                    "#545454",
                    "red",
                    "#7575FF",
                    "#946857",
                    "#55DD55",
                    "#FFEF00",
                    "pink"
                ];
            })(Recolorable = Addins.Recolorable || (Addins.Recolorable = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Rotatable;
            (function (Rotatable) {
                Rotatable.init = (component) => {
                    $(component.group.element).dblclick(() => {
                        Circuit.history.addEvent(component);
                        let centre = component.joints[0];
                        component.joints = vector(component.joints)
                            .sumWith(vector(centre).scaleWith(-1))
                            .rotate(90)
                            .sumWith(centre)
                            .vectors;
                        $(component.group.element).trigger(Circuit.Events.draw);
                        $(component.group.element).trigger(Circuit.Events.rotate);
                    });
                };
            })(Rotatable = Addins.Rotatable || (Addins.Rotatable = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Selectable;
            (function (Selectable) {
                Selectable.init = (component) => {
                    setSelectTrigger(component);
                    setDisplayHandlers(component);
                };
                const findSelectionElements = (component) => {
                    return Circuit.manifest.findCorresponding(component).concat(component).map(el => el.group.element);
                };
                const elementSelectsComponent = (element, component) => {
                    const selectionElements = findSelectionElements(component);
                    const selectionElementIsSelected = $(element).closest(selectionElements).length > 0;
                    const elementSelectsComponent = $(element).parents().is((i, el) => ($(el).data("selects") === component));
                    return (selectionElementIsSelected || elementSelectsComponent);
                };
                const setSelectTrigger = (component) => {
                    $(component.group.element).one("mousedown", () => {
                        console.groupCollapsed("Selected", component.group.element);
                        console.log("Primary: %o", component);
                        const otherComponents = Circuit.manifest.findCorresponding(component);
                        console.log("Secondaries: %o", otherComponents);
                        const selectComponents = otherComponents.concat(component);
                        selectComponents.forEach(selectComponent => {
                            $(selectComponent.group.element).trigger(Circuit.Events.select);
                            setDeselectTrigger(selectComponent);
                        });
                        console.groupEnd();
                    });
                };
                const setDeselectTrigger = (component) => {
                    $(document).one("mousedown", e => {
                        if (elementSelectsComponent(e.target, component)) {
                            setDeselectTrigger(component);
                        }
                        else {
                            $(component.group.element).trigger(Circuit.Events.deselect);
                            setSelectTrigger(component);
                        }
                    });
                };
                const setDisplayHandlers = (component) => {
                    $(component.group.element).on(Circuit.Events.select, () => {
                        $(component.group.element).addClass("selected");
                        component.insertInto(component.group.element);
                    });
                    $(component.group.element).on(Circuit.Events.deselect, () => {
                        $(component.group.element).removeClass("selected");
                    });
                };
            })(Selectable = Addins.Selectable || (Addins.Selectable = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var WireCreation;
            (function (WireCreation) {
                WireCreation.init = (component) => {
                    $(component.group.element).on("mouseenter", ".hole", (mOE) => {
                        if (!$(mOE.target).draggable('instance')) {
                            Svg.Addins.Draggable.init(component.group.element, {
                                eventTarget: mOE.target,
                                disableMovement: true,
                                styleClass: ""
                            });
                            let dragHandle;
                            $(mOE.target).on(Circuit.Events.dragStart, (e, ui, drag) => {
                                e.stopPropagation();
                                const position = Active.layout.group.convertVector({ x: e.clientX, y: e.clientY }, "DomToSvg", "relToGroup");
                                const gridPosition = vector(position).snapToGrid().vector;
                                const wire = createWireAtPoint(gridPosition);
                                $(wire.group.element).trigger(Circuit.Events.draw);
                                dragHandle = $(wire.group.element).find(".dragHandle")[0];
                                $(dragHandle).trigger("mousedown");
                            });
                            $(mOE.target).on(Circuit.Events.drag, (e, ui, drag) => {
                                e.stopPropagation();
                                $(dragHandle).trigger(Circuit.Events.drag, [ui, drag]);
                            });
                            $(mOE.target).on(Circuit.Events.dragStop, (e, ui) => {
                                e.stopPropagation();
                                $(dragHandle).trigger(Circuit.Events.dragStop, ui);
                            });
                        }
                    });
                };
                const createWireAtPoint = (vector) => {
                    const wire = Component.wire.layout.make({
                        joints: [{ x: vector.x, y: vector.y }, { x: vector.x, y: vector.y }],
                    });
                    Circuit.manifest.addComponent(Circuit.manifest.layout, wire);
                    return wire;
                };
            })(WireCreation = Addins.WireCreation || (Addins.WireCreation = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Generics;
        (function (Generics) {
            function getComponentConnections(component, otherComponents) {
                const allConnectors = Utility.flatten3d(otherComponents.map(el => el.connectorSets));
                return component.connectorSets.map(connectorSet => {
                    const uniqueNetConnectors = getUniqueNetConnectors(connectorSet);
                    return uniqueNetConnectors.map(connector => {
                        return getConnectorConnections(connector, allConnectors);
                    });
                });
            }
            Generics.getComponentConnections = getComponentConnections;
            function getUniqueNetConnectors(connectors) {
                let nonCheckedConnectors = connectors;
                let uniqueNetConnectors = [];
                while (nonCheckedConnectors.length) {
                    uniqueNetConnectors.push(nonCheckedConnectors[0]);
                    let nettedConnectors = nonCheckedConnectors[0]
                        .component.transferFunction(nonCheckedConnectors[0])
                        .concat(nonCheckedConnectors[0]);
                    nonCheckedConnectors = nonCheckedConnectors.filter(connector => !nettedConnectors.includes(connector));
                }
                return uniqueNetConnectors;
            }
            function getConnectorConnections(connector, allConnectors) {
                let connectedConnectors = [];
                let nonCheckedConnections = connector.component.transferFunction(connector).concat(connector);
                while (nonCheckedConnections.length) {
                    connectedConnectors.push(...nonCheckedConnections);
                    let newConnections = [];
                    nonCheckedConnections.forEach(connection => {
                        getConnectorDirectConnections(connection, allConnectors).forEach(connected => {
                            if (!(connectedConnectors.includes(connected))) {
                                connectedConnectors.push(connected);
                                newConnections.push(...connected.component.transferFunction(connected));
                            }
                        });
                    });
                    nonCheckedConnections = newConnections;
                }
                return connectedConnectors;
            }
            function getConnectorDirectConnections(connector, allConnectors) {
                const acceptedTypes = Circuit.mappings.connectorAcceptedTypes[connector.type];
                const point = connector.point;
                return allConnectors.filter(other => {
                    return (acceptedTypes.includes(other.type)
                        && vector(point).isCloseTo(other.point));
                });
            }
        })(Generics = Component.Generics || (Component.Generics = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Generics;
        (function (Generics) {
            function makeConnector(component, name, type, position, symbol) {
                let connector = {
                    name: name,
                    symbol: symbol,
                    type: type,
                    component: component,
                    point: position,
                };
                return connector;
            }
            Generics.makeConnector = makeConnector;
        })(Generics = Component.Generics || (Component.Generics = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
var Circuit;
(function (Circuit) {
    var Parts;
    (function (Parts) {
        class Diagram {
            constructor(node) {
                this.root = new Svg.Root();
                this.group = this.root.group;
                this.root.draw(node);
            }
        }
        Parts.Diagram = Diagram;
    })(Parts = Circuit.Parts || (Circuit.Parts = {}));
})(Circuit || (Circuit = {}));
var FileIO;
(function (FileIO) {
    var Load;
    (function (Load) {
        function handleFileInputEvent(event) {
            let fileInput = event.target;
            if (fileInput.value.length == 0) {
            }
            else {
                console.groupCollapsed("File Load Data");
                $.Deferred().resolve(fileInput)
                    .then(() => Load.getStringFromFileInput(fileInput))
                    .then((file, fileString) => {
                    let filename = file.name;
                    let fileExtension = filename.split('.').pop();
                    Load.lastFilename = filename;
                    if (fileExtension === "dasim" || fileExtension === "layout") {
                        $.Deferred().resolve(fileString)
                            .then((string) => Load.Dasim.getRawComponentsFromString(string))
                            .then((circuitObjects) => Load.Dasim.filterInvalidComponents(circuitObjects))
                            .then((rawComponents) => Load.Dasim.buildComponents(rawComponents))
                            .then((savedManifest) => {
                            NodeElements.fileStatusText.innerText = "File:\r\n\"" + filename + "\"\r\nLoaded Successfully";
                            if (savedManifest) {
                                Circuit.manifest.constructFrom(savedManifest);
                                Circuit.history.reInit(...Circuit.manifest.layout);
                            }
                            else {
                                console.error("savedManifest is undefined");
                            }
                            console.groupEnd();
                            Ui.Events.schematicPaneResize();
                            Ui.Events.layoutPaneResize();
                        })
                            .fail((failText) => {
                            console.warn("Failed to load circuit: ", failText);
                            NodeElements.fileStatusText.innerText = "Failed to load file:\r\n\""
                                + "" + filename + "\"\r\n"
                                + "Error:\r\n\"" +
                                failText + "\"";
                            console.groupEnd();
                        });
                    }
                    else {
                        console.error("Failed to load circuit: Incorrect file extenstion %o", fileExtension);
                        NodeElements.fileStatusText.innerText = "Failed to load file:\r\n\""
                            + "" + filename + "\"\r\n"
                            + "Error:\r\n\"" +
                            "Incorrect file extenstion: \"." + fileExtension + "\"\"";
                        console.groupEnd();
                    }
                    $(fileInput).val("");
                });
            }
        }
        Load.handleFileInputEvent = handleFileInputEvent;
    })(Load = FileIO.Load || (FileIO.Load = {}));
})(FileIO || (FileIO = {}));
var FileIO;
(function (FileIO) {
    var Load;
    (function (Load) {
        var Dasim;
        (function (Dasim) {
            function buildComponents(rawComponents) {
                console.groupCollapsed("Component Load Data");
                let manifest = {
                    schematic: [],
                    layout: []
                };
                for (let rawComponent of rawComponents) {
                    const componentMap = Circuit.mappings.getComponentMap(rawComponent.func);
                    if (componentMap === undefined) {
                        console.error("I don't know how to build %o yet!", rawComponent);
                        continue;
                    }
                    const sectionName = componentMap.diagramType;
                    let manifestSection = (sectionName === "schematic") ? manifest.schematic : manifest.layout;
                    let newComponents = componentMap.load(rawComponent);
                    if (Array.isArray(newComponents)) {
                        manifestSection.push(...newComponents);
                    }
                    else {
                        manifestSection.push(newComponents);
                    }
                }
                console.groupEnd();
                return manifest;
            }
            Dasim.buildComponents = buildComponents;
        })(Dasim = Load.Dasim || (Load.Dasim = {}));
    })(Load = FileIO.Load || (FileIO.Load = {}));
})(FileIO || (FileIO = {}));
var FileIO;
(function (FileIO) {
    var Load;
    (function (Load) {
        var Dasim;
        (function (Dasim) {
            function filterInvalidComponents(circuitObjects) {
                let deferred = $.Deferred();
                let validComponents = [];
                let knownInvalidComponents = [];
                let unknownInvalidComponents = [];
                for (let circuitObject of circuitObjects) {
                    if (!("func" in circuitObject)) {
                        console.error("Object %o format is incorrect", [circuitObject]);
                        deferred.reject("Object format is incorrect");
                    }
                    if (Circuit.mappings.getComponentMap(circuitObject.func)) {
                        validComponents.push(circuitObject);
                    }
                    else if (discardableObjects.some(dO => dO === circuitObject.func)) {
                        knownInvalidComponents.push(circuitObject);
                    }
                    else {
                        unknownInvalidComponents.push(circuitObject);
                    }
                }
                if (knownInvalidComponents.length) {
                    console.debug("Sim objects %o have been safely removed", [knownInvalidComponents]);
                }
                if (unknownInvalidComponents.length) {
                    console.warn("Components %o are either not supported or not valid", [unknownInvalidComponents]);
                }
                console.info("Components %o successfully retrieved", [validComponents]);
                deferred.resolve(validComponents);
                return deferred.promise();
            }
            Dasim.filterInvalidComponents = filterInvalidComponents;
            const discardableObjects = [
                "setSimMode",
                "setGraphicsControls",
                "setDrawingControls",
            ];
        })(Dasim = Load.Dasim || (Load.Dasim = {}));
    })(Load = FileIO.Load || (FileIO.Load = {}));
})(FileIO || (FileIO = {}));
var FileIO;
(function (FileIO) {
    var Load;
    (function (Load) {
        var Dasim;
        (function (Dasim) {
            function getRawComponentsFromString(fileString) {
                let deferred = $.Deferred();
                $.Deferred().resolve(fileString)
                    .then(() => getComponentStrings(fileString))
                    .then((strings) => getCircuitObjects(strings))
                    .then(deferred.resolve)
                    .fail((failText) => deferred.reject(failText));
                return deferred.promise();
            }
            Dasim.getRawComponentsFromString = getRawComponentsFromString;
            function getComponentStrings(fileString) {
                let deferred = $.Deferred();
                try {
                    let circuitObjectStrings = [];
                    circuitObjectStrings = JSON.parse(fileString.replace("\n", ""));
                    deferred.resolve(circuitObjectStrings);
                }
                catch (e) {
                    if (e instanceof SyntaxError)
                        console.error("Error in file list format: %o ", [e]);
                    deferred.reject("Error in file list format");
                }
                return deferred.promise();
            }
            function getCircuitObjects(circuitObjectStrings) {
                let deferred = $.Deferred();
                try {
                    let circuitObjects = [];
                    for (let circuitObjectString of circuitObjectStrings) {
                        let circuitObject = JSON.parse(circuitObjectString);
                        circuitObjects.push(circuitObject);
                    }
                    console.info("Circuit objects %o successfully parsed", [circuitObjects]);
                    deferred.resolve(circuitObjects);
                }
                catch (e) {
                    if (e instanceof SyntaxError)
                        console.error("Error in file object format: %o", [e]);
                    deferred.reject("Error in file object format");
                }
                return deferred.promise();
            }
        })(Dasim = Load.Dasim || (Load.Dasim = {}));
    })(Load = FileIO.Load || (FileIO.Load = {}));
})(FileIO || (FileIO = {}));
var FileIO;
(function (FileIO) {
    var Load;
    (function (Load) {
        function getStringFromFileInput(fileInput) {
            let deferred = $.Deferred();
            let reader = new FileReader;
            let files = fileInput.files;
            reader.onloadstart = function (event) {
                console.debug("Read of %o started with %o", [this.result], [event]);
            };
            reader.onabort = function (event) {
                console.error("Read of %o aborted with %o", [this.result], [event]);
                deferred.reject("File read aborted");
            };
            reader.onerror = function (event) {
                console.error("Read of %o failed with %o", [this.result], [event]);
                deferred.reject("File could not be read");
            };
            reader.onload = function (event) {
                console.info("Read of %o successfully complete with %o", [this.result], [event]);
                let fileString = reader.result;
                if (files && files[0]) {
                    deferred.resolve(files[0], fileString);
                }
                else {
                    deferred.reject("File undefined");
                }
            };
            if (files && files[0]) {
                try {
                    reader.readAsText(files[0]);
                }
                catch (e) {
                    console.error("Read of %o failed with %o", [files[0]], [e]);
                    deferred.reject("File could not be read as string");
                }
            }
            else {
                deferred.reject("File undefined");
            }
            return deferred.promise();
        }
        Load.getStringFromFileInput = getStringFromFileInput;
    })(Load = FileIO.Load || (FileIO.Load = {}));
})(FileIO || (FileIO = {}));
var FileIO;
(function (FileIO) {
    var Save;
    (function (Save) {
        function createFile() {
            let componentStrings = [];
            Circuit.manifest.layout.concat(Circuit.manifest.schematic).forEach(component => {
                try {
                    const componentMap = Circuit.mappings.getComponentMap(component);
                    if (componentMap === undefined) {
                        console.error("No component map found!", component);
                        throw new Error("Could not save component");
                    }
                    let componentObject = Object.assign({ func: Circuit.mappings.getComponentMapSafe(component).savename }, component.getProperties(), component.getState());
                    if (componentObject.disabled === false) {
                        delete componentObject.disabled;
                        componentStrings.push(JSON.stringify(componentObject));
                    }
                }
                catch (e) {
                    console.error("Item %o cannot be saved (check mappings) with error %o", component, e);
                }
            });
            return JSON.stringify(componentStrings, undefined, 2);
        }
        Save.createFile = createFile;
    })(Save = FileIO.Save || (FileIO.Save = {}));
})(FileIO || (FileIO = {}));
var FileIO;
(function (FileIO) {
    var Save;
    (function (Save) {
        function handleFileSaveEvent(event) {
            let downloadElement = document.createElement('a');
            let fileString = Save.createFile();
            downloadElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileString));
            if (FileIO.Load.lastFilename !== undefined) {
                downloadElement.setAttribute('download', FileIO.Load.lastFilename.split('.').shift() + ".layout");
            }
            else {
                downloadElement.setAttribute('download', 'filename.layout');
            }
            downloadElement.style.display = 'none';
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            $(window).one("blur", () => {
                $(window).one("focus", () => {
                    NodeElements.fileStatusText.innerText = "File Saved Successfully";
                });
            });
        }
        Save.handleFileSaveEvent = handleFileSaveEvent;
    })(Save = FileIO.Save || (FileIO.Save = {}));
})(FileIO || (FileIO = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        function make(type, classes = "") {
            const element = document.createElementNS(Constants.svgURI, type);
            $(element).addClass(classes);
            return element;
        }
        Element.make = make;
        let Functions;
        (function (Functions) {
            function rotate(element) {
                return (rotation, centre, insertBefore = false) => {
                    let centreV;
                    if (centre) {
                        centreV = centre;
                    }
                    else {
                        let bounds = element.getBBox();
                        centreV = { x: bounds.width / 2 + bounds.x, y: bounds.height / 2 + bounds.y };
                    }
                    Svg.addTransform(element, t => t.setRotate(rotation, centreV.x, centreV.y), insertBefore);
                    return svg(element);
                };
            }
            Functions.rotate = rotate;
            function translate(element) {
                return (translation, insertBefore = true) => {
                    Svg.addTransform(element, t => t.setTranslate(translation.x, translation.y), insertBefore);
                    return svg(element);
                };
            }
            Functions.translate = translate;
            function scale(element) {
                return (scale, insertBefore = true) => {
                    let scaleV = (typeof scale === "number") ? { x: scale, y: scale } : scale;
                    Svg.addTransform(element, t => t.setScale((scaleV.x || 1), (scaleV.y || 1)), insertBefore);
                    return svg(element);
                };
            }
            Functions.scale = scale;
            function getTransforms(element) {
                return () => {
                    let transform = element.transform.baseVal.consolidate();
                    return (transform === null) ? Svg.makeMatrix() : {
                        a: transform.matrix.a, b: transform.matrix.b, c: transform.matrix.c,
                        d: transform.matrix.d, e: transform.matrix.e, f: transform.matrix.f
                    };
                };
            }
            Functions.getTransforms = getTransforms;
            function setTransforms(element) {
                return (transformMatrix) => {
                    element.transform.baseVal.clear();
                    element.removeAttribute('transform');
                    let matrix = Svg.makeMatrix();
                    matrix.a = transformMatrix.a;
                    matrix.b = transformMatrix.b;
                    matrix.c = transformMatrix.c;
                    matrix.d = transformMatrix.d;
                    matrix.e = transformMatrix.e;
                    matrix.f = transformMatrix.f;
                    let transform = element.transform.baseVal.createSVGTransformFromMatrix(matrix);
                    element.transform.baseVal.appendItem(transform);
                    return svg(element);
                };
            }
            Functions.setTransforms = setTransforms;
            function convertVector(element) {
                return (vector, direction, type) => {
                    let conversionMatrix = element.getScreenCTM() || Svg.makeMatrix();
                    if (direction === "DomToSvg")
                        conversionMatrix = conversionMatrix.inverse();
                    if (type === "absToDoc" && element.transform.baseVal.numberOfItems > 0) {
                        element.transform.baseVal.consolidate();
                        let groupMatrix = element.transform.baseVal.getItem(0).matrix;
                        conversionMatrix = conversionMatrix.multiply(groupMatrix);
                    }
                    let convertedVector = {
                        x: vector.x * conversionMatrix.a + vector.y * conversionMatrix.c,
                        y: vector.y * conversionMatrix.d + vector.x * conversionMatrix.b
                    };
                    if (type === "relToGroup") {
                        convertedVector.x += conversionMatrix.e;
                        convertedVector.y += conversionMatrix.f;
                    }
                    return convertedVector;
                };
            }
            Functions.convertVector = convertVector;
        })(Functions = Element.Functions || (Element.Functions = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    class Root {
        constructor(classes = "") {
            this.element = Svg.Element.SVG.make();
            this.group = Svg.Element.Group.make();
            $(this.element.element).addClass(classes);
        }
        draw(node) {
            this.element.append(this.group);
            node.appendChild(this.element.element);
            Svg.Addins.Draggable.init(this.group.element, {
                grid: "off",
                eventTarget: this.element.element,
                useHelper: true,
            });
            Svg.Addins.Scaleable.init(this.group.element, {
                eventTarget: this.element.element,
            });
        }
    }
    Svg.Root = Root;
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    function addTransform(element, transformationFunction, insertBefore = true) {
        let transform = makeTransform();
        transformationFunction(transform);
        let transforms = element.transform.baseVal;
        if (insertBefore) {
            transforms.insertItemBefore(transform, 0);
        }
        else {
            transforms.appendItem(transform);
        }
        transforms.consolidate();
    }
    Svg.addTransform = addTransform;
    function makeTransform() {
        return Svg.Element.make("svg").createSVGTransform();
    }
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    function makeMatrix() {
        return Svg.Element.make("svg").createSVGMatrix();
    }
    Svg.makeMatrix = makeMatrix;
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    function makePoint(vector) {
        const point = Svg.Element.make("svg").createSVGPoint();
        point.x = vector.x;
        point.y = vector.y;
        return point;
    }
    Svg.makePoint = makePoint;
})(Svg || (Svg = {}));
function svg(element) {
    let extension = {
        element: element
    };
    let elementExtension = (element instanceof SVGGraphicsElement) ? {
        rotate: Svg.Element.Functions.rotate(element),
        translate: Svg.Element.Functions.translate(element),
        scale: Svg.Element.Functions.scale(element),
        getTransforms: Svg.Element.Functions.getTransforms(element),
        setTransforms: Svg.Element.Functions.setTransforms(element),
        convertVector: Svg.Element.Functions.convertVector(element),
    } : null;
    let groupExtension = (element instanceof SVGGElement || element instanceof SVGSVGElement) ? {
        append: Svg.Element.Group.Functions.append(element),
        prepend: Svg.Element.Group.Functions.prepend(element),
        clearChildren: Svg.Element.Group.Functions.clearChildren(element)
    } : null;
    let textExtension = (element instanceof SVGTextElement) ? {
        followPath: Svg.Element.Text.Functions.followPath(element),
        rotatePosition: Svg.Element.Text.Functions.rotatePosition(element),
    } : null;
    return Object.assign({}, extension, elementExtension, groupExtension, textExtension);
}
var Svg;
(function (Svg) {
    var Addins;
    (function (Addins) {
        var Draggable;
        (function (Draggable) {
            Draggable.init = (element, options = {}) => {
                let eventTarget = options.eventTarget !== undefined ? options.eventTarget : element;
                let grid = options.grid !== undefined ? options.grid : {
                    x: 10,
                    y: 10
                };
                let styleClass = options.styleClass !== undefined ? options.styleClass : "dragging";
                let lastPosition;
                if ($(eventTarget).draggable("instance") === undefined) {
                    $(eventTarget).draggable({
                        start: (event, ui) => {
                            $(element).addClass(styleClass);
                            if (grid !== "off") {
                                let gridSvg = svg(element).convertVector(grid, "SvgToDom", "absToDoc");
                                $(eventTarget).draggable("option", "grid", [gridSvg.x, gridSvg.y]);
                            }
                            lastPosition = {
                                x: ui.originalPosition.left,
                                y: ui.originalPosition.top
                            };
                        },
                        drag: (event, ui) => {
                            let dragChangeDom = {
                                x: ui.position.left - lastPosition.x,
                                y: ui.position.top - lastPosition.y
                            };
                            let dragChangeSvg = svg(element).convertVector(dragChangeDom, "DomToSvg", "absToDoc");
                            if (!vector(dragChangeSvg).isCloseTo({ x: 0, y: 0 })) {
                                $(eventTarget).trigger(Circuit.Events.drag, [ui, dragChangeSvg]);
                                lastPosition = {
                                    x: ui.position.left,
                                    y: ui.position.top
                                };
                            }
                        },
                        stop: (event, ui) => {
                            $(element).removeClass(styleClass);
                            element.transform.baseVal.consolidate();
                        }
                    });
                }
                if (options.onDrag !== undefined) {
                    $(eventTarget).on(Circuit.Events.drag, (e, ui, drag) => {
                        if ($(e.target).closest(".ui-draggable").is(eventTarget)) {
                            if (options.onDrag)
                                options.onDrag(drag, e);
                        }
                    });
                }
                ;
                if (options.disableMovement !== true) {
                    $(eventTarget).on(Circuit.Events.drag, (e, ui, drag) => {
                        if ($(e.target).closest(".ui-draggable").is(eventTarget)) {
                            svg(element).translate(drag, true);
                        }
                    });
                }
                if (options.constrainWith !== undefined) {
                    $(eventTarget).on("dragSVGConstraintCheck", (e, ui, dragSvg, dragDom) => {
                        if (options.constrainWith)
                            if (options.constrainWith(dragSvg)) {
                                dragSvg.x = 0;
                                dragSvg.y = 0;
                                ui.position.top = lastPosition.y;
                                ui.position.left = lastPosition.x;
                            }
                    });
                }
                if (options.onStart !== undefined) {
                    $(eventTarget).on(Circuit.Events.dragStart, (e, ui) => {
                        if (options.onStart)
                            options.onStart(e);
                    });
                }
                if (options.onStop !== undefined) {
                    $(eventTarget).on(Circuit.Events.dragStop, (e, ui) => {
                        if (options.onStop)
                            options.onStop(e);
                    });
                }
                if (options.useHelper === true) {
                    $(eventTarget).draggable("option", "helper", () => document.createElement("div"));
                }
            };
        })(Draggable = Addins.Draggable || (Addins.Draggable = {}));
    })(Addins = Svg.Addins || (Svg.Addins = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Addins;
    (function (Addins) {
        var Scaleable;
        (function (Scaleable) {
            Scaleable.init = (element, options = {}) => {
                let eventTarget = options.eventTarget !== undefined ? options.eventTarget : element;
                let mouseWheelHandler = (e) => {
                    if (e.buttons === 1 || e.buttons === 3) {
                        return;
                    }
                    let scaleChange = Math.sign(e.wheelDelta) * 0.05;
                    let clientBounds = element.getBoundingClientRect();
                    let owner = element.ownerSVGElement;
                    let rootClientBounds = (owner) ? owner.getBoundingClientRect() : {
                        left: 0,
                        top: 0
                    };
                    let clientStart = {
                        x: clientBounds.left - rootClientBounds.left,
                        y: clientBounds.top - rootClientBounds.top
                    };
                    let svgStart = svg(element).convertVector(clientStart, "DomToSvg", "absToDoc");
                    let svgSize = svg(element).convertVector({
                        x: clientBounds.width,
                        y: clientBounds.height
                    }, "DomToSvg", "absToDoc");
                    let mousePosDomFromCentre = {
                        x: e.clientX - (clientBounds.left + clientBounds.width / 2),
                        y: e.clientY - (clientBounds.top + clientBounds.height / 2)
                    };
                    let mousePosSvgFromCentre = svg(element).convertVector(mousePosDomFromCentre, "DomToSvg", "absToDoc");
                    let scale = {
                        x: 1 + scaleChange,
                        y: 1 + scaleChange
                    };
                    svg(element).scale(scale, true);
                    let scaleTranslationAdjust = {
                        x: (svgStart.x + svgSize.x / 2 + mousePosSvgFromCentre.x) * -scaleChange,
                        y: (svgStart.y + svgSize.y / 2 + mousePosSvgFromCentre.y) * -scaleChange
                    };
                    svg(element).translate(scaleTranslationAdjust, true);
                    if (options.onScale !== undefined) {
                        options.onScale(scale, scaleTranslationAdjust);
                    }
                };
                eventTarget.addEventListener("DOMMouseScroll", (e) => mouseWheelHandler(e), {
                    passive: true
                });
                eventTarget.addEventListener("mousewheel", (e) => mouseWheelHandler(e), {
                    passive: true
                });
            };
        })(Scaleable = Addins.Scaleable || (Addins.Scaleable = {}));
    })(Addins = Svg.Addins || (Svg.Addins = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Circle;
        (function (Circle) {
            function make(centreVector, radius, classes = "") {
                const element = Element.make("circle", classes);
                element.setAttribute("cx", centreVector.x.toString());
                element.setAttribute("cy", centreVector.y.toString());
                element.setAttribute("r", radius.toString());
                return svg(element);
            }
            Circle.make = make;
        })(Circle = Element.Circle || (Element.Circle = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Ellipse;
        (function (Ellipse) {
            function make(centreVector, radiusVector, classes = "") {
                const element = Element.make("ellipse", classes);
                element.setAttribute("cx", centreVector.x.toString());
                element.setAttribute("cy", centreVector.y.toString());
                element.setAttribute("rx", radiusVector.x.toString());
                element.setAttribute("ry", radiusVector.y.toString());
                return svg(element);
            }
            Ellipse.make = make;
        })(Ellipse = Element.Ellipse || (Element.Ellipse = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Group;
        (function (Group) {
            function make(classes = "") {
                return svg(Element.make("g", classes));
            }
            Group.make = make;
            let Functions;
            (function (Functions) {
                function append(element) {
                    return (...elements) => {
                        addChildren(element, (child) => {
                            element.appendChild(child);
                        }, ...elements);
                        return svg(element);
                    };
                }
                Functions.append = append;
                function prepend(element) {
                    return (...elements) => {
                        let firstChild = element.firstChild;
                        addChildren(element, (child) => {
                            element.insertBefore(child, firstChild);
                        }, ...elements);
                        return svg(element);
                    };
                }
                Functions.prepend = prepend;
                function clearChildren(element) {
                    return (inclusionSelector = "*") => {
                        $(element).children(inclusionSelector).remove();
                        return svg(element);
                    };
                }
                Functions.clearChildren = clearChildren;
                function addChildren(to, addCallback, ...elements) {
                    elements.forEach(item => {
                        let asArray = item instanceof Array ? item : [item];
                        asArray.forEach(member => {
                            let element = member instanceof SVGGraphicsElement ? member : member.element;
                            addCallback(element);
                        });
                    });
                    return to;
                }
            })(Functions = Group.Functions || (Group.Functions = {}));
        })(Group = Element.Group || (Element.Group = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Line;
        (function (Line) {
            function make(startVector, endVector, classes = "") {
                const element = Element.make("line", classes);
                element.setAttribute("x1", startVector.x.toString());
                element.setAttribute("y1", startVector.y.toString());
                element.setAttribute("x2", endVector.x.toString());
                element.setAttribute("y2", endVector.y.toString());
                return svg(element);
            }
            Line.make = make;
        })(Line = Element.Line || (Element.Line = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Path;
        (function (Path) {
            function make(path, classes = "") {
                const element = Element.make("path", classes);
                let pathString = (path instanceof Array) ? getLinePath(path) : path;
                element.setAttribute('d', pathString);
                return svg(element);
            }
            Path.make = make;
            function getLinePath(jointSet) {
                if (jointSet.length > 0 && jointSet[0] instanceof Array) {
                    let jointArrays = jointSet;
                    return jointArrays.map(getSingleLinePath).join();
                }
                else {
                    let joints = jointSet;
                    return getSingleLinePath(joints);
                }
            }
            function getSingleLinePath(joints) {
                if (joints.length < 1) {
                    return "";
                }
                else {
                    return "M" + joints[0].x + " " + joints[0].y
                        + joints.map(joint => "L" + joint.x + " " + joint.y).join();
                }
            }
        })(Path = Element.Path || (Element.Path = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Rect;
        (function (Rect) {
            function make(centre, size, cornerRounding = { x: 0, y: 0 }, classes = "") {
                const element = Element.make("rect", classes);
                element.setAttribute("x", (centre.x - size.width / 2).toString());
                element.setAttribute("y", (centre.y - size.height / 2).toString());
                element.setAttribute("width", size.width.toString());
                element.setAttribute("height", size.height.toString());
                element.setAttribute("rx", cornerRounding.x.toString());
                element.setAttribute("ry", cornerRounding.y.toString());
                return svg(element);
            }
            Rect.make = make;
        })(Rect = Element.Rect || (Element.Rect = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var SVG;
        (function (SVG) {
            function make(classes = "") {
                const element = Element.make("svg", classes);
                return svg(element);
            }
            SVG.make = make;
        })(SVG = Element.SVG || (Element.SVG = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Text;
        (function (Text) {
            let textPathCount = 0;
            function make(text, startVector, classes = "") {
                const element = Element.make("text", classes);
                element.setAttribute('x', startVector.x.toString());
                element.setAttribute('y', startVector.y.toString());
                element.appendChild(document.createTextNode(text));
                return svg(element);
            }
            Text.make = make;
            let Functions;
            (function (Functions) {
                function followPath(element) {
                    return (pathString) => {
                        let path = Element.Path.make(pathString);
                        $(path.element).hide();
                        let pathID = "pathForText" + textPathCount;
                        path.element.setAttribute("id", pathID);
                        textPathCount += 1;
                        let textPathEl = Element.make("textPath");
                        textPathEl.setAttribute("href", "#" + pathID);
                        let text = $(element).text();
                        $(element).text("");
                        textPathEl.appendChild(document.createTextNode(text));
                        element.appendChild(path.element);
                        element.appendChild(textPathEl);
                        return svg(element);
                    };
                }
                Functions.followPath = followPath;
                function rotatePosition(element) {
                    return (rotation) => {
                        const position = {
                            x: Number(element.getAttribute("x")),
                            y: Number(element.getAttribute("y"))
                        };
                        svg(element).rotate(rotation).rotate(-rotation, position);
                        if (25 < rotation && rotation < 155) {
                            $(element).css("text-anchor", "start");
                        }
                        else if (-155 < rotation && rotation < -25) {
                            $(element).css("text-anchor", "end");
                        }
                        else {
                            $(element).css("text-anchor", "middle");
                        }
                        if (135 < rotation || rotation < -135) {
                            $(element).css("alignment-baseline", "hanging");
                        }
                        else if (-55 < rotation && rotation < 45) {
                            $(element).css("alignment-baseline", "baseline");
                        }
                        else {
                            $(element).css("alignment-baseline", "middle");
                        }
                        return svg(element);
                    };
                }
                Functions.rotatePosition = rotatePosition;
            })(Functions = Text.Functions || (Text.Functions = {}));
        })(Text = Element.Text || (Element.Text = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Group;
        (function (Group) {
            var Dip;
            (function (Dip) {
                function make(pinsPerSide = 4, textLineOne = "", textLineTwo = "", textLineThree = "", classes = "") {
                    const element = Group.make("dip" + classes);
                    let gridSpacing = Constants.gridSpacing;
                    let bodySize = {
                        width: gridSpacing * pinsPerSide,
                        height: gridSpacing * 2.8
                    };
                    let centre = {
                        x: gridSpacing * (pinsPerSide - 1) / 2,
                        y: gridSpacing * 1.5
                    };
                    let pinString = "M " + (0) + " " + (-2.5)
                        + "h " + (-4)
                        + "v " + (3)
                        + "l " + (1) + " " + (0.5)
                        + "h " + (6)
                        + "l " + (1) + " " + (-0.5)
                        + "v " + (-3)
                        + "Z";
                    for (let i = 0; i < pinsPerSide; i++) {
                        element.append(Element.Path.make(pinString, "pin").scale({ x: 1, y: -1 }).translate({ x: gridSpacing * i, y: 0 }), Element.Path.make(pinString, "pin").translate({ x: gridSpacing * i, y: 3 * gridSpacing }));
                    }
                    ;
                    let notchString = "M " + (-0.5 * gridSpacing) + " " + (centre.y) +
                        "v " + (8) +
                        "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (0) + " " + (-16) +
                        "Z";
                    element.append(Svg.Element.Rect.make(centre, bodySize, { x: 5, y: 5 }, "body"), Svg.Element.Path.make(notchString, "notch"), Svg.Element.Rect.make(centre, bodySize, { x: 5, y: 5 }, "body highlight"), Svg.Element.Text.make(textLineOne, { x: 0.25 * gridSpacing, y: 1 * gridSpacing }, "text"), Svg.Element.Text.make(textLineTwo, { x: 0.25 * gridSpacing, y: 1.75 * gridSpacing }, "text"), Svg.Element.Text.make(textLineThree, { x: 0.25 * gridSpacing, y: 2.5 * gridSpacing }, "text"));
                    return element;
                }
                Dip.make = make;
            })(Dip = Group.Dip || (Group.Dip = {}));
        })(Group = Element.Group || (Element.Group = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Group;
        (function (Group) {
            var TextSequence;
            (function (TextSequence) {
                function make(start, gap, sequence, classes = "") {
                    const element = Group.make(classes);
                    let textArray = [];
                    if (sequence instanceof Array) {
                        textArray = sequence.map(String);
                    }
                    else if (typeof sequence === "string") {
                        textArray = sequence.split("");
                    }
                    else {
                        textArray = [...Array(sequence.length).keys()].map(v => (v + sequence.start).toString());
                    }
                    element.append(textArray.map((txt, i) => Svg.Element.Text.make(txt, { x: gap.x * i, y: gap.y * i }, "text")));
                    element.translate(start);
                    return element;
                }
                TextSequence.make = make;
            })(TextSequence = Group.TextSequence || (Group.TextSequence = {}));
        })(Group = Element.Group || (Element.Group = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
var Ui;
(function (Ui) {
    function init() {
        $("body").layout({
            center: {
                size: "35%",
                spacing_open: 10,
                spacing_closed: 10,
            },
            west: {
                onresize_end: () => {
                    Ui.Events.layoutPaneResize();
                },
                onclose: () => {
                    Ui.Events.layoutPaneResize();
                },
                onopen: () => {
                    Ui.Events.layoutPaneResize();
                },
                size: "30%",
                minSize: "270",
                spacing_open: 10,
                spacing_closed: 10,
                slidable: false,
            },
            east: {
                onresize_end: () => {
                    Ui.Events.schematicPaneResize();
                    Ui.Events.layoutPaneResize();
                },
                onclose: () => {
                    Ui.Events.schematicPaneResize();
                    Ui.Events.layoutPaneResize();
                },
                onopen: () => {
                    Ui.Events.schematicPaneResize();
                    Ui.Events.layoutPaneResize();
                },
                size: "35%",
                minSize: "5%",
                spacing_open: 10,
                spacing_closed: 10,
                slidable: false,
            }
        });
        $("#welcomeAccordion").accordion({
            collapsible: true,
            heightStyle: "content"
        });
        NodeElements.fileInput.addEventListener('change', (event) => {
            Ui.Events.fileInput(event);
        });
        NodeElements.fileSave.addEventListener('click', (event) => {
            Ui.Events.fileSave(event);
        });
        NodeElements.checkCircuitButton.addEventListener('click', () => {
            Ui.Events.checkCircuit();
        });
        NodeElements.boardDraggingDisabled.addEventListener('click', () => {
            Ui.Events.disableBoardDraggingPress();
        });
        $(document).keydown(function (e) {
            if (e.keyCode == 90 && e.ctrlKey) {
                Ui.Events.undo();
            }
        });
        $(document).keydown(function (e) {
            if (e.keyCode == 89 && e.ctrlKey) {
                Ui.Events.redo();
            }
        });
    }
    Ui.init = init;
})(Ui || (Ui = {}));
var Ui;
(function (Ui) {
    var Events;
    (function (Events) {
        function fitDiagramContents(diagram) {
            let rootEl = diagram.root.element.element;
            let group = diagram.group;
            let margin = 3;
            let groupBBox = group.element.getBBox();
            let groupWidth = groupBBox.width + margin * 2;
            let groupHeight = groupBBox.height + margin * 2;
            let scaleX = (groupWidth) ? (rootEl.width.baseVal.value / groupWidth) : 0;
            let scaleY = (groupHeight) ? (rootEl.height.baseVal.value / groupHeight) : 0;
            let scaleMin = Math.min(scaleX, scaleY);
            let offsetX = -groupBBox.x * scaleMin + (rootEl.width.baseVal.value - groupWidth * scaleMin) / 2 + margin;
            let offsetY = (-groupBBox.y * scaleMin) + (rootEl.height.baseVal.value - groupHeight * scaleMin) / 2 + margin;
            let transformString = "translate(" + offsetX + " " + offsetY + ")" + "scale(" + scaleMin + ")";
            group.element.setAttribute('transform', transformString);
        }
        function schematicPaneResize() {
            window.setTimeout(() => {
                fitDiagramContents(Active.schematic);
            }, 5);
        }
        Events.schematicPaneResize = schematicPaneResize;
        function layoutPaneResize() {
            window.setTimeout(() => {
                fitDiagramContents(Active.layout);
            }, 5);
        }
        Events.layoutPaneResize = layoutPaneResize;
        function fileInput(event) {
            FileIO.Load.handleFileInputEvent(event);
        }
        Events.fileInput = fileInput;
        function fileSave(event) {
            FileIO.Save.handleFileSaveEvent(event);
        }
        Events.fileSave = fileSave;
        function makeStripBoardButtonPress() {
            let rowElement = NodeElements.stripboardRows;
            let columnElement = NodeElements.stripboardColumns;
            let rows = parseInt(rowElement.value);
            let columns = parseInt(columnElement.value);
            if (rows && columns &&
                rows >= parseInt(rowElement.min) && columns >= parseInt(columnElement.min) &&
                rows <= parseInt(rowElement.max) && columns <= parseInt(columnElement.max)) {
                addBoard(Circuit.Component.stripboard.layout.make({
                    rows: rows,
                    columns: columns
                }));
            }
        }
        Events.makeStripBoardButtonPress = makeStripBoardButtonPress;
        function makeBreadBoardSmallButtonPress() {
            addBoard(Circuit.Component.breadboard.layoutSmall.make({}));
        }
        Events.makeBreadBoardSmallButtonPress = makeBreadBoardSmallButtonPress;
        function makeBreadBoardLargeButtonPress() {
            addBoard(Circuit.Component.breadboard.layoutLarge.make({}));
        }
        Events.makeBreadBoardLargeButtonPress = makeBreadBoardLargeButtonPress;
        function addBoard(board) {
            if (Circuit.manifest.activeBoard !== undefined) {
                Circuit.manifest.removeComponent(Circuit.manifest.activeBoard);
                Circuit.manifest.addComponent(Circuit.manifest.layout, board);
                Circuit.history.mergeLast();
            }
            else {
                Circuit.manifest.addComponent(Circuit.manifest.layout, board);
            }
            Circuit.manifest.activeBoard = board;
        }
        function disableBoardDraggingPress() {
            if (Circuit.manifest.activeBoard !== undefined) {
                if (NodeElements.boardDraggingDisabled.checked) {
                    Circuit.Component.Addins.Draggable.disable(Circuit.manifest.activeBoard);
                }
                else {
                    Circuit.Component.Addins.Draggable.enable(Circuit.manifest.activeBoard);
                }
            }
        }
        Events.disableBoardDraggingPress = disableBoardDraggingPress;
        function checkCircuit() {
            let circuitStatus = Circuit.manifest.checkAll();
            let doHighlightCorrect = NodeElements.checkShowCorrect.checked;
            let doHighlightIncorrect = NodeElements.checkShowIncorrect.checked;
            const highlightCheck = () => {
                if (doHighlightIncorrect) {
                    circuitStatus.incorrects.forEach(incorrect => {
                        $(incorrect.group.element).find(".highlight").css("stroke", "red");
                        $(incorrect.group.element).find(".highlightwithfill").css("fill", "red");
                        ;
                    });
                }
                if (doHighlightCorrect) {
                    circuitStatus.corrects.forEach(correct => {
                        $(correct.group.element).find(".highlight").css("stroke", "green");
                        $(correct.group.element).find(".highlightwithfill").css("fill", "green");
                        ;
                    });
                }
            };
            const clearHighlightCheck = () => {
                if (doHighlightIncorrect) {
                    circuitStatus.incorrects.forEach(incorrect => {
                        $(incorrect.group.element).find(".highlight").css("stroke", "");
                        $(incorrect.group.element).find(".highlightwithfill").css("fill", "");
                    });
                }
                if (doHighlightCorrect) {
                    circuitStatus.corrects.forEach(correct => {
                        $(correct.group.element).find(".highlight").css("stroke", "");
                        $(correct.group.element).find(".highlightwithfill").css("fill", "");
                        ;
                    });
                }
            };
            highlightCheck();
            window.setTimeout(() => {
                clearHighlightCheck();
                window.setTimeout(() => {
                    highlightCheck();
                    window.setTimeout(() => {
                        clearHighlightCheck();
                        window.setTimeout(() => {
                            highlightCheck();
                            window.setTimeout(() => {
                                clearHighlightCheck();
                            }, 400);
                        }, 200);
                    }, 400);
                }, 200);
            }, 400);
            let completion = (circuitStatus.corrects.length / (circuitStatus.corrects.length + circuitStatus.incorrects.length) * 100).toFixed(1);
            NodeElements.checkStatusText.innerText = "Correct: " + completion + "%";
        }
        Events.checkCircuit = checkCircuit;
        function undo() {
            if (Circuit.history !== undefined) {
                Circuit.history.undo();
            }
        }
        Events.undo = undo;
        function redo() {
            if (Circuit.history !== undefined) {
                Circuit.history.redo();
            }
        }
        Events.redo = redo;
    })(Events = Ui.Events || (Ui.Events = {}));
})(Ui || (Ui = {}));
var Utility;
(function (Utility) {
    function cumulativeSum(...values) {
        return values.reduce((acc, value, idx) => acc.concat(value + acc[idx]), [0]).slice(1);
    }
    Utility.cumulativeSum = cumulativeSum;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    function deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    Utility.deepCopy = deepCopy;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    function degreesToRadians(angle) {
        return angle * Math.PI / 180;
    }
    Utility.degreesToRadians = degreesToRadians;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    Utility.flatten2d = (array) => [].concat.apply([], array);
    Utility.flatten3d = (array) => Utility.flatten2d(Utility.flatten2d(array));
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    function getStandardForm(value, unit = "") {
        let exponentialParts = value.toExponential().split("e");
        let coefficient = parseFloat(exponentialParts[0]);
        let exponent = parseInt(exponentialParts[1]);
        for (let i = 0; i < 3; i++) {
            if (exponent in prefixes)
                break;
            coefficient *= 10;
            exponent--;
        }
        const numeric = parseFloat(coefficient.toPrecision(2));
        const prefix = prefixes[exponent] || "";
        return numeric + prefix + unit;
    }
    Utility.getStandardForm = getStandardForm;
    const prefixes = {
        '-24': 'y',
        '-21': 'z',
        '-18': 'a',
        '-15': 'f',
        '-12': 'p',
        '-9': 'n',
        '-6': 'µ',
        '-3': 'm',
        '0': '',
        '3': 'k',
        '6': 'M',
        '9': 'G',
        '12': 'T',
        '15': 'P',
        '18': 'E',
        '21': 'Z',
        '24': 'Y'
    };
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    Utility.isNot = (check) => (test) => test !== check;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    function isUnaryMap(A, B, predicate) {
        const isPredicateMatchForAllA = A.every(elA => {
            let match = B.find(elB => predicate(elA, elB));
            B = B.filter(Utility.isNot(match));
            return (match !== undefined);
        });
        const allBMatched = (B.length === 0);
        return (isPredicateMatchForAllA && allBMatched);
    }
    Utility.isUnaryMap = isUnaryMap;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    function radiansToDegrees(angle) {
        return angle * 180 / Math.PI;
    }
    Utility.radiansToDegrees = radiansToDegrees;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    function split(A, predicate) {
        let passes = [];
        let fails = [];
        A.forEach(elA => {
            if (predicate(elA)) {
                passes.push(elA);
            }
            else {
                fails.push(elA);
            }
        });
        return { passes: passes, fails: fails };
    }
    Utility.split = split;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    function tuple(...args) {
        return args;
    }
    Utility.tuple = tuple;
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    var Insert;
    (function (Insert) {
        function last(element, target) {
            if (element === target || target === undefined) {
                $(element).insertAfter($(element).siblings().last());
            }
            else if ($(target).children().length) {
                $(element).insertAfter($(target).children().last());
            }
            else {
                $(element).appendTo($(target));
            }
        }
        Insert.last = last;
        function first(element, target) {
            if (element === target || target === undefined) {
                $(element).insertBefore($(element).siblings().first());
            }
            else if ($(target).children().length) {
                $(element).insertBefore($(target).children().first());
            }
            else {
                $(element).prependTo($(target));
            }
        }
        Insert.first = first;
        function before(element, targetOrRef, referenceSelector = "*") {
            let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
            referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
            if (element === target || target === undefined) {
                $(element).insertBefore($(element).siblings(referenceSelector).first());
            }
            else if ($(target).children(referenceSelector).length) {
                $(element).insertBefore($(target).children(referenceSelector).first());
            }
            else {
                $(element).prependTo($(target));
            }
        }
        Insert.before = before;
        function after(element, targetOrRef, referenceSelector = "*") {
            let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
            referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
            if (element === target || target === undefined) {
                $(element).insertAfter($(element).siblings(referenceSelector).last());
            }
            else if ($(target).children(referenceSelector).length) {
                $(element).insertAfter($(target).children(referenceSelector).last());
            }
            else {
                $(element).prependTo($(target));
            }
        }
        Insert.after = after;
    })(Insert = Utility.Insert || (Utility.Insert = {}));
})(Utility || (Utility = {}));
var Utility;
(function (Utility) {
    var Polar;
    (function (Polar) {
        function toVector(radius, angle) {
            const rads = Utility.degreesToRadians(angle);
            return {
                x: radius * Math.cos(rads),
                y: radius * Math.sin(rads)
            };
        }
        Polar.toVector = toVector;
    })(Polar = Utility.Polar || (Utility.Polar = {}));
})(Utility || (Utility = {}));
