// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Play from "./player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.TiledMap)
    tiledMap: cc.TiledMap = null

    @property(cc.Prefab)
    playPrefab: cc.Prefab = null

    @property(cc.Prefab)
    goldPrefab: cc.Prefab = null

    @property(cc.Node)
    scoreNode: cc.Node = null

    @property(cc.Node)
    startBtn: cc.Node = null

    @property(cc.Node)
    overMask: cc.Node = null

    @property(cc.Node)
    endScore: cc.Node = null

    scoreLabel: cc.Label = null

    @property(cc.Node)
    winMask: (cc.Node) = null

    @property(cc.Node)
    winScore: cc.Node = null

    score: number = null



    static instance: Game = null
    // LIFE-CYCLE CALLBACKS:

    _jump: boolean = false

    goldPool: cc.NodePool = null


    gameOpen: boolean = null

    onLoad() {
        Game.instance = this

        this.gameOpen = false

        this.scoreLabel = this.scoreNode.getComponent(cc.Label)

        this.score = 0

        this.scoreLabel.string = this.score + ''

        let p = cc.director.getPhysicsManager()
        p.enabled = true
        p.gravity = cc.v2(0, -600)
        // p.debugDrawFlags = cc.PhysicsManager.DrawBits.e_shapeBit

        cc.director.getCollisionManager().enabled = true

        this.makeMap('ground', this.tiledMap)
        this.makeMap('box', this.tiledMap)
        this.makeMap('flag', this.tiledMap)

        cc.systemEvent.on('keyup', this.onKeyUp, this)
        cc.systemEvent.on('keyup', this.onKeyUp, this)

        // let objectLayer = this.tiledMap.getObjectGroup('object')
        // let objects = objectLayer.getObjects()

        // cc.log(tiledObject)

        this.goldPool = new cc.NodePool()
        for (let i = 0; i < 50; i++) {
            let gold = cc.instantiate(this.goldPrefab)
            this.goldPool.put(gold)
        }

        // this.ongameStart()
    }

  

    onKeyDown(e: cc.Event.EventKeyboard) {
        // cc.log(e.keyCode)
        if (e.keyCode == cc.macro.KEY.a || e.keyCode == cc.macro.KEY.left) {
            this.left()
        } else if (e.keyCode == cc.macro.KEY.d || e.keyCode == cc.macro.KEY.right) {
            this.right()
        } else if (e.keyCode == cc.macro.KEY.w || e.keyCode == cc.macro.KEY.up) {
            this.jump()
        }
    }
    jump() {
        if (this._jump) return
        this._jump = true
        Play.instance.direction = 3
        this.scheduleOnce(() => {
            Play.instance.direction = 0
        }, 0.05)
    }

    left() {
        Play.instance.direction = 1
    }

    right() {
        Play.instance.direction = 2
    }

    onKeyUp() {
        Play.instance.direction = 0

    }

    setScore() {
        this.score += 10
        this.scoreLabel.string = this.score + ''
    }


    //????????????
    makeMap(layerName: string, tiledMap: cc.TiledMap) {
        let tiledSize = tiledMap.getTileSize() //?????????????????????
        let layer = tiledMap.getLayer(layerName) //???????????????
        let layerSize = layer.getLayerSize() //?????????????????????

        if (layerName == 'flag') {
            for (let i = 0; i < layerSize.width; i++) {
                for (let j = 0; j < layerSize.height; j++) {
                    let tiled = layer.getTiledTileAt(i, j, true) //?????????????????????????????????
                    if (tiled.gid != 0) { //gid??????0??????????????????????????????
                        tiled.node.group = layerName //??????????????????
                        let boxCollider = tiled.node.addComponent(cc.BoxCollider) // ??????????????????
                        boxCollider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2) //????????????????????????
                        boxCollider.size = tiledSize // ?????????????????????

                        tiled.node.addComponent('flag')

                    }

                }
            }
            return

        }
        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true) //?????????????????????????????????
                if (tiled.gid != 0) { //gid??????0??????????????????????????????
                    tiled.node.group = layerName //??????????????????
                    let body = tiled.node.addComponent(cc.RigidBody) //??????????????????????????????
                    body.type = cc.RigidBodyType.Static //???????????????????????????
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider) // ??????????????????
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2) //????????????????????????
                    collider.size = tiledSize // ?????????????????????
                    collider.apply() //??????????????????

                    let boxCollider = tiled.node.addComponent(cc.BoxCollider) // ??????????????????
                    boxCollider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2) //????????????????????????
                    boxCollider.size = tiledSize // ?????????????????????
                    // boxCollider.apply() //??????????????????
                    if (layerName == 'box') {
                        tiled.node.addComponent('box')
                    }
                }

            }
        }
    }

    start() {

    }

    restart() {
        cc.director.loadScene('game')
    }

    ongameStart() {
        this.gameOpen = true
        this.startBtn.active = false
    }

    gameOver() {
        this.gameOpen = false
        // cc.log('????????????')
        this.overMask.active = true

        let scoreLabel = this.endScore.getComponent(cc.Label)

        // cc.log(score)
        scoreLabel.string = this.score + ''
    }

    gameWin() {
        this.gameOpen = false
        this.winMask.active = true

        let scoreLabel = this.winScore.getComponent(cc.Label)
        scoreLabel.string = this.score + ''

    }
    // update (dt) {}

    onDestroy() {
        cc.systemEvent.off('keyup', this.onKeyUp, this)
        cc.systemEvent.off('keydown', this.onKeyDown, this)

    }
}
