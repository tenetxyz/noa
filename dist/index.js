import $5OpyM$glvec3 from "gl-vec3";
import $5OpyM$ndarray from "ndarray";
import $5OpyM$events, {EventEmitter as $5OpyM$EventEmitter} from "events";
import $5OpyM$fastvoxelraycast from "fast-voxel-raycast";
import {GameInputs as $5OpyM$GameInputs} from "game-inputs";
import {MicroGameShell as $5OpyM$MicroGameShell} from "micro-game-shell";
import $5OpyM$aabb3d from "aabb-3d";
import $5OpyM$voxelaabbsweep from "voxel-aabb-sweep";
import $5OpyM$entcomp from "ent-comp";
import $5OpyM$boxintersect from "box-intersect";
import {Color4 as $5OpyM$Color4, Color3 as $5OpyM$Color3} from "@babylonjs/core/Maths/math.color";
import {CreateDisc as $5OpyM$CreateDisc} from "@babylonjs/core/Meshes/Builders/discBuilder";
import "@babylonjs/core/Meshes/instancedMesh";
import {TransformNode as $5OpyM$TransformNode} from "@babylonjs/core/Meshes/transformNode";
import "@babylonjs/core/Meshes/thinInstanceMesh";
import {Mesh as $5OpyM$Mesh} from "@babylonjs/core/Meshes/mesh";
import {VertexData as $5OpyM$VertexData} from "@babylonjs/core/Meshes/mesh.vertexData";
import {Engine as $5OpyM$Engine} from "@babylonjs/core/Engines/engine";
import {Texture as $5OpyM$Texture} from "@babylonjs/core/Materials/Textures/texture";
import {MaterialPluginBase as $5OpyM$MaterialPluginBase} from "@babylonjs/core/Materials/materialPluginBase";
import {RawTexture2DArray as $5OpyM$RawTexture2DArray} from "@babylonjs/core/Materials/Textures/rawTexture2DArray";
import {Scene as $5OpyM$Scene, ScenePerformancePriority as $5OpyM$ScenePerformancePriority} from "@babylonjs/core/scene";
import {FreeCamera as $5OpyM$FreeCamera} from "@babylonjs/core/Cameras/freeCamera";
import {StandardMaterial as $5OpyM$StandardMaterial} from "@babylonjs/core/Materials/standardMaterial";
import {Vector3 as $5OpyM$Vector3} from "@babylonjs/core/Maths/math.vector";
import {CreateLines as $5OpyM$CreateLines} from "@babylonjs/core/Meshes/Builders/linesBuilder";
import {CreatePlane as $5OpyM$CreatePlane} from "@babylonjs/core/Meshes/Builders/planeBuilder";
import {DirectionalLight as $5OpyM$DirectionalLight} from "@babylonjs/core/Lights/directionalLight";
import {Octree as $5OpyM$Octree} from "@babylonjs/core/Culling/Octrees/octree";
import {OctreeBlock as $5OpyM$OctreeBlock} from "@babylonjs/core/Culling/Octrees/octreeBlock";
import {OctreeSceneComponent as $5OpyM$OctreeSceneComponent} from "@babylonjs/core/Culling/Octrees/octreeSceneComponent";
import {Physics as $5OpyM$Physics} from "voxel-physics-engine";

/*!
 * noa: an experimental voxel game engine.
 * @url      github.com/fenomas/noa
 * @author   Andy Hall <andy@fenomas.com>
 * @license  MIT
 */ /**
 * This works around some old node-style code in a
 * dependency of box-intersect.
*/ if (window && !window["global"]) window["global"] = window.globalThis || {};







var $b3f1cef4464199f8$var$defaultOptions = {
    preventDefaults: false,
    stopPropagation: false,
    allowContextMenu: false
};
var $b3f1cef4464199f8$var$defaultBindings = {
    "forward": [
        "KeyW",
        "ArrowUp"
    ],
    "backward": [
        "KeyS",
        "ArrowDown"
    ],
    "left": [
        "KeyA",
        "ArrowLeft"
    ],
    "right": [
        "KeyD",
        "ArrowRight"
    ],
    "fire": "Mouse1",
    "mid-fire": [
        "Mouse2",
        "KeyQ"
    ],
    "alt-fire": [
        "Mouse3",
        "KeyE"
    ],
    "jump": "Space"
};
class $b3f1cef4464199f8$export$42ce93d1a224e3f9 extends (0, $5OpyM$GameInputs) {
    /** @internal */ constructor(noa, opts, element){
        opts = Object.assign({}, $b3f1cef4464199f8$var$defaultOptions, opts);
        super(element, opts);
        var b = opts.bindings || $b3f1cef4464199f8$var$defaultBindings;
        for(var name in b){
            var keys = Array.isArray(b[name]) ? b[name] : [
                b[name]
            ];
            this.bind(name, ...keys);
        }
    }
}




class $f93fc8cf162d54df$export$42a852a2b6b56249 extends (0, $5OpyM$EventEmitter) {
    /** @internal */ constructor(noa, opts){
        super();
        opts = opts || {};
        /** 
         * @internal
         * @type {import('../index').Engine}
        */ this.noa = noa;
        /** The game's DOM element container */ var domEl = opts.domElement || null;
        if (typeof domEl === "string") domEl = document.querySelector(domEl);
        this.element = domEl || $f93fc8cf162d54df$var$createContainerDiv();
        /** The `canvas` element that the game will draw into */ this.canvas = $f93fc8cf162d54df$var$getOrCreateCanvas(this.element);
        $f93fc8cf162d54df$var$doCanvasBugfix(noa, this.canvas) // grumble...
        ;
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
        this._shell.maxTickTime = 50;
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
 * This works around a weird bug that seems to be chrome/mac only?
 * Without this, the page sometimes initializes with the canva
 * zoomed into its lower left quadrant. 
 * Resizing the canvas fixes the issue (also: resizing page, changing zoom...)
 */ function $f93fc8cf162d54df$var$doCanvasBugfix(noa, canvas) {
    var ct = 0;
    var fixCanvas = ()=>{
        var w = canvas.width;
        canvas.width = w + 1;
        canvas.width = w;
        if (ct++ > 10) noa.off("beforeRender", fixCanvas);
    };
    noa.on("beforeRender", fixCanvas);
}





// default options
function $77aab343c6d1732d$var$CameraDefaults() {
    this.inverseX = false;
    this.inverseY = false;
    this.sensitivityMult = 1;
    this.sensitivityMultOutsidePointerlock = 0;
    this.sensitivityX = 10;
    this.sensitivityY = 10;
    this.initialZoom = 0;
    this.zoomSpeed = 0.2;
}
// locals
var $77aab343c6d1732d$var$tempVectors = [
    (0, $5OpyM$glvec3).create(),
    (0, $5OpyM$glvec3).create(),
    (0, $5OpyM$glvec3).create()
];
var $77aab343c6d1732d$var$originVector = (0, $5OpyM$glvec3).create();
class $77aab343c6d1732d$export$79f141de891a5fed {
    /** 
     * @internal 
     * @param {import('../index').Engine} noa
     * @param {Partial.<CameraDefaults>} opts
    */ constructor(noa, opts){
        opts = Object.assign({}, new $77aab343c6d1732d$var$CameraDefaults, opts);
        this.noa = noa;
        /** Horizontal mouse sensitivity. Same scale as Overwatch (typical values around `5..10`) */ this.sensitivityX = +opts.sensitivityX;
        /** Vertical mouse sensitivity. Same scale as Overwatch (typical values around `5..10`) */ this.sensitivityY = +opts.sensitivityY;
        /** Mouse look inverse (horizontal) */ this.inverseX = !!opts.inverseX;
        /** Mouse look inverse (vertical) */ this.inverseY = !!opts.inverseY;
        /** 
         * Multiplier for temporarily altering mouse sensitivity.
         * Set this to `0` to temporarily disable camera controls.
        */ this.sensitivityMult = opts.sensitivityMult;
        /** 
         * Multiplier for altering mouse sensitivity when pointerlock
         * is not active - default of `0` means no camera movement.
         * Note this setting is ignored if pointerLock isn't supported.
         */ this.sensitivityMultOutsidePointerlock = opts.sensitivityMultOutsidePointerlock;
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
         * This value will get overwritten each tick, but you may want to write to it
         * when overriding the camera zoom speed.
        */ this.currentZoom = opts.initialZoom;
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
        if (this.currentZoom === 0) return loc;
        return (0, $5OpyM$glvec3).scaleAndAdd(loc, loc, this._dirVector, -this.currentZoom);
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
     * Applies current mouse x/y inputs to the camera angle and zoom
     * @internal
    */ applyInputsToCamera() {
        // conditional changes to mouse sensitivity
        var senseMult = this.sensitivityMult;
        if (this.noa.container.supportsPointerLock) {
            if (!this.noa.container.hasPointerLock) senseMult *= this.sensitivityMultOutsidePointerlock;
        }
        if (senseMult === 0) return;
        // dx/dy from input state
        var pointerState = this.noa.inputs.pointerState;
        $77aab343c6d1732d$var$bugFix(pointerState) // TODO: REMOVE EVENTUALLY    
        ;
        // convert to rads, using (sens * 0.0066 deg/pixel), like Overwatch
        var conv = 0.0066 * Math.PI / 180;
        var dx = pointerState.dx * this.sensitivityX * senseMult * conv;
        var dy = pointerState.dy * this.sensitivityY * senseMult * conv;
        if (this.inverseX) dx = -dx;
        if (this.inverseY) dy = -dy;
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
        this.currentZoom += (this.zoomDistance - this.currentZoom) * this.zoomSpeed;
    }
    /** @internal */ updateAfterEntityRenderSystems() {
        // clamp camera zoom not to clip into solid terrain
        var maxZoom = $77aab343c6d1732d$var$cameraObstructionDistance(this);
        if (this.currentZoom > maxZoom) this.currentZoom = maxZoom;
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
function $77aab343c6d1732d$var$bugFix(pointerState) {
    var dx = pointerState.dx;
    var dy = pointerState.dy;
    var badx = Math.abs(dx) > 400 && Math.abs(dx / $77aab343c6d1732d$var$lastx) > 4;
    var bady = Math.abs(dy) > 400 && Math.abs(dy / $77aab343c6d1732d$var$lasty) > 4;
    if (badx || bady) {
        pointerState.dx = $77aab343c6d1732d$var$lastx;
        pointerState.dy = $77aab343c6d1732d$var$lasty;
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
        /** @type {import('voxel-physics-engine').RigidBody} */ this.body = null;
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
            cutoff: 1.5
        },
        onAdd: null,
        onRemove: null,
        system: function fadeOnZoomProc(dt, states) {
            var zoom = noa.camera.currentZoom;
            for(var i = 0; i < states.length; i++)$55ffb9b56919d7bd$var$checkZoom(states[i], zoom, noa);
        }
    };
}
function $55ffb9b56919d7bd$var$checkZoom(state, zoom, noa) {
    if (!noa.ents.hasMesh(state.__id)) return;
    var mesh = noa.ents.getMeshData(state.__id).mesh;
    if (!mesh.metadata) return;
    var shouldHide = zoom < state.cutoff;
    noa.rendering.setMeshVisibility(mesh, !shouldHide);
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






function $4a079630e8a37c92$export$2e2bcd8739ae039(noa, distance = 10) {
    var shadowDist = distance;
    // create a mesh to re-use for shadows
    var scene = noa.rendering.getScene();
    var disc = (0, $5OpyM$CreateDisc)("shadow", {
        radius: 0.75,
        tessellation: 30
    }, scene);
    disc.rotation.x = Math.PI / 2;
    var mat = noa.rendering.makeStandardMaterial("shadow_component_mat");
    mat.diffuseColor.set(0, 0, 0);
    mat.ambientColor.set(0, 0, 0);
    mat.alpha = 0.5;
    disc.material = mat;
    mat.freeze();
    // source mesh needn't be in the scene graph
    noa.rendering.setMeshVisibility(disc, false);
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
            state._mesh = null;
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
         * @type {{ [key:string]: string }} 
        */ this.names = {};
        // call `createComponent` on all component definitions, and
        // store their names in ents.names
        var compDefs = {
            collideEntities: (0, $00e2335fc52c70d1$export$2e2bcd8739ae039),
            collideTerrain: (0, $655007847d747603$export$2e2bcd8739ae039),
            fadeOnZoom: (0, $55ffb9b56919d7bd$export$2e2bcd8739ae039),
            followsEntity: (0, $9f83d538ca7f2875$export$2e2bcd8739ae039),
            mesh: (0, $4019083e3b52abff$export$2e2bcd8739ae039),
            movement: (0, $8110b09ddec96c3c$export$2e2bcd8739ae039),
            physics: (0, $a7202459cec49fce$export$2e2bcd8739ae039),
            position: (0, $7ac5306bc4471494$export$2e2bcd8739ae039),
            receivesInputs: (0, $15c8033c049c206f$export$2e2bcd8739ae039),
            shadow: (0, $4a079630e8a37c92$export$2e2bcd8739ae039),
            smoothCamera: (0, $e04d6487449b87d2$export$2e2bcd8739ae039)
        };
        Object.keys(compDefs).forEach((bareName)=>{
            var arg = componentArgs[bareName] || undefined;
            var compFn = compDefs[bareName];
            var compDef = compFn(noa, arg);
            this.names[bareName] = this.createComponent(compDef);
        });
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
         * @type {(id:number) => null | import("voxel-physics-engine").RigidBody} 
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



// helper to swap item to end and pop(), instead of splice()ing
function $afbe2889bb225d5c$export$adb0e12dab3d5fcb(list, item) {
    var i = list.indexOf(item);
    if (i < 0) return;
    if (i === list.length - 1) list.pop();
    else list[i] = list.pop();
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
    if (typeof src === "number") $afbe2889bb225d5c$var$doNdarrayFill(src, tgt, tgtPos[0], tgtPos[1], tgtPos[2], size[0], size[1], size[2]);
    else $afbe2889bb225d5c$var$doNdarrayCopy(src, tgt, pos[0], pos[1], pos[2], size[0], size[1], size[2], tgtPos[0], tgtPos[1], tgtPos[2]);
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
function $afbe2889bb225d5c$var$doNdarrayFill(value, tgt, i0, j0, k0, si, sj, sk) {
    var dx = tgt.stride[2];
    for(var i = 0; i < si; i++)for(var j = 0; j < sj; j++){
        var ix = tgt.index(i0 + i, j0 + j, k0);
        for(var k = 0; k < sk; k++){
            tgt.data[ix] = value;
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
class $afbe2889bb225d5c$export$e1de8ac9d4f5f7d5 {
    constructor(){
        this.hash = {};
    }
    /** @returns {import('./chunk').Chunk} */ getChunkByIndexes(i = 0, j = 0, k = 0) {
        return this.hash[$afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k)] || null;
    }
    /** @param {import('./chunk').Chunk} chunk */ storeChunkByIndexes(i = 0, j = 0, k = 0, chunk) {
        this.hash[$afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k)] = chunk;
    }
    removeChunkByIndexes(i = 0, j = 0, k = 0) {
        delete this.hash[$afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k)];
    }
}
class $afbe2889bb225d5c$export$3de2ef94d6d0cf1a {
    constructor(){
        this.arr = [];
        this.hash = {};
    }
    forEach(cb, thisArg) {
        this.arr.forEach(cb, thisArg);
    }
    includes(i, j, k) {
        var id = $afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k);
        return !!this.hash[id];
    }
    add(i, j, k, toFront = false) {
        var id = $afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k);
        if (this.hash[id]) return;
        if (toFront) this.arr.unshift([
            i,
            j,
            k,
            id
        ]);
        else this.arr.push([
            i,
            j,
            k,
            id
        ]);
        this.hash[id] = true;
    }
    removeByIndex(ix) {
        var el = this.arr[ix];
        delete this.hash[el[3]];
        this.arr.splice(ix, 1);
    }
    remove(i, j, k) {
        var id = $afbe2889bb225d5c$export$8292e80ebf6a0(i, j, k);
        if (!this.hash[id]) return;
        delete this.hash[id];
        for(var ix = 0; ix < this.arr.length; ix++)if (id === this.arr[ix][3]) {
            this.arr.splice(ix, 1);
            return;
        }
        throw "internal bug with location queue - hash value overlapped";
    }
    count() {
        return this.arr.length;
    }
    isEmpty() {
        return this.arr.length === 0;
    }
    empty() {
        this.arr = [];
        this.hash = {};
    }
    pop() {
        var el = this.arr.pop();
        delete this.hash[el[3]];
        return el;
    }
    copyFrom(queue) {
        this.arr = queue.arr.slice();
        this.hash = {};
        for(var key in queue.hash)this.hash[key] = true;
    }
    sortByDistance(locToDist, reverse = false) {
        $afbe2889bb225d5c$var$sortLocationArrByDistance(this.arr, locToDist, reverse);
    }
}
// internal helper for preceding class
function $afbe2889bb225d5c$var$sortLocationArrByDistance(arr, distFn, reverse) {
    var hash = {};
    for (var loc of arr)hash[loc[3]] = distFn(loc[0], loc[1], loc[2]);
    if (reverse) arr.sort((a, b)=>hash[a[3]] - hash[b[3]]) // ascending
    ;
    else arr.sort((a, b)=>hash[b[3]] - hash[a[3]]) // descending
    ;
    hash = null;
}
function $afbe2889bb225d5c$export$cf559512bdad9080(every, title = "", filter) {
    if (!(every > 0)) return ()=>{};
    var times = {};
    var started = 0, last = 0, iter = 0, total = 0;
    var start = ()=>{
        started = last = performance.now();
        iter++;
    };
    var add = (name)=>{
        var t = performance.now();
        times[name] = (times[name] || 0) + (t - last);
        last = t;
    };
    var report = ()=>{
        total += performance.now() - started;
        if (iter < every) return;
        var out = `${title}: ${(total / every).toFixed(2)}ms  --  `;
        out += Object.keys(times).map((name)=>{
            if (filter && times[name] / total < 0.05) return "";
            return `${name}: ${(times[name] / iter).toFixed(2)}ms`;
        }).join("  ");
        console.log(out + `    (avg over ${every} runs)`);
        times = {};
        iter = total = 0;
    };
    return (state)=>{
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



var $3196c3678f180030$var$PROFILE = 0;
function $3196c3678f180030$export$d14212b73d3479b6(noa) {
    // transform node for all instance meshes to be parented to
    this.rootNode = new (0, $5OpyM$TransformNode)("objectMeshRoot", noa.rendering.scene);
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
    // list of known base meshes
    this.allBaseMeshes = [];
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
        this.allBaseMeshes.push(mesh);
        if (!mesh.metadata) mesh.metadata = {};
        mesh.metadata[objectMeshFlag] = true;
        return managers[id] = new $3196c3678f180030$var$InstanceManager(noa, mesh);
    };
    var objectMeshFlag = "noa_object_base_mesh";
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
        var key = `${x}:${y}:${z}`;
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
*/ /** @param {import('../index').Engine} noa*/ function $3196c3678f180030$var$InstanceManager(noa, mesh) {
    this.noa = noa;
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
    this.noa.rendering.addMeshToScene(this.mesh, false);
    this.noa.emit("addingTerrainMesh", this.mesh);
    this.mesh.isPickable = false;
    this.mesh.doNotSyncBoundingInfo = true;
    this.mesh.alwaysSelectAsActiveMesh = true;
}
$3196c3678f180030$var$InstanceManager.prototype.dispose = function() {
    if (this.disposed) return;
    this.mesh.thinInstanceCount = 0;
    this.setCapacity(0);
    this.noa.emit("removingTerrainMesh", this.mesh);
    this.noa.rendering.setMeshVisibility(this.mesh, false);
    this.mesh = null;
    this.keyToIndex = null;
    this.locToKey = null;
    this.disposed = true;
};
$3196c3678f180030$var$InstanceManager.prototype.addInstance = function(chunk, key, i, j, k, transform, rebaseVec) {
    $3196c3678f180030$var$maybeExpandBuffer(this);
    var ix = this.count << 4;
    this.locToKey[this.count] = key;
    this.keyToIndex[key] = ix;
    if (transform) {
        transform.position.x += chunk.x - rebaseVec[0] + i;
        transform.position.y += chunk.y - rebaseVec[1] + j;
        transform.position.z += chunk.z - rebaseVec[2] + k;
        transform.computeWorldMatrix(true);
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
    $3196c3678f180030$var$maybeContractBuffer(this);
};
$3196c3678f180030$var$InstanceManager.prototype.updateMatrix = function() {
    if (!this.dirty) return;
    this.mesh.thinInstanceCount = this.count;
    this.mesh.thinInstanceBufferUpdated("matrix");
    this.mesh.isVisible = this.count > 0;
    this.dirty = false;
};
$3196c3678f180030$var$InstanceManager.prototype.setCapacity = function(size = 4) {
    this.capacity = size;
    if (size === 0) this.buffer = null;
    else {
        var newBuff = new Float32Array(this.capacity * 16);
        if (this.buffer) {
            var len = Math.min(this.buffer.length, newBuff.length);
            for(var i = 0; i < len; i++)newBuff[i] = this.buffer[i];
        }
        this.buffer = newBuff;
    }
    this.mesh.thinInstanceSetBuffer("matrix", this.buffer);
    this.updateMatrix();
};
function $3196c3678f180030$var$maybeExpandBuffer(mgr) {
    if (mgr.count < mgr.capacity) return;
    var size = Math.max(8, mgr.capacity * 2);
    mgr.setCapacity(size);
}
function $3196c3678f180030$var$maybeContractBuffer(mgr) {
    if (mgr.count > mgr.capacity * 0.4) return;
    if (mgr.capacity < 100) return;
    mgr.setCapacity(Math.round(mgr.capacity / 2));
    mgr.locToKey.length = Math.min(mgr.locToKey.length, mgr.capacity);
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









class $cdf25bcd7e099a7c$export$5a9c0cc5620eb9da {
    /** @param {import('../index').Engine} noa  */ constructor(noa){
        // make a baseline default material for untextured terrain with no alpha
        this._defaultMat = noa.rendering.makeStandardMaterial("base-terrain");
        this._defaultMat.freeze();
        this.allMaterials = [
            this._defaultMat
        ];
        // internals
        this.noa = noa;
        this._idCounter = 1000;
        this._blockMatIDtoTerrainID = {};
        this._terrainIDtoMatObject = {};
        this._texURLtoTerrainID = {};
        this._renderMatToTerrainID = new Map();
    }
    /** 
     * Maps a given `matID` (from noa.registry) to a unique ID of which 
     * terrain material can be used for that block material.
     * This lets the terrain mesher map which blocks can be merged into
     * the same meshes.
     * Internally, this accessor also creates the material for each 
     * terrainMatID as they are first encountered.
     */ getTerrainMatId(blockMatID) {
        // fast case where matID has been seen before
        if (blockMatID in this._blockMatIDtoTerrainID) return this._blockMatIDtoTerrainID[blockMatID];
        // decide a unique terrainID for this block material
        var terrID = $cdf25bcd7e099a7c$var$decideTerrainMatID(this, blockMatID);
        // create a mat object for it, if needed
        if (!(terrID in this._terrainIDtoMatObject)) {
            var mat = $cdf25bcd7e099a7c$var$createTerrainMat(this, blockMatID);
            this.allMaterials.push(mat);
            this._terrainIDtoMatObject[terrID] = mat;
        }
        // cache results and done
        this._blockMatIDtoTerrainID[blockMatID] = terrID;
        return terrID;
    }
    /**
     * Get a Babylon Material object, given a terrainMatID (gotten from this module)
     */ getMaterial(terrainMatID = 1) {
        return this._terrainIDtoMatObject[terrainMatID];
    }
}
/**
 * 
 * 
 *      Implementations of creating/disambiguating terrain Materials
 * 
 * 
*/ /** 
 * Decide a unique terrainID, based on block material ID properties
 * @param {TerrainMatManager} self 
*/ function $cdf25bcd7e099a7c$var$decideTerrainMatID(self, blockMatID = 0) {
    var matInfo = self.noa.registry.getMaterialData(blockMatID);
    // custom render materials get one unique terrainID per material
    if (matInfo.renderMat) {
        var mat = matInfo.renderMat;
        if (!self._renderMatToTerrainID.has(mat)) self._renderMatToTerrainID.set(mat, self._idCounter++);
        return self._renderMatToTerrainID.get(mat);
    }
    // ditto for textures, unique URL
    if (matInfo.texture) {
        var url = matInfo.texture;
        if (!(url in self._texURLtoTerrainID)) self._texURLtoTerrainID[url] = self._idCounter++;
        return self._texURLtoTerrainID[url];
    }
    // plain color materials with an alpha value are unique by alpha
    var alpha = matInfo.alpha;
    if (alpha > 0 && alpha < 1) return 10 + Math.round(alpha * 100);
    // the only remaining case is the baseline, which always reuses one fixed ID
    return 1;
}
/** 
 * Create (choose) a material for a given set of block material properties
 * @param {TerrainMatManager} self 
*/ function $cdf25bcd7e099a7c$var$createTerrainMat(self, blockMatID = 0) {
    var matInfo = self.noa.registry.getMaterialData(blockMatID);
    // custom render mats are just reused
    if (matInfo.renderMat) return matInfo.renderMat;
    // if no texture: use a basic flat material, possibly with alpha
    if (!matInfo.texture) {
        var needsAlpha = matInfo.alpha > 0 && matInfo.alpha < 1;
        if (!needsAlpha) return self._defaultMat;
        var matName = "terrain-alpha-" + blockMatID;
        var plainMat = self.noa.rendering.makeStandardMaterial(matName);
        plainMat.alpha = matInfo.alpha;
        plainMat.freeze();
        return plainMat;
    }
    // remaining case is a new material with a diffuse texture
    var scene = self.noa.rendering.getScene();
    var mat = self.noa.rendering.makeStandardMaterial("terrain-textured-" + blockMatID);
    var texURL = matInfo.texture;
    var sampling = (0, $5OpyM$Texture).NEAREST_SAMPLINGMODE;
    var tex = new (0, $5OpyM$Texture)(texURL, scene, true, false, sampling);
    if (matInfo.texHasAlpha) tex.hasAlpha = true;
    mat.diffuseTexture = tex;
    // it texture is an atlas, apply material plugin
    // and check whether any material for the atlas needs alpha
    if (matInfo.atlasIndex >= 0) {
        new $cdf25bcd7e099a7c$var$TerrainMaterialPlugin(mat, tex);
        if (self.noa.registry._textureNeedsAlpha(matInfo.texture)) tex.hasAlpha = true;
    }
    mat.freeze();
    return mat;
}
/**
 * 
 *      Babylon material plugin - twiddles the defines/shaders/etc so that
 *      a standard material can use textures from a 2D texture atlas.
 * 
*/ class $cdf25bcd7e099a7c$var$TerrainMaterialPlugin extends (0, $5OpyM$MaterialPluginBase) {
    constructor(material, texture){
        var priority = 200;
        var defines = {
            "NOA_TWOD_ARRAY_TEXTURE": false
        };
        super(material, "TestPlugin", priority, defines);
        this._enable(true);
        this._atlasTextureArray = null;
        texture.onLoadObservable.add((tex)=>{
            this.setTextureArrayData(tex);
        });
    }
    setTextureArrayData(texture) {
        var { width: width, height: height } = texture.getSize();
        var numLayers = Math.round(height / width);
        height = width;
        var data = texture._readPixelsSync();
        var format = (0, $5OpyM$Engine).TEXTUREFORMAT_RGBA;
        var genMipMaps = true;
        var invertY = false;
        var mode = (0, $5OpyM$Texture).NEAREST_SAMPLINGMODE;
        var scene = texture.getScene();
        this._atlasTextureArray = new (0, $5OpyM$RawTexture2DArray)(data, width, height, numLayers, format, scene, genMipMaps, invertY, mode);
    }
    prepareDefines(defines, scene, mesh) {
        defines["NOA_TWOD_ARRAY_TEXTURE"] = true;
    }
    getClassName() {
        return "TerrainMaterialPluginName";
    }
    getSamplers(samplers) {
        samplers.push("atlasTexture");
    }
    getAttributes(attributes) {
        attributes.push("texAtlasIndices");
    }
    getUniforms() {
        return {
            ubo: []
        };
    }
    bindForSubMesh(uniformBuffer, scene, engine, subMesh) {
        if (this._atlasTextureArray) uniformBuffer.setTexture("atlasTexture", this._atlasTextureArray);
    }
    getCustomCode(shaderType) {
        if (shaderType === "vertex") return {
            "CUSTOM_VERTEX_MAIN_BEGIN": `
                texAtlasIndex = texAtlasIndices;
            `,
            "CUSTOM_VERTEX_DEFINITIONS": `
                uniform highp sampler2DArray atlasTexture;
                attribute float texAtlasIndices;
                varying float texAtlasIndex;
            `
        };
        if (shaderType === "fragment") return {
            "!baseColor\\=texture2D\\(diffuseSampler,vDiffuseUV\\+uvOffset\\);": `baseColor = texture(atlasTexture, vec3(vDiffuseUV, texAtlasIndex));`,
            "CUSTOM_FRAGMENT_DEFINITIONS": `
                uniform highp sampler2DArray atlasTexture;
                varying float texAtlasIndex;
            `
        };
        return null;
    }
}



// enable for profiling..
var $c30626c7bd5a958d$var$PROFILE_EVERY = 0;
function $c30626c7bd5a958d$export$798fe4b573aec8d3(noa) {
    // wrangles which block materials can be merged into the same mesh
    var terrainMatManager = new (0, $cdf25bcd7e099a7c$export$5a9c0cc5620eb9da)(noa);
    this.allTerrainMaterials = terrainMatManager.allMaterials;
    // internally expose the default flat material used for untextured terrain
    this._defaultMaterial = terrainMatManager._defaultMat;
    // two-pass implementations for this module
    var greedyMesher = new $c30626c7bd5a958d$var$GreedyMesher(noa, terrainMatManager);
    var meshBuilder = new $c30626c7bd5a958d$var$MeshBuilder(noa, terrainMatManager);
    /*
     * 
     *      API
     * 
    */ // set or clean up any per-chunk properties needed for terrain meshing
    this.initChunk = function(chunk) {
        chunk._terrainMeshes.length = 0;
    };
    this.disposeChunk = function(chunk) {
        chunk._terrainMeshes.forEach((mesh)=>{
            noa.emit("removingTerrainMesh", mesh);
            mesh.dispose();
        });
        chunk._terrainMeshes.length = 0;
    };
    /**
     * meshing entry point and high-level flow
     * @param {import('./chunk').Chunk} chunk 
     */ this.meshChunk = function(chunk, ignoreMaterials = false) {
        $c30626c7bd5a958d$var$profile_hook("start");
        // remove any previous terrain meshes
        this.disposeChunk(chunk);
        $c30626c7bd5a958d$var$profile_hook("cleanup");
        // greedy mesher generates struct of face data
        var faceDataSet = greedyMesher.mesh(chunk, ignoreMaterials);
        $c30626c7bd5a958d$var$profile_hook("geom");
        // builder generates mesh data (positions, normals, etc)
        var meshes = meshBuilder.buildMesh(chunk, faceDataSet, ignoreMaterials);
        $c30626c7bd5a958d$var$profile_hook("build");
        $c30626c7bd5a958d$var$profile_hook("end");
        // add meshes to scene and finish
        meshes.forEach((mesh)=>{
            mesh.cullingStrategy = (0, $5OpyM$Mesh).CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;
            noa.rendering.addMeshToScene(mesh, true, chunk.pos, this);
            noa.emit("addingTerrainMesh", mesh);
            mesh.freezeNormals();
            mesh.freezeWorldMatrix();
            chunk._terrainMeshes.push(mesh);
            if (!mesh.metadata) mesh.metadata = {};
            mesh.metadata[terrainMeshFlag] = true;
        });
    };
    var terrainMeshFlag = "noa_chunk_terrain_mesh";
}
/*
 * 
 * 
 * 
 * 
 *      Intermediate struct to hold data for a bunch of merged block faces
 * 
 *      The greedy mesher produces these (one per terrainID), 
 *      and the mesh builder turns each one into a Mesh instance.
 *
 * 
 * 
 * 
 * 
*/ function $c30626c7bd5a958d$var$MeshedFaceData() {
    this.terrainID = 0;
    this.numFaces = 0;
    // following arrays are all one element per quad
    this.matIDs = [];
    this.dirs = [];
    this.is = [];
    this.js = [];
    this.ks = [];
    this.wids = [];
    this.hts = [];
    this.packedAO = [];
}
/**
 * 
 * 
 * 
 *      Greedy meshing algorithm
 *      
 *      Originally based on algo by Mikola Lysenko:
 *          http://0fps.net/2012/07/07/meshing-minecraft-part-2/
 *      but probably no code remaining from there anymore.
 *      Ad-hoc AO handling by me, made of cobwebs and dreams
 * 
 *    
 *      Takes in a Chunk instance, and returns an object containing 
 *      GeometryData structs, keyed by terrain material ID, 
 *      which the terrain builder can then make into meshes.
 * 
 * 
 * @param {import('../index').Engine} noa
 * @param {import('./terrainMaterials').TerrainMatManager} terrainMatManager
*/ function $c30626c7bd5a958d$var$GreedyMesher(noa, terrainMatManager) {
    // class-wide cached structs and getters
    var maskCache = new Int16Array(16);
    var aoMaskCache = new Int16Array(16);
    // terrain ID accessor can be overridded for hacky reasons
    var realGetTerrainID = terrainMatManager.getTerrainMatId.bind(terrainMatManager);
    var fakeGetTerrainID = (matID)=>1;
    var terrainIDgetter = realGetTerrainID;
    /** 
     * Entry point
     * 
     * @param {import('./chunk').Chunk} chunk
     * @returns {Object.<string, MeshedFaceData>} keyed by terrain material ID 
     */ this.mesh = function(chunk, ignoreMaterials) {
        var cs = chunk.size;
        terrainIDgetter = ignoreMaterials ? fakeGetTerrainID : realGetTerrainID;
        // no internal faces for empty or entirely solid chunks
        var edgesOnly = chunk._isEmpty || chunk._isFull;
        /** @type {Object.<string, MeshedFaceData>} */ var faceDataSet = {};
        $c30626c7bd5a958d$var$faceDataPool.reset();
        // Sweep over each axis, mapping axes to [d,u,v]
        for(var d = 0; d < 3; ++d){
            var u = d === 2 ? 0 : 2;
            var v = d === 1 ? 0 : 1;
            // transposed ndarrays of nearby chunk voxels (self and neighbors)
            var nabVoxelsArr = chunk._neighbors.data.map((c)=>{
                if (c && c.voxels) return c.voxels.transpose(d, u, v);
                return null;
            });
            // ndarray of the previous, similarly transposed
            var nabVoxelsT = (0, $5OpyM$ndarray)(nabVoxelsArr, [
                3,
                3,
                3
            ]).lo(1, 1, 1).transpose(d, u, v);
            // embiggen the cached mask arrays if needed
            if (maskCache.length < cs * cs) {
                maskCache = new Int16Array(cs * cs);
                aoMaskCache = new Int16Array(cs * cs);
            }
            // sets up transposed accessor for querying solidity of (i,j,k):
            prepareSolidityLookup(nabVoxelsT, cs);
            // ACTUAL MASK AND GEOMETRY CREATION
            // mesh plane between this chunk and previous neighbor on i axis?
            var prev = nabVoxelsT.get(-1, 0, 0);
            var here = nabVoxelsT.get(0, 0, 0);
            if (prev) {
                // offset version of neighbor to make queries work at i=-1
                var prevOff = prev.lo(cs, 0, 0);
                var nFaces = constructMeshMask(d, prevOff, -1, here, 0);
                if (nFaces > 0) constructGeometryFromMasks(0, d, u, v, cs, cs, nFaces, faceDataSet);
            }
            // if only doing edges, we're done with this axis
            if (edgesOnly) continue;
            // mesh the rest of the planes internal to this chunk
            // note only looping up to (size-1), skipping final coord so as 
            // not to duplicate faces at chunk borders
            for(var i = 0; i < cs - 1; i++){
                // maybe skip y axis, if both layers are all the same voxel
                if (d === 1) {
                    var v1 = chunk._wholeLayerVoxel[i];
                    if (v1 >= 0 && v1 === chunk._wholeLayerVoxel[i + 1]) continue;
                }
                // pass in layer array for skip checks, only if not already checked
                var layerVoxRef = d === 1 ? null : chunk._wholeLayerVoxel;
                var nf = constructMeshMask(d, here, i, here, i + 1, layerVoxRef);
                if (nf > 0) constructGeometryFromMasks(i + 1, d, u, v, cs, cs, nf, faceDataSet);
            }
        // we skip the i-positive neighbor so as not to duplicate edge faces
        }
        // done!
        return faceDataSet;
    };
    /**
     * Rigging for a transposed (i,j,k) => boolean solidity lookup, 
     * that knows how to query into neigboring chunks at edges.
     * This sets up the indirection used by `voxelIsSolid` below.
    */ function prepareSolidityLookup(nabVoxelsT, size) {
        if (solidityLookupInittedSize !== size) {
            solidityLookupInittedSize = size;
            voxelIDtoSolidity = noa.registry._solidityLookup;
            for(var x = -1; x < size + 1; x++){
                var loc = x < 0 ? 0 : x < size ? 1 : 2;
                coordToLoc[x + 1] = [
                    0,
                    1,
                    2
                ][loc];
                edgeCoordLookup[x + 1] = [
                    size - 1,
                    x,
                    0
                ][loc];
                missingCoordLookup[x + 1] = [
                    0,
                    x,
                    size - 1
                ][loc];
            }
        }
        var centerChunk = nabVoxelsT.get(0, 0, 0);
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++)for(var k = 0; k < 3; k++){
                var ix = i * 9 + j * 3 + k;
                var nab = nabVoxelsT.get(i - 1, j - 1, k - 1);
                var type = 0;
                if (!nab) type = 1;
                if (nab === centerChunk) type = 2;
                voxTypeLookup[ix] = type;
                voxLookup[ix] = nab || centerChunk;
            }
        }
    }
    var solidityLookupInittedSize = -1;
    var voxelIDtoSolidity = [
        false,
        true
    ];
    var voxLookup = Array(27).fill(null);
    var voxTypeLookup = Array(27).fill(0);
    var coordToLoc = [
        0,
        1,
        1,
        1,
        1,
        1,
        2
    ];
    var edgeCoordLookup = [
        3,
        0,
        1,
        2,
        3,
        0
    ];
    var missingCoordLookup = [
        0,
        0,
        1,
        2,
        3,
        3
    ];
    function voxelIsSolid(i, j, k) {
        var li = coordToLoc[i + 1];
        var lj = coordToLoc[j + 1];
        var lk = coordToLoc[k + 1];
        var ix = li * 9 + lj * 3 + lk;
        var voxArray = voxLookup[ix];
        var type = voxTypeLookup[ix];
        if (type === 2) return voxelIDtoSolidity[voxArray.get(i, j, k)];
        var lookup = [
            edgeCoordLookup,
            missingCoordLookup
        ][type];
        var ci = lookup[i + 1];
        var cj = lookup[j + 1];
        var ck = lookup[k + 1];
        return voxelIDtoSolidity[voxArray.get(ci, cj, ck)];
    }
    /**
     * 
     *      Build a 2D array of mask values representing whether a 
     *      mesh face is needed at each position
     * 
     *      Each mask value is a terrain material ID, negative if
     *      the face needs to point in the -i direction (towards voxel arr A)
     * 
     * @returns {number} number of mesh faces found
     */ function constructMeshMask(d, arrA, iA, arrB, iB, wholeLayerVoxel = null) {
        var len = arrA.shape[1];
        var mask = maskCache;
        var aoMask = aoMaskCache;
        var doAO = noa.rendering.useAO;
        var skipRevAo = noa.rendering.revAoVal === noa.rendering.aoVals[0];
        var opacityLookup = noa.registry._opacityLookup;
        var getMaterial = noa.registry.getBlockFaceMaterial;
        var materialDir = d * 2;
        // mask is iterated by a simple integer, both here and later when
        // merging meshes, so the j/k order must be the same in both places
        var n = 0;
        // set up for quick ndarray traversals
        var indexA = arrA.index(iA, 0, 0);
        var jstrideA = arrA.stride[1];
        var kstrideA = arrA.stride[2];
        var indexB = arrB.index(iB, 0, 0);
        var jstrideB = arrB.stride[1];
        var kstrideB = arrB.stride[2];
        var facesFound = 0;
        for(var k = 0; k < len; ++k){
            var dA = indexA;
            var dB = indexB;
            indexA += kstrideA;
            indexB += kstrideB;
            // skip this second axis, if whole layer is same voxel?
            if (wholeLayerVoxel && wholeLayerVoxel[k] >= 0) {
                n += len;
                continue;
            }
            for(var j = 0; j < len; j++, n++, dA += jstrideA, dB += jstrideB){
                // mask[n] represents the face needed between the two voxel layers
                // for now, assume we never have two faces in both directions
                // note that mesher zeroes out the mask as it goes, so there's 
                // no need to zero it here when no face is needed
                // IDs at i-1,j,k  and  i,j,k
                var id0 = arrA.data[dA];
                var id1 = arrB.data[dB];
                // most common case: never a face between same voxel IDs, 
                // so skip out early
                if (id0 === id1) continue;
                // no face if both blocks are opaque
                var op0 = opacityLookup[id0];
                var op1 = opacityLookup[id1];
                if (op0 && op1) continue;
                // also no face if both block faces have the same block material
                var m0 = getMaterial(id0, materialDir);
                var m1 = getMaterial(id1, materialDir + 1);
                if (m0 === m1) continue;
                // choose which block face to draw:
                //   * if either block is opaque draw that one
                //   * if either material is missing draw the other one
                if (op0 || m1 === 0) {
                    mask[n] = m0;
                    if (doAO) aoMask[n] = $c30626c7bd5a958d$var$packAOMask(voxelIsSolid, iB, iA, j, k, skipRevAo);
                    facesFound++;
                } else if (op1 || m0 === 0) {
                    mask[n] = -m1;
                    if (doAO) aoMask[n] = $c30626c7bd5a958d$var$packAOMask(voxelIsSolid, iA, iB, j, k, skipRevAo);
                    facesFound++;
                }
            }
        }
        return facesFound;
    }
    // 
    //      Greedy meshing inner loop two
    //
    // construct geometry data from the masks
    function constructGeometryFromMasks(i, d, u, v, len1, len2, numFaces, faceDataSet) {
        var doAO = noa.rendering.useAO;
        var mask = maskCache;
        var aomask = aoMaskCache;
        var n = 0;
        var materialDir = d * 2;
        var x = [
            0,
            0,
            0
        ];
        x[d] = i;
        var maskCompareFcn = doAO ? maskCompare : maskCompare_noAO;
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
                //  materialID and terrain ID type for the face
                var matID = Math.abs(maskVal);
                var terrainID = terrainIDgetter(matID);
                // if terrainID not seen before, start a new MeshedFaceData
                // from the extremely naive object pool
                if (!(terrainID in faceDataSet)) {
                    var fdFromPool = $c30626c7bd5a958d$var$faceDataPool.get();
                    fdFromPool.numFaces = 0;
                    fdFromPool.terrainID = terrainID;
                    faceDataSet[terrainID] = fdFromPool;
                }
                // pack one face worth of data into the return struct
                var faceData = faceDataSet[terrainID];
                var nf = faceData.numFaces;
                faceData.numFaces++;
                faceData.matIDs[nf] = matID;
                x[u] = j;
                x[v] = k;
                faceData.is[nf] = x[0];
                faceData.js[nf] = x[1];
                faceData.ks[nf] = x[2];
                faceData.wids[nf] = w;
                faceData.hts[nf] = h;
                faceData.packedAO[nf] = ao;
                faceData.dirs[nf] = maskVal > 0 ? materialDir : materialDir + 1;
                // Face now finished, zero out the used part of the mask
                for(var hx = 0; hx < h; ++hx)for(var wx = 0; wx < w; ++wx)mask[n + wx + hx * len1] = 0;
                // exit condition where no more faces are left to mesh
                numFaces -= w * h;
                if (numFaces === 0) return;
            }
        }
    }
    function maskCompare(index, mask, maskVal, aomask, aoVal) {
        if (maskVal !== mask[index]) return false;
        if (aoVal !== aomask[index]) return false;
        return true;
    }
    function maskCompare_noAO(index, mask, maskVal, aomask, aoVal) {
        if (maskVal !== mask[index]) return false;
        return true;
    }
}
/**
 * Extremely naive object pool for MeshedFaceData objects
*/ var $c30626c7bd5a958d$var$faceDataPool = (()=>{
    var arr = [], ix = 0;
    var get = ()=>{
        if (ix >= arr.length) arr.push(new $c30626c7bd5a958d$var$MeshedFaceData);
        ix++;
        return arr[ix - 1];
    };
    var reset = ()=>{
        ix = 0;
    };
    return {
        get: get,
        reset: reset
    };
})();
/**
 * 
 * 
 * 
 * 
 *       Mesh Builder - consumes all the raw data in geomData to build
 *          Babylon.js mesh/submeshes, ready to be added to the scene
 * 
 * 
 * 
 * 
 * 
 */ /** @param {import('../index').Engine} noa  */ function $c30626c7bd5a958d$var$MeshBuilder(noa, terrainMatManager) {
    /** 
     * Consume the intermediate FaceData struct and produce
     * actual mesehes the 3D engine can render
     * @param {Object.<string, MeshedFaceData>} faceDataSet  
    */ this.buildMesh = function(chunk, faceDataSet, ignoreMaterials) {
        var scene = noa.rendering.getScene();
        var doAO = noa.rendering.useAO;
        var aoVals = noa.rendering.aoVals;
        var revAoVal = noa.rendering.revAoVal;
        var atlasIndexLookup = noa.registry._matAtlasIndexLookup;
        var matColorLookup = noa.registry._materialColorLookup;
        var white = [
            1,
            1,
            1
        ];
        // geometry data is already keyed by terrain type, so build
        // one mesh per geomData object in the hash
        var meshes = [];
        for(var key in faceDataSet){
            var faceData = faceDataSet[key];
            var terrainID = faceData.terrainID;
            // will this mesh need texture atlas indexes?
            var usesAtlas = false;
            if (!ignoreMaterials) {
                var firstIx = atlasIndexLookup[faceData.matIDs[0]];
                usesAtlas = firstIx >= 0;
            }
            // build the necessary arrays
            var nf = faceData.numFaces;
            var indices = new Uint16Array(nf * 6);
            var positions = new Float32Array(nf * 12);
            var normals = new Float32Array(nf * 12);
            var colors = new Float32Array(nf * 16);
            var uvs = new Float32Array(nf * 8);
            var atlasIndexes;
            if (usesAtlas) atlasIndexes = new Float32Array(nf * 4);
            // scan all faces in the struct, creating data for each
            for(var f = 0; f < faceData.numFaces; f++){
                // basic data from struct
                var matID = faceData.matIDs[f];
                var materialDir = faceData.dirs[f] // 0..5: x,-x, y,-y, z,-z
                ;
                var i = faceData.is[f];
                var j = faceData.js[f];
                var k = faceData.ks[f];
                var w = faceData.wids[f];
                var h = faceData.hts[f];
                var axis = materialDir / 2 | 0;
                var dir = materialDir % 2 ? -1 : 1;
                addPositionValues(positions, f, i, j, k, axis, w, h);
                addUVs(uvs, f, axis, w, h, dir);
                var norms = [
                    0,
                    0,
                    0
                ];
                norms[axis] = dir;
                addNormalValues(normals, f, norms);
                var ao = faceData.packedAO[f];
                var [A, B, C, D] = $c30626c7bd5a958d$var$unpackAOMask(ao);
                var triDir = decideTriDir(A, B, C, D);
                addIndexValues(indices, f, axis, dir, triDir);
                if (usesAtlas) {
                    var atlasIndex = atlasIndexLookup[matID];
                    addAtlasIndices(atlasIndexes, f, atlasIndex);
                }
                var matColor = matColorLookup[matID] || white;
                if (doAO) pushMeshColors(colors, f, matColor, aoVals, revAoVal, A, B, C, D);
                else pushMeshColors_noAO(colors, f, matColor);
            }
            // the mesh and vertexData object
            var name = `chunk_${chunk.requestID}_${terrainID}`;
            var mesh = new (0, $5OpyM$Mesh)(name, scene);
            var vdat = new (0, $5OpyM$VertexData)();
            // finish the mesh
            vdat.positions = positions;
            vdat.indices = indices;
            vdat.normals = normals;
            vdat.colors = colors;
            vdat.uvs = uvs;
            vdat.applyToMesh(mesh);
            // meshes using a texture atlas need atlasIndices
            if (usesAtlas) mesh.setVerticesData("texAtlasIndices", atlasIndexes, false, 1);
            // disable some unnecessary bounding checks
            mesh.isPickable = false;
            mesh.doNotSyncBoundingInfo = true;
            mesh._refreshBoundingInfo = ()=>mesh;
            // materials wrangled by external module
            if (!ignoreMaterials) mesh.material = terrainMatManager.getMaterial(terrainID);
            // done
            meshes.push(mesh);
        }
        return meshes;
    };
    // HELPERS ---- these could probably be simplified and less magical
    function addPositionValues(posArr, faceNum, i, j, k, axis, w, h) {
        var offset = faceNum * 12;
        var loc = [
            i,
            j,
            k
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
        du[axis === 2 ? 0 : 2] = w;
        dv[axis === 1 ? 0 : 1] = h;
        for(var ix = 0; ix < 3; ix++){
            posArr[offset + ix] = loc[ix];
            posArr[offset + 3 + ix] = loc[ix] + du[ix];
            posArr[offset + 6 + ix] = loc[ix] + du[ix] + dv[ix];
            posArr[offset + 9 + ix] = loc[ix] + dv[ix];
        }
    }
    function addUVs(uvArr, faceNum, d, w, h, dir) {
        var offset = faceNum * 8;
        var epsilon = 0;
        for(var i = 0; i < 8; i++)uvArr[offset + i] = epsilon;
        if (d === 0) {
            uvArr[offset + 1] = uvArr[offset + 3] = h - epsilon;
            uvArr[offset + 2] = uvArr[offset + 4] = dir * w;
        } else if (d === 1) {
            uvArr[offset + 1] = uvArr[offset + 7] = w - epsilon;
            uvArr[offset + 4] = uvArr[offset + 6] = dir * h;
        } else {
            uvArr[offset + 1] = uvArr[offset + 3] = h - epsilon;
            uvArr[offset + 2] = uvArr[offset + 4] = -dir * w;
        }
    }
    function addNormalValues(normArr, faceNum, norms) {
        var offset = faceNum * 12;
        for(var i = 0; i < 12; i++)normArr[offset + i] = norms[i % 3];
    }
    function addIndexValues(indArr, faceNum, axis, dir, triDir) {
        var offset = faceNum * 6;
        var baseIndex = faceNum * 4;
        if (axis === 0) dir = -dir;
        var ix = dir < 0 ? 0 : 1;
        if (!triDir) ix += 2;
        var indexVals = indexLists[ix];
        for(var i = 0; i < 6; i++)indArr[offset + i] = baseIndex + indexVals[i];
    }
    var indexLists = [
        [
            0,
            1,
            2,
            0,
            2,
            3
        ],
        [
            0,
            2,
            1,
            0,
            3,
            2
        ],
        [
            1,
            2,
            3,
            1,
            3,
            0
        ],
        [
            1,
            3,
            2,
            1,
            0,
            3
        ]
    ];
    function addAtlasIndices(indArr, faceNum, atlasIndex) {
        var offset = faceNum * 4;
        for(var i = 0; i < 4; i++)indArr[offset + i] = atlasIndex;
    }
    function decideTriDir(A, B, C, D) {
        // this bit is pretty magical..
        // (true means split along the a00-a11 axis)
        if (A === C) return D === B ? D === 2 : true;
        else return D === B ? false : A + C > D + B;
    }
    function pushMeshColors_noAO(colors, faceNum, col) {
        var offset = faceNum * 16;
        for(var i = 0; i < 16; i += 4){
            colors[offset + i] = col[0];
            colors[offset + i + 1] = col[1];
            colors[offset + i + 2] = col[2];
            colors[offset + i + 3] = 1;
        }
    }
    function pushMeshColors(colors, faceNum, col, aoVals, revAo, A, B, C, D) {
        var offset = faceNum * 16;
        pushAOColor(colors, offset, col, A, aoVals, revAo);
        pushAOColor(colors, offset + 4, col, D, aoVals, revAo);
        pushAOColor(colors, offset + 8, col, C, aoVals, revAo);
        pushAOColor(colors, offset + 12, col, B, aoVals, revAo);
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
/*
 *
 *
 *
 *
 *          SHARED HELPERS - used by both main classes
 *
 *
 *
 *
 *
*/ /**
 *
 *
 *
 *  packAOMask:
 *
 *    For a given face, find occlusion levels for each vertex, then
 *    pack 4 such (2-bit) values into one Uint8 value
 * 
 *  Occlusion levels:
 *    1 is flat ground, 2 is partial occlusion, 3 is max (corners)
 *    0 is "reverse occlusion" - an unoccluded exposed edge 
 *  Packing order var(bit offset):
 * 
 *      B(2)  -  C(6)   ^  K
 *       -        -     +> J
 *      A(0)  -  D(4)
 * 
*/ function $c30626c7bd5a958d$var$packAOMask(isSolid, ipos, ineg, j, k, skipReverse = false) {
    var A = 1;
    var B = 1;
    var D = 1;
    var C = 1;
    // inc occlusion of vertex next to obstructed side
    if (isSolid(ipos, j + 1, k)) {
        ++D;
        ++C;
    }
    if (isSolid(ipos, j - 1, k)) {
        ++A;
        ++B;
    }
    if (isSolid(ipos, j, k + 1)) {
        ++B;
        ++C;
    }
    if (isSolid(ipos, j, k - 1)) {
        ++A;
        ++D;
    }
    // facing into a solid (non-opaque) block?
    var facingSolid = isSolid(ipos, j, k);
    if (facingSolid) {
        // always 2, or 3 in corners
        C = C === 3 || isSolid(ipos, j + 1, k + 1) ? 3 : 2;
        B = B === 3 || isSolid(ipos, j - 1, k + 1) ? 3 : 2;
        D = D === 3 || isSolid(ipos, j + 1, k - 1) ? 3 : 2;
        A = A === 3 || isSolid(ipos, j - 1, k - 1) ? 3 : 2;
        return C << 6 | D << 4 | B << 2 | A;
    }
    // simpler logic if skipping reverse AO?
    if (skipReverse) {
        // treat corner as occlusion 3 only if not occluded already
        if (C === 1 && isSolid(ipos, j + 1, k + 1)) C = 2;
        if (B === 1 && isSolid(ipos, j - 1, k + 1)) B = 2;
        if (D === 1 && isSolid(ipos, j + 1, k - 1)) D = 2;
        if (A === 1 && isSolid(ipos, j - 1, k - 1)) A = 2;
        return C << 6 | D << 4 | B << 2 | A;
    }
    // check each corner, and if not present do reverse AO
    if (C === 1) {
        if (isSolid(ipos, j + 1, k + 1)) C = 2;
        else if (!isSolid(ineg, j, k + 1) || !isSolid(ineg, j + 1, k) || !isSolid(ineg, j + 1, k + 1)) C = 0;
    }
    if (D === 1) {
        if (isSolid(ipos, j + 1, k - 1)) D = 2;
        else if (!isSolid(ineg, j, k - 1) || !isSolid(ineg, j + 1, k) || !isSolid(ineg, j + 1, k - 1)) D = 0;
    }
    if (B === 1) {
        if (isSolid(ipos, j - 1, k + 1)) B = 2;
        else if (!isSolid(ineg, j, k + 1) || !isSolid(ineg, j - 1, k) || !isSolid(ineg, j - 1, k + 1)) B = 0;
    }
    if (A === 1) {
        if (isSolid(ipos, j - 1, k - 1)) A = 2;
        else if (!isSolid(ineg, j, k - 1) || !isSolid(ineg, j - 1, k) || !isSolid(ineg, j - 1, k - 1)) A = 0;
    }
    return C << 6 | D << 4 | B << 2 | A;
}
/**
 * 
 *      Takes in a packed AO value representing a face,
 *      and returns four 2-bit numbers for the AO levels
 *      at the four corners.
 *      
*/ function $c30626c7bd5a958d$var$unpackAOMask(aomask) {
    var A = aomask & 3;
    var B = aomask >> 2 & 3;
    var D = aomask >> 4 & 3;
    var C = aomask >> 6 & 3;
    return [
        A,
        B,
        C,
        D
    ];
}
var $c30626c7bd5a958d$var$profile_hook = $c30626c7bd5a958d$var$PROFILE_EVERY ? (0, $afbe2889bb225d5c$export$cf559512bdad9080)($c30626c7bd5a958d$var$PROFILE_EVERY, "Meshing") : ()=>{};


var $abcbe6b5adba8195$var$defaults = {
    texturePath: ""
};
// voxel ID now uses the whole Uint16Array element
var $abcbe6b5adba8195$var$MAX_BLOCK_ID = 65535;
class $abcbe6b5adba8195$export$4d9facee29974f3 {
    /** 
     * @internal 
     * @param {import('../index').Engine} noa
    */ constructor(noa, opts){
        opts = Object.assign({}, $abcbe6b5adba8195$var$defaults, opts);
        /** @internal */ this.noa = noa;
        /** @internal */ this._texturePath = opts.texturePath;
        /** Maps block face material names to matIDs
         * @type {Object.<string, number>} */ var matIDs = {};
        // lookup arrays for block props and flags - all keyed by blockID
        // fill in first value for the air block with id=0
        var blockSolidity = [
            false
        ];
        var blockOpacity = [
            false
        ];
        var blockIsFluid = [
            false
        ];
        var blockIsObject = [
            false
        ];
        var blockProps = [
            null
        ] // less-often accessed properties
        ;
        var blockMeshes = [
            null
        ] // custom mesh objects
        ;
        var blockHandlers = [
            null
        ] // block event handlers
        ;
        var blockIsPlain = [
            false
        ] // true if voxel is "boring" - solid/opaque, no special props
        ;
        // this one is keyed by `blockID*6 + faceNumber`
        var blockMats = [
            0,
            0,
            0,
            0,
            0,
            0
        ];
        // and these are keyed by material id
        var matColorLookup = [
            null
        ];
        var matAtlasIndexLookup = [
            -1
        ];
        /** 
         * Lookup array of block face material properties - keyed by matID (not blockID)
         * @typedef MatDef
         * @prop {number[]} color
         * @prop {number} alpha
         * @prop {string} texture
         * @prop {boolean} texHasAlpha
         * @prop {number} atlasIndex
         * @prop {*} renderMat
         */ /** @type {MatDef[]} */ var matDefs = [];
        /* 
         * 
         *      Block registration methods
         * 
        */ /**
         * Register (by integer ID) a block type and its parameters.
         *  `id` param: integer, currently 1..65535. Generally you should 
         * specify sequential values for blocks, without gaps, but this 
         * isn't technically necessary.
         * 
         * @param {number} id - sequential integer ID (from 1)
         * @param {Partial<BlockOptions>} [options] 
         * @returns the `id` value specified
         */ this.registerBlock = function(id = 1, options = null) {
            var defaults = new $abcbe6b5adba8195$var$BlockOptions(options && options.fluid);
            var opts = Object.assign({}, defaults, options || {});
            // console.log('register block: ', id, opts)
            if (id < 1 || id > $abcbe6b5adba8195$var$MAX_BLOCK_ID) throw "Block id out of range: " + id;
            // if block ID is greater than current highest ID, 
            // register fake blocks to avoid holes in lookup arrays
            while(id > blockSolidity.length)this.registerBlock(blockSolidity.length, {});
            // flags default to solid, opaque, nonfluid
            blockSolidity[id] = !!opts.solid;
            blockOpacity[id] = !!opts.opaque;
            blockIsFluid[id] = !!opts.fluid;
            // store any custom mesh
            blockIsObject[id] = !!opts.blockMesh;
            blockMeshes[id] = opts.blockMesh || null;
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
            for(var i = 0; i < 6; ++i)blockMats[id * 6 + i] = $abcbe6b5adba8195$var$getMaterialId(this, matIDs, mats[i], true);
            // props data object - currently only used for fluid properties
            blockProps[id] = {};
            // if block is fluid, initialize properties if needed
            if (blockIsFluid[id]) {
                blockProps[id].fluidDensity = opts.fluidDensity;
                blockProps[id].viscosity = opts.viscosity;
            }
            // event callbacks
            var hasHandler = opts.onLoad || opts.onUnload || opts.onSet || opts.onUnset || opts.onCustomMeshCreate;
            blockHandlers[id] = hasHandler ? new $abcbe6b5adba8195$var$BlockCallbackHolder(opts) : null;
            // special lookup for "plain"-ness
            // plain means solid, opaque, not fluid, no mesh or events
            var isPlain = blockSolidity[id] && blockOpacity[id] && !hasHandler && !blockIsFluid[id] && !blockIsObject[id];
            blockIsPlain[id] = isPlain;
            return id;
        };
        /**
         * Register (by name) a material and its parameters.
         * 
         * @param {string} name of this material
         * @param {Partial<MaterialOptions>} [options]
         */ this.registerMaterial = function(name = "?", options = null) {
            // catch calls to earlier signature
            if (Array.isArray(options)) throw 'This API changed signatures in v0.33, please use: `noa.registry.registerMaterial("name", optionsObj)`';
            var opts = Object.assign(new $abcbe6b5adba8195$var$MaterialOptions(), options || {});
            var matID = matIDs[name] || matDefs.length;
            matIDs[name] = matID;
            var texURL = opts.textureURL ? this._texturePath + opts.textureURL : "";
            var alpha = 1.0;
            var color = opts.color || [
                1.0,
                1.0,
                1.0
            ];
            if (color.length === 4) alpha = color.pop();
            if (texURL) color = null;
            // populate lookup arrays for terrain meshing
            matColorLookup[matID] = color;
            matAtlasIndexLookup[matID] = opts.atlasIndex;
            matDefs[matID] = {
                color: color,
                alpha: alpha,
                texture: texURL,
                texHasAlpha: !!opts.texHasAlpha,
                atlasIndex: opts.atlasIndex,
                renderMat: opts.renderMaterial
            };
            return matID;
        };
        /*
         *      quick accessors for querying block ID stuff
         */ /** 
         * block solidity (as in physics) 
         * @param id
         */ this.getBlockSolidity = function(id) {
            return blockSolidity[id];
        };
        /**
         * block opacity - whether it obscures the whole voxel (dirt) or 
         * can be partially seen through (like a fencepost, etc)
         * @param id
         */ this.getBlockOpacity = function(id) {
            return blockOpacity[id];
        };
        /** 
         * block is fluid or not
         * @param id
         */ this.getBlockFluidity = function(id) {
            return blockIsFluid[id];
        };
        /** 
         * Get block property object passed in at registration
         * @param id
         */ this.getBlockProps = function(id) {
            return blockProps[id];
        };
        // look up a block ID's face material
        // dir is a value 0..5: [ +x, -x, +y, -y, +z, -z ]
        this.getBlockFaceMaterial = function(blockId, dir) {
            return blockMats[blockId * 6 + dir];
        };
        /**
         * General lookup for all properties of a block material
         * @param {number} matID 
         * @returns {MatDef}
         */ this.getMaterialData = function(matID) {
            return matDefs[matID];
        };
        /**
         * Given a texture URL, does any material using that 
         * texture need alpha?
         * @internal
         * @returns {boolean}
         */ this._textureNeedsAlpha = function(tex = "") {
            return matDefs.some((def)=>{
                if (def.texture !== tex) return false;
                return def.texHasAlpha;
            });
        };
        /*
         * 
         *   Meant for internal use within the engine
         * 
         */ // internal access to lookup arrays
        /** @internal */ this._solidityLookup = blockSolidity;
        /** @internal */ this._opacityLookup = blockOpacity;
        /** @internal */ this._fluidityLookup = blockIsFluid;
        /** @internal */ this._objectLookup = blockIsObject;
        /** @internal */ this._blockMeshLookup = blockMeshes;
        /** @internal */ this._blockHandlerLookup = blockHandlers;
        /** @internal */ this._blockIsPlainLookup = blockIsPlain;
        /** @internal */ this._materialColorLookup = matColorLookup;
        /** @internal */ this._matAtlasIndexLookup = matAtlasIndexLookup;
        /*
         * 
         *      default initialization
         * 
         */ // add a default material and set ID=1 to it
        // this is safe since registering new block data overwrites the old
        this.registerMaterial("dirt", {
            color: [
                0.4,
                0.3,
                0
            ]
        });
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
 * Default options when registering a block type
 */ function $abcbe6b5adba8195$var$BlockOptions(isFluid = false) {
    /** Solidity for physics purposes */ this.solid = isFluid ? false : true;
    /** Whether the block fully obscures neighboring blocks */ this.opaque = isFluid ? false : true;
    /** whether a nonsolid block is a fluid (buoyant, viscous..) */ this.fluid = false;
    /** The block material(s) for this voxel's faces. May be:
     *   * one (String) material name
     *   * array of 2 names: [top/bottom, sides]
     *   * array of 3 names: [top, bottom, sides]
     *   * array of 6 names: [-x, +x, -y, +y, -z, +z]
     * @type {string|string[]}
    */ this.material = null;
    /** Specifies a custom mesh for this voxel, instead of terrain  */ this.blockMesh = null;
    /** Fluid parameter for fluid blocks */ this.fluidDensity = 1.0;
    /** Fluid parameter for fluid blocks */ this.viscosity = 0.5;
    /** @type {(x:number, y:number, z:number) => void} */ this.onLoad = null;
    /** @type {(x:number, y:number, z:number) => void} */ this.onUnload = null;
    /** @type {(x:number, y:number, z:number) => void} */ this.onSet = null;
    /** @type {(x:number, y:number, z:number) => void} */ this.onUnset = null;
    /** @type {(mesh:TransformNode, x:number, y:number, z:number) => void} */ this.onCustomMeshCreate = null;
}
/** @typedef {import('@babylonjs/core/Meshes').TransformNode} TransformNode */ /**
 * Default options when registering a Block Material
 */ function $abcbe6b5adba8195$var$MaterialOptions() {
    /** An array of 0..1 floats, either [R,G,B] or [R,G,B,A]
     * @type {number[]}
     */ this.color = null;
    /** Filename of texture image, if any
     * @type {string}
     */ this.textureURL = null;
    /** Whether the texture image has alpha */ this.texHasAlpha = false;
    /** Index into a (vertical strip) texture atlas, if applicable */ this.atlasIndex = -1;
    /**
     * An optional Babylon.js `Material`. If specified, terrain for this voxel
     * will be rendered with the supplied material (this can impact performance).
     */ this.renderMaterial = null;
}









class $16ff39f90deeca95$export$a577f9275f174d6b {
    /** @internal */ constructor(rendering, blockSize){
        var scene = rendering.scene;
        scene._addComponent(new (0, $5OpyM$OctreeSceneComponent)(scene));
        // mesh metadata flags
        var octreeBlock = "noa_octree_block";
        var inDynamicList = "noa_in_dynamic_list";
        var inOctreeBlock = "noa_in_octree_block";
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
        this.addMesh = (mesh, isStatic, pos, chunk)=>{
            if (!mesh.metadata) mesh.metadata = {};
            // dynamic content is just rendered from a list on the octree
            if (!isStatic) {
                if (mesh.metadata[inDynamicList]) return;
                octree.dynamicContent.push(mesh);
                mesh.metadata[inDynamicList] = true;
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
            mesh.metadata[octreeBlock] = block;
            mesh.metadata[inOctreeBlock] = true;
            // rely on octrees for selection, skipping bounds checks
            mesh.alwaysSelectAsActiveMesh = true;
        };
        this.removeMesh = (mesh)=>{
            if (!mesh.metadata) return;
            if (mesh.metadata[inDynamicList]) {
                (0, $afbe2889bb225d5c$export$adb0e12dab3d5fcb)(octree.dynamicContent, mesh);
                mesh.metadata[inDynamicList] = false;
            }
            if (mesh.metadata[inOctreeBlock]) {
                var block = mesh.metadata[octreeBlock];
                if (block && block.entries) {
                    (0, $afbe2889bb225d5c$export$adb0e12dab3d5fcb)(block.entries, mesh);
                    if (block.entries.length === 0) {
                        delete octBlocksHash[block._noaMapKey];
                        (0, $afbe2889bb225d5c$export$adb0e12dab3d5fcb)(octree.blocks, block);
                    }
                }
                mesh.metadata[octreeBlock] = null;
                mesh.metadata[inOctreeBlock] = false;
            }
        };
        // experimental helper
        this.setMeshVisibility = (mesh, visible = false)=>{
            if (mesh.metadata[octreeBlock]) {
                // mesh is static
                if (mesh.metadata[inOctreeBlock] === visible) return;
                var block = mesh.metadata[octreeBlock];
                if (block && block.entries) {
                    if (visible) block.entries.push(mesh);
                    else (0, $afbe2889bb225d5c$export$adb0e12dab3d5fcb)(block.entries, mesh);
                }
                mesh.metadata[inOctreeBlock] = visible;
            } else {
                // mesh is dynamic
                if (mesh.metadata[inDynamicList] === visible) return;
                if (visible) octree.dynamicContent.push(mesh);
                else (0, $afbe2889bb225d5c$export$adb0e12dab3d5fcb)(octree.dynamicContent, mesh);
                mesh.metadata[inDynamicList] = visible;
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
        0.5,
        0.5,
        0.5
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
    lightVector: [
        1,
        -1,
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
    /** 
     * @internal 
     * @param {import('../index').Engine} noa  
    */ constructor(noa, opts, canvas){
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
        /** the Babylon.js Engine object for the scene */ this.engine = null;
        /** the Babylon.js Scene object for the world */ this.scene = null;
        /** a Babylon.js DirectionalLight that is added to the scene */ this.light = null;
        /** the Babylon.js FreeCamera that renders the scene */ this.camera = null;
        // sets up babylon scene, lights, etc
        this._initScene(canvas, opts);
        // for debugging
        if (opts.showFPS) $11e41780fd8a0927$var$setUpFPS();
    }
    /**
     * Constructor helper - set up the Babylon.js scene and basic components
     * @internal
     */ _initScene(canvas, opts) {
        // init internal properties
        this.engine = new (0, $5OpyM$Engine)(canvas, opts.antiAlias, {
            preserveDrawingBuffer: opts.preserveDrawingBuffer
        });
        var scene = new (0, $5OpyM$Scene)(this.engine);
        this.scene = scene;
        // remove built-in listeners
        scene.detachControl();
        // this disables a few babylon features that noa doesn't use
        scene.performancePriority = (0, $5OpyM$ScenePerformancePriority).Intermediate;
        scene.autoClear = true;
        // octree manager class
        var blockSize = Math.round(opts.octreeBlockSize);
        /** @internal */ this._octreeManager = new (0, $16ff39f90deeca95$export$a577f9275f174d6b)(this, blockSize);
        // camera, and a node to hold it and accumulate rotations
        /** @internal */ this._cameraHolder = new (0, $5OpyM$TransformNode)("camHolder", scene);
        this.camera = new (0, $5OpyM$FreeCamera)("camera", new (0, $5OpyM$Vector3)(0, 0, 0), scene);
        this.camera.parent = this._cameraHolder;
        this.camera.minZ = .01;
        // plane obscuring the camera - for overlaying an effect on the whole view
        /** @internal */ this._camScreen = (0, $5OpyM$CreatePlane)("camScreen", {
            size: 10
        }, scene);
        this.addMeshToScene(this._camScreen);
        this._camScreen.position.z = .1;
        this._camScreen.parent = this.camera;
        /** @internal */ this._camScreenMat = this.makeStandardMaterial("camera_screen_mat");
        this._camScreen.material = this._camScreenMat;
        this._camScreen.setEnabled(false);
        this._camScreenMat.freeze();
        /** @internal */ this._camLocBlock = 0;
        // apply some defaults
        scene.clearColor = (0, $5OpyM$Color4).FromArray(opts.clearColor);
        scene.ambientColor = (0, $5OpyM$Color3).FromArray(opts.ambientColor);
        var lightVec = (0, $5OpyM$Vector3).FromArray(opts.lightVector);
        this.light = new (0, $5OpyM$DirectionalLight)("light", lightVec, scene);
        this.light.diffuse = (0, $5OpyM$Color3).FromArray(opts.lightDiffuse);
        this.light.specular = (0, $5OpyM$Color3).FromArray(opts.lightSpecular);
        // scene options
        scene.skipPointerMovePicking = true;
    }
}
/*
 *   PUBLIC API 
 */ /** The Babylon `scene` object representing the game world. */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.getScene = function() {
    return this.scene;
};
// per-tick listener for rendering-related stuff
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.tick = function(dt) {
// nothing here at the moment
};
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.render = function() {
    $11e41780fd8a0927$var$profile_hook("start");
    $11e41780fd8a0927$var$updateCameraForRender(this);
    $11e41780fd8a0927$var$profile_hook("updateCamera");
    this.engine.beginFrame();
    $11e41780fd8a0927$var$profile_hook("beginFrame");
    this.scene.render();
    $11e41780fd8a0927$var$profile_hook("render");
    $11e41780fd8a0927$var$fps_hook();
    this.engine.endFrame();
    $11e41780fd8a0927$var$profile_hook("endFrame");
    $11e41780fd8a0927$var$profile_hook("end");
};
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.postRender = function() {
// nothing currently
};
/** @internal */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.resize = function() {
    this.engine.resize();
    if (this.noa._paused && this.renderOnResize) this.scene.render();
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
 * Adds a mesh to the engine's selection/octree logic so that it renders.
 * 
 * @param mesh the mesh to add to the scene
 * @param isStatic pass in true if mesh never moves (i.e. never changes chunks)
 * @param pos (optional) global position where the mesh should be
 * @param containingChunk (optional) chunk to which the mesh is statically bound
 */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.addMeshToScene = function(mesh, isStatic = false, pos = null, containingChunk = null) {
    if (!mesh.metadata) mesh.metadata = {};
    // if mesh is already added, just make sure it's visisble
    if (mesh.metadata[$11e41780fd8a0927$var$addedToSceneFlag]) {
        this._octreeManager.setMeshVisibility(mesh, true);
        return;
    }
    mesh.metadata[$11e41780fd8a0927$var$addedToSceneFlag] = true;
    // find local position for mesh and move it there (unless it's parented)
    if (!mesh.parent) {
        if (!pos) pos = mesh.position.asArray();
        var lpos = this.noa.globalToLocal(pos, null, []);
        mesh.position.fromArray(lpos);
    }
    // add to the octree, and remove again on disposal
    this._octreeManager.addMesh(mesh, isStatic, pos, containingChunk);
    mesh.onDisposeObservable.add(()=>{
        this._octreeManager.removeMesh(mesh);
        mesh.metadata[$11e41780fd8a0927$var$addedToSceneFlag] = false;
    });
};
var $11e41780fd8a0927$var$addedToSceneFlag = "noa_added_to_scene";
/**
 * Use this to toggle the visibility of a mesh without disposing it or
 * removing it from the scene.
 * 
 * @param {import('@babylonjs/core/Meshes').Mesh} mesh
 * @param {boolean} visible
 */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.setMeshVisibility = function(mesh, visible = false) {
    if (!mesh.metadata) mesh.metadata = {};
    if (mesh.metadata[$11e41780fd8a0927$var$addedToSceneFlag]) this._octreeManager.setMeshVisibility(mesh, visible);
    else if (visible) this.addMeshToScene(mesh);
};
/**
 * Create a default standardMaterial:      
 * flat, nonspecular, fully reflects diffuse and ambient light
 * @returns {StandardMaterial}
 */ $11e41780fd8a0927$export$ab9c2d573a6e2267.prototype.makeStandardMaterial = function(name) {
    var mat = new (0, $5OpyM$StandardMaterial)(name, this.scene);
    mat.specularColor.copyFromFloats(0, 0, 0);
    mat.ambientColor.copyFromFloats(1, 1, 1);
    mat.diffuseColor.copyFromFloats(1, 1, 1);
    return mat;
};
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
    this.scene.meshes.forEach((mesh)=>{
        // parented meshes don't live in the world coord system
        if (mesh.parent) return;
        // move each mesh by delta (even though most are managed by components)
        mesh.position.subtractInPlace(dvec);
        if (mesh.isWorldMatrixFrozen) // paradoxically this unfreezes, then re-freezes the matrix
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
    self.camera.position.z = -cam.currentZoom;
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
        }, rendering.scene);
        var hlm = rendering.makeStandardMaterial("block_highlight_mat");
        hlm.backFaceCulling = false;
        hlm.emissiveColor = new (0, $5OpyM$Color3)(1, 1, 1);
        hlm.alpha = 0.2;
        hlm.freeze();
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
        }, rendering.scene);
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
    var meshes = this.scene.meshes;
    var octree = this.scene._selectionOctree;
    var dyns = octree.dynamicContent;
    var octs = [];
    var numOcts = 0;
    var numSubs = 0;
    var mats = this.scene.materials;
    var allmats = [];
    mats.forEach((mat)=>{
        // @ts-ignore
        if (mat.subMaterials) mat.subMaterials.forEach((mat)=>allmats.push(mat));
        else allmats.push(mat);
    });
    octree.blocks.forEach(function(block) {
        numOcts++;
        block.entries.forEach((m)=>octs.push(m));
    });
    meshes.forEach(function(m) {
        if (m.isDisposed()) warn(m, "disposed mesh in scene");
        if (empty(m)) return;
        if (missing(m, dyns, octs)) warn(m, "non-empty mesh missing from octree");
        if (!m.material) {
            warn(m, "non-empty scene mesh with no material");
            return;
        }
        numSubs += m.subMeshes ? m.subMeshes.length : 1;
        // @ts-ignore
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
            if (!mesh.material) return;
            // @ts-ignore
            var mats = mesh.material.subMaterials || [
                mesh.material
            ];
            if (mats.includes(mat)) used = true;
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
    this.scene.meshes.forEach((m)=>{
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



var $2f83a8c082dca133$var$defaultOptions = {
    gravity: [
        0,
        -10,
        0
    ],
    airDrag: 0.1
};
class $2f83a8c082dca133$export$2f09efa5b67124a7 extends (0, $5OpyM$Physics) {
    /** 
     * @internal 
     * @param {import('../index').Engine} noa
    */ constructor(noa, opts){
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





function $a4aa757de41525e5$export$5a0870a55ad02f1a(noa, requestID, ci, cj, ck, size, dataArray, fillVoxelID = -1) {
    this.noa = noa;
    this.isDisposed = false;
    // arbitrary data passed in by client when generating world
    this.userData = null;
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
    this._wholeLayerVoxel = Array(size).fill(-1);
    if (fillVoxelID >= 0) {
        this.voxels.data.fill(fillVoxelID, 0, this.voxels.size);
        this._wholeLayerVoxel.fill(fillVoxelID);
    }
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
    /** @internal */ this._blockHandlerLocs = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
    // passes through voxel contents, calling block handlers etc.
    $a4aa757de41525e5$var$scanVoxelData(this);
}
// expose logic internally to create and update the voxel data array
$a4aa757de41525e5$export$5a0870a55ad02f1a._createVoxelArray = function(size) {
    var arr = new Uint16Array(size * size * size);
    return (0, $5OpyM$ndarray)(arr, [
        size,
        size,
        size
    ]);
};
$a4aa757de41525e5$export$5a0870a55ad02f1a.prototype._updateVoxelArray = function(dataArray, fillVoxelID = -1) {
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
    if (fillVoxelID >= 0) this._wholeLayerVoxel.fill(fillVoxelID);
    else this._wholeLayerVoxel.fill(-1);
    $a4aa757de41525e5$var$scanVoxelData(this);
};
/*
 *
 *    Chunk API
 *
 */ // get/set deal with block IDs, so that this class acts like an ndarray
$a4aa757de41525e5$export$5a0870a55ad02f1a.prototype.get = function(i, j, k) {
    return this.voxels.get(i, j, k);
};
$a4aa757de41525e5$export$5a0870a55ad02f1a.prototype.getSolidityAt = function(i, j, k) {
    var solidLookup = this.noa.registry._solidityLookup;
    return solidLookup[this.voxels.get(i, j, k)];
};
$a4aa757de41525e5$export$5a0870a55ad02f1a.prototype.set = function(i, j, k, newID) {
    var oldID = this.voxels.get(i, j, k);
    if (newID === oldID) return;
    // update voxel data
    this.voxels.set(i, j, k, newID);
    // lookup tables from registry, etc
    var solidLookup = this.noa.registry._solidityLookup;
    var objectLookup = this.noa.registry._objectLookup;
    var opaqueLookup = this.noa.registry._opacityLookup;
    var handlerLookup = this.noa.registry._blockHandlerLookup;
    // track invariants about chunk data
    if (!opaqueLookup[newID]) this._isFull = false;
    if (newID !== 0) this._isEmpty = false;
    if (this._wholeLayerVoxel[j] !== newID) this._wholeLayerVoxel[j] = -1;
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
    // decide dirtiness states
    var solidityChanged = solidLookup[oldID] !== solidLookup[newID];
    var opacityChanged = opaqueLookup[oldID] !== opaqueLookup[newID];
    var wasTerrain = !objOld && oldID !== 0;
    var nowTerrain = !objNew && newID !== 0;
    if (objOld || objNew) this._objectsDirty = true;
    if (solidityChanged || opacityChanged || wasTerrain || nowTerrain) this._terrainDirty = true;
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
                if (!nab) continue;
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
$a4aa757de41525e5$export$5a0870a55ad02f1a.prototype.updateMeshes = function() {
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
    var voxels = chunk.voxels;
    var data = voxels.data;
    var len = voxels.shape[0];
    var opaqueLookup = chunk.noa.registry._opacityLookup;
    var handlerLookup = chunk.noa.registry._blockHandlerLookup;
    var objectLookup = chunk.noa.registry._objectLookup;
    var plainLookup = chunk.noa.registry._blockIsPlainLookup;
    var objMesher = chunk.noa._objectMesher;
    // flags for tracking if chunk is entirely opaque or transparent
    var fullyOpaque = true;
    var fullyAir = true;
    // scan vertically..
    for(var j = 0; j < len; ++j){
        // fastest case where whole layer is air/dirt/etc
        var layerID = chunk._wholeLayerVoxel[j];
        if (layerID >= 0 && !objMesher[layerID] && !handlerLookup[layerID]) {
            if (!opaqueLookup[layerID]) fullyOpaque = false;
            if (layerID !== 0) fullyAir = false;
            continue;
        }
        var constantID = voxels.get(0, j, 0);
        for(var i = 0; i < len; ++i){
            var index = voxels.index(i, j, 0);
            for(var k = 0; k < len; ++k, ++index){
                var id = data[index];
                // detect constant layer ID if there is one
                if (constantID >= 0 && id !== constantID) constantID = -1;
                // most common cases: air block...
                if (id === 0) {
                    fullyOpaque = false;
                    continue;
                }
                // ...or plain boring block (no mesh, handlers, etc)
                if (plainLookup[id]) {
                    fullyAir = false;
                    continue;
                }
                // otherwise check opacity, object mesh, and handlers
                fullyOpaque = fullyOpaque && opaqueLookup[id];
                fullyAir = false;
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
        if (constantID >= 0) chunk._wholeLayerVoxel[j] = constantID;
    }
    chunk._isFull = fullyOpaque;
    chunk._isEmpty = fullyAir;
    chunk._terrainDirty = !chunk._isEmpty;
}
// dispose function - just clears properties and references
$a4aa757de41525e5$export$5a0870a55ad02f1a.prototype.dispose = function() {
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
        /** @internal */ this.Chunk = (0, $a4aa757de41525e5$export$5a0870a55ad02f1a // expose this class for ...reasons
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
        */ this.maxChunksPendingCreation = 50;
        /** Limit the size of internal chunk processing queues 
         * @type {number} 
        */ this.maxChunksPendingMeshing = 50;
        /** Cutoff (in ms) of time spent each **tick** 
         * @type {number}
        */ this.maxProcessingPerTick = 5;
        /** Cutoff (in ms) of time spent each **render** 
         * @type {number}
        */ this.maxProcessingPerRender = 3;
        // set up internal state
        /** @internal */ this._chunkSize = opts.chunkSize;
        /** @internal */ this._chunkAddDistance = [
            2,
            2
        ];
        /** @internal */ this._chunkRemoveDistance = [
            3,
            3
        ];
        /** @internal */ this._addDistanceFn = null;
        /** @internal */ this._remDistanceFn = null;
        /** @internal */ this._prevWorldName = "";
        /** @internal */ this._prevPlayerChunkHash = 0;
        /** @internal */ this._chunkAddSearchFrom = 0;
        /** @internal */ this._prevSortingFn = null;
        /** @internal */ this._sortMeshQueueEvery = 0;
        // Init internal chunk queues:
        /** @internal All chunks existing in any queue */ this._chunksKnown = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
        /** @internal in range but not yet requested from client */ this._chunksToRequest = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
        /** @internal known to have invalid data (wrong world, eg) */ this._chunksInvalidated = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
        /** @internal out of range, and waiting to be removed */ this._chunksToRemove = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
        /** @internal requested, awaiting data event from client */ this._chunksPending = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
        /** @internal has data, waiting to be (re-)meshed */ this._chunksToMesh = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
        /** @internal priority queue for chunks to re-mesh */ this._chunksToMeshFirst = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
        /** 
         * @internal A queue of chunk locations, rather than chunk references.
         * Has only the positive 1/16 quadrant, sorted (reverse order!) */ this._chunksSortedLocs = new (0, $afbe2889bb225d5c$export$3de2ef94d6d0cf1a)();
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
            this._coordsToChunkIndexes = $90379f8792b605b2$var$chunkCoordsToIndexesPowerOfTwo;
            this._coordsToChunkLocals = $90379f8792b605b2$var$chunkCoordsToLocalsPowerOfTwo;
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
*/ $90379f8792b605b2$export$812cd9544993280d.prototype.getBlockID = function(x = 0, y = 0, z = 0) {
    var [ci, cj, ck] = this._coordsToChunkIndexes(x, y, z);
    var chunk = this._storage.getChunkByIndexes(ci, cj, ck);
    if (!chunk) return 0;
    var [i, j, k] = this._coordsToChunkLocals(x, y, z);
    return chunk.voxels.get(i, j, k);
};
$90379f8792b605b2$export$812cd9544993280d.prototype.getBlockSolidity = function(x = 0, y = 0, z = 0) {
    var [ci, cj, ck] = this._coordsToChunkIndexes(x, y, z);
    var chunk = this._storage.getChunkByIndexes(ci, cj, ck);
    if (!chunk) return false;
    var [i, j, k] = this._coordsToChunkLocals(x, y, z);
    return !!chunk.getSolidityAt(i, j, k);
};
$90379f8792b605b2$export$812cd9544993280d.prototype.getBlockOpacity = function(x = 0, y = 0, z = 0) {
    var id = this.getBlockID(x, y, z);
    return this.noa.registry.getBlockOpacity(id);
};
$90379f8792b605b2$export$812cd9544993280d.prototype.getBlockFluidity = function(x = 0, y = 0, z = 0) {
    var id = this.getBlockID(x, y, z);
    return this.noa.registry.getBlockFluidity(id);
};
$90379f8792b605b2$export$812cd9544993280d.prototype.getBlockProperties = function(x = 0, y = 0, z = 0) {
    var id = this.getBlockID(x, y, z);
    return this.noa.registry.getBlockProps(id);
};
$90379f8792b605b2$export$812cd9544993280d.prototype.setBlockID = function(id = 0, x = 0, y = 0, z = 0) {
    var [ci, cj, ck] = this._coordsToChunkIndexes(x, y, z);
    var chunk = this._storage.getChunkByIndexes(ci, cj, ck);
    if (!chunk) return;
    var [i, j, k] = this._coordsToChunkLocals(x, y, z);
    return chunk.set(i, j, k, id);
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
/** 
 * Clients should call this after creating a chunk's worth of data (as an ndarray)  
 * If userData is passed in it will be attached to the chunk
 * @param {string} id - the string specified when the chunk was requested 
 * @param {*} array - an ndarray of voxel data
 * @param {*} userData - an arbitrary value for game client use
 * @param {number} fillVoxelID - specify a voxel ID here if you want to signify that 
 * the entire chunk should be solidly filled with that voxel (e.g. `0` for air). 
 * If you do this, the voxel array data will be overwritten and the engine will 
 * take a fast path through some initialization steps.
 */ $90379f8792b605b2$export$812cd9544993280d.prototype.setChunkData = function(id, array, userData = null, fillVoxelID = -1) {
    $90379f8792b605b2$var$setChunkData(this, id, array, userData, fillVoxelID);
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
/** 
 * Tells noa to discard voxel data within a given `AABB` (e.g. because 
 * the game client received updated data from a server). 
 * The engine will mark all affected chunks for removal, and will later emit 
 * new `worldDataNeeded` events (if the chunk is still in draw range).
 */ $90379f8792b605b2$export$812cd9544993280d.prototype.invalidateVoxelsInAABB = function(box) {
    $90379f8792b605b2$var$invalidateChunksInBox(this, box);
};
/** When manually controlling chunk loading, tells the engine that the 
 * chunk containing the specified (x,y,z) needs to be created and loaded.
 * > Note: throws unless `noa.world.manuallyControlChunkLoading` is set.
 * @param x, y, z
 */ $90379f8792b605b2$export$812cd9544993280d.prototype.manuallyLoadChunk = function(x = 0, y = 0, z = 0) {
    if (!this.manuallyControlChunkLoading) throw $90379f8792b605b2$var$manualErr;
    var [i, j, k] = this._coordsToChunkIndexes(x, y, z);
    this._chunksKnown.add(i, j, k);
    this._chunksToRequest.add(i, j, k);
};
/** When manually controlling chunk loading, tells the engine that the 
 * chunk containing the specified (x,y,z) needs to be unloaded and disposed.
 * > Note: throws unless `noa.world.manuallyControlChunkLoading` is set.
 * @param x, y, z
 */ $90379f8792b605b2$export$812cd9544993280d.prototype.manuallyUnloadChunk = function(x = 0, y = 0, z = 0) {
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
    // if world has changed, invalidate everything and ping
    // removals queue so that player's chunk gets loaded back quickly
    if (this._prevWorldName !== this.noa.worldName) {
        this.noa.emit("newWorldName", this.noa.worldName);
        if (!this.manuallyControlChunkLoading) {
            $90379f8792b605b2$var$markAllChunksInvalid(this);
            this._chunkAddSearchFrom = 0;
            $90379f8792b605b2$var$processRemoveQueue(this);
        }
        this._prevWorldName = this.noa.worldName;
    }
    $90379f8792b605b2$var$profile_hook("start");
    $90379f8792b605b2$var$profile_queues_hook("start");
    // scan for chunks to add/remove (unless client handles manually)
    if (!this.manuallyControlChunkLoading) {
        $90379f8792b605b2$var$findDistantChunksToRemove(this, ci, cj, ck);
        $90379f8792b605b2$var$profile_hook("remQueue");
        $90379f8792b605b2$var$findChunksToRequest(this, ci, cj, ck);
        $90379f8792b605b2$var$profile_hook("addQueue");
    }
    // possibly scan for additions to meshing queue if it's empty
    $90379f8792b605b2$var$findChunksToMesh(this);
    // process (create or mesh) some chunks, up to max iteration time
    var t = performance.now();
    var t1 = tickStartTime + (this.maxProcessingPerTick || 0);
    if (t < t1) t1 = t + 1;
    var done1 = false;
    var done2 = false;
    var done3 = false;
    while(t < t1){
        if (!done1) {
            done1 = $90379f8792b605b2$var$processRemoveQueue(this) || $90379f8792b605b2$var$processRemoveQueue(this);
            $90379f8792b605b2$var$profile_hook("removes");
        }
        if (!done2) {
            done2 = $90379f8792b605b2$var$processRequestQueue(this);
            $90379f8792b605b2$var$profile_hook("requests");
        }
        if (!done3) {
            done3 = $90379f8792b605b2$var$processMeshingQueue(this, false);
            $90379f8792b605b2$var$profile_hook("meshes");
        }
        if (done1 && done2 && done3) break;
        t = performance.now();
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
    var t = performance.now();
    var t1 = t + this.maxProcessingPerRender;
    while(t < t1){
        var done = $90379f8792b605b2$var$processMeshingQueue(this, true);
        if (done) break;
        t = performance.now();
    }
};
/** @internal */ $90379f8792b605b2$export$812cd9544993280d.prototype._getChunkByCoords = function(x = 0, y = 0, z = 0) {
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
*/ // internal accessor for chunks to queue themeselves for remeshing 
// after their data changes
$90379f8792b605b2$export$812cd9544993280d.prototype._queueChunkForRemesh = function(chunk) {
    $90379f8792b605b2$var$possiblyQueueChunkForMeshing(this, chunk);
};
/** 
 * helper - chunk indexes of where the player is
 * @param {World} world 
*/ function $90379f8792b605b2$var$getPlayerChunkIndexes(world) {
    var [x, y, z] = world.noa.entities.getPosition(world.noa.playerEntity);
    return world._coordsToChunkIndexes(x, y, z);
}
/** 
 * Gradually scan neighborhood chunk locs; add missing ones to "toRequest".
 * @param {World} world 
*/ function $90379f8792b605b2$var$findChunksToRequest(world, ci, cj, ck) {
    var toRequest = world._chunksToRequest;
    var numQueued = toRequest.count();
    var maxQueued = 50;
    if (numQueued >= maxQueued) return;
    // handle changes to chunk sorting function
    var sortDistFn = world.chunkSortingDistFn || $90379f8792b605b2$var$defaultSortDistance;
    if (sortDistFn !== world._prevSortingFn) {
        $90379f8792b605b2$var$sortQueueByDistanceFrom(world, world._chunksSortedLocs, 0, 0, 0, true);
        world._prevSortingFn = sortDistFn;
    }
    // consume the pre-sorted positions array, checking each loc and 
    // its reflections for locations that need to be added to request queue
    var locsArr = world._chunksSortedLocs.arr;
    var ix = world._chunkAddSearchFrom;
    var maxIter = Math.min(20, locsArr.length / 10);
    for(var ct = 0; ct < maxIter; ct++){
        var [di, dj, dk] = locsArr[ix++ % locsArr.length];
        $90379f8792b605b2$var$checkReflectedLocations(world, ci, cj, ck, di, dj, dk);
        if (toRequest.count() >= maxQueued) break;
    }
    // only advance start point if nothing is invalidated, 
    // so that nearyby chunks stay at high priority in that case
    if (world._chunksInvalidated.isEmpty()) world._chunkAddSearchFrom = ix % locsArr.length;
    // queue should be mostly sorted, but may not have been empty
    $90379f8792b605b2$var$sortQueueByDistanceFrom(world, toRequest, ci, cj, ck, false);
}
// Helpers for checking whether to add a location, and reflections of it
var $90379f8792b605b2$var$checkReflectedLocations = (world, ci, cj, ck, i, j, k)=>{
    $90379f8792b605b2$var$checkOneLocation(world, ci + i, cj + j, ck + k);
    if (i !== k) $90379f8792b605b2$var$checkOneLocation(world, ci + k, cj + j, ck + i);
    if (i > 0) $90379f8792b605b2$var$checkReflectedLocations(world, ci, cj, ck, -i, j, k);
    if (j > 0) $90379f8792b605b2$var$checkReflectedLocations(world, ci, cj, ck, i, -j, k);
    if (k > 0) $90379f8792b605b2$var$checkReflectedLocations(world, ci, cj, ck, i, j, -k);
};
// finally, the logic for each reflected location checked
var $90379f8792b605b2$var$checkOneLocation = (world, i, j, k)=>{
    if (world._chunksKnown.includes(i, j, k)) return;
    world._chunksKnown.add(i, j, k);
    world._chunksToRequest.add(i, j, k, true);
};
/** 
 * Incrementally scan known chunks for any that are no longer in range.
 * Assume that the order they're removed in isn't very important.
 * @param {World} world 
*/ function $90379f8792b605b2$var$findDistantChunksToRemove(world, ci, cj, ck) {
    var distCheck = world._remDistanceFn;
    var toRemove = world._chunksToRemove;
    var numQueued = toRemove.count() + world._chunksInvalidated.count();
    var maxQueued = 50;
    if (numQueued >= maxQueued) return;
    var knownArr = world._chunksKnown.arr;
    if (knownArr.length === 0) return;
    var maxIter = Math.min(100, knownArr.length / 10);
    var found = false;
    for(var ct = 0; ct < maxIter; ct++){
        var [i, j, k] = knownArr[$90379f8792b605b2$var$removeCheckIndex++ % knownArr.length];
        if (toRemove.includes(i, j, k)) continue;
        if (distCheck(i - ci, j - cj, k - ck)) continue;
        // flag chunk for removal and remove it from work queues
        world._chunksToRemove.add(i, j, k);
        world._chunksToRequest.remove(i, j, k);
        world._chunksToMesh.remove(i, j, k);
        world._chunksToMeshFirst.remove(i, j, k);
        found = true;
        numQueued++;
        if (numQueued > maxQueued) break;
    }
    $90379f8792b605b2$var$removeCheckIndex = $90379f8792b605b2$var$removeCheckIndex % knownArr.length;
    if (found) $90379f8792b605b2$var$sortQueueByDistanceFrom(world, toRemove, ci, cj, ck);
}
var $90379f8792b605b2$var$removeCheckIndex = 0;
/** 
 * Incrementally look for chunks that could be re-meshed
 * @param {World} world 
*/ function $90379f8792b605b2$var$findChunksToMesh(world) {
    var maxQueued = 10;
    var numQueued = world._chunksToMesh.count() + world._chunksToMeshFirst.count();
    if (numQueued > maxQueued) return;
    var knownArr = world._chunksKnown.arr;
    var maxIter = Math.min(50, knownArr.length / 10);
    for(var ct = 0; ct < maxIter; ct++){
        var [i, j, k] = knownArr[$90379f8792b605b2$var$meshCheckIndex++ % knownArr.length];
        var chunk = world._storage.getChunkByIndexes(i, j, k);
        if (!chunk) continue;
        var res = $90379f8792b605b2$var$possiblyQueueChunkForMeshing(world, chunk);
        if (res) numQueued++;
        if (numQueued > maxQueued) break;
    }
    $90379f8792b605b2$var$meshCheckIndex %= knownArr.length;
}
var $90379f8792b605b2$var$meshCheckIndex = 0;
/** 
 * invalidate chunks overlapping the given AABB
 * @param {World} world 
*/ function $90379f8792b605b2$var$invalidateChunksInBox(world, box) {
    var min = world._coordsToChunkIndexes(box.base[0], box.base[1], box.base[2]);
    var max = world._coordsToChunkIndexes(box.max[0], box.max[1], box.max[2]);
    for(var i = 0; i < 3; i++){
        if (!Number.isFinite(box.base[i])) min[i] = box.base[i];
        if (!Number.isFinite(box.max[i])) max[i] = box.max[i];
    }
    world._chunksKnown.forEach((loc)=>{
        var [i, j, k] = loc;
        if (i < min[0] || i >= max[0]) return;
        if (j < min[1] || j >= max[1]) return;
        if (k < min[2] || k >= max[2]) return;
        world._chunksInvalidated.add(i, j, k);
        world._chunksToRemove.remove(i, j, k);
        world._chunksToRequest.remove(i, j, k);
        world._chunksToMesh.remove(i, j, k);
        world._chunksToMeshFirst.remove(i, j, k);
    });
}
/** 
 * when current world changes - empty work queues and mark all for removal
 * @param {World} world 
*/ function $90379f8792b605b2$var$markAllChunksInvalid(world) {
    world._chunksInvalidated.copyFrom(world._chunksKnown);
    world._chunksToRemove.empty();
    world._chunksToRequest.empty();
    world._chunksToMesh.empty();
    world._chunksToMeshFirst.empty();
    $90379f8792b605b2$var$sortQueueByDistanceFrom(world, world._chunksInvalidated);
}
/** 
 * Run through chunk tracking queues looking for work to do next
 * @param {World} world 
*/ function $90379f8792b605b2$var$processRequestQueue(world) {
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
/** @param {World} world */ function $90379f8792b605b2$var$processRemoveQueue(world) {
    var queue = world._chunksInvalidated;
    if (queue.isEmpty()) queue = world._chunksToRemove;
    if (queue.isEmpty()) return true;
    var [i, j, k] = queue.pop();
    $90379f8792b605b2$var$removeChunk(world, i, j, k);
    return queue.isEmpty();
}
/** 
 * similar to above but for chunks waiting to be meshed
 * @param {World} world 
*/ function $90379f8792b605b2$var$processMeshingQueue(world, firstOnly) {
    var queue = world._chunksToMeshFirst;
    if (queue.isEmpty() && !firstOnly) queue = world._chunksToMesh;
    if (queue.isEmpty()) return true;
    var [i, j, k] = queue.pop();
    if (world._chunksToRemove.includes(i, j, k)) return;
    var chunk = world._storage.getChunkByIndexes(i, j, k);
    if (chunk) $90379f8792b605b2$var$doChunkRemesh(world, chunk);
}
/** @param {World} world */ function $90379f8792b605b2$var$possiblyQueueChunkForMeshing(world, chunk) {
    if (!(chunk._terrainDirty || chunk._objectsDirty)) return false;
    if (chunk._neighborCount < chunk.minNeighborsToMesh) return false;
    if (world._chunksToMesh.includes(chunk.i, chunk.j, chunk.k)) return false;
    if (world._chunksToMeshFirst.includes(chunk.i, chunk.j, chunk.k)) return false;
    var queue = chunk._neighborCount === 26 ? world._chunksToMeshFirst : world._chunksToMesh;
    queue.add(chunk.i, chunk.j, chunk.k);
    world._sortMeshQueueEvery++;
    if (world._sortMeshQueueEvery > 20) {
        $90379f8792b605b2$var$sortQueueByDistanceFrom(world, queue);
        world._sortMeshQueueEvery = 0;
    }
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
*/ /** 
 * create chunk object and request voxel data from client
 * @param {World} world 
*/ function $90379f8792b605b2$var$requestNewChunk(world, i, j, k) {
    var size = world._chunkSize;
    var dataArr = (0, $a4aa757de41525e5$export$5a0870a55ad02f1a)._createVoxelArray(world._chunkSize);
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
/** 
 * called when client sets a chunk's voxel data
 * If userData is passed in it will be attached to the chunk
 * @param {World} world 
*/ function $90379f8792b605b2$var$setChunkData(world, reqID, array, userData, fillVoxelID) {
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
        chunk = new (0, $a4aa757de41525e5$export$5a0870a55ad02f1a)(world.noa, reqID, i, j, k, size, array, fillVoxelID);
        world._storage.storeChunkByIndexes(i, j, k, chunk);
        chunk.userData = userData;
        world.noa.rendering.prepareChunkForRendering(chunk);
        world.emit("chunkAdded", chunk);
    } else // else we're updating data for an existing chunk
    chunk._updateVoxelArray(array, fillVoxelID);
    // chunk can now be meshed, and ping neighbors
    $90379f8792b605b2$var$possiblyQueueChunkForMeshing(world, chunk);
    $90379f8792b605b2$var$updateNeighborsOfChunk(world, i, j, k, chunk);
    $90379f8792b605b2$var$profile_queues_hook("receive");
}
/** 
 * remove a chunk that wound up in the remove queue
 * @param {World} world 
*/ function $90379f8792b605b2$var$removeChunk(world, i, j, k) {
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
    world._chunksToRemove.remove(i, j, k);
    world._chunksToMeshFirst.remove(i, j, k);
}
/** @param {World} world */ function $90379f8792b605b2$var$doChunkRemesh(world, chunk) {
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
*/ /** 
 * sorts DESCENDING, unless reversed
 * @param {World} world 
*/ function $90379f8792b605b2$var$sortQueueByDistanceFrom(world, queue, pi, pj, pk, reverse = false) {
    var distFn = world.chunkSortingDistFn || $90379f8792b605b2$var$defaultSortDistance;
    var localDist = (i, j, k)=>distFn(pi - i, pj - j, pk - k);
    if (pi === undefined) [pi, pj, pk] = $90379f8792b605b2$var$getPlayerChunkIndexes(world);
    queue.sortByDistance(localDist, reverse);
}
var $90379f8792b605b2$var$defaultSortDistance = (i, j, k)=>i * i + j * j + k * k;
/** 
 * keep neighbor data updated when chunk is added or removed
 * @param {World} world 
*/ function $90379f8792b605b2$var$updateNeighborsOfChunk(world, ci, cj, ck, chunk) {
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
    $90379f8792b605b2$var$_report(this, "  invalid:   ", this._chunksInvalidated.arr, 0);
    $90379f8792b605b2$var$_report(this, "  creating:  ", this._chunksPending.arr, 0);
    $90379f8792b605b2$var$_report(this, "  to mesh:   ", this._chunksToMesh.arr, 0);
    $90379f8792b605b2$var$_report(this, "  mesh 1st:  ", this._chunksToMeshFirst.arr, 0);
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
    silentBabylon: false,
    playerHeight: 1.8,
    playerWidth: 0.6,
    playerStart: [
        0,
        10,
        0
    ],
    playerAutoStep: false,
    playerShadowComponent: true,
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
     *    playerShadowComponent: true,
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
     * 
     * **Events:**
     *  + `tick => (dt)`  
     *    Tick update, `dt` is (fixed) tick duration in ms
     *  + `beforeRender => (dt)`  
     *    `dt` is the time (in ms) since the most recent tick
     *  + `afterRender => (dt)`  
     *    `dt` is the time (in ms) since the most recent tick
     *  + `targetBlockChanged => (blockInfo)`  
     *    Emitted each time the user's targeted world block changes
     *  + `addingTerrainMesh => (mesh)`  
     *    Alerts client about a terrain mesh being added to the scene
     *  + `removingTerrainMesh => (mesh)`  
     *    Alerts client before a terrain mesh is removed.
    */ constructor(opts = {}){
        super();
        opts = Object.assign({}, $cf838c15c8b009ba$var$defaultOptions, opts);
        /** Version string, e.g. `"0.25.4"` */ if (!opts.silent) {
            var debugstr = opts.debug ? " (debug)" : "";
            console.log(`noa-engine ${debugstr}`);
        }
        /** @internal */ this._paused = false;
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
        /** The game's tick rate (number of ticks per second) 
         * @type {number}
         * @readonly 
        */ this.tickRate = this.container._shell.tickRate;
        Object.defineProperty(this, "tickRate", {
            get: ()=>this.container._shell.tickRate
        });
        /** The game's max framerate (use `0` for uncapped)
         * @type {number}
         */ this.maxRenderRate = this.container._shell.maxRenderRate;
        Object.defineProperty(this, "maxRenderRate", {
            get: ()=>this.container._shell.maxRenderRate,
            set: (v)=>{
                this.container._shell.maxRenderRate = v || 0;
            }
        });
        /** Manages key and mouse input bindings */ this.inputs = new (0, $b3f1cef4464199f8$export$42ce93d1a224e3f9)(this, opts, this.container.element);
        /** A registry where voxel/material properties are managed */ this.registry = new (0, $abcbe6b5adba8195$export$4d9facee29974f3)(this, opts);
        /** Manages the world, chunks, and all voxel data */ this.world = new (0, $90379f8792b605b2$export$812cd9544993280d)(this, opts);
        var _consoleLog = console.log;
        if (opts.silentBabylon) console.log = ()=>{};
        /** Rendering manager */ this.rendering = new (0, $11e41780fd8a0927$export$ab9c2d573a6e2267)(this, opts, this.container.canvas);
        if (opts.silentBabylon) console.log = _consoleLog;
        /** Physics engine - solves collisions, properties, etc. */ this.physics = new (0, $2f83a8c082dca133$export$2f09efa5b67124a7)(this, opts);
        /** Entity manager / Entity Component System (ECS) */ this.entities = new (0, $d163e1ef2fd5c265$export$50f02d20b9547443)(this, opts);
        /** Alias to `noa.entities` */ this.ents = this.entities;
        var ents = this.entities;
        /** Entity id for the player entity */ this.playerEntity = ents.add(opts.playerStart, opts.playerWidth, opts.playerHeight, null, null, true, opts.playerShadowComponent);
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
        /** How far to check for a solid voxel the player is currently looking at 
         * @type {number}
        */ this.blockTestDistance = opts.blockTestDistance;
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
        */ /** @internal */ this._terrainMesher = new (0, $c30626c7bd5a958d$export$798fe4b573aec8d3)(this);
        /** @internal */ this._objectMesher = new (0, $3196c3678f180030$export$d14212b73d3479b6)(this);
        /** @internal */ this._targetedBlockDat = {
            blockID: 0,
            position: (0, $5OpyM$glvec3).create(),
            normal: (0, $5OpyM$glvec3).create(),
            adjacent: (0, $5OpyM$glvec3).create()
        };
        /** @internal */ this._prevTargetHash = 0;
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
            win.scene = this.rendering.scene;
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
        var pst = this.inputs.pointerState;
        pst.scrollx = pst.scrolly = pst.scrollz = 0;
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
        // rotate camera per user inputs - specific rules for this in `camera`
        this.camera.applyInputsToCamera();
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
        this.inputs.pointerState.dx = this.inputs.pointerState.dy = 0;
    }
    /** Pausing the engine will also stop render/tick events, etc. */ setPaused(paused = false) {
        this._paused = !!paused;
        // when unpausing, clear any built-up mouse inputs
        if (!paused) this.inputs.pointerState.dx = this.inputs.pointerState.dy = 0;
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
        if (x.length) return this.world.setBlockID(id, x[0], x[1], x[2]);
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
        // arbitrary hash so we know when the targeted blockID/pos/face changes
        var pos = dat.position, norm = dat.normal;
        var x = (0, $afbe2889bb225d5c$export$8292e80ebf6a0)(pos[0] + dat.blockID, pos[1], pos[2]);
        x ^= (0, $afbe2889bb225d5c$export$8292e80ebf6a0)(norm[0], norm[1] + dat.blockID, norm[2]);
        newhash = x;
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
    ver = "0.33";
    dep(noa.rendering, "postMaterialCreationHook", "Removed - use mesh post-creation hook instead`");
}
var $cf838c15c8b009ba$var$profile_hook = $cf838c15c8b009ba$var$PROFILE > 0 ? (0, $afbe2889bb225d5c$export$cf559512bdad9080)($cf838c15c8b009ba$var$PROFILE, "tick   ") : ()=>{};
var $cf838c15c8b009ba$var$profile_hook_render = $cf838c15c8b009ba$var$PROFILE_RENDER > 0 ? (0, $afbe2889bb225d5c$export$cf559512bdad9080)($cf838c15c8b009ba$var$PROFILE_RENDER, "render ") : ()=>{};


export {$cf838c15c8b009ba$export$2c3b404bf3a77a1f as Engine};
//# sourceMappingURL=index.js.map
