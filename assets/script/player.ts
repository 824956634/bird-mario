
import Game from "./game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Play extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    _speed: number = null
    direction: number = null

    lv: cc.Vec2 = null

    static instance: Play

    run: boolean = null

    runAnim: cc.Animation = null
    onLoad() {
        this.run = false
        this._speed = 400

        Play.instance = this
        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity
        // this.node.getComponent(cc.Collider).enabled = true

        this.runAnim = this.node.children[0].getComponent(cc.Animation)

    }

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        // cc.log(self.tag)
        if (self.tag == 1 && Game.instance._jump) {
            Game.instance._jump = false
        }
    }

    // playAnim(){
    //     if (this.direction) {
    //         this.run = true
    //         this.runAnim.play()
    //     } else {
    //         this.run = false
    //         this.runAnim.stop()
    //     }

    //     // if (this.run) {
    //     //     this.runAnim.play()
    //     // } else {
    //     //     this.runAnim.stop()
    //     // }
    // }

    start() {

        // this.setDirection(1)
    }

    update(dt) {
        if (Game.instance.gameOpen) {

            this.lv = this.node.getComponent(cc.RigidBody).linearVelocity

            switch (this.direction) {
                case 0:
                    this.lv = cc.v2(0, this.lv.y)
                    break
                case 1:
                    this.node.scaleX = -1
                    this.lv.x = -this._speed
                    break
                case 2:
                    this.node.scaleX = 1
                    this.lv.x = this._speed
                    break
                case 3:
                    this.lv.y = this._speed * 1.5
                    break
                default:
                    this.lv = cc.v2(0, this.lv.y)
                    break

            }
            // this.lv.y = 0
            // this.lv.x = this.direction * this._speed
            this.node.getComponent(cc.RigidBody).linearVelocity = this.lv

        }

    }
}
