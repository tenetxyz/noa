import $5OpyM$glvec3 from "gl-vec3";
import $5OpyM$ndarray from "ndarray";
import $5OpyM$events, {EventEmitter as $5OpyM$EventEmitter} from "events";
import $5OpyM$fastvoxelraycast from "fast-voxel-raycast";
import $5OpyM$gameinputs from "game-inputs";
import {MicroGameShell as $5OpyM$MicroGameShell} from "micro-game-shell";
import $5OpyM$aabb3d from "aabb-3d";
import $5OpyM$voxelaabbsweep from "voxel-aabb-sweep";
import $5OpyM$entcomp from "ent-comp";
import $5OpyM$boxintersect from "box-intersect";
import {Color3 as $5OpyM$Color3} from "@babylonjs/core/Maths/math.color";
import {Mesh as $5OpyM$Mesh} from "@babylonjs/core/Meshes/mesh";
import {CreateDisc as $5OpyM$CreateDisc} from "@babylonjs/core/Meshes/Builders/discBuilder";
import "@babylonjs/core/Meshes/instancedMesh";
import {TransformNode as $5OpyM$TransformNode} from "@babylonjs/core/Meshes/transformNode";
import "@babylonjs/core/Meshes/thinInstanceMesh";
import {SubMesh as $5OpyM$SubMesh} from "@babylonjs/core/Meshes/subMesh";
import {VertexData as $5OpyM$VertexData} from "@babylonjs/core/Meshes/mesh.vertexData";
import {MultiMaterial as $5OpyM$MultiMaterial} from "@babylonjs/core/Materials/multiMaterial";
import {Texture as $5OpyM$Texture} from "@babylonjs/core/Materials/Textures/texture";
import {Scene as $5OpyM$Scene} from "@babylonjs/core/scene";
import {FreeCamera as $5OpyM$FreeCamera} from "@babylonjs/core/Cameras/freeCamera";
import {Engine as $5OpyM$Engine} from "@babylonjs/core/Engines/engine";
import {HemisphericLight as $5OpyM$HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight";
import {StandardMaterial as $5OpyM$StandardMaterial} from "@babylonjs/core/Materials/standardMaterial";
import {Vector3 as $5OpyM$Vector3} from "@babylonjs/core/Maths/math.vector";
import {CreateLines as $5OpyM$CreateLines} from "@babylonjs/core/Meshes/Builders/linesBuilder";
import {CreatePlane as $5OpyM$CreatePlane} from "@babylonjs/core/Meshes/Builders/planeBuilder";
import {Octree as $5OpyM$Octree} from "@babylonjs/core/Culling/Octrees/octree";
import {OctreeBlock as $5OpyM$OctreeBlock} from "@babylonjs/core/Culling/Octrees/octreeBlock";
import {OctreeSceneComponent as $5OpyM$OctreeSceneComponent} from "@babylonjs/core/Culling/Octrees/";
import {Physics as $5OpyM$Physics} from "voxel-physics-engine";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
/** @module noa */ /*!
 * noa: an experimental voxel game engine.
 * @url      github.com/fenomas/noa
 * @author   Andy Hall <andy@fenomas.com>
 * @license  MIT
 */ 



/** 
 * The Inputs class is found at [[Inputs | `noa.inputs`]].
 * @module noa.inputs
 */ 
// import { Inputs as GameInputs } from '../../../../npm-modules/game-inputs'
var $b3f1cef4464199f8$var$defaultOptions = {
    preventDefaults: false,
    stopPropagation: false,
    allowContextMenu: false
};
var $b3f1cef4464199f8$var$defaultBindings = {
    "forward": [
        "W",
        "<up>"
    ],
    "left": [
        "A",
        "<left>"
    ],
    "backward": [
        "S",
        "<down>"
    ],
    "right": [
        "D",
        "<right>"
    ],
    "fire": "<mouse 1>",
    "mid-fire": [
        "<mouse 2>",
        "Q"
    ],
    "alt-fire": [
        "<mouse 3>",
        "E"
    ],
    "jump": "<space>",
    "sprint": "<shift>",
    "crouch": "<control>"
};
function $b3f1cef4464199f8$export$460acad14ffa1bb4(noa, opts, element) {
    opts = Object.assign({}, $b3f1cef4464199f8$var$defaultOptions, opts);
    var inputs = (0, $5OpyM$gameinputs)(element, opts);
    var b = opts.bindings || $b3f1cef4464199f8$var$defaultBindings;
    for(var name in b){
        var arr = Array.isArray(b[name]) ? b[name] : [
            b[name]
        ];
        arr.unshift(name);
        inputs.bind.apply(inputs, arr);
    }
    return inputs;
} /**
 * `noa.inputs` - manages keybinds and mouse input.
 *
 * Extends [game-inputs](https://github.com/fenomas/game-inputs),
 * see there for implementation and docs.
 *
 * By default, the following bindings will be made automatically.
 * You can undo bindings with `unbind`, or specify your own with a
 * `bindings` property on the options object passed to the [[Engine]].
 *
 * ```js
 * var defaultBindings = {
 *     "forward": ["W", "<up>"],
 *     "left": ["A", "<left>"],
 *     "backward": ["S", "<down>"],
 *     "right": ["D", "<right>"],
 *     "fire": "<mouse 1>",
 *     "mid-fire": ["<mouse 2>", "Q"],
 *     "alt-fire": ["<mouse 3>", "E"],
 *     "jump": "<space>",
 *     "sprint": "<shift>",
 *     "crouch": "<control>",
 * }
 * ```
 *
 * @typedef {Object} Inputs
 * @prop {boolean} disabled
 * @prop {Object} state Maps key binding names to input states.
 * @prop {(binding:string, ...keyCodes:string[]) => void} bind Binds one or more keycodes to a binding.
 * @prop {(binding:string) => void} unbind Unbinds all keyCodes from a binding.
 * @prop {import('events').EventEmitter} down Emits input start events (i.e. keyDown).
 * @prop {import('events').EventEmitter} up Emits input end events (i.e. keyUp).
*/ 


/** 
 * The Container class is found at [[Container | `noa.container`]].
 * @module noa.container
 */ 

class $f93fc8cf162d54df$export$42a852a2b6b56249 extends (0, $5OpyM$EventEmitter) {
    /** @internal */ constructor(noa, opts){
        super();
        opts = opts || {};
        /** 
         * @internal
         * @type {import('../index').Engine}
        */ this.noa = noa;
        /** The game's DOM element container */ this.element = opts.domElement || $f93fc8cf162d54df$var$createContainerDiv();
        /** The `canvas` element that the game will draw into */ this.canvas = $f93fc8cf162d54df$var$getOrCreateCanvas(this.element);
        /** Whether the browser supports pointerLock. @readonly */ this.supportsPointerLock = false;
        /** Whether the user's pointer is within the game area. @readonly */ this.pointerInGame = false;
        /** Whether the game is focused. @readonly */ this.isFocused = !!document.hasFocus();
        /** Gets the current state of pointerLock. @readonly */ this.hasPointerLock = false;
        // shell manages tick/render rates, and pointerlock/fullscreen
        var pollTime = 10;
        /** @internal */ this._shell = new (0, $5OpyM$MicroGameShell)(this.element, pollTime);
        this._shell.tickRate = opts.tickRate;
        this._shell.maxRenderRate = opts.maxRenderRate;
        this._shell.stickyPointerLock = opts.stickyPointerLock;
        this._shell.stickyFullscreen = opts.stickyFullscreen;
        // core timing events
        this._shell.onTick = noa.tick.bind(noa);
        this._shell.onRender = noa.render.bind(noa);
        // shell listeners
        this._shell.onPointerLockChanged = (hasPL)=>{
            this.hasPointerLock = hasPL;
            this.emit(hasPL ? "gainedPointerLock" : "lostPointerLock");
            // this works around a Firefox bug where no mouse-in event 
            // gets issued after starting pointerlock
            if (hasPL) this.pointerInGame = true;
        };
        // catch and relay domReady event
        this._shell.onInit = ()=>{
            this._shell.onResize = noa.rendering.resize.bind(noa.rendering);
            // listeners to track when game has focus / pointer
            $f93fc8cf162d54df$var$detectPointerLock(this);
            this.element.addEventListener("mouseenter", ()=>{
                this.pointerInGame = true;
            });
            this.element.addEventListener("mouseleave", ()=>{
                this.pointerInGame = false;
            });
            window.addEventListener("focus", ()=>{
                this.isFocused = true;
            });
            window.addEventListener("blur", ()=>{
                this.isFocused = false;
            });
            // catch edge cases for initial states
            var onFirstMousedown = ()=>{
                this.pointerInGame = true;
                this.isFocused = true;
                this.element.removeEventListener("mousedown", onFirstMousedown);
            };
            this.element.addEventListener("mousedown", onFirstMousedown);
            // emit for engine core
            this.emit("DOMready");
            // done and remove listener
            this._shell.onInit = null;
        };
    }
    /*
     *
     *
     *              PUBLIC API 
     *
     *
    */ /** @internal */ appendTo(htmlElement) {
        this.element.appendChild(htmlElement);
    }
    /** 
     * Sets whether `noa` should try to acquire or release pointerLock
    */ setPointerLock(lock = false) {
        // not sure if this will work robustly
        this._shell.pointerLock = !!lock;
    }
}
/*
 *
 *
 *              INTERNALS
 *
 *
*/ function $f93fc8cf162d54df$var$createContainerDiv() {
    // based on github.com/mikolalysenko/game-shell - makeDefaultContainer()
    var container = document.createElement("div");
    container.tabIndex = 1;
    container.style.position = "fixed";
    container.style.left = "0px";
    container.style.right = "0px";
    container.style.top = "0px";
    container.style.bottom = "0px";
    container.style.height = "100%";
    container.style.overflow = "hidden";
    document.body.appendChild(container);
    document.body.style.overflow = "hidden" //Prevent bounce
    ;
    document.body.style.height = "100%";
    container.id = "noa-container";
    return container;
}
function $f93fc8cf162d54df$var$getOrCreateCanvas(el) {
    // based on github.com/stackgl/gl-now - default canvas
    var canvas = el.querySelector("canvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.style.height = "100%";
        canvas.style.width = "100%";
        canvas.id = "noa-canvas";
        el.insertBefore(canvas, el.firstChild);
    }
    return canvas;
}
// set up stuff to detect pointer lock support.
// Needlessly complex because Chrome/Android claims to support but doesn't.
// For now, just feature detect, but assume no support if a touch event occurs
// TODO: see if this makes sense on hybrid touch/mouse devices
function $f93fc8cf162d54df$var$detectPointerLock(self) {
    var lockElementExists = "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
    if (lockElementExists) {
        self.supportsPointerLock = true;
        var listener = function(e) {
            self.supportsPointerLock = false;
            document.removeEventListener(e.type, listener);
        };
        document.addEventListener("touchmove", listener);
    }
}


/** 
 * The Camera class is found at [[Camera | `noa.camera`]].
 * @module noa.camera
 */ 


// default options
var $77aab343c6d1732d$var$defaults = {
    inverseX: false,
    inverseY: false,
    sensitivityX: 10,
    sensitivityY: 10,
    initialZoom: 0,
    zoomSpeed: 0.2
};
// locals
var $77aab343c6d1732d$var$tempVectors = [
    (0, $5OpyM$glvec3).create(),
    (0, $5OpyM$glvec3).create(),
    (0, $5OpyM$glvec3).create()
];
var $77aab343c6d1732d$var$originVector = (0, $5OpyM$glvec3).create();
class $77aab343c6d1732d$export$79f141de891a5fed {
    /** @internal */ constructor(noa, opts){
        opts = Object.assign({}, $77aab343c6d1732d$var$defaults, opts);
        /** 
         * @internal
         * @type {import('../index').Engine}
        */ this.noa = noa;
        /** Horizontal mouse sensitivity. Same scale as Overwatch (typical values around `5..10`) */ this.sensitivityX = +opts.sensitivityX;
        /** Vertical mouse sensitivity. Same scale as Overwatch (typical values around `5..10`) */ this.sensitivityY = +opts.sensitivityY;
        /** Mouse look inverse (horizontal) */ this.inverseX = !!opts.inverseX;
        /** Mouse look inverse (vertical) */ this.inverseY = !!opts.inverseY;
        /** 
         * Camera yaw angle. 
         * Returns the camera's rotation angle around the vertical axis. 
         * Range: `0..2π`  
         * This value is writeable, but it's managed by the engine and 
         * will be overwritten each frame.
        */ this.heading = 0;
        /** Camera pitch angle. 
         * Returns the camera's up/down rotation angle. The pitch angle is 
         * clamped by a small epsilon, such that the camera never quite 
         * points perfectly up or down.  
         * Range: `-π/2..π/2`.  
         * This value is writeable, but it's managed by the engine and 
         * will be overwritten each frame.
        */ this.pitch = 0;
        /** 
         * Entity ID of a special entity that exists for the camera to point at.
         * 
         * By default this entity follows the player entity, so you can 
         * change the player's eye height by changing the `follow` component's offset:
         * ```js
         * var followState = noa.ents.getState(noa.camera.cameraTarget, 'followsEntity')
         * followState.offset[1] = 0.9 * myPlayerHeight
         * ```
         * 
         * For customized camera controls you can change the follow 
         * target to some other entity, or override the behavior entirely:
         * ```js
         * // make cameraTarget stop following the player
         * noa.ents.removeComponent(noa.camera.cameraTarget, 'followsEntity')
         * // control cameraTarget position directly (or whatever..)
         * noa.ents.setPosition(noa.camera.cameraTarget, [x,y,z])
         * ```
        */ this.cameraTarget = this.noa.ents.createEntity([
            "position"
        ]);
        // make the camera follow the cameraTarget entity
        var eyeOffset = 0.9 * noa.ents.getPositionData(noa.playerEntity).height;
        noa.ents.addComponent(this.cameraTarget, "followsEntity", {
            entity: noa.playerEntity,
            offset: [
                0,
                eyeOffset,
                0
            ]
        });
        /** How far back the camera should be from the player's eye position */ this.zoomDistance = opts.initialZoom;
        /** How quickly the camera moves to its `zoomDistance` (0..1) */ this.zoomSpeed = opts.zoomSpeed;
        /** Current actual zoom distance. This differs from `zoomDistance` when
         * the camera is in the process of moving towards the desired distance, 
         * or when it's obstructed by solid terrain behind the player.
         * @readonly
        */ this.currentZoom = opts.initialZoom;
        /** @internal */ this._currentZoom = this.currentZoom;
        Object.defineProperty(this, "currentZoom", {
            get: ()=>this._currentZoom
        });
        /** @internal */ this._dirVector = (0, $5OpyM$glvec3).fromValues(0, 0, 1);
    }
    /*
     * 
     * 
     *          API
     * 
     * 
    */ /*
     *      Local position functions for high precision
    */ /** @internal */ _localGetTargetPosition() {
        var pdat = this.noa.ents.getPositionData(this.cameraTarget);
        var pos = $77aab343c6d1732d$var$tempVectors[0];
        return (0, $5OpyM$glvec3).copy(pos, pdat._renderPosition);
    }
    /** @internal */ _localGetPosition() {
        var loc = this._localGetTargetPosition();
        if (this._currentZoom === 0) return loc;
        return (0, $5OpyM$glvec3).scaleAndAdd(loc, loc, this._dirVector, -this._currentZoom);
    }
    /**
     * Returns the camera's current target position - i.e. the player's 
     * eye position. When the camera is zoomed all the way in, 
     * this returns the same location as `camera.getPosition()`.
    */ getTargetPosition() {
        var loc = this._localGetTargetPosition();
        var globalCamPos = $77aab343c6d1732d$var$tempVectors[1];
        return this.noa.localToGlobal(loc, globalCamPos);
    }
    /**
     * Returns the current camera position (read only)
    */ getPosition() {
        var loc = this._localGetPosition();
        var globalCamPos = $77aab343c6d1732d$var$tempVectors[2];
        return this.noa.localToGlobal(loc, globalCamPos);
    }
    /**
     * Returns the camera direction vector (read only)
    */ getDirection() {
        return this._dirVector;
    }
    /*
     * 
     * 
     * 
     *          internals below
     * 
     * 
     * 
    */ /**
     * Called before render, if mouseLock etc. is applicable.
     * Consumes input mouse events x/y, updates camera angle and zoom
     * @internal
    */ applyInputsToCamera() {
        // dx/dy from input state
        var state = this.noa.inputs.state;
        $77aab343c6d1732d$var$bugFix(state) // TODO: REMOVE EVENTUALLY    
        ;
        // convert to rads, using (sens * 0.0066 deg/pixel), like Overwatch
        var conv = 0.0066 * Math.PI / 180;
        var dy = state.dy * this.sensitivityY * conv;
        var dx = state.dx * this.sensitivityX * conv;
        if (this.inverseY) dy = -dy;
        if (this.inverseX) dx = -dx;
        // normalize/clamp angles, update direction vector
        var twopi = 2 * Math.PI;
        this.heading += dx < 0 ? dx + twopi : dx;
        if (this.heading > twopi) this.heading -= twopi;
        var maxPitch = Math.PI / 2 - 0.001;
        this.pitch = Math.max(-maxPitch, Math.min(maxPitch, this.pitch + dy));
        (0, $5OpyM$glvec3).set(this._dirVector, 0, 0, 1);
        var dir = this._dirVector;
        var origin = $77aab343c6d1732d$var$originVector;
        (0, $5OpyM$glvec3).rotateX(dir, dir, origin, this.pitch);
        (0, $5OpyM$glvec3).rotateY(dir, dir, origin, this.heading);
    }
    /**
     *  Called before all renders, pre- and post- entity render systems
     * @internal
    */ updateBeforeEntityRenderSystems() {
        // zoom update
        this._currentZoom += (this.zoomDistance - this._currentZoom) * this.zoomSpeed;
    }
    /** @internal */ updateAfterEntityRenderSystems() {
        // clamp camera zoom not to clip into solid terrain
        var maxZoom = $77aab343c6d1732d$var$cameraObstructionDistance(this);
        if (this._currentZoom > maxZoom) this._currentZoom = maxZoom;
    }
}
/*
 *  check for obstructions behind camera by sweeping back an AABB
*/ function $77aab343c6d1732d$var$cameraObstructionDistance(self) {
    if (!self._sweepBox) {
        self._sweepBox = new (0, $5OpyM$aabb3d)([
            0,
            0,
            0
        ], [
            0.2,
            0.2,
            0.2
        ]);
        self._sweepGetVoxel = self.noa.world.getBlockSolidity.bind(self.noa.world);
        self._sweepVec = (0, $5OpyM$glvec3).create();
        self._sweepHit = ()=>true;
    }
    var pos = (0, $5OpyM$glvec3).copy(self._sweepVec, self._localGetTargetPosition());
    (0, $5OpyM$glvec3).add(pos, pos, self.noa.worldOriginOffset);
    for(var i = 0; i < 3; i++)pos[i] -= 0.1;
    self._sweepBox.setPosition(pos);
    var dist = Math.max(self.zoomDistance, self.currentZoom) + 0.1;
    (0, $5OpyM$glvec3).scale(self._sweepVec, self.getDirection(), -dist);
    return (0, $5OpyM$voxelaabbsweep)(self._sweepGetVoxel, self._sweepBox, self._sweepVec, self._sweepHit, true);
}
// workaround for this Chrome 63 + Win10 bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=781182
// later updated to also address: https://github.com/fenomas/noa/issues/153
function $77aab343c6d1732d$var$bugFix(state) {
    var dx = state.dx;
    var dy = state.dy;
    var badx = Math.abs(dx) > 400 && Math.abs(dx / $77aab343c6d1732d$var$lastx) > 4;
    var bady = Math.abs(dy) > 400 && Math.abs(dy / $77aab343c6d1732d$var$lasty) > 4;
    if (badx || bady) {
        state.dx = $77aab343c6d1732d$var$lastx;
        state.dy = $77aab343c6d1732d$var$lasty;
        $77aab343c6d1732d$var$lastx = ($77aab343c6d1732d$var$lastx + dx) / 2;
        $77aab343c6d1732d$var$lasty = ($77aab343c6d1732d$var$lasty + dy) / 2;
    } else {
        $77aab343c6d1732d$var$lastx = dx || 1;
        $77aab343c6d1732d$var$lasty = dy || 1;
    }
}
var $77aab343c6d1732d$var$lastx = 0;
var $77aab343c6d1732d$var$lasty = 0;


/** 
 * The ECS manager, found at [[Entities | `noa.entities`]] or [[Entities | `noa.ents`]].
 * @module noa.entities
 */ 

/** 
 * @module 
 * @internal 
 */ 
class $7ac5306bc4471494$export$8862cf40a6c634e6 {
    constructor(){
        /** Position in global coords (may be low precision) 
         * @type {null | number[]} */ this.position = null;
        this.width = 0.8;
        this.height = 0.8;
        /** Precise position in local coords
         * @type {null | number[]} */ this._localPosition = null;
        /** [x,y,z] in LOCAL COORDS
         * @type {null | number[]} */ this._renderPosition = null;
        /** [lo,lo,lo, hi,hi,hi] in LOCAL COORDS
         * @type {null | number[]} */ this._extents = null;
    }
}
function $7ac5306bc4471494$export$2e2bcd8739ae039(noa) {
    return {
        name: "position",
        order: 60,
        state: new $7ac5306bc4471494$export$8862cf40a6c634e6,
        onAdd: function(eid, state) {
            // copy position into a plain array
            var pos = [
                0,
                0,
                0
            ];
            if (state.position) (0, $5OpyM$glvec3).copy(pos, state.position);
            state.position = pos;
            state._localPosition = (0, $5OpyM$glvec3).create();
            state._renderPosition = (0, $5OpyM$glvec3).create();
            state._extents = new Float32Array(6);
            // on init only, set local from global
            noa.globalToLocal(state.position, null, state._localPosition);
            (0, $5OpyM$glvec3).copy(state._renderPosition, state._localPosition);
            $7ac5306bc4471494$export$20c19878786a4a8d(state);
        },
        onRemove: null,
        system: function(dt, states) {
            var off = noa.worldOriginOffset;
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                (0, $5OpyM$glvec3).add(state.position, state._localPosition, off);
                $7ac5306bc4471494$export$20c19878786a4a8d(state);
            }
        }
    };
}
function $7ac5306bc4471494$export$20c19878786a4a8d(state) {
    var hw = state.width / 2;
    var lpos = state._localPosition;
    var ext = state._extents;
    ext[0] = lpos[0] - hw;
    ext[1] = lpos[1];
    ext[2] = lpos[2] - hw;
    ext[3] = lpos[0] + hw;
    ext[4] = lpos[1] + state.height;
    ext[5] = lpos[2] + hw;
}


/** 
 * @module
 * @internal
 */ 
class $a7202459cec49fce$export$1fdae07cebeea19b {
    constructor(){
        /** @type {null | RigidBody} */ this.body = null;
    }
}
function $a7202459cec49fce$export$2e2bcd8739ae039(noa) {
    return {
        name: "physics",
        order: 40,
        state: new $a7202459cec49fce$export$1fdae07cebeea19b,
        onAdd: function(entID, state) {
            state.body = noa.physics.addBody();
            // implicitly assume body has a position component, to get size
            var posDat = noa.ents.getPositionData(state.__id);
            $a7202459cec49fce$export$a55ed034c373ec2(state, posDat);
        },
        onRemove: function(entID, state) {
            // update position before removing
            // this lets entity wind up at e.g. the result of a collision
            // even if physics component is removed in collision handler
            if (noa.ents.hasPosition(state.__id)) {
                var pdat = noa.ents.getPositionData(state.__id);
                $a7202459cec49fce$var$setPositionFromPhysics(state, pdat);
                $a7202459cec49fce$var$backtrackRenderPos(state, pdat, 0, false);
            }
            noa.physics.removeBody(state.body);
        },
        system: function(dt, states) {
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                var pdat = noa.ents.getPositionData(state.__id);
                $a7202459cec49fce$var$setPositionFromPhysics(state, pdat);
            }
        },
        renderSystem: function(dt, states) {
            var tickPos = noa.positionInCurrentTick;
            var tickTime = 1000 / noa.container._shell.tickRate;
            tickTime *= noa.timeScale;
            var tickMS = tickPos * tickTime;
            // tickMS is time since last physics engine tick
            // to avoid temporal aliasing, render the state as if lerping between
            // the last position and the next one 
            // since the entity data is the "next" position this amounts to 
            // offsetting each entity into the past by tickRate - dt
            // http://gafferongames.com/game-physics/fix-your-timestep/
            var backtrackAmt = (tickMS - tickTime) / 1000;
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                var id = state.__id;
                var pdat = noa.ents.getPositionData(id);
                var smoothed = noa.ents.cameraSmoothed(id);
                $a7202459cec49fce$var$backtrackRenderPos(state, pdat, backtrackAmt, smoothed);
            }
        }
    };
}
// var offset = vec3.create()
var $a7202459cec49fce$var$local = (0, $5OpyM$glvec3).create();
function $a7202459cec49fce$export$a55ed034c373ec2(physState, posState) {
    var box = physState.body.aabb;
    var ext = posState._extents;
    (0, $5OpyM$glvec3).copy(box.base, ext);
    (0, $5OpyM$glvec3).set(box.vec, posState.width, posState.height, posState.width);
    (0, $5OpyM$glvec3).add(box.max, box.base, box.vec);
}
function $a7202459cec49fce$var$setPositionFromPhysics(physState, posState) {
    var base = physState.body.aabb.base;
    var hw = posState.width / 2;
    (0, $5OpyM$glvec3).set(posState._localPosition, base[0] + hw, base[1], base[2] + hw);
}
function $a7202459cec49fce$var$backtrackRenderPos(physState, posState, backtrackAmt, smoothed) {
    // pos = pos + backtrack * body.velocity
    var vel = physState.body.velocity;
    (0, $5OpyM$glvec3).scaleAndAdd($a7202459cec49fce$var$local, posState._localPosition, vel, backtrackAmt);
    // smooth out update if component is present
    // (this is set after sudden movements like auto-stepping)
    if (smoothed) (0, $5OpyM$glvec3).lerp($a7202459cec49fce$var$local, posState._renderPosition, $a7202459cec49fce$var$local, 0.3);
    // copy values over to renderPosition, 
    (0, $5OpyM$glvec3).copy(posState._renderPosition, $a7202459cec49fce$var$local);
}


var $7f25b1b2e74b20aa$exports = {};

$parcel$export($7f25b1b2e74b20aa$exports, "collideEntities", () => $00e2335fc52c70d1$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "collideTerrain", () => $655007847d747603$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "fadeOnZoom", () => $55ffb9b56919d7bd$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "followsEntity", () => $9f83d538ca7f2875$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "mesh", () => $4019083e3b52abff$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "movement", () => $8110b09ddec96c3c$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "physics", () => $a7202459cec49fce$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "position", () => $7ac5306bc4471494$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "receivesInputs", () => $15c8033c049c206f$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "shadow", () => $4a079630e8a37c92$export$2e2bcd8739ae039);
$parcel$export($7f25b1b2e74b20aa$exports, "smoothCamera", () => $e04d6487449b87d2$export$2e2bcd8739ae039);

function $00e2335fc52c70d1$export$2e2bcd8739ae039(noa) {
    var intervals = [];
    return {
        name: "collideEntities",
        order: 70,
        state: {
            cylinder: false,
            collideBits: 1,
            collideMask: 1,
            callback: null
        },
        onAdd: null,
        onRemove: null,
        system: function entityCollider(dt, states) {
            var ents = noa.ents;
            // data struct that boxIntersect looks for
            // - array of [lo, lo, lo, hi, hi, hi] extents
            for(var i = 0; i < states.length; i++){
                var id = states[i].__id;
                var dat = ents.getPositionData(id);
                intervals[i] = dat._extents;
            }
            intervals.length = states.length;
            // run the intersect library
            (0, $5OpyM$boxintersect)(intervals, function(a, b) {
                var stateA = states[a];
                var stateB = states[b];
                if (!stateA || !stateB) return;
                var intervalA = intervals[a];
                var intervalB = intervals[b];
                if (cylindricalHitTest(stateA, stateB, intervalA, intervalB)) handleCollision(noa, stateA, stateB);
            });
        }
    };
    /*
     * 
     * 		IMPLEMENTATION
     * 
     */ function handleCollision(noa, stateA, stateB) {
        var idA = stateA.__id;
        var idB = stateB.__id;
        // entities really do overlap, so check masks and call event handlers
        if (stateA.collideMask & stateB.collideBits) {
            if (stateA.callback) stateA.callback(idB);
        }
        if (stateB.collideMask & stateA.collideBits) {
            if (stateB.callback) stateB.callback(idA);
        }
        // general pairwise handler
        noa.ents.onPairwiseEntityCollision(idA, idB);
    }
    // For entities whose extents overlap, 
    // test if collision still happens when taking cylinder flags into account
    function cylindricalHitTest(stateA, stateB, intervalA, intervalB) {
        if (stateA.cylinder) {
            if (stateB.cylinder) return cylinderCylinderTest(intervalA, intervalB);
            else return cylinderBoxTest(intervalA, intervalB);
        } else if (stateB.cylinder) return cylinderBoxTest(intervalB, intervalA);
        return true;
    }
    // Cylinder-cylinder hit test (AABBs are known to overlap)
    // given their extent arrays [lo, lo, lo, hi, hi, hi]
    function cylinderCylinderTest(a, b) {
        // distance between cylinder centers
        var rada = (a[3] - a[0]) / 2;
        var radb = (b[3] - b[0]) / 2;
        var dx = a[0] + rada - (b[0] + radb);
        var dz = a[2] + rada - (b[2] + radb);
        // collide if dist <= sum of radii
        var distsq = dx * dx + dz * dz;
        var radsum = rada + radb;
        return distsq <= radsum * radsum;
    }
    // Cylinder-Box hit test (AABBs are known to overlap)
    // given their extent arrays [lo, lo, lo, hi, hi, hi]
    function cylinderBoxTest(cyl, cube) {
        // X-z center of cylinder
        var rad = (cyl[3] - cyl[0]) / 2;
        var cx = cyl[0] + rad;
        var cz = cyl[2] + rad;
        // point in X-Z square closest to cylinder
        var px = clamp(cx, cube[0], cube[3]);
        var pz = clamp(cz, cube[2], cube[5]);
        // collision if distance from that point to circle <= cylinder radius
        var dx = px - cx;
        var dz = pz - cz;
        var distsq = dx * dx + dz * dz;
        return distsq <= rad * rad;
    }
    function clamp(val, lo, hi) {
        return val < lo ? lo : val > hi ? hi : val;
    }
}


function $655007847d747603$export$2e2bcd8739ae039(noa) {
    return {
        name: "collideTerrain",
        order: 0,
        state: {
            callback: null
        },
        onAdd: function(eid, state) {
            // add collide handler for physics engine to call
            var ents = noa.entities;
            if (ents.hasPhysics(eid)) {
                var body = ents.getPhysics(eid).body;
                body.onCollide = function bodyOnCollide(impulse) {
                    var cb = noa.ents.getCollideTerrain(eid).callback;
                    if (cb) cb(impulse, eid);
                };
            }
        },
        onRemove: function(eid, state) {
            var ents = noa.entities;
            if (ents.hasPhysics(eid)) ents.getPhysics(eid).body.onCollide = null;
        }
    };
}


/**
 * Component for the player entity, when active hides the player's mesh 
 * when camera zoom is less than a certain amount
 */ function $55ffb9b56919d7bd$export$2e2bcd8739ae039(noa) {
    return {
        name: "fadeOnZoom",
        order: 99,
        state: {
            cutoff: 1.5,
            _showing: null
        },
        onAdd: null,
        onRemove: null,
        system: function fadeOnZoomProc(dt, states) {
            var zoom = noa.camera.currentZoom;
            var ents = noa.entities;
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                $55ffb9b56919d7bd$var$checkZoom(state, zoom, ents);
            }
        }
    };
}
function $55ffb9b56919d7bd$var$checkZoom(state, zoom, ents) {
    if (!ents.hasMesh(state.__id)) return;
    var shouldShow = zoom > state.cutoff;
    if (state._showing !== shouldShow) {
        ents.getMeshData(state.__id).mesh.visibility = shouldShow;
        state._showing = shouldShow;
    }
}



function $9f83d538ca7f2875$export$2e2bcd8739ae039(noa) {
    return {
        name: "followsEntity",
        order: 50,
        state: {
            entity: 0,
            offset: null,
            onTargetMissing: null
        },
        onAdd: function(eid, state) {
            var off = (0, $5OpyM$glvec3).create();
            state.offset = state.offset ? (0, $5OpyM$glvec3).copy(off, state.offset) : off;
            updatePosition(state);
            updateRenderPosition(state);
        },
        onRemove: null,
        // on tick, copy over regular positions
        system: function followEntity(dt, states) {
            for(var i = 0; i < states.length; i++)updatePosition(states[i]);
        },
        // on render, copy over render positions
        renderSystem: function followEntityMesh(dt, states) {
            for(var i = 0; i < states.length; i++)updateRenderPosition(states[i]);
        }
    };
    function updatePosition(state) {
        var id = state.__id;
        var self = noa.ents.getPositionData(id);
        var other = noa.ents.getPositionData(state.entity);
        if (!other) {
            if (state.onTargetMissing) state.onTargetMissing(id);
            noa.ents.removeComponent(id, noa.ents.names.followsEntity);
        } else (0, $5OpyM$glvec3).add(self._localPosition, other._localPosition, state.offset);
    }
    function updateRenderPosition(state) {
        var id = state.__id;
        var self = noa.ents.getPositionData(id);
        var other = noa.ents.getPositionData(state.entity);
        if (other) (0, $5OpyM$glvec3).add(self._renderPosition, other._renderPosition, state.offset);
    }
}



function $4019083e3b52abff$export$2e2bcd8739ae039(noa) {
    return {
        name: "mesh",
        order: 100,
        state: {
            mesh: null,
            offset: null
        },
        onAdd: function(eid, state) {
            // implicitly assume there's already a position component
            var posDat = noa.ents.getPositionData(eid);
            if (state.mesh) noa.rendering.addMeshToScene(state.mesh, false, posDat.position);
            else throw new Error("Mesh component added without a mesh - probably a bug!");
            if (!state.offset) state.offset = (0, $5OpyM$glvec3).create();
            // set mesh to correct position
            var rpos = posDat._renderPosition;
            state.mesh.position.copyFromFloats(rpos[0] + state.offset[0], rpos[1] + state.offset[1], rpos[2] + state.offset[2]);
        },
        onRemove: function(eid, state) {
            state.mesh.dispose();
        },
        renderSystem: function(dt, states) {
            // before render move each mesh to its render position, 
            // set by the physics engine or driving logic
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                var id = state.__id;
                var rpos = noa.ents.getPositionData(id)._renderPosition;
                state.mesh.position.copyFromFloats(rpos[0] + state.offset[0], rpos[1] + state.offset[1], rpos[2] + state.offset[2]);
            }
        }
    };
}


/** 
 * @module
 * @internal
 */ 
function $8110b09ddec96c3c$export$81d0ff45245469ac() {
    this.heading = 0 // radians
    ;
    this.running = false;
    this.jumping = false;
    // options
    this.maxSpeed = 10;
    this.moveForce = 30;
    this.responsiveness = 15;
    this.runningFriction = 0;
    this.standingFriction = 2;
    // jumps
    this.airMoveMult = 0.5;
    this.jumpImpulse = 10;
    this.jumpForce = 12;
    this.jumpTime = 500 // ms
    ;
    this.airJumps = 1;
    // internal state
    this._jumpCount = 0;
    this._currjumptime = 0;
    this._isJumping = false;
}
function $8110b09ddec96c3c$export$2e2bcd8739ae039(noa) {
    return {
        name: "movement",
        order: 30,
        state: new $8110b09ddec96c3c$export$81d0ff45245469ac(),
        onAdd: null,
        onRemove: null,
        system: function movementProcessor(dt, states) {
            var ents = noa.entities;
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                var phys = ents.getPhysics(state.__id);
                if (phys) $8110b09ddec96c3c$var$applyMovementPhysics(dt, state, phys.body);
            }
        }
    };
}
var $8110b09ddec96c3c$var$tempvec = (0, $5OpyM$glvec3).create();
var $8110b09ddec96c3c$var$tempvec2 = (0, $5OpyM$glvec3).create();
var $8110b09ddec96c3c$var$zeroVec = (0, $5OpyM$glvec3).create();
/**
 * @param {number} dt 
 * @param {MovementState} state 
 * @param {*} body 
*/ function $8110b09ddec96c3c$var$applyMovementPhysics(dt, state, body) {
    // move implementation originally written as external module
    //   see https://github.com/fenomas/voxel-fps-controller
    //   for original code
    // jumping
    var onGround = body.atRestY() < 0;
    var canjump = onGround || state._jumpCount < state.airJumps;
    if (onGround) {
        state._isJumping = false;
        state._jumpCount = 0;
    }
    // process jump input
    if (state.jumping) {
        if (state._isJumping) {
            if (state._currjumptime > 0) {
                var jf = state.jumpForce;
                if (state._currjumptime < dt) jf *= state._currjumptime / dt;
                body.applyForce([
                    0,
                    jf,
                    0
                ]);
                state._currjumptime -= dt;
            }
        } else if (canjump) {
            state._isJumping = true;
            if (!onGround) state._jumpCount++;
            state._currjumptime = state.jumpTime;
            body.applyImpulse([
                0,
                state.jumpImpulse,
                0
            ]);
            // clear downward velocity on airjump
            if (!onGround && body.velocity[1] < 0) body.velocity[1] = 0;
        }
    } else state._isJumping = false;
    // apply movement forces if entity is moving, otherwise just friction
    var m = $8110b09ddec96c3c$var$tempvec;
    var push = $8110b09ddec96c3c$var$tempvec2;
    if (state.running) {
        var speed = state.maxSpeed;
        // todo: add crouch/sprint modifiers if needed
        // if (state.sprint) speed *= state.sprintMoveMult
        // if (state.crouch) speed *= state.crouchMoveMult
        (0, $5OpyM$glvec3).set(m, 0, 0, speed);
        // rotate move vector to entity's heading
        (0, $5OpyM$glvec3).rotateY(m, m, $8110b09ddec96c3c$var$zeroVec, state.heading);
        // push vector to achieve desired speed & dir
        // following code to adjust 2D velocity to desired amount is patterned on Quake: 
        // https://github.com/id-Software/Quake-III-Arena/blob/master/code/game/bg_pmove.c#L275
        (0, $5OpyM$glvec3).subtract(push, m, body.velocity);
        push[1] = 0;
        var pushLen = (0, $5OpyM$glvec3).length(push);
        (0, $5OpyM$glvec3).normalize(push, push);
        if (pushLen > 0) {
            // pushing force vector
            var canPush = state.moveForce;
            if (!onGround) canPush *= state.airMoveMult;
            // apply final force
            var pushAmt = state.responsiveness * pushLen;
            if (canPush > pushAmt) canPush = pushAmt;
            (0, $5OpyM$glvec3).scale(push, push, canPush);
            body.applyForce(push);
        }
        // different friction when not moving
        // idea from Sonic: http://info.sonicretro.org/SPG:Running
        body.friction = state.runningFriction;
    } else body.friction = state.standingFriction;
}




/**
 * 
 * Input processing component - gets (key) input state and  
 * applies it to receiving entities by updating their movement 
 * component state (heading, movespeed, jumping, etc.)
 * 
 */ function $15c8033c049c206f$export$2e2bcd8739ae039(noa) {
    return {
        name: "receivesInputs",
        order: 20,
        state: {},
        onAdd: null,
        onRemove: null,
        system: function inputProcessor(dt, states) {
            var ents = noa.entities;
            var inputState = noa.inputs.state;
            var camHeading = noa.camera.heading;
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                var moveState = ents.getMovement(state.__id);
                $15c8033c049c206f$var$setMovementState(moveState, inputState, camHeading);
            }
        }
    };
}
/**
 * @param {import('../components/movement').MovementState} state 
 * @param {Object<string, boolean>} inputs 
 * @param {number} camHeading 
*/ function $15c8033c049c206f$var$setMovementState(state, inputs, camHeading) {
    state.jumping = !!inputs.jump;
    var fb = inputs.forward ? inputs.backward ? 0 : 1 : inputs.backward ? -1 : 0;
    var rl = inputs.right ? inputs.left ? 0 : 1 : inputs.left ? -1 : 0;
    if ((fb | rl) === 0) state.running = false;
    else {
        state.running = true;
        if (fb) {
            if (fb == -1) camHeading += Math.PI;
            if (rl) camHeading += Math.PI / 4 * fb * rl // didn't plan this but it works!
            ;
        } else camHeading += rl * Math.PI / 2;
        state.heading = camHeading;
    }
}







function $4a079630e8a37c92$export$2e2bcd8739ae039(noa, dist) {
    var shadowDist = dist;
    // create a mesh to re-use for shadows
    var scene = noa.rendering.getScene();
    var disc = (0, $5OpyM$CreateDisc)("shadow", {
        radius: 0.75,
        tessellation: 30
    }, scene);
    disc.rotation.x = Math.PI / 2;
    var mat = noa.rendering.makeStandardMaterial("shadowMat");
    mat.diffuseColor = (0, $5OpyM$Color3).Black();
    mat.ambientColor = (0, $5OpyM$Color3).Black();
    mat.alpha = 0.5;
    disc.material = mat;
    disc.setEnabled(false);
    // source mesh needn't be in the scene graph
    scene.removeMesh(disc);
    return {
        name: "shadow",
        order: 80,
        state: {
            size: 0.5,
            _mesh: null
        },
        onAdd: function(eid, state) {
            var mesh = disc.createInstance("shadow_instance");
            noa.rendering.addMeshToScene(mesh);
            mesh.setEnabled(false);
            state._mesh = mesh;
        },
        onRemove: function(eid, state) {
            state._mesh.dispose();
        },
        system: function shadowSystem(dt, states) {
            var cpos = noa.camera._localGetPosition();
            var dist = shadowDist;
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                var posState = noa.ents.getPositionData(state.__id);
                var physState = noa.ents.getPhysics(state.__id);
                $4a079630e8a37c92$var$updateShadowHeight(noa, posState, physState, state._mesh, state.size, dist, cpos);
            }
        },
        renderSystem: function(dt, states) {
            // before render adjust shadow x/z to render positions
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                var rpos = noa.ents.getPositionData(state.__id)._renderPosition;
                var spos = state._mesh.position;
                spos.x = rpos[0];
                spos.z = rpos[2];
            }
        }
    };
}
var $4a079630e8a37c92$var$shadowPos = (0, $5OpyM$glvec3).fromValues(0, 0, 0);
var $4a079630e8a37c92$var$down = (0, $5OpyM$glvec3).fromValues(0, -1, 0);
function $4a079630e8a37c92$var$updateShadowHeight(noa, posDat, physDat, mesh, size, shadowDist, camPos) {
    // local Y ground position - from physics or raycast
    var localY;
    if (physDat && physDat.body.resting[1] < 0) localY = posDat._localPosition[1];
    else {
        var res = noa._localPick(posDat._localPosition, $4a079630e8a37c92$var$down, shadowDist);
        if (!res) {
            mesh.setEnabled(false);
            return;
        }
        localY = res.position[1] - noa.worldOriginOffset[1];
    }
    // round Y pos and offset upwards slightly to avoid z-fighting
    localY = Math.round(localY);
    (0, $5OpyM$glvec3).copy($4a079630e8a37c92$var$shadowPos, posDat._localPosition);
    $4a079630e8a37c92$var$shadowPos[1] = localY;
    var sqdist = (0, $5OpyM$glvec3).squaredDistance(camPos, $4a079630e8a37c92$var$shadowPos);
    // offset ~ 0.01 for nearby shadows, up to 0.1 at distance of ~40
    var offset = 0.01 + 0.1 * (sqdist / 1600);
    if (offset > 0.1) offset = 0.1;
    mesh.position.y = localY + offset;
    // set shadow scale
    var dist = posDat._localPosition[1] - localY;
    var scale = size * 0.7 * (1 - dist / shadowDist);
    mesh.scaling.copyFromFloats(scale, scale, scale);
    mesh.setEnabled(true);
}


function $e04d6487449b87d2$export$2e2bcd8739ae039(noa) {
    var compName = "smoothCamera";
    return {
        name: compName,
        order: 99,
        state: {
            time: 100.1
        },
        onAdd: null,
        onRemove: null,
        system: function(dt, states) {
            // remove self after time elapses
            for(var i = 0; i < states.length; i++){
                var state = states[i];
                state.time -= dt;
                if (state.time < 0) noa.ents.removeComponent(state.__id, compName);
            }
        }
    };
}




var $d163e1ef2fd5c265$var$defaultOptions = {
    shadowDistance: 10
};
class $d163e1ef2fd5c265$export$50f02d20b9547443 extends (0, $5OpyM$entcomp) {
    /** @internal */ constructor(noa, opts){
        super();
        opts = Object.assign({}, $d163e1ef2fd5c265$var$defaultOptions, opts);
        // optional arguments to supply to component creation functions
        var componentArgs = {
            "shadow": opts.shadowDistance
        };
        /** 
         * @internal
         * @type {import('../index').Engine}
        */ this.noa = noa;
        /** Hash containing the component names of built-in components.
         * @type {Object.<string, string>}
        */ this.names = {};
        // does bundler magic to import all compontents, and call
        // `ents.createComponent` on them
        $d163e1ef2fd5c265$var$importLocalComponents(this, componentArgs, this.createComponent);
        /*
         *
         *
         * 
         *          ENTITY ACCESSORS
         *
         * A whole bunch of getters and such for accessing component state.
         * These are moderately faster than `ents.getState(whatever)`.
         * 
         * 
         * 
        */ /** @internal */ this.cameraSmoothed = this.getComponentAccessor(this.names.smoothCamera);
        /**
         * Returns whether the entity has a physics body
         * @type {(id:number) => boolean}
        */ this.hasPhysics = this.getComponentAccessor(this.names.physics);
        /**
         * Returns whether the entity has a position
         * @type {(id:number) => boolean}
        */ this.hasPosition = this.getComponentAccessor(this.names.position);
        /**
         * Returns the entity's position component state
         * @type {(id:number) => null | import("../components/position").PositionState} 
        */ this.getPositionData = this.getStateAccessor(this.names.position);
        /**
         * Returns the entity's position vector.
         * @type {(id:number) => number[]}
        */ this.getPosition = (id)=>{
            var state = this.getPositionData(id);
            return state ? state.position : null;
        };
        /**
         * Get the entity's `physics` component state.
         * @type {(id:number) => null | import("../components/physics").PhysicsState} 
        */ this.getPhysics = this.getStateAccessor(this.names.physics);
        /**
         * Returns the entity's physics body
         * Note, will throw if the entity doesn't have the position component!
         * @type {(id:number) => null | import("../components/physics").RigidBody} 
        */ this.getPhysicsBody = (id)=>{
            var state = this.getPhysics(id);
            return state ? state.body : null;
        };
        /**
         * Returns whether the entity has a mesh
         * @type {(id:number) => boolean}
        */ this.hasMesh = this.getComponentAccessor(this.names.mesh);
        /**
         * Returns the entity's `mesh` component state
         * @type {(id:number) => {mesh:any, offset:number[]}}
        */ this.getMeshData = this.getStateAccessor(this.names.mesh);
        /**
         * Returns the entity's `movement` component state
         * @type {(id:number) => import('../components/movement').MovementState}
        */ this.getMovement = this.getStateAccessor(this.names.movement);
        /**
         * Returns the entity's `collideTerrain` component state
         * @type {(id:number) => {callback: function}}
        */ this.getCollideTerrain = this.getStateAccessor(this.names.collideTerrain);
        /**
         * Returns the entity's `collideEntities` component state
         * @type {(id:number) => {
         *      cylinder:boolean, collideBits:number, 
         *      collideMask:number, callback: function}}
        */ this.getCollideEntities = this.getStateAccessor(this.names.collideEntities);
        /**
         * Pairwise collideEntities event - assign your own function to this 
         * property if you want to handle entity-entity overlap events.
         * @type {(id1:number, id2:number) => void}
         */ this.onPairwiseEntityCollision = function(id1, id2) {};
    }
    /*
     * 
     * 
     *      PUBLIC ENTITY STATE ACCESSORS
     * 
     * 
    */ /** Set an entity's position, and update all derived state.
     * 
     * In general, always use this to set an entity's position unless
     * you're familiar with engine internals.
     * 
     * ```js
     * noa.ents.setPosition(playerEntity, [5, 6, 7])
     * noa.ents.setPosition(playerEntity, 5, 6, 7)  // also works
     * ```
     * 
     * @param {number} id
     */ setPosition(id, pos, y = 0, z = 0) {
        if (typeof pos === "number") pos = [
            pos,
            y,
            z
        ];
        // convert to local and defer impl
        var loc = this.noa.globalToLocal(pos, null, []);
        this._localSetPosition(id, loc);
    }
    /** Set an entity's size 
     * @param {number} xs
     * @param {number} ys
     * @param {number} zs
    */ setEntitySize(id, xs, ys, zs) {
        var posDat = this.getPositionData(id);
        posDat.width = (xs + zs) / 2;
        posDat.height = ys;
        this._updateDerivedPositionData(id, posDat);
    }
    /**
     * called when engine rebases its local coords
     * @internal
     */ _rebaseOrigin(delta) {
        for (var state of this.getStatesList(this.names.position)){
            var locPos = state._localPosition;
            var hw = state.width / 2;
            $d163e1ef2fd5c265$var$nudgePosition(locPos, 0, -hw, hw, state.__id);
            $d163e1ef2fd5c265$var$nudgePosition(locPos, 1, 0, state.height, state.__id);
            $d163e1ef2fd5c265$var$nudgePosition(locPos, 2, -hw, hw, state.__id);
            (0, $5OpyM$glvec3).subtract(locPos, locPos, delta);
            this._updateDerivedPositionData(state.__id, state);
        }
    }
    /** @internal */ _localGetPosition(id) {
        return this.getPositionData(id)._localPosition;
    }
    /** @internal */ _localSetPosition(id, pos) {
        var posDat = this.getPositionData(id);
        (0, $5OpyM$glvec3).copy(posDat._localPosition, pos);
        this._updateDerivedPositionData(id, posDat);
    }
    /** 
     * helper to update everything derived from `_localPosition`
     * @internal 
    */ _updateDerivedPositionData(id, posDat) {
        (0, $5OpyM$glvec3).copy(posDat._renderPosition, posDat._localPosition);
        var offset = this.noa.worldOriginOffset;
        (0, $5OpyM$glvec3).add(posDat.position, posDat._localPosition, offset);
        (0, $7ac5306bc4471494$export$20c19878786a4a8d)(posDat);
        var physDat = this.getPhysics(id);
        if (physDat) (0, $a7202459cec49fce$export$a55ed034c373ec2)(physDat, posDat);
    }
    /*
     *
     *
     *      OTHER ENTITY MANAGEMENT APIs
     * 
     *      note most APIs are on the original ECS module (ent-comp)
     *      these are some overlaid extras for noa
     *
     *
    */ /** 
     * Safely add a component - if the entity already had the 
     * component, this will remove and re-add it.
    */ addComponentAgain(id, name, state) {
        // removes component first if necessary
        if (this.hasComponent(id, name)) this.removeComponent(id, name);
        this.addComponent(id, name, state);
    }
    /** 
     * Checks whether a voxel is obstructed by any entity (with the 
     * `collidesTerrain` component)
    */ isTerrainBlocked(x, y, z) {
        // checks if terrain location is blocked by entities
        var off = this.noa.worldOriginOffset;
        var xlocal = Math.floor(x - off[0]);
        var ylocal = Math.floor(y - off[1]);
        var zlocal = Math.floor(z - off[2]);
        var blockExt = [
            xlocal + 0.001,
            ylocal + 0.001,
            zlocal + 0.001,
            xlocal + 0.999,
            ylocal + 0.999,
            zlocal + 0.999
        ];
        var list = this.getStatesList(this.names.collideTerrain);
        for(var i = 0; i < list.length; i++){
            var id = list[i].__id;
            var ext = this.getPositionData(id)._extents;
            if ($d163e1ef2fd5c265$var$extentsOverlap(blockExt, ext)) return true;
        }
        return false;
    }
    /** 
     * Gets an array of all entities overlapping the given AABB
    */ getEntitiesInAABB(box, withComponent) {
        // extents to test against
        var off = this.noa.worldOriginOffset;
        var testExtents = [
            box.base[0] - off[0],
            box.base[1] - off[1],
            box.base[2] - off[2],
            box.max[0] - off[0],
            box.max[1] - off[1],
            box.max[2] - off[2]
        ];
        // entity position state list
        var entStates;
        if (withComponent) {
            entStates = [];
            for (var compState of this.getStatesList(withComponent)){
                var pdat = this.getPositionData(compState.__id);
                if (pdat) entStates.push(pdat);
            }
        } else entStates = this.getStatesList(this.names.position);
        // run each test
        var hits = [];
        for(var i = 0; i < entStates.length; i++){
            var state = entStates[i];
            if ($d163e1ef2fd5c265$var$extentsOverlap(testExtents, state._extents)) hits.push(state.__id);
        }
        return hits;
    }
    /** 
     * Helper to set up a general entity, and populate with some common components depending on arguments.
    */ add(position = null, width = 1, height = 1, mesh = null, meshOffset = null, doPhysics = false, shadow = false) {
        var self = this;
        // new entity
        var eid = this.createEntity();
        // position component
        this.addComponent(eid, this.names.position, {
            position: position || (0, $5OpyM$glvec3).create(),
            width: width,
            height: height
        });
        // rigid body in physics simulator
        if (doPhysics) {
            // body = this.noa.physics.addBody(box)
            this.addComponent(eid, this.names.physics);
            var body = this.getPhysics(eid).body;
            // handler for physics engine to call on auto-step
            var smoothName = this.names.smoothCamera;
            body.onStep = function() {
                self.addComponentAgain(eid, smoothName);
            };
        }
        // mesh for the entity
        if (mesh) {
            if (!meshOffset) meshOffset = (0, $5OpyM$glvec3).create();
            this.addComponent(eid, this.names.mesh, {
                mesh: mesh,
                offset: meshOffset
            });
        }
        // add shadow-drawing component
        if (shadow) this.addComponent(eid, this.names.shadow, {
            size: width
        });
        return eid;
    }
}
/*
 * 
 * 
 * 
 *          HELPERS
 * 
 * 
 * 
*/ // safety helper - when rebasing, nudge extent away from 
// voxel boudaries, so floating point error doesn't carry us accross
function $d163e1ef2fd5c265$var$nudgePosition(pos, index, dmin, dmax, id) {
    var min = pos[index] + dmin;
    var max = pos[index] + dmax;
    if (Math.abs(min - Math.round(min)) < 0.002) pos[index] += 0.002;
    if (Math.abs(max - Math.round(max)) < 0.001) pos[index] -= 0.001;
}
// compare extent arrays
function $d163e1ef2fd5c265$var$extentsOverlap(extA, extB) {
    if (extA[0] > extB[3]) return false;
    if (extA[1] > extB[4]) return false;
    if (extA[2] > extB[5]) return false;
    if (extA[3] < extB[0]) return false;
    if (extA[4] < extB[1]) return false;
    if (extA[5] < extB[2]) return false;
    return true;
}
// Bundler magic to import everything in the ../components directory
// each component module exports a default function: (noa) => compDefinition
function $d163e1ef2fd5c265$var$importLocalComponents(ents, args, createCompFn) {
    for (var name of Object.keys($7f25b1b2e74b20aa$exports)){
        var arg = args[name] || undefined;
        var compFn = $7f25b1b2e74b20aa$exports[name];
        var compDef = compFn(ents.noa, arg);
        var comp = createCompFn(compDef);
        ents.names[compDef.name] = comp;
    }
}


/** 
 * @module 
 * @internal exclude this file from API docs 
*/ /** 
 * @module 
 * @internal exclude this file from API docs 
*/ // helper to swap item to end and pop(), instead of splice()ing
function $afbe2889bb225d5c$export$adb0e12dab3d5fcb(list, item) {
    var i = list.indexOf(item);
    if (i < 0) return;
    if (i === list.length - 1) list.pop();
    else list[i] = list.pop();
}
function $afbe2889bb225d5c$export$5fa3aa8d50144909(maxTimeInMS, callback, startTime) {
    var t0 = startTime || performance.now();
    var res = callback();
    if (res) return;
    var t1 = performance.now(), dt = t1 - startTime;
    // tweak time to make the average delay equal to the desired amt
    var cutoff = t0 + maxTimeInMS - dt / 2;
    if (t1 > cutoff) return;
    var maxIter = 1000 // sanity check
    ;
    for(var i = 0; i < maxIter; i++){
        if (callback() || performance.now() > cutoff) return;
    }
}
function $afbe2889bb225d5c$export$2ed5fb280ad1f3ba(rad) {
    if (rad === $afbe2889bb225d5c$var$prevRad) return $afbe2889bb225d5c$var$prevAnswer;
    var ext = Math.ceil(rad), ct = 0, rsq = rad * rad;
    for(var i = -ext; i <= ext; ++i){
        for(var j = -ext; j <= ext; ++j)for(var k = -ext; k <= ext; ++k){
            var dsq = i * i + j * j + k * k;
            if (dsq < rsq) ct++;
        }
    }
    $afbe2889bb225d5c$var$prevRad = rad;
    $afbe2889bb225d5c$var$prevAnswer = ct;
    return ct;
}
var $afbe2889bb225d5c$var$prevRad = 0, $afbe2889bb225d5c$var$prevAnswer = 0;
function $afbe2889bb225d5c$export$9cfc44a6ae0770a3(src, tgt, pos, size, tgtPos) {
    if (src) $afbe2889bb225d5c$var$doNdarrayCopy(src, tgt, pos[0], pos[1], pos[2], size[0], size[1], size[2], tgtPos[0], tgtPos[1], tgtPos[2]);
    else $afbe2889bb225d5c$var$doNdarrayZero(tgt, tgtPos[0], tgtPos[1], tgtPos[2], size[0], size[1], size[2]);
}
function $afbe2889bb225d5c$var$doNdarrayCopy(src, tgt, i0, j0, k0, si, sj, sk, ti, tj, tk) {
    var sdx = src.stride[2];
    var tdx = tgt.stride[2];
    for(var i = 0; i < si; i++)for(var j = 0; j < sj; j++){
        var six = src.index(i0 + i, j0 + j, k0);
        var tix = tgt.index(ti + i, tj + j, tk);
        for(var k = 0; k < sk; k++){
            tgt.data[tix] = src.data[six];
            six += sdx;
            tix += tdx;
        }
    }
}
function $afbe2889bb225d5c$var$doNdarrayZero(tgt, i0, j0, k0, si, sj, sk) {
    var dx = tgt.stride[2];
    for(var i = 0; i < si; i++)for(var j = 0; j < sj; j++){
        var ix = tgt.index(i0 + i, j0 + j, k0);
        for(var k = 0; k < sk; k++){
            tgt.data[ix] = 0;
            ix += dx;
        }
    }
}
function $afbe2889bb225d5c$export$a6c53e00ddb2903(d, xmax, ymax, cb) {
    if (d === 0) return cb(0, 0, 0);
    // larger top/bottom planes of current shell
    var dx = Math.min(d, xmax);
    var dy = Math.min(d, ymax);
    if (d <= ymax) {
        for(var x = -dx; x <= dx; x++)for(var z = -dx; z <= dx; z++){
            if (cb(x, d, z)) return true;
            if (cb(x, -d, z)) return true;
        }
    }
    // smaller side planes of shell
    if (d <= xmax) {
        for(var i = -d; i < d; i++)for(var y = -dy + 1; y < dy; y++){
            if (cb(i, y, d)) return true;
            if (cb(-i, y, -d)) return true;
            if (cb(d, y, -i)) return true;
            if (cb(-d, y, i)) return true;
        }
    }
    return false;
}
function $afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k) {
    return i & 1023 | (j & 1023) << 10 | (k & 1023) << 20;
}
function $afbe2889bb225d5c$export$e1de8ac9d4f5f7d5() {
    var hash = {};
    // exposed API - getting and setting
    this.getChunkByIndexes = (i, j, k)=>{
        return hash[$afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k)] || null;
    };
    this.storeChunkByIndexes = (i, j, k, chunk)=>{
        hash[$afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k)] = chunk;
    };
    this.removeChunkByIndexes = (i, j, k)=>{
        delete hash[$afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k)];
    };
}
function $afbe2889bb225d5c$export$3de2ef94d6d0cf1a() {
    this.arr = [];
    this.hash = {};
}
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.forEach = function(a, b) {
    this.arr.forEach(a, b);
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.includes = function(i, j, k) {
    var id = $afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k);
    return !!this.hash[id];
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.add = function(i, j, k) {
    var id = $afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k);
    if (this.hash[id]) return;
    this.arr.push([
        i,
        j,
        k,
        id
    ]);
    this.hash[id] = true;
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.addToFront = function(i, j, k) {
    var id = $afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k);
    if (this.hash[id]) return;
    this.arr.unshift([
        i,
        j,
        k,
        id
    ]);
    this.hash[id] = true;
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.removeByIndex = function(ix) {
    var el = this.arr[ix];
    delete this.hash[el[3]];
    this.arr.splice(ix, 1);
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.remove = function(i, j, k) {
    var id = $afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k);
    if (!this.hash[id]) return;
    delete this.hash[id];
    for(var ix = 0; ix < this.arr.length; ix++)if (id === this.arr[ix][3]) {
        this.arr.splice(ix, 1);
        return;
    }
    throw "internal bug with location queue - hash value overlapped";
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.count = function() {
    return this.arr.length;
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.isEmpty = function() {
    return this.arr.length === 0;
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.empty = function() {
    this.arr.length = 0;
    this.hash = {};
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.pop = function() {
    var el = this.arr.pop();
    delete this.hash[el[3]];
    return el;
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.copyFrom = function(queue) {
    this.arr = queue.arr.slice();
    this.hash = {};
    for(var key in queue.hash)this.hash[key] = true;
};
$afbe2889bb225d5c$export$3de2ef94d6d0cf1a.prototype.sortByDistance = function(locToDist) {
    var hash = {};
    for (var loc of this.arr)hash[loc] = locToDist(loc[0], loc[1], loc[2]);
    this.arr.sort((a, b)=>hash[b] - hash[a]) // DESCENDING!
    ;
    hash = null;
};
function $afbe2889bb225d5c$export$cf559512bdad9080(every, title, filter) {
    if (!(every > 0)) return ()=>{};
    title = title || "";
    var times = [];
    var names = [];
    var started = 0;
    var last = 0;
    var iter = 0;
    var total = 0;
    var clearNext = true;
    var start = function() {
        if (clearNext) {
            times.length = names.length = 0;
            clearNext = false;
        }
        started = last = performance.now();
        iter++;
    };
    var add = function(name) {
        var t = performance.now();
        if (names.indexOf(name) < 0) names.push(name);
        var i = names.indexOf(name);
        if (!times[i]) times[i] = 0;
        times[i] += t - last;
        last = t;
    };
    var report = function() {
        total += performance.now() - started;
        if (iter === every) {
            var head = title + " total " + (total / every).toFixed(2) + "ms (avg, " + every + " runs)    ";
            console.log(head, names.map(function(name, i) {
                if (filter && times[i] / total < 0.05) return "";
                return name + ": " + (times[i] / every).toFixed(2) + "ms    ";
            }).join(""));
            clearNext = true;
            iter = 0;
            total = 0;
        }
    };
    return function profile_hook(state) {
        if (state === "start") start();
        else if (state === "end") report();
        else add(state);
    };
}
function $afbe2889bb225d5c$export$a08b0f88d95d2f15(_every, _title, filter) {
    var title = _title || "";
    var every = _every || 1;
    var counts = {};
    var started = performance.now();
    var iter = 0;
    return function profile_hook(state) {
        if (state === "start") return;
        if (state === "end") {
            if (++iter < every) return;
            var t = performance.now();
            console.log(title + "   " + Object.keys(counts).map((k)=>{
                var through = counts[k] / (t - started) * 1000;
                counts[k] = 0;
                return k + ":" + through.toFixed(2) + "   ";
            }).join(""));
            started = t;
            iter = 0;
        } else {
            if (!counts[state]) counts[state] = 0;
            counts[state]++;
        }
    };
}




var $3196c3678f180030$export$2e2bcd8739ae039 = $3196c3678f180030$var$ObjectMesher;
var $3196c3678f180030$var$PROFILE = 0;
/*
 *
 *          Object meshing
 * 
 *      Per-chunk handling of the creation/disposal of static meshes
 *      associated with particular voxel IDs
 * 
 * 
*/ function $3196c3678f180030$var$ObjectMesher(noa) {
    // transform node for all instance meshes to be parented to
    this.rootNode = new (0, $5OpyM$TransformNode)("objectMeshRoot", noa.rendering._scene);
    // tracking rebase amount inside matrix data
    var rebaseOffset = [
        0,
        0,
        0
    ];
    // flag to trigger a rebuild after a chunk is disposed
    var rebuildNextTick = false;
    // mock object to pass to customMesh handler, to get transforms
    var transformObj = new (0, $5OpyM$TransformNode)("");
    // internal storage of instance managers, keyed by ID
    // has check to dedupe by mesh, since babylon chokes on
    // separate sets of instances for the same mesh/clone/geometry
    var managers = {};
    var getManager = (id)=>{
        if (managers[id]) return managers[id];
        var mesh = noa.registry._blockMeshLookup[id];
        for(var id2 in managers){
            var prev = managers[id2].mesh;
            if (prev === mesh || prev.geometry === mesh.geometry) return managers[id] = managers[id2];
        }
        return managers[id] = new $3196c3678f180030$var$InstanceManager(noa, mesh);
    };
    /*
     * 
     *      public API
     * 
    */ // add any properties that will get used for meshing
    this.initChunk = function(chunk) {
        chunk._objectBlocks = {};
    };
    // called by world when an object block is set or cleared
    this.setObjectBlock = function(chunk, blockID, i, j, k) {
        var x = chunk.x + i;
        var y = chunk.y + j;
        var z = chunk.z + k;
        var key = (0, $afbe2889bb225d5c$export$8292e80ebf6a0)(x, y, z);
        var oldID = chunk._objectBlocks[key] || 0;
        if (oldID === blockID) return; // should be impossible
        if (oldID > 0) {
            var oldMgr = getManager(oldID);
            oldMgr.removeInstance(chunk, key);
        }
        if (blockID > 0) {
            // if there's a block event handler, call it with
            // a mock object so client can add transforms
            var handlers = noa.registry._blockHandlerLookup[blockID];
            var onCreate = handlers && handlers.onCustomMeshCreate;
            if (onCreate) {
                transformObj.position.copyFromFloats(0.5, 0, 0.5);
                transformObj.scaling.setAll(1);
                transformObj.rotation.setAll(0);
                onCreate(transformObj, x, y, z);
            }
            var mgr = getManager(blockID);
            var xform = onCreate ? transformObj : null;
            mgr.addInstance(chunk, key, i, j, k, xform, rebaseOffset);
        }
        if (oldID > 0 && !blockID) delete chunk._objectBlocks[key];
        if (blockID > 0) chunk._objectBlocks[key] = blockID;
    };
    // called by world when it knows that objects have been updated
    this.buildObjectMeshes = function() {
        $3196c3678f180030$var$profile_hook("start");
        for(var id in managers){
            var mgr = managers[id];
            mgr.updateMatrix();
            if (mgr.count === 0) mgr.dispose();
            if (mgr.disposed) delete managers[id];
        }
        $3196c3678f180030$var$profile_hook("rebuilt");
        $3196c3678f180030$var$profile_hook("end");
    };
    // called by world at end of chunk lifecycle
    this.disposeChunk = function(chunk) {
        for(var key in chunk._objectBlocks){
            var id = chunk._objectBlocks[key];
            if (id > 0) {
                var mgr = getManager(id);
                mgr.removeInstance(chunk, key);
            }
        }
        chunk._objectBlocks = null;
        // since some instance managers will have been updated
        rebuildNextTick = true;
    };
    // tick handler catches case where objects are dirty due to disposal
    this.tick = function() {
        if (rebuildNextTick) {
            this.buildObjectMeshes();
            rebuildNextTick = false;
        }
    };
    // world rebase handler
    this._rebaseOrigin = function(delta) {
        rebaseOffset[0] += delta[0];
        rebaseOffset[1] += delta[1];
        rebaseOffset[2] += delta[2];
        for(var id1 in managers)managers[id1].rebased = false;
        for(var id2 in managers){
            var mgr = managers[id2];
            if (mgr.rebased) continue;
            for(var i = 0; i < mgr.count; i++){
                var ix = i << 4;
                mgr.buffer[ix + 12] -= delta[0];
                mgr.buffer[ix + 13] -= delta[1];
                mgr.buffer[ix + 14] -= delta[2];
            }
            mgr.rebased = true;
            mgr.dirty = true;
        }
        rebuildNextTick = true;
    };
}
/*
 * 
 * 
 *      manager class for thin instances of a given object block ID 
 * 
 * 
*/ function $3196c3678f180030$var$InstanceManager(noa, mesh) {
    this.mesh = mesh;
    this.buffer = null;
    this.capacity = 0;
    this.count = 0;
    this.dirty = false;
    this.rebased = true;
    this.disposed = false;
    // dual struct to map keys (locations) to buffer locations, and back
    this.keyToIndex = {};
    this.locToKey = [];
    // prepare mesh for rendering
    this.mesh.position.setAll(0);
    this.mesh.parent = noa._objectMesher.rootNode;
    noa.rendering.addMeshToScene(this.mesh, false);
    this.mesh.doNotSyncBoundingInfo = true;
    this.mesh.alwaysSelectAsActiveMesh = true;
}
$3196c3678f180030$var$InstanceManager.prototype.dispose = function() {
    if (this.disposed) return;
    this.mesh.thinInstanceCount = 0;
    this.setCapacity(0);
    this.mesh.isVisible = false;
    this.mesh = null;
    this.keyToIndex = null;
    this.locToKey = null;
    this.disposed = true;
};
$3196c3678f180030$var$InstanceManager.prototype.addInstance = function(chunk, key, i, j, k, transform, rebaseVec) {
    if (this.count === this.capacity) $3196c3678f180030$var$expandBuffer(this);
    var ix = this.count << 4;
    this.locToKey[this.count] = key;
    this.keyToIndex[key] = ix;
    if (transform) {
        transform.position.x += chunk.x - rebaseVec[0] + i;
        transform.position.y += chunk.y - rebaseVec[1] + j;
        transform.position.z += chunk.z - rebaseVec[2] + k;
        transform.resetLocalMatrix();
        var xformArr = transform._localMatrix._m;
        $3196c3678f180030$var$copyMatrixData(xformArr, 0, this.buffer, ix);
    } else {
        var matArray = $3196c3678f180030$var$tempMatrixArray;
        matArray[12] = chunk.x - rebaseVec[0] + i + 0.5;
        matArray[13] = chunk.y - rebaseVec[1] + j;
        matArray[14] = chunk.z - rebaseVec[2] + k + 0.5;
        $3196c3678f180030$var$copyMatrixData(matArray, 0, this.buffer, ix);
    }
    this.count++;
    this.dirty = true;
};
$3196c3678f180030$var$InstanceManager.prototype.removeInstance = function(chunk, key) {
    var remIndex = this.keyToIndex[key];
    if (!(remIndex >= 0)) throw "tried to remove object instance not in storage";
    delete this.keyToIndex[key];
    var remLoc = remIndex >> 4;
    // copy tail instance's data to location of one we're removing
    var tailLoc = this.count - 1;
    if (remLoc !== tailLoc) {
        var tailIndex = tailLoc << 4;
        $3196c3678f180030$var$copyMatrixData(this.buffer, tailIndex, this.buffer, remIndex);
        // update key/location structs
        var tailKey = this.locToKey[tailLoc];
        this.keyToIndex[tailKey] = remIndex;
        this.locToKey[remLoc] = tailKey;
    }
    this.count--;
    this.dirty = true;
    if (this.count < this.capacity * 0.4) $3196c3678f180030$var$contractBuffer(this);
};
$3196c3678f180030$var$InstanceManager.prototype.updateMatrix = function() {
    if (!this.dirty) return;
    this.mesh.thinInstanceCount = this.count;
    this.mesh.thinInstanceBufferUpdated("matrix");
    this.mesh.isVisible = this.count > 0;
    this.dirty = false;
};
$3196c3678f180030$var$InstanceManager.prototype.setCapacity = function(size) {
    this.capacity = size || 0;
    if (!size) this.buffer = null;
    else {
        var prev = this.buffer;
        this.buffer = new Float32Array(this.capacity * 16);
        if (prev) {
            var len = Math.min(prev.length, this.buffer.length);
            for(var i = 0; i < len; i++)this.buffer[i] = prev[i];
        }
    }
    this.mesh.thinInstanceSetBuffer("matrix", this.buffer);
    this.dirty = false;
};
function $3196c3678f180030$var$expandBuffer(mgr) {
    var size = mgr.capacity < 16 ? 16 : mgr.capacity * 2;
    mgr.setCapacity(size);
}
function $3196c3678f180030$var$contractBuffer(mgr) {
    var size = mgr.capacity / 2 | 0;
    if (size < 100) return;
    mgr.setCapacity(size);
    mgr.locToKey.length = Math.max(mgr.locToKey.length, mgr.capacity);
}
// helpers
var $3196c3678f180030$var$tempMatrixArray = [
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0
];
function $3196c3678f180030$var$copyMatrixData(src, srcOff, dest, destOff) {
    for(var i = 0; i < 16; i++)dest[destOff + i] = src[srcOff + i];
}
var $3196c3678f180030$var$profile_hook = $3196c3678f180030$var$PROFILE ? (0, $afbe2889bb225d5c$export$cf559512bdad9080)($3196c3678f180030$var$PROFILE, "Object meshing") : ()=>{};


/** 
 * @module 
 * @internal exclude this file from API docs 
*/ 





/** 
 * @module
 * @internal
 */ 

var $a4aa757de41525e5$export$2e2bcd8739ae039 = $a4aa757de41525e5$var$Chunk;
/* 
 * 
 *   Chunk
 * 
 *  Stores and manages voxel ids and flags for each voxel within chunk
 * 
 */ /*
 *
 *    Chunk constructor
 *
 */ function $a4aa757de41525e5$var$Chunk(noa, requestID, ci, cj, ck, size, dataArray) {
    this.noa = noa;
    this.isDisposed = false;
    // voxel data and properties
    this.requestID = requestID // id sent to game client
    ;
    this.voxels = dataArray;
    this.i = ci;
    this.j = cj;
    this.k = ck;
    this.size = size;
    this.x = ci * size;
    this.y = cj * size;
    this.z = ck * size;
    this.pos = [
        this.x,
        this.y,
        this.z
    ];
    // flags to track if things need re-meshing
    this._terrainDirty = false;
    this._objectsDirty = false;
    // inits state of terrain / object meshing
    this._terrainMeshes = [];
    noa._terrainMesher.initChunk(this);
    noa._objectMesher.initChunk(this);
    this._isFull = false;
    this._isEmpty = false;
    // references to neighboring chunks, if they exist (filled in by `world`)
    var narr = Array.from(Array(27), ()=>null);
    this._neighbors = (0, $5OpyM$ndarray)(narr, [
        3,
        3,
        3
    ]).lo(1, 1, 1);
    this._neighbors.set(0, 0, 0, this);
    this._neighborCount = 0;
    this._timesMeshed = 0;
    // location queue of voxels in this chunk with block handlers (assume it's rare)
    this._blockHandlerLocs = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
    // passes through voxel contents, calling block handlers etc.
    $a4aa757de41525e5$var$scanVoxelData(this);
}
// expose logic internally to create and update the voxel data array
$a4aa757de41525e5$var$Chunk._createVoxelArray = function(size) {
    var arr = new Uint16Array(size * size * size);
    return (0, $5OpyM$ndarray)(arr, [
        size,
        size,
        size
    ]);
};
$a4aa757de41525e5$var$Chunk.prototype._updateVoxelArray = function(dataArray) {
    // dispose current object blocks
    $a4aa757de41525e5$var$callAllBlockHandlers(this, "onUnload");
    this.noa._objectMesher.disposeChunk(this);
    this.noa._terrainMesher.disposeChunk(this);
    this.voxels = dataArray;
    this._terrainDirty = false;
    this._objectsDirty = false;
    this._blockHandlerLocs.empty();
    this.noa._objectMesher.initChunk(this);
    this.noa._terrainMesher.initChunk(this);
    $a4aa757de41525e5$var$scanVoxelData(this);
};
/*
 *
 *    Chunk API
 *
 */ // get/set deal with block IDs, so that this class acts like an ndarray
$a4aa757de41525e5$var$Chunk.prototype.get = function(i, j, k) {
    return this.voxels.get(i, j, k);
};
$a4aa757de41525e5$var$Chunk.prototype.getSolidityAt = function(i, j, k) {
    var solidLookup = this.noa.registry._solidityLookup;
    return solidLookup[this.voxels.get(i, j, k)];
};
$a4aa757de41525e5$var$Chunk.prototype.set = function(i, j, k, newID) {
    var oldID = this.voxels.get(i, j, k);
    if (newID === oldID) return;
    // update voxel data
    this.voxels.set(i, j, k, newID);
    // lookup tables from registry, etc
    var solidLookup = this.noa.registry._solidityLookup;
    var objectLookup = this.noa.registry._objectLookup;
    var opaqueLookup = this.noa.registry._opacityLookup;
    var handlerLookup = this.noa.registry._blockHandlerLookup;
    // voxel lifecycle handling
    var hold = handlerLookup[oldID];
    var hnew = handlerLookup[newID];
    if (hold) $a4aa757de41525e5$var$callBlockHandler(this, hold, "onUnset", i, j, k);
    if (hnew) {
        $a4aa757de41525e5$var$callBlockHandler(this, hnew, "onSet", i, j, k);
        this._blockHandlerLocs.add(i, j, k);
    } else this._blockHandlerLocs.remove(i, j, k);
    // track object block states
    var objMesher = this.noa._objectMesher;
    var objOld = objectLookup[oldID];
    var objNew = objectLookup[newID];
    if (objOld) objMesher.setObjectBlock(this, 0, i, j, k);
    if (objNew) objMesher.setObjectBlock(this, newID, i, j, k);
    // track full/emptiness and dirty flags for the chunk
    if (!opaqueLookup[newID]) this._isFull = false;
    if (newID !== 0) this._isEmpty = false;
    var solidityChanged = solidLookup[oldID] !== solidLookup[newID];
    var opacityChanged = opaqueLookup[oldID] !== opaqueLookup[newID];
    if (objOld || objNew) this._objectsDirty = true;
    if (solidityChanged || opacityChanged || !objNew && newID !== 0) this._terrainDirty = true;
    if (this._terrainDirty || this._objectsDirty) this.noa.world._queueChunkForRemesh(this);
    // neighbors only affected if solidity or opacity changed on an edge
    if (solidityChanged || opacityChanged) {
        var edge = this.size - 1;
        var imin = i === 0 ? -1 : 0;
        var jmin = j === 0 ? -1 : 0;
        var kmin = k === 0 ? -1 : 0;
        var imax = i === edge ? 1 : 0;
        var jmax = j === edge ? 1 : 0;
        var kmax = k === edge ? 1 : 0;
        for(var ni = imin; ni <= imax; ni++){
            for(var nj = jmin; nj <= jmax; nj++)for(var nk = kmin; nk <= kmax; nk++){
                if ((ni | nj | nk) === 0) continue;
                var nab = this._neighbors.get(ni, nj, nk);
                if (!nab) return;
                nab._terrainDirty = true;
                this.noa.world._queueChunkForRemesh(nab);
            }
        }
    }
};
// helper to call handler of a given type at a particular xyz
function $a4aa757de41525e5$var$callBlockHandler(chunk, handlers, type, i, j, k) {
    var handler = handlers[type];
    if (!handler) return;
    handler(chunk.x + i, chunk.y + j, chunk.z + k);
}
// gets called by World when this chunk has been queued for remeshing
$a4aa757de41525e5$var$Chunk.prototype.updateMeshes = function() {
    if (this._terrainDirty) {
        this.noa._terrainMesher.meshChunk(this);
        this._timesMeshed++;
        this._terrainDirty = false;
    }
    if (this._objectsDirty) {
        this.noa._objectMesher.buildObjectMeshes();
        this._objectsDirty = false;
    }
};
/*
 * 
 *      Init
 * 
 *  Scans voxel data, processing object blocks and setting chunk flags
 * 
*/ function $a4aa757de41525e5$var$scanVoxelData(chunk) {
    // flags for tracking if chunk is entirely opaque or transparent
    var fullyOpaque = true;
    var fullyAir = true;
    chunk._blockHandlerLocs.empty();
    var voxels = chunk.voxels;
    var data = voxels.data;
    var len = voxels.shape[0];
    var opaqueLookup = chunk.noa.registry._opacityLookup;
    var handlerLookup = chunk.noa.registry._blockHandlerLookup;
    var objectLookup = chunk.noa.registry._objectLookup;
    var objMesher = chunk.noa._objectMesher;
    for(var i = 0; i < len; ++i)for(var j = 0; j < len; ++j){
        var index = voxels.index(i, j, 0);
        for(var k = 0; k < len; ++k, ++index){
            var id = data[index];
            // skip air blocks
            if (id === 0) {
                fullyOpaque = false;
                continue;
            }
            fullyOpaque = fullyOpaque && opaqueLookup[id];
            fullyAir = false;
            // handle object blocks and handlers
            if (objectLookup[id]) {
                objMesher.setObjectBlock(chunk, id, i, j, k);
                chunk._objectsDirty = true;
            }
            var handlers = handlerLookup[id];
            if (handlers) {
                chunk._blockHandlerLocs.add(i, j, k);
                $a4aa757de41525e5$var$callBlockHandler(chunk, handlers, "onLoad", i, j, k);
            }
        }
    }
    chunk._isFull = fullyOpaque;
    chunk._isEmpty = fullyAir;
    chunk._terrainDirty = !chunk._isEmpty;
}
// dispose function - just clears properties and references
$a4aa757de41525e5$var$Chunk.prototype.dispose = function() {
    // look through the data for onUnload handlers
    $a4aa757de41525e5$var$callAllBlockHandlers(this, "onUnload");
    this._blockHandlerLocs.empty();
    // let meshers dispose their stuff
    this.noa._objectMesher.disposeChunk(this);
    this.noa._terrainMesher.disposeChunk(this);
    // apparently there's no way to dispose typed arrays, so just null everything
    this.voxels.data = null;
    this.voxels = null;
    this._neighbors.data = null;
    this._neighbors = null;
    this.isDisposed = true;
};
// helper to call a given handler for all blocks in the chunk
function $a4aa757de41525e5$var$callAllBlockHandlers(chunk, type) {
    var voxels = chunk.voxels;
    var handlerLookup = chunk.noa.registry._blockHandlerLookup;
    chunk._blockHandlerLocs.arr.forEach(([i, j, k])=>{
        var id = voxels.get(i, j, k);
        $a4aa757de41525e5$var$callBlockHandler(chunk, handlerLookup[id], type, i, j, k);
    });
}



var $c30626c7bd5a958d$export$2e2bcd8739ae039 = $c30626c7bd5a958d$var$TerrainMesher;
// enable for profiling..
var $c30626c7bd5a958d$var$PROFILE_EVERY = 0;
/*
 * 
 *          TERRAIN MESHER!!
 * 
*/ function $c30626c7bd5a958d$var$TerrainMesher(noa) {
    var greedyMesher = new $c30626c7bd5a958d$var$GreedyMesher(noa);
    var meshBuilder = new $c30626c7bd5a958d$var$MeshBuilder(noa);
    /*
     * 
     *      public API
     * 
    */ // add any properties that will get used for meshing
    this.initChunk = function(chunk) {
        chunk._terrainMeshes.length = 0;
    };
    /**
     * meshing entry point and high-level flow
     * @param {Chunk} chunk 
     */ this.meshChunk = function(chunk, matGetter, colGetter, ignoreMaterials, useAO, aoVals, revAoVal) {
        $c30626c7bd5a958d$var$profile_hook("start");
        // dispose any previously existing mesh
        chunk._terrainMeshes.forEach((m)=>m.dispose());
        chunk._terrainMeshes.length = 0;
        $c30626c7bd5a958d$var$profile_hook("cleanup");
        // args
        var mats = matGetter || noa.registry.getBlockFaceMaterial;
        var cols = colGetter || noa.registry._getMaterialVertexColor;
        var ao = useAO === undefined ? noa.rendering.useAO : useAO;
        var vals = aoVals || noa.rendering.aoVals;
        var rev = isNaN(revAoVal) ? noa.rendering.revAoVal : revAoVal;
        // copy voxel data into array padded with neighbor values
        var voxels = $c30626c7bd5a958d$var$buildPaddedVoxelArray(chunk);
        $c30626c7bd5a958d$var$profile_hook("copy");
        // greedy mesher creates big arrays of geometry data
        var edgesOnly = chunk._isFull || chunk._isEmpty;
        var geomData = greedyMesher.mesh(voxels, mats, cols, ao, vals, rev, edgesOnly);
        $c30626c7bd5a958d$var$profile_hook("geom");
        // builds the babylon mesh that will be added to the scene
        var mesh = geomData.numQuads === 0 ? null : meshBuilder.build(chunk, geomData, ignoreMaterials);
        $c30626c7bd5a958d$var$profile_hook("build");
        $c30626c7bd5a958d$var$profile_hook("end");
        // add to scene and finish
        if (mesh && mesh.getIndices().length > 0) {
            noa.rendering.addMeshToScene(mesh, true, chunk.pos, this);
            chunk._terrainMeshes.push(mesh);
        }
    };
    // nothing to do on dispose except remove the previous mesh
    this.disposeChunk = function(chunk) {
        chunk._terrainMeshes.forEach((m)=>m.dispose());
        chunk._terrainMeshes.length = 0;
    };
}
/*
 * 
 *      Padded voxel data assembler
 * 
 * Takes the chunk of size n, and copies its data into center of an (n+2) ndarray
 * Then copies in edge data from neighbors, or if not available zeroes it out
 * Actual mesher will then run on the padded ndarray
 * 
*/ function $c30626c7bd5a958d$var$buildPaddedVoxelArray(chunk) {
    var src = chunk.voxels;
    var cs = src.shape[0];
    var tgt = $c30626c7bd5a958d$var$cachedPadded;
    // embiggen cached target array
    if (cs + 2 !== tgt.shape[0]) {
        var s2 = cs + 2;
        tgt = new (0, $5OpyM$ndarray)(new Uint16Array(s2 * s2 * s2), [
            s2,
            s2,
            s2
        ]);
        $c30626c7bd5a958d$var$cachedPadded = tgt;
    }
    // loop through neighbors (neighbor(0,0,0) is the chunk itself)
    // copying or zeroing voxel body/edge data into padded target array
    var loc = $c30626c7bd5a958d$var$_vecs[0];
    var pos = $c30626c7bd5a958d$var$_vecs[1];
    var size = $c30626c7bd5a958d$var$_vecs[2];
    var tgtPos = $c30626c7bd5a958d$var$_vecs[3];
    var posValues = $c30626c7bd5a958d$var$_vecs[4];
    var sizeValues = $c30626c7bd5a958d$var$_vecs[5];
    var tgtPosValues = $c30626c7bd5a958d$var$_vecs[6];
    if (cs !== $c30626c7bd5a958d$var$_cachedVecSize) {
        $c30626c7bd5a958d$var$_cachedVecSize = cs;
        $c30626c7bd5a958d$var$allocateVectors(cs, posValues, sizeValues, tgtPosValues);
    }
    for(var i = 0; i < 3; i++){
        loc[0] = i;
        for(var j = 0; j < 3; j++){
            loc[1] = j;
            for(var k = 0; k < 3; k++){
                loc[2] = k;
                for(var n = 0; n < 3; n++){
                    var coord = loc[n];
                    pos[n] = posValues[coord];
                    size[n] = sizeValues[coord];
                    tgtPos[n] = tgtPosValues[coord];
                }
                var nab = chunk._neighbors.get(i - 1, j - 1, k - 1);
                var nsrc = nab ? nab.voxels : null;
                (0, $afbe2889bb225d5c$export$9cfc44a6ae0770a3)(nsrc, tgt, pos, size, tgtPos);
            }
        }
    }
    return tgt;
}
var $c30626c7bd5a958d$var$cachedPadded = new (0, $5OpyM$ndarray)(new Uint16Array(27), [
    3,
    3,
    3
]);
var $c30626c7bd5a958d$var$_vecs = Array.from(Array(10), ()=>[
        0,
        0,
        0
    ]);
var $c30626c7bd5a958d$var$_cachedVecSize;
function $c30626c7bd5a958d$var$allocateVectors(size, posValues, sizeValues, tgtPosValues) {
    for(var i = 0; i < 3; i++){
        posValues[i] = [
            size - 1,
            0,
            0
        ][i];
        sizeValues[i] = [
            1,
            size,
            1
        ][i];
        tgtPosValues[i] = [
            0,
            1,
            size + 1
        ][i];
    }
}
/*
 * 
 *  A single reusable struct to hold all geometry data for the chunk 
 *  currently being meshed.
 * 
 *  Basically, the greedy mesher builds this and the mesh builder consumes it
 * 
*/ var $c30626c7bd5a958d$var$cachedGeometryData = {
    numQuads: 0,
    materialQuadCounts: {},
    quadMaterials: [
        1
    ],
    positions: [
        0.5
    ],
    indices: [
        1
    ],
    normals: [
        0.5
    ],
    colors: [
        0.5
    ],
    uvs: [
        0.5
    ],
    reset: function() {
        this.numQuads = 0;
        this.materialQuadCounts = {};
    }
};
/*
 * 
 *  Mesh Builder - consumes all the raw data in geomData to build
 *  Babylon.js mesh/submeshes, ready to be added to the scene
 * 
 */ function $c30626c7bd5a958d$var$MeshBuilder(noa) {
    var matCache = {};
    var multiMatCache = {};
    // core
    this.build = function(chunk, geomData, ignoreMaterials) {
        var nq = geomData.numQuads;
        var quadCounts = geomData.materialQuadCounts;
        // find any used materials that can share the scene default
        // and move their quad counts to matID 0
        var matLookup = {
            "0": "0"
        };
        quadCounts["0"] = 0;
        for(var matID in quadCounts){
            if (matID === "0") continue;
            if (ignoreMaterials || canUseDefaultMat(matID)) {
                quadCounts["0"] += quadCounts[matID];
                quadCounts[matID] = 0;
                matLookup[matID] = "0";
            } else matLookup[matID] = matID;
        }
        // arbitrarily choose a starting offset for quads using each material
        var matOffsets = {};
        var currOffset = 0;
        for(var matID2 in quadCounts){
            if (quadCounts[matID2] === 0) continue;
            matOffsets[matID2] = currOffset;
            currOffset += quadCounts[matID2];
        }
        // allocate the typed data arrays we'll hand off to Babylon
        var pos = new Float32Array(nq * 12);
        var ind = new Uint16Array(nq * 6);
        var nor = new Float32Array(nq * 12);
        var col = new Float32Array(nq * 16);
        var uvs = new Float32Array(nq * 8);
        // copy data from dataGeom into typed arrays, reordering it as we go
        // so that geometry sharing the same material is contiguous
        for(var ix = 0; ix < nq; ix++){
            var mergedID = matLookup[geomData.quadMaterials[ix]];
            var off = matOffsets[mergedID];
            // note: indices need a flat offset to point to their original data
            var indexAdjust = (off - ix) * 4;
            copyArraySubset(geomData.positions, ix, pos, off, 12, 0);
            copyArraySubset(geomData.indices, ix, ind, off, 6, indexAdjust);
            copyArraySubset(geomData.normals, ix, nor, off, 12, 0);
            copyArraySubset(geomData.colors, ix, col, off, 16, 0);
            copyArraySubset(geomData.uvs, ix, uvs, off, 8, 0);
            matOffsets[mergedID]++;
        }
        // build the mesh and vertexData object
        var scene = noa.rendering.getScene();
        var name = "chunk_" + chunk.requestID;
        var mesh = new (0, $5OpyM$Mesh)(name, scene);
        var vdat = new (0, $5OpyM$VertexData)();
        vdat.positions = pos;
        vdat.indices = ind;
        vdat.normals = nor;
        vdat.colors = col;
        vdat.uvs = uvs;
        vdat.applyToMesh(mesh);
        // array of the materialIDs we need, in stable order
        var matIDsUsed = Object.keys(matOffsets).sort((a, b)=>a < b ? -1 : 1);
        // assign a material or make a multimaterial
        if (matIDsUsed.length === 1) {
            var onlyMatID = matLookup[geomData.quadMaterials[0]];
            mesh.material = getTerrainMaterial(onlyMatID, ignoreMaterials);
        } else {
            // make a multimaterial and define (babylon) submeshes
            mesh.subMeshes = [];
            var matNum = 0;
            for (var matID4 of matIDsUsed){
                // note that offsets are currently at END of their respective spans
                var qct = quadCounts[matID4];
                var start = matOffsets[matID4] - qct;
                new (0, $5OpyM$SubMesh)(matNum, start * 12, qct * 12, start * 6, qct * 6, mesh);
                matNum++;
            }
            mesh.material = getMultiMatForIDs(matIDsUsed, scene);
            mesh.onDisposeObservable.add(onMeshDispose);
        }
        // done, mesh will be positioned later when added to the scene
        return mesh;
    };
    function canUseDefaultMat(matID) {
        if (noa.registry.getMaterialTexture(matID)) return false;
        var matData = noa.registry.getMaterialData(matID);
        return matData.alpha === 1 && !matData.renderMat;
    }
    function copyArraySubset(src, sbase, tgt, tbase, count, addValue) {
        var soff = sbase * count;
        var toff = tbase * count;
        for(var i = 0; i < count; i++)tgt[toff + i] = src[soff + i] + addValue;
    }
    //                         Material wrangling
    function getMultiMatForIDs(matIDs, scene) {
        var matName = "terrain_multi:" + matIDs.join(",");
        if (!multiMatCache[matName]) {
            var multiMat = new (0, $5OpyM$MultiMaterial)(matName, scene);
            multiMat.subMaterials = matIDs.map((matID)=>getTerrainMaterial(matID, false));
            multiMatCache[matName] = {
                multiMat: multiMat,
                useCount: 0
            };
        }
        multiMatCache[matName].useCount++;
        return multiMatCache[matName].multiMat;
    }
    function onMeshDispose(mesh, b, c) {
        if (!mesh || !mesh.material) return;
        var matName = mesh.material.name;
        if (!multiMatCache[matName]) return;
        mesh.material = null;
        multiMatCache[matName].useCount--;
        if (multiMatCache[matName].useCount > 0) return;
        multiMatCache[matName].multiMat.dispose();
        mesh._scene.removeMultiMaterial(multiMatCache[matName]);
        delete multiMatCache[matName];
    }
    // manage materials/textures to avoid duplicating them
    function getTerrainMaterial(matID, ignore) {
        if (ignore || matID == 0) return noa.rendering.flatMaterial;
        var name = "terrain_mat:" + matID;
        if (!matCache[name]) matCache[name] = makeTerrainMaterial(matID, name);
        return matCache[name];
    }
    // canonical function to make a terrain material
    function makeTerrainMaterial(id, name) {
        // if user-specified render material is defined, use it
        var matData = noa.registry.getMaterialData(id);
        if (matData.renderMat) return matData.renderMat;
        // otherwise determine which built-in material to use
        var url = noa.registry.getMaterialTexture(id);
        var alpha = matData.alpha;
        if (!url && alpha === 1) // base material is fine for non-textured case, if no alpha
        return noa.rendering.flatMaterial;
        var mat = noa.rendering.makeStandardMaterial(name);
        if (url) {
            var scene = noa.rendering.getScene();
            var tex = new (0, $5OpyM$Texture)(url, scene, true, false, (0, $5OpyM$Texture).NEAREST_SAMPLINGMODE);
            if (matData.textureAlpha) tex.hasAlpha = true;
            mat.diffuseTexture = tex;
        }
        if (matData.alpha < 1) mat.alpha = matData.alpha;
        return mat;
    }
}
/*
 *    Greedy voxel meshing algorithm
 *        based initially on algo by Mikola Lysenko:
 *          http://0fps.net/2012/07/07/meshing-minecraft-part-2/
 *          but evolved quite a bit since then
 *        AO handling by me, stitched together out of cobwebs and dreams
 *    
 *    Arguments:
 *        arr: 3D ndarray of dimensions X,Y,Z
 *             packed with solidity/opacity booleans in higher bits
 *        getMaterial: function( blockID, dir )
 *             returns a material ID based on block id and which cube face it is
 *             (assume for now that each mat ID should get its own mesh)
 *        getColor: function( materialID )
 *             looks up a color (3-array) by material ID
 *             TODO: replace this with a lookup array?
 *        doAO: whether or not to bake ambient occlusion into vertex colors
 *        aoValues: array[3] of color multipliers for AO (least to most occluded)
 *        revAoVal: "reverse ao" - color multiplier for unoccluded exposed edges
 *
 *    Return object: array of mesh objects keyed by material ID
 *        arr[id] = {
 *          id:       material id for mesh
 *          vertices: ints, range 0 .. X/Y/Z
 *          indices:  ints
 *          normals:  ints,   -1 .. 1
 *          colors:   floats,  0 .. 1
 *          uvs:      floats,  0 .. X/Y/Z
 *        }
 */ function $c30626c7bd5a958d$var$GreedyMesher(noa) {
    var maskCache = new Int16Array(16);
    var aomaskCache = new Uint16Array(16);
    var solidLookup = noa.registry._solidityLookup;
    var opacityLookup = noa.registry._opacityLookup;
    this.mesh = function(voxels, getMaterial, getColor, doAO, aoValues, revAoVal, edgesOnly) {
        solidLookup = noa.registry._solidityLookup;
        opacityLookup = noa.registry._opacityLookup;
        // collected geometry data for the current mesh
        var geomData = $c30626c7bd5a958d$var$cachedGeometryData;
        geomData.reset();
        // how to apply AO packing in first masking function
        var skipReverseAO = revAoVal === aoValues[0];
        //Sweep over each axis, mapping axes to [d,u,v]
        for(var d = 0; d < 3; ++d){
            var u = (d + 1) % 3;
            var v = (d + 2) % 3;
            // make transposed ndarray so index i is the axis we're sweeping
            var shape = voxels.shape;
            var arrT = voxels.transpose(d, u, v).lo(1, 1, 1).hi(shape[d] - 2, shape[u] - 2, shape[v] - 2);
            // shorten len0 by 1 so faces at edges don't get drawn in both chunks
            var len0 = arrT.shape[0] - 1;
            var len1 = arrT.shape[1];
            var len2 = arrT.shape[2];
            // embiggen mask arrays as needed
            if (maskCache.length < len1 * len2) {
                maskCache = new Int16Array(len1 * len2);
                aomaskCache = new Uint16Array(len1 * len2);
            }
            // iterate along current major axis..
            for(var i = 0; i <= len0; ++i){
                // fills mask and aomask arrays with values
                constructMeshMasks(i, d, arrT, getMaterial, doAO, skipReverseAO);
                // parses the masks to do greedy meshing
                constructGeometryFromMasks(i, d, u, v, len1, len2, doAO, geomData, getColor, aoValues, revAoVal);
                // process edges only by jumping to other edge
                if (edgesOnly) i += len0 - 1;
            }
        }
        // done!
        return geomData;
    };
    //      Greedy meshing inner loop one
    //
    // iterating across ith 2d plane, with n being index into masks
    function constructMeshMasks(i, d, arrT, getMaterial, doAO, skipRevAO) {
        var len = arrT.shape[1];
        var mask = maskCache;
        var aomask = aomaskCache;
        // set up for quick array traversals
        var n = 0;
        var materialDir = d * 2;
        var data = arrT.data;
        var dbase = arrT.index(i - 1, 0, 0);
        var istride = arrT.stride[0];
        var jstride = arrT.stride[1];
        var kstride = arrT.stride[2];
        for(var k = 0; k < len; ++k){
            var d0 = dbase;
            dbase += kstride;
            for(var j = 0; j < len; j++, n++, d0 += jstride){
                // mask[n] will represent the face needed between i-1,j,k and i,j,k
                // for now, assume we never have two faces in both directions
                // note that mesher zeroes out the mask as it goes, so there's 
                // no need to zero it here when no face is needed
                // IDs at i-1,j,k  and  i,j,k
                var id0 = data[d0];
                var id1 = data[d0 + istride];
                // most common case: never a face between same voxel IDs, 
                // so skip out early
                if (id0 === id1) continue;
                var faceDir = getFaceDir(id0, id1, getMaterial, materialDir);
                if (faceDir) {
                    // set regular mask value to material ID, sign indicating direction
                    mask[n] = faceDir > 0 ? getMaterial(id0, materialDir) : -getMaterial(id1, materialDir + 1);
                    // if doing AO, precalculate AO level for each face into second mask
                    if (doAO) // i values in direction face is/isn't pointing{
                    aomask[n] = faceDir > 0 ? packAOMask(arrT, i, i - 1, j, k, skipRevAO) : packAOMask(arrT, i - 1, i, j, k, skipRevAO);
                }
            }
        }
    }
    function getFaceDir(id0, id1, getMaterial, materialDir) {
        // no face if both blocks are opaque
        var op0 = opacityLookup[id0];
        var op1 = opacityLookup[id1];
        if (op0 && op1) return 0;
        // if either block is opaque draw a face for it
        if (op0) return 1;
        if (op1) return -1;
        // can't tell from block IDs, so compare block materials of each face
        var m0 = getMaterial(id0, materialDir);
        var m1 = getMaterial(id1, materialDir + 1);
        // if same material, draw no face. If one is missing, draw the other
        if (m0 === m1) return 0;
        else if (m0 === 0) return -1;
        else if (m1 === 0) return 1;
        // remaining case is two different non-opaque block materials
        // facing each other. for now, draw neither..
        return 0;
    }
    // 
    //      Greedy meshing inner loop two
    //
    // construct geometry data from the masks
    function constructGeometryFromMasks(i, d, u, v, len1, len2, doAO, geomData, getColor, aoValues, revAoVal) {
        var n = 0;
        var mask = maskCache;
        var aomask = aomaskCache;
        var x = [
            0,
            0,
            0
        ];
        var du = [
            0,
            0,
            0
        ];
        var dv = [
            0,
            0,
            0
        ];
        x[d] = i;
        var norms = [
            0,
            0,
            0
        ];
        // some logic is broken into helper functions for AO and non-AO
        // this fixes deopts in Chrome (for reasons unknown)
        var maskCompareFcn = doAO ? maskCompare : maskCompare_noAO;
        var meshColorFcn = doAO ? pushMeshColors : pushMeshColors_noAO;
        for(var k = 0; k < len2; ++k){
            var w = 1;
            var h = 1;
            for(var j = 0; j < len1; j += w, n += w){
                var maskVal = mask[n] | 0;
                if (!maskVal) {
                    w = 1;
                    continue;
                }
                var ao = aomask[n] | 0;
                // Compute width and height of area with same mask/aomask values
                for(w = 1; w < len1 - j; ++w){
                    if (!maskCompareFcn(n + w, mask, maskVal, aomask, ao)) break;
                }
                OUTER: for(h = 1; h < len2 - k; ++h)for(var m = 0; m < w; ++m){
                    var ix = n + m + h * len1;
                    if (!maskCompareFcn(ix, mask, maskVal, aomask, ao)) break OUTER;
                }
                // for testing: doing the following will disable greediness
                //w=h=1
                // material and mesh for this face
                var matID = Math.abs(maskVal);
                // we're now ready to push a quad worth of geometry data
                var nq = geomData.numQuads;
                geomData.quadMaterials[nq] = matID | 0;
                geomData.materialQuadCounts[matID] = (geomData.materialQuadCounts[matID] || 0) + 1;
                // add colors into geomData
                // tridir is boolean for which way to split the quad into triangles
                var colorsArr = geomData.colors;
                var colorsIndex = nq * 16;
                var triDir = meshColorFcn(colorsArr, colorsIndex, getColor(matID), ao, aoValues, revAoVal);
                //Add quad positions - vertices = x -> x+du -> x+du+dv -> x+dv
                x[u] = j;
                x[v] = k;
                du[u] = w;
                dv[v] = h;
                addPositionValues(geomData.positions, nq * 12, x, du, dv);
                // add uv values, with the order and sign depending on 
                // axis and direction so as to avoid mirror-image textures
                var dir = sign(maskVal);
                addUVs(geomData.uvs, nq * 8, d, w, h, dir);
                // add same normals for all vertices, depending on
                // which direction the mask was solid in..
                norms[d] = dir;
                addNormalValues(geomData.normals, nq * 12, norms);
                // Add indexes, ordered clockwise for the facing direction;
                var inds = geomData.indices;
                var ioff = nq * 6;
                var voff = nq * 4;
                addIndexValues(inds, ioff, voff, maskVal, triDir);
                // finished adding  quad geometry data
                geomData.numQuads++;
                //Zero-out mask
                for(var hx = 0; hx < h; ++hx)for(var wx = 0; wx < w; ++wx)mask[n + wx + hx * len1] = 0;
            }
        }
    }
    // small helpers to add values to raw data geometry arrays:
    function addPositionValues(posArr, offset, x, du, dv) {
        for(var i = 0; i < 3; i++){
            posArr[offset + i] = x[i];
            posArr[offset + 3 + i] = x[i] + du[i];
            posArr[offset + 6 + i] = x[i] + du[i] + dv[i];
            posArr[offset + 9 + i] = x[i] + dv[i];
        }
    }
    function addUVs(uvArr, offset, d, w, h, dir) {
        for(var i = 0; i < 8; i++)uvArr[offset + i] = 0;
        if (d === 2) {
            uvArr[offset + 1] = uvArr[offset + 3] = h;
            uvArr[offset + 2] = uvArr[offset + 4] = -dir * w;
        } else {
            uvArr[offset + 1] = uvArr[offset + 7] = w;
            uvArr[offset + 4] = uvArr[offset + 6] = dir * h;
        }
    }
    function addNormalValues(normArr, offset, norms) {
        for(var i = 0; i < 12; i++)normArr[offset + i] = norms[i % 3];
    }
    function addIndexValues(indArr, offset, baseIndex, maskVal, triDir) {
        var indexVals = maskVal < 0 ? triDir ? indexLists.A : indexLists.B : triDir ? indexLists.C : indexLists.D;
        for(var i = 0; i < 6; i++)indArr[offset + i] = baseIndex + indexVals[i];
    }
    var indexLists = {
        A: [
            0,
            1,
            2,
            0,
            2,
            3
        ],
        B: [
            1,
            2,
            3,
            0,
            1,
            3
        ],
        C: [
            0,
            2,
            1,
            0,
            3,
            2
        ],
        D: [
            3,
            1,
            0,
            3,
            2,
            1
        ]
    };
    // Helper functions with AO and non-AO implementations:
    function maskCompare(index, mask, maskVal, aomask, aoVal) {
        if (maskVal !== mask[index]) return false;
        if (aoVal !== aomask[index]) return false;
        return true;
    }
    function maskCompare_noAO(index, mask, maskVal, aomask, aoVal) {
        if (maskVal !== mask[index]) return false;
        return true;
    }
    function pushMeshColors_noAO(colors, ix, c, ao, aoValues, revAoVal) {
        for(var off = 0; off < 16; off += 4){
            colors[ix + off] = c[0];
            colors[ix + off + 1] = c[1];
            colors[ix + off + 2] = c[2];
            colors[ix + off + 3] = 1;
        }
        return true // triangle direction doesn't matter for non-AO
        ;
    }
    function pushMeshColors(colors, ix, c, ao, aoValues, revAoVal) {
        var ao00 = unpackAOMask(ao, 0, 0);
        var ao10 = unpackAOMask(ao, 1, 0);
        var ao11 = unpackAOMask(ao, 1, 1);
        var ao01 = unpackAOMask(ao, 0, 1);
        pushAOColor(colors, ix, c, ao00, aoValues, revAoVal);
        pushAOColor(colors, ix + 4, c, ao10, aoValues, revAoVal);
        pushAOColor(colors, ix + 8, c, ao11, aoValues, revAoVal);
        pushAOColor(colors, ix + 12, c, ao01, aoValues, revAoVal);
        // this bit is pretty magical..
        var triDir = true;
        if (ao00 === ao11) triDir = ao01 === ao10 ? ao01 === 2 : true;
        else triDir = ao01 === ao10 ? false : ao00 + ao11 > ao01 + ao10;
        return triDir;
    }
    function sign(num) {
        return num > 0 ? 1 : -1;
    }
    /* 
     *  packAOMask:
     *
     *    For a given face, find occlusion levels for each vertex, then
     *    pack 4 such (2-bit) values into one Uint8 value
     * 
     *  Occlusion levels:
     *    1 is flat ground, 2 is partial occlusion, 3 is max (corners)
     *    0 is "reverse occlusion" - an unoccluded exposed edge 
     *  Packing order var(bit offset):
     *      a01(2)  -   a11(6)   ^  K
     *        -     -            +> J
     *      a00(0)  -   a10(4)
     */ function packAOMask(data, ipos, ineg, j, k, skipReverse) {
        var a00 = 1;
        var a01 = 1;
        var a10 = 1;
        var a11 = 1;
        // inc occlusion of vertex next to obstructed side
        if (solidLookup[data.get(ipos, j + 1, k)]) {
            ++a10;
            ++a11;
        }
        if (solidLookup[data.get(ipos, j - 1, k)]) {
            ++a00;
            ++a01;
        }
        if (solidLookup[data.get(ipos, j, k + 1)]) {
            ++a01;
            ++a11;
        }
        if (solidLookup[data.get(ipos, j, k - 1)]) {
            ++a00;
            ++a10;
        }
        // facing into a solid (non-opaque) block?
        var facingSolid = solidLookup[data.get(ipos, j, k)];
        if (facingSolid) {
            // always 2, or 3 in corners
            a11 = a11 === 3 || solidLookup[data.get(ipos, j + 1, k + 1)] ? 3 : 2;
            a01 = a01 === 3 || solidLookup[data.get(ipos, j - 1, k + 1)] ? 3 : 2;
            a10 = a10 === 3 || solidLookup[data.get(ipos, j + 1, k - 1)] ? 3 : 2;
            a00 = a00 === 3 || solidLookup[data.get(ipos, j - 1, k - 1)] ? 3 : 2;
            return a11 << 6 | a10 << 4 | a01 << 2 | a00;
        }
        // simpler logic if skipping reverse AO?
        if (skipReverse) {
            // treat corner as occlusion 3 only if not occluded already
            if (a11 === 1 && solidLookup[data.get(ipos, j + 1, k + 1)]) a11 = 2;
            if (a01 === 1 && solidLookup[data.get(ipos, j - 1, k + 1)]) a01 = 2;
            if (a10 === 1 && solidLookup[data.get(ipos, j + 1, k - 1)]) a10 = 2;
            if (a00 === 1 && solidLookup[data.get(ipos, j - 1, k - 1)]) a00 = 2;
            return a11 << 6 | a10 << 4 | a01 << 2 | a00;
        }
        // check each corner, and if not present do reverse AO
        if (a11 === 1) {
            if (solidLookup[data.get(ipos, j + 1, k + 1)]) a11 = 2;
            else if (!solidLookup[data.get(ineg, j, k + 1)] || !solidLookup[data.get(ineg, j + 1, k)] || !solidLookup[data.get(ineg, j + 1, k + 1)]) a11 = 0;
        }
        if (a10 === 1) {
            if (solidLookup[data.get(ipos, j + 1, k - 1)]) a10 = 2;
            else if (!solidLookup[data.get(ineg, j, k - 1)] || !solidLookup[data.get(ineg, j + 1, k)] || !solidLookup[data.get(ineg, j + 1, k - 1)]) a10 = 0;
        }
        if (a01 === 1) {
            if (solidLookup[data.get(ipos, j - 1, k + 1)]) a01 = 2;
            else if (!solidLookup[data.get(ineg, j, k + 1)] || !solidLookup[data.get(ineg, j - 1, k)] || !solidLookup[data.get(ineg, j - 1, k + 1)]) a01 = 0;
        }
        if (a00 === 1) {
            if (solidLookup[data.get(ipos, j - 1, k - 1)]) a00 = 2;
            else if (!solidLookup[data.get(ineg, j, k - 1)] || !solidLookup[data.get(ineg, j - 1, k)] || !solidLookup[data.get(ineg, j - 1, k - 1)]) a00 = 0;
        }
        return a11 << 6 | a10 << 4 | a01 << 2 | a00;
    }
    // unpack (2 bit) ao value from ao mask
    // see above for details
    function unpackAOMask(aomask, jpos, kpos) {
        var offset = jpos ? kpos ? 6 : 4 : kpos ? 2 : 0;
        return aomask >> offset & 3;
    }
    // premultiply vertex colors by value depending on AO level
    // then push them into color array
    function pushAOColor(colors, ix, baseCol, ao, aoVals, revAoVal) {
        var mult = ao === 0 ? revAoVal : aoVals[ao - 1];
        colors[ix] = baseCol[0] * mult;
        colors[ix + 1] = baseCol[1] * mult;
        colors[ix + 2] = baseCol[2] * mult;
        colors[ix + 3] = 1;
    }
}
var $c30626c7bd5a958d$var$profile_hook = $c30626c7bd5a958d$var$PROFILE_EVERY ? (0, $afbe2889bb225d5c$export$cf559512bdad9080)($c30626c7bd5a958d$var$PROFILE_EVERY, "Terrain meshing") : ()=>{};


/** 
 * The Registry class is found at [[Registry | `noa.registry`]].
 * @module noa.registry
 */ /*
 *  data structs in the registry:
 *  registry 
 *      blockSolidity:     id -> boolean
 *      blockOpacity:      id -> boolean
 *      blockIsFluid:      id -> boolean
 *      blockMats:         id -> 6x matID  [-x, +x, -y, +y, -z, +z]
 *      blockProps         id -> obj of less-often accessed properties
 *      blockMeshes:       id -> obj/null (custom mesh to instantiate)
 *      blockHandlers      id -> instance of `BlockCallbackHolder` or null 
 *      matIDs             matName -> matID (int)
 *      matData            matID -> { color, alpha, texture, textureAlpha }
*/ var $abcbe6b5adba8195$var$defaults = {
    texturePath: ""
};
var $abcbe6b5adba8195$var$blockDefaults = {
    solid: true,
    opaque: true,
    fluidDensity: 1.0,
    viscosity: 0.5
};
// voxel ID now uses the whole Uint16Array element
var $abcbe6b5adba8195$var$MAX_BLOCK_ID = 65535;
/* 
 * 
 *      data structures
 *      TODO: move these inside class
 * 
*/ // lookup arrays for block props and flags - all keyed by blockID
// fill in first value for id=0, empty space
var $abcbe6b5adba8195$var$blockSolidity = [
    false
];
var $abcbe6b5adba8195$var$blockOpacity = [
    false
];
var $abcbe6b5adba8195$var$blockIsFluid = [
    false
];
var $abcbe6b5adba8195$var$blockIsObject = [
    false
];
var $abcbe6b5adba8195$var$blockMats = [
    0,
    0,
    0,
    0,
    0,
    0
];
var $abcbe6b5adba8195$var$blockProps = [
    null
];
var $abcbe6b5adba8195$var$blockMeshes = [
    null
];
var $abcbe6b5adba8195$var$blockHandlers = [
    null
];
// material data structs
var $abcbe6b5adba8195$var$matIDs = {} // mat name -> id
;
var $abcbe6b5adba8195$var$matData = [
    null
] // mat id -> { color, alpha, texture, textureAlpha }
;
class $abcbe6b5adba8195$export$4d9facee29974f3 {
    /** @internal */ constructor(noa, opts){
        opts = Object.assign({}, $abcbe6b5adba8195$var$defaults, opts);
        /** @internal */ this.noa = noa;
        /** @internal */ this._texturePath = opts.texturePath;
        /* 
         * 
         *      Block registration methods
         * 
         */ /**
         * Register (by integer ID) a block type and its parameters.
         * 
         *  `id` param: integer, currently 1..255. This needs to be passed in by the 
         *    client because it goes into the chunk data, which someday will get serialized.
         * 
         *  `options` param: Recognized fields for the options object:
         * 
         *  * material: can be:
         *      * one (String) material name
         *      * array of 2 names: [top/bottom, sides]
         *      * array of 3 names: [top, bottom, sides]
         *      * array of 6 names: [-x, +x, -y, +y, -z, +z]
         *    If not specified, terrain won't be meshed for the block type
         *  * solid: (true) solidity for physics purposes
         *  * opaque: (true) fully obscures neighboring blocks
         *  * fluid: (false) whether nonsolid block is a fluid (buoyant, viscous..)
         *  * blockMesh: (null) if specified, noa will create a copy this mesh in the voxel
         *  * fluidDensity: (1.0) for fluid blocks
         *  * viscosity: (0.5) for fluid blocks
         *  * onLoad(): block event handler
         *  * onUnload(): block event handler
         *  * onSet(): block event handler
         *  * onUnset(): block event handler
         *  * onCustomMeshCreate(): block event handler
         */ this.registerBlock = function(id, options = null) {
            if (!options) options = {};
            $abcbe6b5adba8195$var$blockDefaults.solid = !options.fluid;
            $abcbe6b5adba8195$var$blockDefaults.opaque = !options.fluid;
            var opts = Object.assign({}, $abcbe6b5adba8195$var$blockDefaults, options);
            // console.log('register block: ', id, opts)
            if (id < 1 || id > $abcbe6b5adba8195$var$MAX_BLOCK_ID) throw "Block id out of range: " + id;
            // if block ID is greater than current highest ID, 
            // register fake blocks to avoid holes in lookup arrays
            while(id > $abcbe6b5adba8195$var$blockSolidity.length)this.registerBlock($abcbe6b5adba8195$var$blockSolidity.length, {});
            // flags default to solid, opaque, nonfluid
            $abcbe6b5adba8195$var$blockSolidity[id] = !!opts.solid;
            $abcbe6b5adba8195$var$blockOpacity[id] = !!opts.opaque;
            $abcbe6b5adba8195$var$blockIsFluid[id] = !!opts.fluid;
            // store any custom mesh
            $abcbe6b5adba8195$var$blockIsObject[id] = !!opts.blockMesh;
            $abcbe6b5adba8195$var$blockMeshes[id] = opts.blockMesh || null;
            // parse out material parameter
            // always store 6 material IDs per blockID, so material lookup is monomorphic
            var mat = opts.material || null;
            var mats;
            if (!mat) mats = [
                null,
                null,
                null,
                null,
                null,
                null
            ];
            else if (typeof mat == "string") mats = [
                mat,
                mat,
                mat,
                mat,
                mat,
                mat
            ];
            else if (mat.length && mat.length == 2) // interpret as [top/bottom, sides]
            mats = [
                mat[1],
                mat[1],
                mat[0],
                mat[0],
                mat[1],
                mat[1]
            ];
            else if (mat.length && mat.length == 3) // interpret as [top, bottom, sides]
            mats = [
                mat[2],
                mat[2],
                mat[0],
                mat[1],
                mat[2],
                mat[2]
            ];
            else if (mat.length && mat.length == 6) // interpret as [-x, +x, -y, +y, -z, +z]
            mats = mat;
            else throw "Invalid material parameter: " + mat;
            // argument is material name, but store as material id, allocating one if needed
            for(var i = 0; i < 6; ++i)$abcbe6b5adba8195$var$blockMats[id * 6 + i] = $abcbe6b5adba8195$var$getMaterialId(this, $abcbe6b5adba8195$var$matIDs, mats[i], true);
            // props data object - currently only used for fluid properties
            $abcbe6b5adba8195$var$blockProps[id] = {};
            // if block is fluid, initialize properties if needed
            if ($abcbe6b5adba8195$var$blockIsFluid[id]) {
                $abcbe6b5adba8195$var$blockProps[id].fluidDensity = opts.fluidDensity;
                $abcbe6b5adba8195$var$blockProps[id].viscosity = opts.viscosity;
            }
            // event callbacks
            var hasHandler = opts.onLoad || opts.onUnload || opts.onSet || opts.onUnset || opts.onCustomMeshCreate;
            $abcbe6b5adba8195$var$blockHandlers[id] = hasHandler ? new $abcbe6b5adba8195$var$BlockCallbackHolder(opts) : null;
            return id;
        };
        /**
         * Register (by name) a material and its parameters.
         * 
         * @param name
         * @param color
         * @param textureURL
         * @param texHasAlpha
         * @param renderMaterial an optional BABYLON material to be used for block faces with this block material
         */ this.registerMaterial = function(name, color = [
            1,
            1,
            1
        ], textureURL = "", texHasAlpha = false, renderMaterial = null) {
            // console.log('register mat: ', name, color, textureURL)
            var id = $abcbe6b5adba8195$var$matIDs[name] || $abcbe6b5adba8195$var$matData.length;
            $abcbe6b5adba8195$var$matIDs[name] = id;
            var alpha = 1;
            if (color && color.length == 4) alpha = color.pop();
            $abcbe6b5adba8195$var$matData[id] = {
                color: color || [
                    1,
                    1,
                    1
                ],
                alpha: alpha,
                texture: textureURL ? this._texturePath + textureURL : "",
                textureAlpha: !!texHasAlpha,
                renderMat: renderMaterial || null
            };
            return id;
        };
        /*
         *      quick accessors for querying block ID stuff
         */ /** 
         * block solidity (as in physics) 
         * @param id
         */ this.getBlockSolidity = function(id) {
            return $abcbe6b5adba8195$var$blockSolidity[id];
        };
        /**
         * block opacity - whether it obscures the whole voxel (dirt) or 
         * can be partially seen through (like a fencepost, etc)
         * @param id
         */ this.getBlockOpacity = function(id) {
            return $abcbe6b5adba8195$var$blockOpacity[id];
        };
        /** 
         * block is fluid or not
         * @param id
         */ this.getBlockFluidity = function(id) {
            return $abcbe6b5adba8195$var$blockIsFluid[id];
        };
        /** 
         * Get block property object passed in at registration
         * @param id
         */ this.getBlockProps = function(id) {
            return $abcbe6b5adba8195$var$blockProps[id];
        };
        // look up a block ID's face material
        // dir is a value 0..5: [ +x, -x, +y, -y, +z, -z ]
        this.getBlockFaceMaterial = function(blockId, dir) {
            return $abcbe6b5adba8195$var$blockMats[blockId * 6 + dir];
        };
        // look up material color given ID
        this.getMaterialColor = function(matID) {
            return $abcbe6b5adba8195$var$matData[matID].color;
        };
        // look up material texture given ID
        this.getMaterialTexture = function(matID) {
            return $abcbe6b5adba8195$var$matData[matID].texture;
        };
        // look up material's properties: color, alpha, texture, textureAlpha
        this.getMaterialData = function(matID) {
            return $abcbe6b5adba8195$var$matData[matID];
        };
        /*
         * 
         *   Meant for internal use within the engine
         * 
         */ // internal access to lookup arrays
        /** @internal */ this._solidityLookup = $abcbe6b5adba8195$var$blockSolidity;
        /** @internal */ this._opacityLookup = $abcbe6b5adba8195$var$blockOpacity;
        /** @internal */ this._fluidityLookup = $abcbe6b5adba8195$var$blockIsFluid;
        /** @internal */ this._objectLookup = $abcbe6b5adba8195$var$blockIsObject;
        /** @internal */ this._blockMeshLookup = $abcbe6b5adba8195$var$blockMeshes;
        /** @internal */ this._blockHandlerLookup = $abcbe6b5adba8195$var$blockHandlers;
        // look up color used for vertices of blocks of given material
        // - i.e. white if it has a texture, color otherwise
        /** @internal */ this._getMaterialVertexColor = (matID)=>{
            if ($abcbe6b5adba8195$var$matData[matID].texture) return white;
            return $abcbe6b5adba8195$var$matData[matID].color;
        };
        var white = [
            1,
            1,
            1
        ];
        /*
         * 
         *      default initialization
         * 
         */ // add a default material and set ID=1 to it
        // note that registering new block data overwrites the old
        this.registerMaterial("dirt", [
            0.4,
            0.3,
            0
        ], null);
        this.registerBlock(1, {
            material: "dirt"
        });
    }
}
/*
 * 
 *          helpers
 * 
*/ // look up material ID given its name
// if lazy is set, pre-register the name and return an ID
function $abcbe6b5adba8195$var$getMaterialId(reg, matIDs, name, lazyInit) {
    if (!name) return 0;
    var id = matIDs[name];
    if (id === undefined && lazyInit) id = reg.registerMaterial(name);
    return id;
}
// data class for holding block callback references
function $abcbe6b5adba8195$var$BlockCallbackHolder(opts) {
    this.onLoad = opts.onLoad || null;
    this.onUnload = opts.onUnload || null;
    this.onSet = opts.onSet || null;
    this.onUnset = opts.onUnset || null;
    this.onCustomMeshCreate = opts.onCustomMeshCreate || null;
}


/** 
 * The Rendering class is found at [[Rendering | `noa.rendering`]].
 * @module noa.rendering
 */ 
/** 
 * @module 
 * @internal exclude this file from API docs 
*/ 




class $16ff39f90deeca95$export$a577f9275f174d6b {
    constructor(rendering, blockSize){
        var scene = rendering._scene;
        scene._addComponent(new (0, $5OpyM$OctreeSceneComponent)(scene));
        // the root octree object
        var octree = new (0, $5OpyM$Octree)(NOP);
        scene._selectionOctree = octree;
        octree.blocks = [];
        var octBlocksHash = {};
        /*
         * 
         *          public API
         * 
        */ this.rebase = (offset)=>{
            recurseRebaseBlocks(octree, offset);
        };
        this.includesMesh = (mesh)=>{
            return mesh._noaContainingBlock || mesh._noaIsDynamicContent;
        };
        this.addMesh = (mesh, isStatic, pos, chunk)=>{
            if (!isStatic) {
                mesh._noaIsDynamicContent = true;
                octree.dynamicContent.push(mesh);
                return;
            }
            // octreeBlock-space integer coords of mesh position, and hashed key
            var ci = Math.floor(pos[0] / bs);
            var cj = Math.floor(pos[1] / bs);
            var ck = Math.floor(pos[2] / bs);
            var mapKey = (0, $afbe2889bb225d5c$export$8292e80ebf6a0)(ci, cj, ck);
            // get or create octreeBlock
            var block = octBlocksHash[mapKey];
            if (!block) {
                // lower corner of new octree block position, in global/local
                var gloc = [
                    ci * bs,
                    cj * bs,
                    ck * bs
                ];
                var loc = [
                    0,
                    0,
                    0
                ];
                rendering.noa.globalToLocal(gloc, null, loc);
                // make the new octree block and store it
                block = makeOctreeBlock(loc, bs);
                octree.blocks.push(block);
                octBlocksHash[mapKey] = block;
                block._noaMapKey = mapKey;
            }
            // do the actual adding logic
            block.entries.push(mesh);
            mesh._noaContainingBlock = block;
            // rely on octrees for selection, skipping bounds checks
            mesh.alwaysSelectAsActiveMesh = true;
        };
        this.removeMesh = (mesh)=>{
            if (mesh._noaIsDynamicContent) {
                mesh._noaIsDynamicContent = null;
                (0, $afbe2889bb225d5c$export$adb0e12dab3d5fcb)(octree.dynamicContent, mesh);
            }
            if (mesh._noaContainingBlock) {
                mesh._noaContainingChunk = null;
                var block = mesh._noaContainingBlock;
                (0, $afbe2889bb225d5c$export$adb0e12dab3d5fcb)(block.entries, mesh);
                if (block.entries.length === 0) {
                    delete octBlocksHash[block._noaMapKey];
                    (0, $afbe2889bb225d5c$export$adb0e12dab3d5fcb)(octree.blocks, block);
                }
            }
        };
        /*
         * 
         *          internals
         * 
        */ var NOP = ()=>{};
        var bs = blockSize * rendering.noa.world._chunkSize;
        var recurseRebaseBlocks = (parent, offset)=>{
            parent.blocks.forEach((child)=>{
                child.minPoint.subtractInPlace(offset);
                child.maxPoint.subtractInPlace(offset);
                child._boundingVectors.forEach((v)=>v.subtractInPlace(offset));
                if (child.blocks) recurseRebaseBlocks(child, offset);
            });
        };
        var makeOctreeBlock = (minPt, size)=>{
            var min = new (0, $5OpyM$Vector3)(minPt[0], minPt[1], minPt[2]);
            var max = new (0, $5OpyM$Vector3)(minPt[0] + size, minPt[1] + size, minPt[2] + size);
            return new (0, $5OpyM$OctreeBlock)(min, max, undefined, undefined, undefined, NOP);
        };
    }
}













// profiling flag
var $11e41780fd8a0927$var$PROFILE = 0;
var $11e41780fd8a0927$var$defaults = {
    showFPS: false,
    antiAlias: true,
    clearColor: [
        0.8,
        0.9,
        1
    ],
    ambientColor: [
        1,
        1,
        1
    ],
    lightDiffuse: [
        1,
        1,
        1
    ],
    lightSpecular: [
        1,
        1,
        1
    ],
    groundLightColor: [
        0.5,
        0.5,
        0.5
    ],
    useAO: true,
    AOmultipliers: [
        0.93,
        0.8,
        0.5
    ],
    reverseAOmultiplier: 1.0,
    preserveDrawingBuffer: true,
    octreeBlockSize: 2,
    renderOnResize: true
};
class $11e41780fd8a0927$export$ab9c2d573a6e2267 {
    /** @internal */ constructor(noa, opts, canvas){
        opts = Object.assign({}, $11e41780fd8a0927$var$defaults, opts);
        /** @internal */ this.noa = noa;
        // settings
        /** Whether to redraw the screen when the game is resized while paused */ this.renderOnResize = !!opts.renderOnResize;
        // internals
        /** @internal */ this.useAO = !!opts.useAO;
        /** @internal */ this.aoVals = opts.AOmultipliers;
        /** @internal */ this.revAoVal = opts.reverseAOmultiplier;
        /** @internal */ this.meshingCutoffTime = 6 // ms
        ;
        // set up babylon scene
        /** @internal */ this._scene = null;
        /** @internal */ this._engine = null;
        /** @internal */ this._octreeManager = null;
        $11e41780fd8a0927$var$initScene(this, canvas, opts);
        // for debugging
        if (opts.showFPS) $11e41780fd8a0927$var$setUpFPS();
    }
}
// Constructor helper - set up the Babylon.js scene and basic components
function $11e41780fd8a0927$var$initScene(self, canvas, opts) {
    // init internal properties
    self._engine = new (0, $5OpyM$Engine)(canvas, opts.antiAlias, {
        preserveDrawingBuffer: opts.preserveDrawingBuffer,
        disableWebGL2Support: true
    });
    self._scene = new (0, $5OpyM$Scene)(self._engine);
    var scene = self._scene;
    // remove built-in listeners
    scene.detachControl();
    // octree manager class
    var blockSize = Math.round(opts.octreeBlockSize);
    self._octreeManager = new (0, $16ff39f90deeca95$export$a577f9275f174d6b)(self, blockSize);
    // camera, and a node to hold it and accumulate rotations
    self._cameraHolder = new (0, $5OpyM$TransformNode)("camHolder", scene);
    self._camera = new (0, $5OpyM$FreeCamera)("camera", new (0, $5OpyM$Vector3)(0, 0, 0), scene);
    self._camera.parent = self._cameraHolder;
    self._camera.minZ = .01;
    self._cameraHolder.visibility = false;
    // plane obscuring the camera - for overlaying an effect on the whole view
    self._camScreen = (0, $5OpyM$CreatePlane)("camScreen", {
        size: 10
    }, scene);
    self.addMeshToScene(self._camScreen);
    self._camScreen.position.z = .1;
    self._camScreen.parent = self._camera;
    self._camScreenMat = self.makeStandardMaterial("camscreenmat");
    self._camScreen.material = self._camScreenMat;
    self._camScreen.setEnabled(false);
    self._camLocBlock = 0;
    // apply some defaults
    var lightVec = new (0, $5OpyM$Vector3)(0.1, 1, 0.3);
    self._light = new (0, $5OpyM$HemisphericLight)("light", lightVec, scene);
    function arrToColor(a) {
        return new (0, $5OpyM$Color3)(a[0], a[1], a[2]);
    }
    scene.clearColor = arrToColor(opts.clearColor);
    scene.ambientColor = arrToColor(opts.ambientColor);
    self._light.diffuse = arrToColor(opts.lightDiffuse);
    self._light.specular = arrToColor(opts.lightSpecular);
    self._light.groundColor = arrToColor(opts.groundLightColor);
    // make a default flat material (used or clone by terrain, etc)
    self.flatMaterial = self.makeStandardMaterial("flatmat");
}
/*
 *   PUBLIC API 
 */ /** The Babylon `scene` object representing the game world. */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.getScene = function() {
    return this._scene;
};
// per-tick listener for rendering-related stuff
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.tick = function(dt) {
// nothing here at the moment
};
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.render = function() {
    $11e41780fd8a0927$var$profile_hook("start");
    $11e41780fd8a0927$var$updateCameraForRender(this);
    $11e41780fd8a0927$var$profile_hook("updateCamera");
    this._engine.beginFrame();
    $11e41780fd8a0927$var$profile_hook("beginFrame");
    this._scene.render();
    $11e41780fd8a0927$var$profile_hook("render");
    $11e41780fd8a0927$var$fps_hook();
    this._engine.endFrame();
    $11e41780fd8a0927$var$profile_hook("endFrame");
    $11e41780fd8a0927$var$profile_hook("end");
};
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.postRender = function() {
// nothing currently
};
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.resize = function() {
    this._engine.resize();
    if (this.noa._paused && this.renderOnResize) this._scene.render();
};
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.highlightBlockFace = function(show, posArr, normArr) {
    var m = $11e41780fd8a0927$var$getHighlightMesh(this);
    if (show) {
        // floored local coords for highlight mesh
        this.noa.globalToLocal(posArr, null, $11e41780fd8a0927$var$hlpos);
        // offset to avoid z-fighting, bigger when camera is far away
        var dist = (0, $5OpyM$glvec3).dist(this.noa.camera._localGetPosition(), $11e41780fd8a0927$var$hlpos);
        var slop = 0.001 + 0.001 * dist;
        for(var i = 0; i < 3; i++)if (normArr[i] === 0) $11e41780fd8a0927$var$hlpos[i] += 0.5;
        else $11e41780fd8a0927$var$hlpos[i] += normArr[i] > 0 ? 1 + slop : -slop;
        m.position.copyFromFloats($11e41780fd8a0927$var$hlpos[0], $11e41780fd8a0927$var$hlpos[1], $11e41780fd8a0927$var$hlpos[2]);
        m.rotation.x = normArr[1] ? Math.PI / 2 : 0;
        m.rotation.y = normArr[0] ? Math.PI / 2 : 0;
    }
    m.setEnabled(show);
};
var $11e41780fd8a0927$var$hlpos = [];
/**
 * Add a mesh to the scene's octree setup so that it renders. 
 * 
 * @param mesh the mesh to add to the scene
 * @param isStatic pass in true if mesh never moves (i.e. change octree blocks)
 * @param pos (optional) global position where the mesh should be
 * @param containingChunk (optional) chunk to which the mesh is statically bound
 */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.addMeshToScene = function(mesh, isStatic = false, pos = null, containingChunk = null) {
    // exit silently if mesh has already been added and not removed
    if (this._octreeManager.includesMesh(mesh)) return;
    // find local position for mesh and move it there (unless it's parented)
    if (!mesh.parent) {
        if (!pos) pos = [
            mesh.position.x,
            mesh.position.y,
            mesh.position.z
        ];
        var lpos = [];
        this.noa.globalToLocal(pos, null, lpos);
        mesh.position.copyFromFloats(lpos[0], lpos[1], lpos[2]);
    }
    // save CPU by freezing terrain meshes
    if (isStatic) {
        mesh.freezeWorldMatrix();
        if (mesh.freezeNormals) mesh.freezeNormals();
    }
    // add to the octree, and add dispose handler to remove it
    this._octreeManager.addMesh(mesh, isStatic, pos, containingChunk);
    mesh.onDisposeObservable.add(()=>{
        this._octreeManager.removeMesh(mesh);
    });
};
/**
 * Create a default standardMaterial:      
 * flat, nonspecular, fully reflects diffuse and ambient light
 */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.makeStandardMaterial = function(name) {
    var mat = new (0, $5OpyM$StandardMaterial)(name, this._scene);
    mat.specularColor.copyFromFloats(0, 0, 0);
    mat.ambientColor.copyFromFloats(1, 1, 1);
    mat.diffuseColor.copyFromFloats(1, 1, 1);
    this.postMaterialCreationHook(mat);
    return mat;
};
/** Exposed hook for if the client wants to do something to newly created materials */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.postMaterialCreationHook = function(mat) {};
/*
 *
 *   INTERNALS
 *
 */ /*
 *
 * 
 *   ACCESSORS FOR CHUNK ADD/REMOVAL/MESHING
 *
 * 
 */ /** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.prepareChunkForRendering = function(chunk) {
// currently no logic needed here, but I may need it again...
};
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.disposeChunkForRendering = function(chunk) {
// nothing currently
};
// change world origin offset, and rebase everything with a position
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype._rebaseOrigin = function(delta) {
    var dvec = new (0, $5OpyM$Vector3)(delta[0], delta[1], delta[2]);
    this._scene.meshes.forEach((mesh)=>{
        // parented meshes don't live in the world coord system
        if (mesh.parent) return;
        // move each mesh by delta (even though most are managed by components)
        mesh.position.subtractInPlace(dvec);
        if (mesh._isWorldMatrixFrozen) // paradoxically this unfreezes, then re-freezes the matrix
        mesh.freezeWorldMatrix();
    });
    // updates position of all octree blocks
    this._octreeManager.rebase(dvec);
};
// updates camera position/rotation to match settings from noa.camera
function $11e41780fd8a0927$var$updateCameraForRender(self) {
    var cam = self.noa.camera;
    var tgtLoc = cam._localGetTargetPosition();
    self._cameraHolder.position.copyFromFloats(tgtLoc[0], tgtLoc[1], tgtLoc[2]);
    self._cameraHolder.rotation.x = cam.pitch;
    self._cameraHolder.rotation.y = cam.heading;
    self._camera.position.z = -cam.currentZoom;
    // applies screen effect when camera is inside a transparent voxel
    var cloc = cam._localGetPosition();
    var off = self.noa.worldOriginOffset;
    var cx = Math.floor(cloc[0] + off[0]);
    var cy = Math.floor(cloc[1] + off[1]);
    var cz = Math.floor(cloc[2] + off[2]);
    var id = self.noa.getBlock(cx, cy, cz);
    $11e41780fd8a0927$var$checkCameraEffect(self, id);
}
//  If camera's current location block id has alpha color (e.g. water), apply/remove an effect
function $11e41780fd8a0927$var$checkCameraEffect(self, id) {
    if (id === self._camLocBlock) return;
    if (id === 0) self._camScreen.setEnabled(false);
    else {
        var matId = self.noa.registry.getBlockFaceMaterial(id, 0);
        if (matId) {
            var matData = self.noa.registry.getMaterialData(matId);
            var col = matData.color;
            var alpha = matData.alpha;
            if (col && alpha && alpha < 1) {
                self._camScreenMat.diffuseColor.set(0, 0, 0);
                self._camScreenMat.ambientColor.set(col[0], col[1], col[2]);
                self._camScreenMat.alpha = alpha;
                self._camScreen.setEnabled(true);
            }
        }
    }
    self._camLocBlock = id;
}
// make or get a mesh for highlighting active voxel
function $11e41780fd8a0927$var$getHighlightMesh(rendering) {
    var mesh = rendering._highlightMesh;
    if (!mesh) {
        mesh = (0, $5OpyM$CreatePlane)("highlight", {
            size: 1.0
        }, rendering._scene);
        var hlm = rendering.makeStandardMaterial("highlightMat");
        hlm.backFaceCulling = false;
        hlm.emissiveColor = new (0, $5OpyM$Color3)(1, 1, 1);
        hlm.alpha = 0.2;
        mesh.material = hlm;
        // outline
        var s = 0.5;
        var lines = (0, $5OpyM$CreateLines)("hightlightLines", {
            points: [
                new (0, $5OpyM$Vector3)(s, s, 0),
                new (0, $5OpyM$Vector3)(s, -s, 0),
                new (0, $5OpyM$Vector3)(-s, -s, 0),
                new (0, $5OpyM$Vector3)(-s, s, 0),
                new (0, $5OpyM$Vector3)(s, s, 0)
            ]
        }, rendering._scene);
        lines.color = new (0, $5OpyM$Color3)(1, 1, 1);
        lines.parent = mesh;
        rendering.addMeshToScene(mesh);
        rendering.addMeshToScene(lines);
        rendering._highlightMesh = mesh;
    }
    return mesh;
}
/*
 * 
 *      sanity checks:
 * 
 */ /** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.debug_SceneCheck = function() {
    var meshes = this._scene.meshes;
    var octree = this._scene._selectionOctree;
    var dyns = octree.dynamicContent;
    var octs = [];
    var numOcts = 0;
    var numSubs = 0;
    var mats = this._scene.materials;
    var allmats = [];
    mats.forEach((mat)=>{
        if (mat.subMaterials) mat.subMaterials.forEach((mat)=>allmats.push(mat));
        else allmats.push(mat);
    });
    octree.blocks.forEach(function(block) {
        numOcts++;
        block.entries.forEach((m)=>octs.push(m));
    });
    meshes.forEach(function(m) {
        if (m._isDisposed) warn(m, "disposed mesh in scene");
        if (empty(m)) return;
        if (missing(m, dyns, octs)) warn(m, "non-empty mesh missing from octree");
        if (!m.material) {
            warn(m, "non-empty scene mesh with no material");
            return;
        }
        numSubs += m.subMeshes ? m.subMeshes.length : 1;
        var mats = m.material.subMaterials || [
            m.material
        ];
        mats.forEach(function(mat) {
            if (missing(mat, mats)) warn(mat, "mesh material not in scene");
        });
    });
    var unusedMats = [];
    allmats.forEach((mat)=>{
        var used = false;
        meshes.forEach((mesh)=>{
            if (mesh.material === mat) used = true;
            if (!mesh.material || !mesh.material.subMaterials) return;
            if (mesh.material.subMaterials.includes(mat)) used = true;
        });
        if (!used) unusedMats.push(mat.name);
    });
    if (unusedMats.length) console.warn("Materials unused by any mesh: ", unusedMats.join(", "));
    dyns.forEach(function(m) {
        if (missing(m, meshes)) warn(m, "octree/dynamic mesh not in scene");
    });
    octs.forEach(function(m) {
        if (missing(m, meshes)) warn(m, "octree block mesh not in scene");
    });
    var avgPerOct = Math.round(10 * octs.length / numOcts) / 10;
    console.log("meshes - octree:", octs.length, "  dynamic:", dyns.length, "   subMeshes:", numSubs, "   avg meshes/octreeBlock:", avgPerOct);
    function warn(obj, msg) {
        console.warn(obj.name + " --- " + msg);
    }
    function empty(mesh) {
        return mesh.getIndices().length === 0;
    }
    function missing(obj, list1, list2) {
        if (!obj) return false;
        if (list1.includes(obj)) return false;
        if (list2 && list2.includes(obj)) return false;
        return true;
    }
    return "done.";
};
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.debug_MeshCount = function() {
    var ct = {};
    this._scene.meshes.forEach((m)=>{
        var n = m.name || "";
        n = n.replace(/-\d+.*/, "#");
        n = n.replace(/\d+.*/, "#");
        n = n.replace(/(rotHolder|camHolder|camScreen)/, "rendering use");
        n = n.replace(/atlas sprite .*/, "atlas sprites");
        ct[n] = ct[n] || 0;
        ct[n]++;
    });
    for(var s in ct)console.log("   " + (ct[s] + "       ").substr(0, 7) + s);
};
var $11e41780fd8a0927$var$profile_hook = $11e41780fd8a0927$var$PROFILE ? (0, $afbe2889bb225d5c$export$cf559512bdad9080)(200, "render internals") : ()=>{};
var $11e41780fd8a0927$var$fps_hook = function() {};
function $11e41780fd8a0927$var$setUpFPS() {
    var div = document.createElement("div");
    div.id = "noa_fps";
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.right = "0";
    div.style.zIndex = "0";
    div.style.color = "white";
    div.style.backgroundColor = "rgba(0,0,0,0.5)";
    div.style.font = "14px monospace";
    div.style.textAlign = "center";
    div.style.minWidth = "2em";
    div.style.margin = "4px";
    document.body.appendChild(div);
    var every = 1000;
    var ct = 0;
    var longest = 0;
    var start = performance.now();
    var last = start;
    $11e41780fd8a0927$var$fps_hook = function() {
        ct++;
        var nt = performance.now();
        if (nt - last > longest) longest = nt - last;
        last = nt;
        if (nt - start < every) return;
        var fps = Math.round(ct / (nt - start) * 1000);
        var min = Math.round(1 / longest * 1000);
        div.innerHTML = fps + "<br>" + min;
        ct = 0;
        longest = 0;
        start = nt;
    };
}


/** 
 * The Physics class is found at [[Physics | `noa.physics`]].
 * @module noa.physics
 */ 
// import { Physics as VoxelPhysics } from '../../../../npm-modules/voxel-physics-engine'
var $2f83a8c082dca133$var$defaultOptions = {
    gravity: [
        0,
        -10,
        0
    ],
    airDrag: 0.1
};
class $2f83a8c082dca133$export$2f09efa5b67124a7 extends (0, $5OpyM$Physics) {
    /** @internal */ constructor(noa, opts){
        opts = Object.assign({}, $2f83a8c082dca133$var$defaultOptions, opts);
        var world = noa.world;
        var solidLookup = noa.registry._solidityLookup;
        var fluidLookup = noa.registry._fluidityLookup;
        // physics engine runs in offset coords, so voxel getters need to match
        var offset = noa.worldOriginOffset;
        var blockGetter = (x, y, z)=>{
            var id = world.getBlockID(x + offset[0], y + offset[1], z + offset[2]);
            return solidLookup[id];
        };
        var isFluidGetter = (x, y, z)=>{
            var id = world.getBlockID(x + offset[0], y + offset[1], z + offset[2]);
            return fluidLookup[id];
        };
        super(opts, blockGetter, isFluidGetter);
    }
}


/** 
 * The World class is found at [[World | `noa.world`]].
 * @module noa.world
 */ 


var $90379f8792b605b2$var$PROFILE_EVERY = 0 // ticks
;
var $90379f8792b605b2$var$PROFILE_QUEUES_EVERY = 0 // ticks
;
var $90379f8792b605b2$var$defaultOptions = {
    chunkSize: 24,
    chunkAddDistance: [
        2,
        2
    ],
    chunkRemoveDistance: [
        3,
        3
    ],
    worldGenWhilePaused: false,
    manuallyControlChunkLoading: false
};
class $90379f8792b605b2$export$812cd9544993280d extends (0, $5OpyM$events) {
    /** @internal */ constructor(noa, opts){
        super();
        opts = Object.assign({}, $90379f8792b605b2$var$defaultOptions, opts);
        /** @internal */ this.noa = noa;
        /** @internal */ this.playerChunkLoaded = false;
        /** @internal */ this.Chunk = (0, $a4aa757de41525e5$export$2e2bcd8739ae039 // expose this class for ...reasons
        );
        /**
         * Game clients should set this if they need to manually control 
         * which chunks to load and unload. When set, client should call 
         * `noa.world.manuallyLoadChunk` / `manuallyUnloadChunk` as needed.
         */ this.manuallyControlChunkLoading = !!opts.manuallyControlChunkLoading;
        /**
         * Defining this function sets a custom order in which to create chunks.
         * The function should look like:
         * ```js
         *   (i, j, k) => 1 // return a smaller number for chunks to process first
         * ```
         */ this.chunkSortingDistFn = $90379f8792b605b2$var$defaultSortDistance;
        /**
         * Set this higher to cause chunks not to mesh until they have some neighbors.
         * Max legal value is 26 (each chunk will mesh only when all neighbors are present)
         */ this.minNeighborsToMesh = 6;
        /** When true, worldgen queues will keep running if engine is paused. */ this.worldGenWhilePaused = !!opts.worldGenWhilePaused;
        /** Limit the size of internal chunk processing queues 
         * @type {number} 
        */ this.maxChunksPendingCreation = 10;
        /** Limit the size of internal chunk processing queues 
         * @type {number} 
        */ this.maxChunksPendingMeshing = 10;
        /** Cutoff (in ms) of time spent each **tick** 
         * @type {number}
        */ this.maxProcessingPerTick = 9;
        /** Cutoff (in ms) of time spent each **render** 
         * @type {number}
        */ this.maxProcessingPerRender = 5;
        // set up internal state
        /** @internal */ this._chunkSize = opts.chunkSize;
        /** @internal */ this._chunkAddDistance = [
            1,
            1
        ];
        /** @internal */ this._chunkRemoveDistance = [
            1,
            1
        ];
        /** @internal */ this._addDistanceFn = null;
        /** @internal */ this._remDistanceFn = null;
        /** @internal */ this._prevWorldName = "";
        /** @internal */ this._prevPlayerChunkHash = 0;
        /** @internal */ this._chunkAddSearchFrom = 0;
        /** @internal */ this._prevSortingFn = null;
        /** @internal */ this._chunksKnown = null;
        /** @internal */ this._chunksPending = null;
        /** @internal */ this._chunksToRequest = null;
        /** @internal */ this._chunksToRemove = null;
        /** @internal */ this._chunksToMesh = null;
        /** @internal */ this._chunksToMeshFirst = null;
        /** @internal */ this._chunksSortedLocs = null;
        $90379f8792b605b2$var$initChunkQueues(this);
        // validate add/remove sizes through a setter that clients can use later
        this.setAddRemoveDistance(opts.chunkAddDistance, opts.chunkRemoveDistance);
        // chunks stored in a data structure for quick lookup
        // note that the hash wraps around every 1024 chunk indexes!!
        // i.e. two chunks that far apart can't be loaded at the same time
        /** @internal */ this._storage = new (0, $afbe2889bb225d5c$export$e1de8ac9d4f5f7d5)();
        // coordinate converter functions - default versions first:
        var cs = this._chunkSize;
        /** @internal */ this._coordsToChunkIndexes = $90379f8792b605b2$var$chunkCoordsToIndexesGeneral;
        /** @internal */ this._coordsToChunkLocals = $90379f8792b605b2$var$chunkCoordsToLocalsGeneral;
        // when chunk size is a power of two, override with bit-twiddling:
        var powerOfTwo = (cs & cs - 1) === 0;
        if (powerOfTwo) {
            /** @internal */ this._coordShiftBits = Math.log2(cs) | 0;
            /** @internal */ this._coordMask = cs - 1 | 0;
            /** @internal */ this._coordsToChunkIndexes = $90379f8792b605b2$var$chunkCoordsToIndexesPowerOfTwo;
            /** @internal */ this._coordsToChunkLocals = $90379f8792b605b2$var$chunkCoordsToLocalsPowerOfTwo;
        }
    }
}
/*
 *
 *
 *
 *
 *                  PUBLIC API 
 *
 *
 *
 *
*/ /** @param x,y,z */ $90379f8792b605b2$export$812cd9544993280d.prototype.getBlockID = function(x, y, z) {
    var [ci, cj, ck] = this._coordsToChunkIndexes(x, y, z);
    var chunk = this._storage.getChunkByIndexes(ci, cj, ck);
    if (!chunk) return 0;
    var [i, j, k] = this._coordsToChunkLocals(x, y, z);
    return chunk.voxels.get(i, j, k);
};
/** @param x,y,z */ $90379f8792b605b2$export$812cd9544993280d.prototype.getBlockSolidity = function(x, y, z) {
    var [ci, cj, ck] = this._coordsToChunkIndexes(x, y, z);
    var chunk = this._storage.getChunkByIndexes(ci, cj, ck);
    if (!chunk) return false;
    var [i, j, k] = this._coordsToChunkLocals(x, y, z);
    return !!chunk.getSolidityAt(i, j, k);
};
/** @param x,y,z */ $90379f8792b605b2$export$812cd9544993280d.prototype.getBlockOpacity = function(x, y, z) {
    var id = this.getBlockID(x, y, z);
    return this.noa.registry.getBlockOpacity(id);
};
/** @param x,y,z */ $90379f8792b605b2$export$812cd9544993280d.prototype.getBlockFluidity = function(x, y, z) {
    var id = this.getBlockID(x, y, z);
    return this.noa.registry.getBlockFluidity(id);
};
/** @param x,y,z */ $90379f8792b605b2$export$812cd9544993280d.prototype.getBlockProperties = function(x, y, z) {
    var id = this.getBlockID(x, y, z);
    return this.noa.registry.getBlockProps(id);
};
/** @param val,x,y,z */ $90379f8792b605b2$export$812cd9544993280d.prototype.setBlockID = function(val, x, y, z) {
    var [ci, cj, ck] = this._coordsToChunkIndexes(x, y, z);
    var chunk = this._storage.getChunkByIndexes(ci, cj, ck);
    if (!chunk) return;
    var [i, j, k] = this._coordsToChunkLocals(x, y, z);
    return chunk.set(i, j, k, val, x, y, z);
};
/** @param box */ $90379f8792b605b2$export$812cd9544993280d.prototype.isBoxUnobstructed = function(box) {
    var base = box.base;
    var max = box.max;
    for(var i = Math.floor(base[0]); i < max[0] + 1; i++){
        for(var j = Math.floor(base[1]); j < max[1] + 1; j++)for(var k = Math.floor(base[2]); k < max[2] + 1; k++){
            if (this.getBlockSolidity(i, j, k)) return false;
        }
    }
    return true;
};
/** client should call this after creating a chunk's worth of data (as an ndarray)  
 * If userData is passed in it will be attached to the chunk
 * @param id
 * @param array
 * @param userData
 */ $90379f8792b605b2$export$812cd9544993280d.prototype.setChunkData = function(id, array, userData) {
    $90379f8792b605b2$var$setChunkData(this, id, array, userData);
};
/** 
 * Sets the distances within which to load new chunks, and beyond which 
 * to unload them. Generally you want the remove distance to be somewhat
 * farther, so that moving back and forth across the same chunk border doesn't
 * keep loading/unloading the same distant chunks.
 * 
 * Both arguments can be numbers (number of voxels), or arrays like:
 * `[horiz, vert]` specifying different horizontal and vertical distances.
 * @param {number | number[]} addDist
 * @param {number | number[]} remDist
 */ $90379f8792b605b2$export$812cd9544993280d.prototype.setAddRemoveDistance = function(addDist = 2, remDist = 3) {
    var addArr = Array.isArray(addDist) ? addDist : [
        addDist,
        addDist
    ];
    var remArr = Array.isArray(remDist) ? remDist : [
        remDist,
        remDist
    ];
    var minGap = 1;
    if (remArr[0] < addArr[0] + minGap) remArr[0] = addArr[0] + minGap;
    if (remArr[1] < addArr[1] + minGap) remArr[1] = addArr[1] + minGap;
    this._chunkAddDistance = addArr;
    this._chunkRemoveDistance = remArr;
    // rebuild chunk distance functions and add search locations
    this._addDistanceFn = $90379f8792b605b2$var$makeDistanceTestFunction(addArr[0], addArr[1]);
    this._remDistanceFn = $90379f8792b605b2$var$makeDistanceTestFunction(remArr[0], remArr[1]);
    this._chunksSortedLocs.empty();
    // this queue holds only 1/16th the search space: i=0..max, j=0..i, k=0..max
    for(var i = 0; i <= addArr[0]; i++){
        for(var k = 0; k <= i; k++)for(var j = 0; j <= addArr[1]; j++){
            if (!this._addDistanceFn(i, j, k)) continue;
            this._chunksSortedLocs.add(i, j, k);
        }
    }
    // resets state of nearby chunk search
    this._prevSortingFn = null;
    this._chunkAddSearchFrom = 0;
};
/** Tells noa to discard voxel data within a given `AABB` (e.g. because 
 * the game client received updated data from a server). 
 * The engine will mark all affected chunks for disposal, and will later emit 
 * new `worldDataNeeded` events (if the chunk is still in draw range).
 * Note that chunks invalidated this way will not emit a `chunkBeingRemoved` event 
 * for the client to save data from.
 */ $90379f8792b605b2$export$812cd9544993280d.prototype.invalidateVoxelsInAABB = function(box) {
    $90379f8792b605b2$var$invalidateChunksInBox(this, box);
};
/** When manually controlling chunk loading, tells the engine that the 
 * chunk containing the specified (x,y,z) needs to be created and loaded.
 * > Note: has no effect when `noa.world.manuallyControlChunkLoading` is not set.
 * @param x, y, z
 */ $90379f8792b605b2$export$812cd9544993280d.prototype.manuallyLoadChunk = function(x, y, z) {
    if (!this.manuallyControlChunkLoading) throw $90379f8792b605b2$var$manualErr;
    var [i, j, k] = this._coordsToChunkIndexes(x, y, z);
    this._chunksKnown.add(i, j, k);
    this._chunksToRequest.add(i, j, k);
};
/** When manually controlling chunk loading, tells the engine that the 
 * chunk containing the specified (x,y,z) needs to be unloaded and disposed.
 * > Note: has no effect when `noa.world.manuallyControlChunkLoading` is not set.
 * @param x, y, z
 */ $90379f8792b605b2$export$812cd9544993280d.prototype.manuallyUnloadChunk = function(x, y, z) {
    if (!this.manuallyControlChunkLoading) throw $90379f8792b605b2$var$manualErr;
    var [i, j, k] = this._coordsToChunkIndexes(x, y, z);
    this._chunksToRemove.add(i, j, k);
    this._chunksToMesh.remove(i, j, k);
    this._chunksToRequest.remove(i, j, k);
    this._chunksToMeshFirst.remove(i, j, k);
};
var $90379f8792b605b2$var$manualErr = "Set `noa.world.manuallyControlChunkLoading` if you need this API";
/*
 * 
 * 
 * 
 *                  internals:
 * 
 *          tick functions that process queues and trigger events
 * 
 * 
 * 
*/ /** @internal */ $90379f8792b605b2$export$812cd9544993280d.prototype.tick = function() {
    var tickStartTime = performance.now();
    // get indexes of player's current chunk, and has it changed since last tick?
    var [ci, cj, ck] = $90379f8792b605b2$var$getPlayerChunkIndexes(this);
    var chunkLocHash = (0, $afbe2889bb225d5c$export$8292e80ebf6a0)(ci, cj, ck);
    var changedChunks = chunkLocHash !== this._prevPlayerChunkHash;
    if (changedChunks) {
        this.emit("playerEnteredChunk", ci, cj, ck);
        this._prevPlayerChunkHash = chunkLocHash;
        this._chunkAddSearchFrom = 0;
    }
    // if world has changed, mark everything to be removed, and ping 
    // removals queue so that player's chunk gets loaded back quickly
    if (this._prevWorldName !== this.noa.worldName) {
        $90379f8792b605b2$var$markAllChunksForRemoval(this);
        this._prevWorldName = this.noa.worldName;
        this._chunkAddSearchFrom = 0;
        $90379f8792b605b2$var$processRemoveQueue(this);
    }
    $90379f8792b605b2$var$profile_hook("start");
    $90379f8792b605b2$var$profile_queues_hook("start");
    // scan for chunks to add/remove (unless client handles manually)
    if (!this.manuallyControlChunkLoading) {
        if (changedChunks) {
            $90379f8792b605b2$var$findDistantChunksToRemove(this, ci, cj, ck);
            $90379f8792b605b2$var$profile_hook("remQueue");
        }
        $90379f8792b605b2$var$findNewChunksInRange(this, ci, cj, ck);
        $90379f8792b605b2$var$profile_hook("addQueue");
    }
    // process (create or mesh) some chunks, up to max iteration time
    var ptime = Math.max(1, this.maxProcessingPerTick || 0);
    var done1 = false;
    var done2 = false;
    var done3 = false;
    (0, $afbe2889bb225d5c$export$5fa3aa8d50144909)(ptime, ()=>{
        if (!done1) done1 = $90379f8792b605b2$var$processRequestQueue(this);
        $90379f8792b605b2$var$profile_hook("requests");
        if (!done2) done2 = $90379f8792b605b2$var$processMeshingQueue(this, false);
        $90379f8792b605b2$var$profile_hook("meshes");
        if (!done3) {
            done3 = $90379f8792b605b2$var$processRemoveQueue(this) || $90379f8792b605b2$var$processRemoveQueue(this) || $90379f8792b605b2$var$processRemoveQueue(this);
            $90379f8792b605b2$var$profile_hook("removes");
        }
        return done1 && done2 && done3;
    }, tickStartTime);
    // if time is left over, look for low-priority extra meshing
    var dt = performance.now() - tickStartTime;
    ptime -= dt;
    if (ptime > 0.5) {
        $90379f8792b605b2$var$lookForChunksToMesh(this);
        $90379f8792b605b2$var$profile_hook("looking");
        (0, $afbe2889bb225d5c$export$5fa3aa8d50144909)(ptime, ()=>$90379f8792b605b2$var$processMeshingQueue(this, false), tickStartTime);
        $90379f8792b605b2$var$profile_hook("meshes");
    }
    // track whether the player's local chunk is loaded and ready or not
    var pChunk = this._storage.getChunkByIndexes(ci, cj, ck);
    this.playerChunkLoaded = !!pChunk;
    $90379f8792b605b2$var$profile_queues_hook("end", this);
    $90379f8792b605b2$var$profile_hook("end");
};
/** @internal */ $90379f8792b605b2$export$812cd9544993280d.prototype.render = function() {
    // on render, quickly process the high-priority meshing queue
    // to help avoid flashes of background while neighboring chunks update
    var mpr = this.maxProcessingPerRender;
    if (mpr > 0) (0, $afbe2889bb225d5c$export$5fa3aa8d50144909)(mpr, ()=>{
        return $90379f8792b605b2$var$processMeshingQueue(this, true);
    });
};
/** @internal */ $90379f8792b605b2$export$812cd9544993280d.prototype._getChunkByCoords = function(x, y, z) {
    // let internal modules request a chunk object
    var [i, j, k] = this._coordsToChunkIndexes(x, y, z);
    return this._storage.getChunkByIndexes(i, j, k);
};
/*
 * 
 * 
 * 
 *              chunk queues and queue processing
 * 
 * 
 * 
*/ function $90379f8792b605b2$var$initChunkQueues(world) {
    // queue meanings:
    //    Known:        all chunks existing in any queue
    //    ToRequest:    needed but not yet requested from client
    //    Pending:      requested, awaiting data event from client
    //    ToMesh:       has data, but not yet meshed (or re-meshed)
    //    ToMeshFirst:  priority version of the previous
    //    ToRemove:     chunks awaiting disposal
    //    SortedLocs:   locations in 1/16th quadrant of add area, sorted (reverse order of other queues!)
    world._chunksKnown = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
    world._chunksToMesh = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
    world._chunksPending = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
    world._chunksToRemove = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
    world._chunksToRequest = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
    world._chunksToMeshFirst = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
    world._chunksSortedLocs = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
}
// internal accessor for chunks to queue themeselves for remeshing 
// after their data changes
$90379f8792b605b2$export$812cd9544993280d.prototype._queueChunkForRemesh = function(chunk) {
    $90379f8792b605b2$var$possiblyQueueChunkForMeshing(this, chunk);
};
// helper - chunk indexes of where the player is
function $90379f8792b605b2$var$getPlayerChunkIndexes(world) {
    var [x, y, z] = world.noa.entities.getPosition(world.noa.playerEntity);
    return world._coordsToChunkIndexes(x, y, z);
}
// process neighborhood chunks, add missing ones to "toRequest" and "inMemory"
function $90379f8792b605b2$var$findNewChunksInRange(world, ci, cj, ck) {
    var toRequest = world._chunksToRequest;
    var startIx = world._chunkAddSearchFrom;
    var locs = world._chunksSortedLocs;
    if (startIx >= locs.arr.length) return;
    // don't bother if in progress and request queue is backed up
    if (world._chunksToRequest.count() > 50) return;
    // conform of chunk location sorting function
    if (world._prevSortingFn !== world.chunkSortingDistFn) {
        if (!world.chunkSortingDistFn) world.chunkSortingDistFn = $90379f8792b605b2$var$defaultSortDistance;
        $90379f8792b605b2$var$sortQueueByDistanceFrom(locs, 0, 0, 0, world.chunkSortingDistFn, true);
        world._prevSortingFn = world.chunkSortingDistFn;
    }
    // consume the pre-sorted positions array, checking each loc and its reflections
    // add new locations, and remember if any have been seen that are pending removal
    // store the recursion state in a little object to keep things clean (er?)
    $90379f8792b605b2$var$checkingState.removals = 0;
    $90379f8792b605b2$var$checkingState.ci = ci;
    $90379f8792b605b2$var$checkingState.cj = cj;
    $90379f8792b605b2$var$checkingState.ck = ck;
    var posArr = world._chunksSortedLocs.arr;
    for(var i = startIx; i < posArr.length; i++){
        var [di, dj, dk] = posArr[i];
        $90379f8792b605b2$var$checkReflectedLocations(world, $90379f8792b605b2$var$checkingState, di, dj, dk);
        // store progress and break early differently depending on if removals were seen
        if ($90379f8792b605b2$var$checkingState.removals === 0) {
            world._chunkAddSearchFrom = i + 1;
            if (toRequest.count() > 100) break;
            if (i - startIx > 50) break;
        } else {
            if (toRequest.count() > 50) break;
            if (i - startIx > 5) break;
        }
    }
    // queue should be mostly sorted, but may not have been empty
    $90379f8792b605b2$var$sortQueueByDistanceFrom(toRequest, ci, cj, ck, world.chunkSortingDistFn);
}
// Helpers for checking whether to add a location, and reflections of it
var $90379f8792b605b2$var$checkingState = {};
var $90379f8792b605b2$var$checkReflectedLocations = (world, state, i, j, k)=>{
    $90379f8792b605b2$var$checkOneLocation(world, state, state.ci + i, state.cj + j, state.ck + k);
    if (i !== k) $90379f8792b605b2$var$checkOneLocation(world, state, state.ci + k, state.cj + j, state.ck + i);
    if (i > 0) $90379f8792b605b2$var$checkReflectedLocations(world, state, -i, j, k);
    if (j > 0) $90379f8792b605b2$var$checkReflectedLocations(world, state, i, -j, k);
    if (k > 0) $90379f8792b605b2$var$checkReflectedLocations(world, state, i, j, -k);
};
var $90379f8792b605b2$var$checkOneLocation = (world, state, i, j, k)=>{
    if (world._chunksKnown.includes(i, j, k)) {
        if (world._chunksToRemove.includes(i, j, k)) state.removals++;
    } else {
        world._chunksKnown.add(i, j, k);
        world._chunksToRequest.addToFront(i, j, k);
    }
};
// rebuild queue of chunks to be removed from around (ci,cj,ck)
function $90379f8792b605b2$var$findDistantChunksToRemove(world, ci, cj, ck) {
    var distFn = world._remDistanceFn;
    var toRemove = world._chunksToRemove;
    world._chunksKnown.forEach(([i, j, k])=>{
        if (toRemove.includes(i, j, k)) return;
        if (distFn(i - ci, j - cj, k - ck)) return;
        // flag chunk for removal and remove it from work queues
        world._chunksToRemove.add(i, j, k);
        world._chunksToMesh.remove(i, j, k);
        world._chunksToRequest.remove(i, j, k);
        world._chunksToMeshFirst.remove(i, j, k);
    });
    $90379f8792b605b2$var$sortQueueByDistanceFrom(toRemove, ci, cj, ck, world.chunkSortingDistFn);
}
// invalidate chunks overlapping the given AABB
function $90379f8792b605b2$var$invalidateChunksInBox(world, box) {
    var min = world._coordsToChunkIndexes(box.base[0], box.base[1], box.base[2]);
    var max = world._coordsToChunkIndexes(box.max[0], box.max[1], box.max[2]);
    for(var i = 0; i < 3; i++){
        if (!Number.isFinite(box.base[i])) min[i] = box.base[i];
        if (!Number.isFinite(box.max[i])) max[i] = box.max[i];
    }
    world._chunksKnown.forEach((loc)=>{
        for(var i = 0; i < 3; i++){
            if (loc[i] < min[i] || loc[i] >= max[i]) return;
        }
        world._chunksToRemove.add(loc[0], loc[1], loc[2]);
        world._chunksToMesh.remove(loc[0], loc[1], loc[2]);
        world._chunksToRequest.remove(loc[0], loc[1], loc[2]);
        world._chunksToMeshFirst.remove(loc[0], loc[1], loc[2]);
    });
}
// when current world changes - empty work queues and mark all for removal
function $90379f8792b605b2$var$markAllChunksForRemoval(world) {
    world._chunksToRemove.copyFrom(world._chunksKnown);
    world._chunksToRequest.empty();
    world._chunksToMesh.empty();
    world._chunksToMeshFirst.empty();
    var [i, j, k] = $90379f8792b605b2$var$getPlayerChunkIndexes(world);
    $90379f8792b605b2$var$sortQueueByDistanceFrom(world._chunksToRemove, i, j, k, world.chunkSortingDistFn);
}
// incrementally look for chunks that could be re-meshed
function $90379f8792b605b2$var$lookForChunksToMesh(world) {
    var limit = 5;
    var numQueued = world._chunksToMesh.count() + world._chunksToMeshFirst.count();
    if (numQueued > limit) return;
    var knownLocs = world._chunksKnown.arr;
    var ct = Math.min(50, knownLocs.length);
    for(var n = 0; n < ct; n++){
        $90379f8792b605b2$var$lookIndex = ($90379f8792b605b2$var$lookIndex + 1) % knownLocs.length;
        var [i, j, k] = knownLocs[$90379f8792b605b2$var$lookIndex];
        var chunk = world._storage.getChunkByIndexes(i, j, k);
        if (!chunk) continue;
        var res = $90379f8792b605b2$var$possiblyQueueChunkForMeshing(world, chunk);
        if (res) numQueued++;
        if (numQueued > limit) return;
    }
}
var $90379f8792b605b2$var$lookIndex = -1;
// run through chunk tracking queues looking for work to do next
function $90379f8792b605b2$var$processRequestQueue(world) {
    var toRequest = world._chunksToRequest;
    if (toRequest.isEmpty()) return true;
    // skip if too many outstanding requests, or if meshing queue is full
    var pending = world._chunksPending.count();
    var toMesh = world._chunksToMesh.count();
    if (pending >= world.maxChunksPendingCreation) return true;
    if (toMesh >= world.maxChunksPendingMeshing) return true;
    var [i, j, k] = toRequest.pop();
    $90379f8792b605b2$var$requestNewChunk(world, i, j, k);
    return toRequest.isEmpty();
}
function $90379f8792b605b2$var$processRemoveQueue(world) {
    var toRemove = world._chunksToRemove;
    if (toRemove.isEmpty()) return true;
    var [i, j, k] = toRemove.pop();
    $90379f8792b605b2$var$removeChunk(world, i, j, k);
    return toRemove.isEmpty();
}
// similar to above but for chunks waiting to be meshed
function $90379f8792b605b2$var$processMeshingQueue(world, firstOnly) {
    var queue = world._chunksToMeshFirst;
    if (queue.isEmpty() && !firstOnly) queue = world._chunksToMesh;
    if (queue.isEmpty()) return true;
    var [i, j, k] = queue.pop();
    if (world._chunksToRemove.includes(i, j, k)) return;
    var chunk = world._storage.getChunkByIndexes(i, j, k);
    if (chunk) $90379f8792b605b2$var$doChunkRemesh(world, chunk);
}
function $90379f8792b605b2$var$possiblyQueueChunkForMeshing(world, chunk) {
    if (!(chunk._terrainDirty || chunk._objectsDirty)) return false;
    if (chunk._neighborCount < chunk.minNeighborsToMesh) return false;
    if (world._chunksToMesh.includes(chunk.i, chunk.j, chunk.k)) return false;
    if (world._chunksToMeshFirst.includes(chunk.i, chunk.j, chunk.k)) return false;
    var queue = chunk._neighborCount === 26 ? world._chunksToMeshFirst : world._chunksToMesh;
    queue.add(chunk.i, chunk.j, chunk.k);
    return true;
}
/*
 * 
 * 
 * 
 *              chunk lifecycle - create / set / remove / modify
 * 
 * 
 * 
*/ // create chunk object and request voxel data from client
function $90379f8792b605b2$var$requestNewChunk(world, i, j, k) {
    var size = world._chunkSize;
    var dataArr = (0, $a4aa757de41525e5$export$2e2bcd8739ae039)._createVoxelArray(world._chunkSize);
    var worldName = world.noa.worldName;
    var requestID = [
        i,
        j,
        k,
        worldName
    ].join("|");
    var x = i * size;
    var y = j * size;
    var z = k * size;
    world._chunksPending.add(i, j, k);
    world.emit("worldDataNeeded", requestID, dataArr, x, y, z, worldName);
    $90379f8792b605b2$var$profile_queues_hook("request");
}
// called when client sets a chunk's voxel data
// If userData is passed in it will be attached to the chunk
function $90379f8792b605b2$var$setChunkData(world, reqID, array, userData) {
    var arr = reqID.split("|");
    var i = parseInt(arr.shift());
    var j = parseInt(arr.shift());
    var k = parseInt(arr.shift());
    var worldName = arr.join("|");
    world._chunksPending.remove(i, j, k);
    // discard data if it's for a world that's no longer current
    if (worldName !== world.noa.worldName) return;
    // discard if chunk is no longer needed
    if (!world._chunksKnown.includes(i, j, k)) return;
    if (world._chunksToRemove.includes(i, j, k)) return;
    var chunk = world._storage.getChunkByIndexes(i, j, k);
    if (!chunk) {
        // if chunk doesn't exist, create and init
        var size = world._chunkSize;
        chunk = new (0, $a4aa757de41525e5$export$2e2bcd8739ae039)(world.noa, reqID, i, j, k, size, array);
        world._storage.storeChunkByIndexes(i, j, k, chunk);
        chunk.userData = userData;
        world.noa.rendering.prepareChunkForRendering(chunk);
        world.emit("chunkAdded", chunk);
    } else // else we're updating data for an existing chunk
    chunk._updateVoxelArray(array);
    // chunk can now be meshed, and ping neighbors
    $90379f8792b605b2$var$possiblyQueueChunkForMeshing(world, chunk);
    $90379f8792b605b2$var$updateNeighborsOfChunk(world, i, j, k, chunk);
    $90379f8792b605b2$var$profile_queues_hook("receive");
}
// remove a chunk that wound up in the remove queue
function $90379f8792b605b2$var$removeChunk(world, i, j, k) {
    var chunk = world._storage.getChunkByIndexes(i, j, k);
    if (chunk) {
        world.emit("chunkBeingRemoved", chunk.requestID, chunk.voxels, chunk.userData);
        world.noa.rendering.disposeChunkForRendering(chunk);
        chunk.dispose();
        $90379f8792b605b2$var$profile_queues_hook("dispose");
        $90379f8792b605b2$var$updateNeighborsOfChunk(world, i, j, k, null);
    }
    world._storage.removeChunkByIndexes(i, j, k);
    world._chunksKnown.remove(i, j, k);
    world._chunksToMesh.remove(i, j, k);
    world._chunksToMeshFirst.remove(i, j, k);
}
function $90379f8792b605b2$var$doChunkRemesh(world, chunk) {
    world._chunksToMesh.remove(chunk.i, chunk.j, chunk.k);
    world._chunksToMeshFirst.remove(chunk.i, chunk.j, chunk.k);
    chunk.updateMeshes();
    $90379f8792b605b2$var$profile_queues_hook("mesh");
}
/*
 * 
 * 
 *          two different versions of logic to convert
 *          chunk coords to chunk indexes or local scope
 * 
 * 
*/ function $90379f8792b605b2$var$chunkCoordsToIndexesGeneral(x, y, z) {
    var cs = this._chunkSize;
    return [
        Math.floor(x / cs) | 0,
        Math.floor(y / cs) | 0,
        Math.floor(z / cs) | 0
    ];
}
function $90379f8792b605b2$var$chunkCoordsToLocalsGeneral(x, y, z) {
    var cs = this._chunkSize;
    var i = x % cs | 0;
    if (i < 0) i += cs;
    var j = y % cs | 0;
    if (j < 0) j += cs;
    var k = z % cs | 0;
    if (k < 0) k += cs;
    return [
        i,
        j,
        k
    ];
}
function $90379f8792b605b2$var$chunkCoordsToIndexesPowerOfTwo(x, y, z) {
    var shift = this._coordShiftBits;
    return [
        x >> shift | 0,
        y >> shift | 0,
        z >> shift | 0
    ];
}
function $90379f8792b605b2$var$chunkCoordsToLocalsPowerOfTwo(x, y, z) {
    var mask = this._coordMask;
    return [
        x & mask | 0,
        y & mask | 0,
        z & mask | 0
    ];
}
/*
 * 
 * 
 * 
 *          misc helpers and implementation functions
 * 
 * 
 * 
*/ function $90379f8792b605b2$var$sortQueueByDistanceFrom(queue, pi, pj, pk, distFn, reverse = false) {
    if (reverse) queue.sortByDistance((i, j, k)=>-distFn(pi - i, pj - j, pk - k));
    else queue.sortByDistance((i, j, k)=>distFn(pi - i, pj - j, pk - k));
}
var $90379f8792b605b2$var$defaultSortDistance = (i, j, k)=>i * i + j * j + k * k;
// keep neighbor data updated when chunk is added or removed
function $90379f8792b605b2$var$updateNeighborsOfChunk(world, ci, cj, ck, chunk) {
    var terrainChanged = !chunk || chunk && !chunk.isEmpty;
    for(var i = -1; i <= 1; i++){
        for(var j = -1; j <= 1; j++)for(var k = -1; k <= 1; k++){
            if ((i | j | k) === 0) continue;
            var neighbor = world._storage.getChunkByIndexes(ci + i, cj + j, ck + k);
            if (!neighbor) continue;
            // flag neighbor, assume terrain needs remeshing
            if (terrainChanged) neighbor._terrainDirty = true;
            // update neighbor counts and references, both ways
            if (chunk && !chunk._neighbors.get(i, j, k)) {
                chunk._neighborCount++;
                chunk._neighbors.set(i, j, k, neighbor);
            }
            var nabRef = neighbor._neighbors.get(-i, -j, -k);
            if (chunk && !nabRef) {
                neighbor._neighborCount++;
                neighbor._neighbors.set(-i, -j, -k, chunk);
                // immediately queue neighbor if it's surrounded
                if (neighbor._neighborCount === 26) $90379f8792b605b2$var$possiblyQueueChunkForMeshing(world, neighbor);
            }
            if (!chunk && nabRef) {
                neighbor._neighborCount--;
                neighbor._neighbors.set(-i, -j, -k, null);
            }
        }
    }
}
// make a function to check if an (i,j,k) is within a sphere/ellipse of given size
function $90379f8792b605b2$var$makeDistanceTestFunction(xsize, ysize) {
    var asq = xsize * xsize;
    var bsq = ysize * ysize;
    // spherical case
    if (xsize === ysize) return (i, j, k)=>i * i + j * j + k * k <= asq;
    // otherwise do clipped spheres for now
    if (xsize > ysize) return (i, j, k)=>{
        if (Math.abs(j) > ysize) return false;
        return i * i + j * j + k * k <= asq;
    };
    return (i, j, k)=>{
        var dxsq = i * i + k * k;
        if (dxsq > asq) return false;
        return dxsq + j * j <= bsq;
    };
}
/*
 * 
 * 
 * 
 * 
 *                  debugging
 * 
 * 
 * 
 * 
*/ /** @internal */ $90379f8792b605b2$export$812cd9544993280d.prototype.report = function() {
    console.log("World report - playerChunkLoaded: ", this.playerChunkLoaded);
    $90379f8792b605b2$var$_report(this, "  known:     ", this._chunksKnown.arr, true);
    $90379f8792b605b2$var$_report(this, "  to request:", this._chunksToRequest.arr, 0);
    $90379f8792b605b2$var$_report(this, "  to remove: ", this._chunksToRemove.arr, 0);
    $90379f8792b605b2$var$_report(this, "  creating:  ", this._chunksPending.arr, 0);
    $90379f8792b605b2$var$_report(this, "  to mesh:   ", this._chunksToMesh.arr.concat(this._chunksToMeshFirst.arr), 0);
};
function $90379f8792b605b2$var$_report(world, name, arr, ext) {
    var full = 0, empty = 0, exist = 0, surrounded = 0, remeshes = [];
    arr.forEach((loc)=>{
        var chunk = world._storage.getChunkByIndexes(loc[0], loc[1], loc[2]);
        if (!chunk) return;
        exist++;
        remeshes.push(chunk._timesMeshed);
        if (chunk._isFull) full++;
        if (chunk._isEmpty) empty++;
        if (chunk._neighborCount === 26) surrounded++;
    });
    var out = arr.length.toString().padEnd(8);
    out += ("exist: " + exist).padEnd(12);
    out += ("full: " + full).padEnd(12);
    out += ("empty: " + empty).padEnd(12);
    out += ("surr: " + surrounded).padEnd(12);
    if (ext) {
        var sum = remeshes.reduce((acc, val)=>acc + val, 0);
        var max = remeshes.reduce((acc, val)=>Math.max(acc, val), 0);
        var min = remeshes.reduce((acc, val)=>Math.min(acc, val), 0);
        out += "times meshed: avg " + (sum / exist).toFixed(2);
        out += "  max " + max;
        out += "  min " + min;
    }
    console.log(name, out);
}
var $90379f8792b605b2$var$profile_hook = (0, $afbe2889bb225d5c$export$cf559512bdad9080)($90379f8792b605b2$var$PROFILE_EVERY, "world ticks:", 1);
var $90379f8792b605b2$var$profile_queues_hook = ((every)=>{
    if (!(every > 0)) return ()=>{};
    var iter = 0;
    var counts = {};
    var queues = {};
    var started = performance.now();
    return function profile_queues_hook(state, world) {
        if (state === "start") return;
        if (state !== "end") return counts[state] = (counts[state] || 0) + 1;
        queues.toreq = (queues.toreq || 0) + world._chunksToRequest.count();
        queues.toget = (queues.toget || 0) + world._chunksPending.count();
        queues.tomesh = (queues.tomesh || 0) + world._chunksToMesh.count() + world._chunksToMeshFirst.count();
        queues.tomesh1 = (queues.tomesh1 || 0) + world._chunksToMeshFirst.count();
        queues.torem = (queues.torem || 0) + world._chunksToRemove.count();
        if (++iter < every) return;
        var t = performance.now(), dt = t - started;
        var res = {};
        Object.keys(queues).forEach((k)=>{
            var num = Math.round((queues[k] || 0) / iter);
            res[k] = `[${num}]`.padStart(5);
        });
        Object.keys(counts).forEach((k)=>{
            var num = Math.round((counts[k] || 0) * 1000 / dt);
            res[k] = ("" + num).padStart(3);
        });
        console.log("chunk flow: ", `${res.toreq}-> ${res.request || 0} req/s  `, `${res.toget}-> ${res.receive || 0} got/s  `, `${res.tomesh}-> ${res.mesh || 0} mesh/s  `, `${res.torem}-> ${res.dispose || 0} rem/s  `, `(meshFirst: ${res.tomesh1.trim()})`);
        iter = 0;
        counts = {};
        queues = {};
        started = performance.now();
    };
})($90379f8792b605b2$var$PROFILE_QUEUES_EVERY);



// profile every N ticks/renders
var $cf838c15c8b009ba$var$PROFILE = 0;
var $cf838c15c8b009ba$var$PROFILE_RENDER = 0;
var $cf838c15c8b009ba$var$defaultOptions = {
    debug: false,
    silent: false,
    playerHeight: 1.8,
    playerWidth: 0.6,
    playerStart: [
        0,
        10,
        0
    ],
    playerAutoStep: false,
    tickRate: 30,
    maxRenderRate: 0,
    blockTestDistance: 10,
    stickyPointerLock: true,
    dragCameraOutsidePointerLock: true,
    stickyFullscreen: false,
    skipDefaultHighlighting: false,
    originRebaseDistance: 25
};
class $cf838c15c8b009ba$export$2c3b404bf3a77a1f extends (0, $5OpyM$EventEmitter) {
    /**
     * The core Engine constructor uses the following options:
     * 
     * ```js
     * var defaultOptions = {
     *    debug: false,
     *    silent: false,
     *    playerHeight: 1.8,
     *    playerWidth: 0.6,
     *    playerStart: [0, 10, 0],
     *    playerAutoStep: false,
     *    tickRate: 30,           // ticks per second
     *    maxRenderRate: 0,       // max FPS, 0 for uncapped 
     *    blockTestDistance: 10,
     *    stickyPointerLock: true,
     *    dragCameraOutsidePointerLock: true,
     *    stickyFullscreen: false,
     *    skipDefaultHighlighting: false,
     *    originRebaseDistance: 25,
     * }
     * ```
    */ constructor(opts = {}){
        super();
        opts = Object.assign({}, $cf838c15c8b009ba$var$defaultOptions, opts);
        /** Version string, e.g. `"0.25.4"` */ if (!opts.silent) {
            var debugstr = opts.debug ? " (debug)" : "";
            console.log(`noa-engine ${debugstr}`);
        }
        /** @internal */ this._paused = false;
        /** @internal */ this._dragOutsideLock = opts.dragCameraOutsidePointerLock;
        /** @internal */ this._originRebaseDistance = opts.originRebaseDistance;
        // world origin offset, used throughout engine for origin rebasing
        /** @internal */ this.worldOriginOffset = [
            0,
            0,
            0
        ];
        // how far engine is into the current tick. Updated each render.
        /** @internal */ this.positionInCurrentTick = 0;
        /** 
         * String identifier for the current world. 
         * It's safe to ignore this if your game has only one level/world. 
        */ this.worldName = "default";
        /**
         * Multiplier for how fast time moves. Setting this to a value other than 
         * `1` will make the game speed up or slow down. This can significantly 
         * affect how core systems behave (particularly physics!).
        */ this.timeScale = 1;
        /** Child module for managing the game's container, canvas, etc. */ this.container = new (0, $f93fc8cf162d54df$export$42a852a2b6b56249)(this, opts);
        /** The game's tick rate (ticks per second) 
         * @readonly 
        */ this.tickRate = this.container._shell.tickRate;
        Object.defineProperty(this, "tickRate", {
            get: ()=>this.container._shell.tickRate
        });
        /** The game's max framerate (use `0` for uncapped) */ this.maxRenderRate = this.container._shell.maxRenderRate;
        Object.defineProperty(this, "maxRenderRate", {
            get: ()=>this.container._shell.maxRenderRate,
            set: (v)=>{
                this.container._shell.maxRenderRate = v || 0;
            }
        });
        /** Inputs manager - abstracts key/mouse input */ this.inputs = (0, $b3f1cef4464199f8$export$460acad14ffa1bb4)(this, opts, this.container.element);
        /** A registry where voxel/material properties are managed */ this.registry = new (0, $abcbe6b5adba8195$export$4d9facee29974f3)(this, opts);
        /** Manages the world, chunks, and all voxel data */ this.world = new (0, $90379f8792b605b2$export$812cd9544993280d)(this, opts);
        /** Rendering manager */ this.rendering = new (0, $11e41780fd8a0927$export$ab9c2d573a6e2267)(this, opts, this.container.canvas);
        /** Physics engine - solves collisions, properties, etc. */ this.physics = new (0, $2f83a8c082dca133$export$2f09efa5b67124a7)(this, opts);
        /** Entity manager / Entity Component System (ECS) */ this.entities = new (0, $d163e1ef2fd5c265$export$50f02d20b9547443)(this, opts);
        /** Alias to `noa.entities` */ this.ents = this.entities;
        var ents = this.entities;
        /** Entity id for the player entity */ this.playerEntity = ents.add(opts.playerStart, opts.playerWidth, opts.playerHeight, null, null, true, true);
        // make player entity it collide with terrain and other entities
        ents.addComponent(this.playerEntity, ents.names.collideTerrain);
        ents.addComponent(this.playerEntity, ents.names.collideEntities);
        // adjust default physics parameters
        var body = ents.getPhysics(this.playerEntity).body;
        body.gravityMultiplier = 2 // less floaty
        ;
        body.autoStep = opts.playerAutoStep // auto step onto blocks
        ;
        // input component - sets entity's movement state from key inputs
        ents.addComponent(this.playerEntity, ents.names.receivesInputs);
        // add a component to make player mesh fade out when zooming in
        ents.addComponent(this.playerEntity, ents.names.fadeOnZoom);
        // movement component - applies movement forces
        ents.addComponent(this.playerEntity, ents.names.movement, {
            airJumps: 1
        });
        /** Manages the game's camera, view angle, sensitivity, etc. */ this.camera = new (0, $77aab343c6d1732d$export$79f141de891a5fed)(this, opts);
        /** How far to check for a solid voxel the player is currently looking at */ this.blockTestDistance = opts.blockTestDistance;
        /** 
         * Callback to determine which voxels can be targeted. 
         * Defaults to a solidity check, but can be overridden with arbitrary logic.
         * @type {(blockID: number) => boolean} 
        */ this.blockTargetIdCheck = this.registry.getBlockSolidity;
        /** 
         * Dynamically updated object describing the currently targeted block.
         * @type {null | { 
         *      blockID:number,
         *      position: number[],
         *      normal: number[],
         *      adjacent: number[],
         * }} 
        */ this.targetedBlock = null;
        // add a default block highlighting function
        if (!opts.skipDefaultHighlighting) {
            // the default listener, defined onto noa in case people want to remove it later
            this.defaultBlockHighlightFunction = (tgt)=>{
                if (tgt) this.rendering.highlightBlockFace(true, tgt.position, tgt.normal);
                else this.rendering.highlightBlockFace(false);
            };
            this.on("targetBlockChanged", this.defaultBlockHighlightFunction);
        }
        /*
         *
         *      Various internals...
         *
        */ /** @internal */ this._terrainMesher = new (0, $c30626c7bd5a958d$export$2e2bcd8739ae039)(this);
        /** @internal */ this._objectMesher = new (0, $3196c3678f180030$export$2e2bcd8739ae039)(this);
        /** @internal */ this._targetedBlockDat = {
            blockID: 0,
            position: (0, $5OpyM$glvec3).create(),
            normal: (0, $5OpyM$glvec3).create(),
            adjacent: (0, $5OpyM$glvec3).create()
        };
        /** @internal */ this._prevTargetHash = 0;
        /** @internal */ this.makeTargetHash = (pos, norm, id)=>{
            var N = (0, $afbe2889bb225d5c$export$8292e80ebf6a0)(pos[0] + id, pos[1], pos[2]);
            return N ^ (0, $afbe2889bb225d5c$export$8292e80ebf6a0)(norm[0], norm[1] + id, norm[2]);
        };
        /** @internal */ this._pickPos = (0, $5OpyM$glvec3).create();
        /** @internal */ this._pickResult = {
            _localPosition: (0, $5OpyM$glvec3).create(),
            position: [
                0,
                0,
                0
            ],
            normal: [
                0,
                0,
                0
            ]
        };
        // temp hacks for development
        if (opts.debug) {
            // expose often-used classes
            /** @internal */ this.vec3 = (0, $5OpyM$glvec3);
            /** @internal */ this.ndarray = (0, $5OpyM$ndarray);
            // gameplay tweaks
            ents.getMovement(1).airJumps = 999;
            // decorate window while making TS happy
            var win = /** @type {any} */ window;
            win.noa = this;
            win.vec3 = (0, $5OpyM$glvec3);
            win.ndarray = (0, $5OpyM$ndarray);
            win.scene = this.rendering._scene;
        }
        // add hooks to throw helpful errors when using deprecated methods
        $cf838c15c8b009ba$var$deprecateStuff(this);
    }
    /*
     *
     *
     *              Core Engine APIs
     *
     *
    */ /**
     * Tick function, called by container module at a fixed timestep. 
     * Clients should not normally need to call this manually.
     * @internal
    */ tick(dt) {
        dt *= this.timeScale || 1;
        // note dt is a fixed value, not an observed delay
        if (this._paused) {
            if (this.world.worldGenWhilePaused) this.world.tick();
            return;
        }
        $cf838c15c8b009ba$var$profile_hook("start");
        $cf838c15c8b009ba$var$checkWorldOffset(this);
        this.world.tick() // chunk creation/removal
        ;
        $cf838c15c8b009ba$var$profile_hook("world");
        if (!this.world.playerChunkLoaded) {
            // when waiting on worldgen, just tick the meshing queue and exit
            this.rendering.tick(dt);
            return;
        }
        this.physics.tick(dt) // iterates physics
        ;
        $cf838c15c8b009ba$var$profile_hook("physics");
        this._objectMesher.tick() // rebuild objects if needed
        ;
        this.rendering.tick(dt) // does deferred chunk meshing
        ;
        $cf838c15c8b009ba$var$profile_hook("rendering");
        $cf838c15c8b009ba$var$updateBlockTargets(this) // finds targeted blocks, and highlights one if needed
        ;
        $cf838c15c8b009ba$var$profile_hook("targets");
        this.entities.tick(dt) // runs all entity systems
        ;
        $cf838c15c8b009ba$var$profile_hook("entities");
        this.emit("tick", dt);
        $cf838c15c8b009ba$var$profile_hook("tick event");
        $cf838c15c8b009ba$var$profile_hook("end");
        // clear accumulated scroll inputs (mouseMove is cleared on render)
        var st = this.inputs.state;
        st.scrollx = st.scrolly = st.scrollz = 0;
    }
    /**
     * Render function, called every animation frame. Emits #beforeRender(dt), #afterRender(dt) 
     * where dt is the time in ms *since the last tick*.
     * Clients should not normally need to call this manually.
     * @internal
    */ render(dt, framePart) {
        dt *= this.timeScale || 1;
        // note: framePart is how far we are into the current tick
        // dt is the *actual* time (ms) since last render, for
        // animating things that aren't tied to game tick rate
        // frame position - for rendering movement between ticks
        this.positionInCurrentTick = framePart;
        // when paused, just optionally ping worldgen, then exit
        if (this._paused) {
            if (this.world.worldGenWhilePaused) this.world.render();
            return;
        }
        $cf838c15c8b009ba$var$profile_hook_render("start");
        // only move camera during pointerlock or mousedown, or if pointerlock is unsupported
        if (this.container.hasPointerLock || !this.container.supportsPointerLock || this._dragOutsideLock && this.inputs.state.fire) this.camera.applyInputsToCamera();
        $cf838c15c8b009ba$var$profile_hook_render("init");
        // brief run through meshing queue
        this.world.render();
        $cf838c15c8b009ba$var$profile_hook_render("meshing");
        // entity render systems
        this.camera.updateBeforeEntityRenderSystems();
        this.entities.render(dt);
        this.camera.updateAfterEntityRenderSystems();
        $cf838c15c8b009ba$var$profile_hook_render("entities");
        // events and render
        this.emit("beforeRender", dt);
        $cf838c15c8b009ba$var$profile_hook_render("before render");
        this.rendering.render();
        this.rendering.postRender();
        $cf838c15c8b009ba$var$profile_hook_render("render");
        this.emit("afterRender", dt);
        $cf838c15c8b009ba$var$profile_hook_render("after render");
        $cf838c15c8b009ba$var$profile_hook_render("end");
        // clear accumulated mouseMove inputs (scroll inputs cleared on render)
        this.inputs.state.dx = this.inputs.state.dy = 0;
    }
    /** Pausing the engine will also stop render/tick events, etc. */ setPaused(paused = false) {
        this._paused = !!paused;
        // when unpausing, clear any built-up mouse inputs
        if (!paused) this.inputs.state.dx = this.inputs.state.dy = 0;
    }
    /** 
     * Get the voxel ID at the specified position
    */ getBlock(x, y = 0, z = 0) {
        if (x.length) return this.world.getBlockID(x[0], x[1], x[2]);
        return this.world.getBlockID(x, y, z);
    }
    /** 
     * Sets the voxel ID at the specified position. 
     * Does not check whether any entities are in the way! 
     */ setBlock(id, x, y = 0, z = 0) {
        if (x.length) return this.world.setBlockID(x[0], x[1], x[2]);
        return this.world.setBlockID(id, x, y, z);
    }
    /**
     * Adds a block, unless there's an entity in the way.
    */ addBlock(id, x, y = 0, z = 0) {
        // add a new terrain block, if nothing blocks the terrain there
        if (x.length) {
            if (this.entities.isTerrainBlocked(x[0], x[1], x[2])) return;
            this.world.setBlockID(id, x[0], x[1], x[2]);
            return id;
        } else {
            if (this.entities.isTerrainBlocked(x, y, z)) return;
            this.world.setBlockID(id, x, y, z);
            return id;
        }
    }
    /*
     *              Rebasing local <-> global coords
    */ /** 
     * Precisely converts a world position to the current internal 
     * local frame of reference.
     * 
     * See `/docs/positions.md` for more info.
     * 
     * Params: 
     *  * `global`: input position in global coords
     *  * `globalPrecise`: (optional) sub-voxel offset to the global position
     *  * `local`: output array which will receive the result
     */ globalToLocal(global, globalPrecise, local) {
        var off = this.worldOriginOffset;
        if (globalPrecise) {
            for(var i = 0; i < 3; i++){
                var coord = global[i] - off[i];
                coord += globalPrecise[i];
                local[i] = coord;
            }
            return local;
        } else return (0, $5OpyM$glvec3).subtract(local, global, off);
    }
    /** 
     * Precisely converts a world position to the current internal 
     * local frame of reference.
     * 
     * See `/docs/positions.md` for more info.
     * 
     * Params: 
     *  * `local`: input array of local coords
     *  * `global`: output array which receives the result
     *  * `globalPrecise`: (optional) sub-voxel offset to the output global position
     * 
     * If both output arrays are passed in, `global` will get int values and 
     * `globalPrecise` will get fractional parts. If only one array is passed in,
     * `global` will get the whole output position.
    */ localToGlobal(local, global, globalPrecise = null) {
        var off = this.worldOriginOffset;
        if (globalPrecise) {
            for(var i = 0; i < 3; i++){
                var floored = Math.floor(local[i]);
                global[i] = floored + off[i];
                globalPrecise[i] = local[i] - floored;
            }
            return global;
        } else return (0, $5OpyM$glvec3).add(global, local, off);
    }
    /*
     *              Picking / raycasting
    */ /**
     * Raycast through the world, returning a result object for any non-air block
     * 
     * See `/docs/positions.md` for info on working with precise positions.
     * 
     * @param {number[]} pos where to pick from (default: player's eye pos)
     * @param {number[]} dir direction to pick along (default: camera vector)
     * @param {number} dist pick distance (default: `noa.blockTestDistance`)
     * @param {(id:number) => boolean} blockTestFunction which voxel IDs can be picked (default: any solid voxel)
    */ pick(pos = null, dir = null, dist = -1, blockTestFunction = null) {
        if (dist === 0) return null;
        // input position to local coords, if any
        var pickPos = this._pickPos;
        if (pos) {
            this.globalToLocal(pos, null, pickPos);
            pos = pickPos;
        }
        return this._localPick(pos, dir, dist, blockTestFunction);
    }
    /**
     * @internal
     * Do a raycast in local coords. 
     * See `/docs/positions.md` for more info.
     * @param {number[]} pos where to pick from (default: player's eye pos)
     * @param {number[]} dir direction to pick along (default: camera vector)
     * @param {number} dist pick distance (default: `noa.blockTestDistance`)
     * @param {(id:number) => boolean} blockTestFunction which voxel IDs can be picked (default: any solid voxel)
     * @returns { null | {
     *      position: number[],
     *      normal: number[],
     *      _localPosition: number[],
     * }}
     */ _localPick(pos = null, dir = null, dist = -1, blockTestFunction = null) {
        // do a raycast in local coords - result obj will be in global coords
        if (dist === 0) return null;
        var testFn = blockTestFunction || this.registry.getBlockSolidity;
        var world = this.world;
        var off = this.worldOriginOffset;
        var testVoxel = function(x, y, z) {
            var id = world.getBlockID(x + off[0], y + off[1], z + off[2]);
            return testFn(id);
        };
        if (!pos) pos = this.camera._localGetTargetPosition();
        dir = dir || this.camera.getDirection();
        dist = dist || -1;
        if (dist < 0) dist = this.blockTestDistance;
        var result = this._pickResult;
        var rpos = result._localPosition;
        var rnorm = result.normal;
        var hit = (0, $5OpyM$fastvoxelraycast)(testVoxel, pos, dir, dist, rpos, rnorm);
        if (!hit) return null;
        // position is right on a voxel border - adjust it so that flooring works reliably
        // adjust along normal direction, i.e. away from the block struck
        (0, $5OpyM$glvec3).scaleAndAdd(rpos, rpos, rnorm, 0.01);
        // add global result
        this.localToGlobal(rpos, result.position);
        return result;
    }
}
/*
 * 
 * 
 * 
 *                  INTERNAL HELPERS
 * 
 * 
 * 
 * 
*/ /*
 *
 *      rebase world origin offset around the player if necessary
 *
*/ function $cf838c15c8b009ba$var$checkWorldOffset(noa) {
    var lpos = noa.ents.getPositionData(noa.playerEntity)._localPosition;
    var cutoff = noa._originRebaseDistance;
    if ((0, $5OpyM$glvec3).sqrLen(lpos) < cutoff * cutoff) return;
    var delta = [];
    for(var i = 0; i < 3; i++){
        delta[i] = Math.floor(lpos[i]);
        noa.worldOriginOffset[i] += delta[i];
    }
    noa.rendering._rebaseOrigin(delta);
    noa.entities._rebaseOrigin(delta);
    noa._objectMesher._rebaseOrigin(delta);
}
// Each frame, by default pick along the player's view vector 
// and tell rendering to highlight the struck block face
function $cf838c15c8b009ba$var$updateBlockTargets(noa) {
    var newhash = 0;
    var blockIdFn = noa.blockTargetIdCheck || noa.registry.getBlockSolidity;
    var result = noa._localPick(null, null, null, blockIdFn);
    if (result) {
        var dat = noa._targetedBlockDat;
        // pick stops just shy of voxel boundary, so floored pos is the adjacent voxel
        (0, $5OpyM$glvec3).floor(dat.adjacent, result.position);
        (0, $5OpyM$glvec3).copy(dat.normal, result.normal);
        (0, $5OpyM$glvec3).subtract(dat.position, dat.adjacent, dat.normal);
        dat.blockID = noa.world.getBlockID(dat.position[0], dat.position[1], dat.position[2]);
        noa.targetedBlock = dat;
        newhash = noa.makeTargetHash(dat.position, dat.normal, dat.blockID, (0, $afbe2889bb225d5c$export$8292e80ebf6a0));
    } else noa.targetedBlock = null;
    if (newhash != noa._prevTargetHash) {
        noa.emit("targetBlockChanged", noa.targetedBlock);
        noa._prevTargetHash = newhash;
    }
}
/*
 * 
 *  add some hooks for guidance on removed APIs
 * 
 */ function $cf838c15c8b009ba$var$deprecateStuff(noa) {
    var ver = `0.27`;
    var dep = (loc, name, msg)=>{
        var throwFn = ()=>{
            throw `This property changed in ${ver} - ${msg}`;
        };
        Object.defineProperty(loc, name, {
            get: throwFn,
            set: throwFn
        });
    };
    dep(noa, "getPlayerEyePosition", "to get the camera/player offset see API docs for `noa.camera.cameraTarget`");
    dep(noa, "setPlayerEyePosition", "to set the camera/player offset see API docs for `noa.camera.cameraTarget`");
    dep(noa, "getPlayerPosition", "use `noa.ents.getPosition(noa.playerEntity)` or similar");
    dep(noa, "getCameraVector", "use `noa.camera.getDirection`");
    dep(noa, "getPlayerMesh", "use `noa.ents.getMeshData(noa.playerEntity).mesh` or similar");
    dep(noa, "playerBody", "use `noa.ents.getPhysicsBody(noa.playerEntity)`");
    dep(noa.rendering, "zoomDistance", "use `noa.camera.zoomDistance`");
    dep(noa.rendering, "_currentZoom", "use `noa.camera.currentZoom`");
    dep(noa.rendering, "_cameraZoomSpeed", "use `noa.camera.zoomSpeed`");
    dep(noa.rendering, "getCameraVector", "use `noa.camera.getDirection`");
    dep(noa.rendering, "getCameraPosition", "use `noa.camera.getLocalPosition`");
    dep(noa.rendering, "getCameraRotation", "use `noa.camera.heading` and `noa.camera.pitch`");
    dep(noa.rendering, "setCameraRotation", "to customize camera behavior see API docs for `noa.camera`");
    ver = "0.28";
    dep(noa.rendering, "makeMeshInstance", "removed, use Babylon's `mesh.createInstance`");
    dep(noa.world, "_maxChunksPendingCreation", 'use `maxChunksPendingCreation` (no "_")');
    dep(noa.world, "_maxChunksPendingMeshing", 'use `maxChunksPendingMeshing` (no "_")');
    dep(noa.world, "_maxProcessingPerTick", 'use `maxProcessingPerTick` (no "_")');
    dep(noa.world, "_maxProcessingPerRender", 'use `maxProcessingPerRender` (no "_")');
    ver = "0.29";
    dep(noa, "_constants", "removed, voxel IDs are no longer packed with bit flags");
    ver = "0.30";
    dep(noa, "_tickRate", "tickRate is now at `noa.tickRate`");
    dep(noa.container, "_tickRate", "tickRate is now at `noa.tickRate`");
    ver = "0.31";
    dep(noa.world, "chunkSize", "effectively an internal, so changed to `_chunkSize`");
    dep(noa.world, "chunkAddDistance", "set this with `noa.world.setAddRemoveDistance`");
    dep(noa.world, "chunkRemoveDistance", "set this with `noa.world.setAddRemoveDistance`");
}
var $cf838c15c8b009ba$var$profile_hook = $cf838c15c8b009ba$var$PROFILE > 0 ? (0, $afbe2889bb225d5c$export$cf559512bdad9080)($cf838c15c8b009ba$var$PROFILE, "tick   ") : ()=>{};
var $cf838c15c8b009ba$var$profile_hook_render = $cf838c15c8b009ba$var$PROFILE_RENDER > 0 ? (0, $afbe2889bb225d5c$export$cf559512bdad9080)($cf838c15c8b009ba$var$PROFILE_RENDER, "render ") : ()=>{};


export {$cf838c15c8b009ba$export$2c3b404bf3a77a1f as Engine};
//# sourceMappingURL=index.js.map
