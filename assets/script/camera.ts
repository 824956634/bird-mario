import Game from "./game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Camera extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null


    @property(cc.Node)
    tiledMap: cc.Node = null


    // LIFE-CYCLE CALLBACKS:
    static instance: Camera = null

    // tiledMapPos:cc.Vec2 = null

    min: cc.Vec2 = null
    max: cc.Vec2 = null

    minY: number = null

    onLoad() {
        Camera.instance = this


        // cc.log(this.tiledMap.position)

        let tiledMapPos = this.tiledMap.convertToWorldSpaceAR(cc.v2(0, 0))

        //最小值
        let min = new cc.Vec2()
        min.x = tiledMapPos.x + cc.winSize.width / 2
        this.min = this.node.parent.convertToNodeSpaceAR(min)
        this.node.x = this.min.x

        //最大值
        let max = new cc.Vec2()
        max.x = tiledMapPos.x + this.tiledMap.width - cc.winSize.width / 2
        this.max = this.node.parent.convertToNodeSpaceAR(max)

        this.minY = this.node.y - cc.winSize.height / 2
        // cc.log(this.player.y ,cc.winSize.height , this.node.y)
    }

    start() {

    }

    update(dt) {


        //因为在同一个父节点下，所以能直接对比
        if (this.player.position.x > this.min.x && Game.instance.gameOpen) {

            let playerPos = this.player.convertToWorldSpaceAR(cc.v2(0.0))
            let cameraPos = this.node.parent.convertToNodeSpaceAR(playerPos)
            if (this.player.position.x < this.max.x) {
                this.node.x = cameraPos.x
            } else {
                this.node.x = this.max.x
            }

        }

        if (this.player.y < this.minY && Game.instance.gameOpen) {
            Game.instance.gameOver()
        }

    }
}
