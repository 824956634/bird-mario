// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Box extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

    goldNum: number = null

    onLoad() {
        this.goldNum = Math.floor(Math.random() * 3) + 1
        // cc.log('加载完毕')
    }
    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {

        if (other.tag == 2) {
            // cc.log(other.tag)
            this.hitBox()
        }
    }

    hitBox() {

        if (this.goldNum > 0) {
            let gold: cc.Node
            if (Game.instance.goldPool.size() > 0) {
                gold = Game.instance.goldPool.get()
            } else {
                gold = cc.instantiate(Game.instance.goldPrefab)
            }

            let boxSize = this.node.getComponent(cc.BoxCollider).size

            gold.position = cc.v3(boxSize.width / 2, boxSize.height / 2, 0)

            gold.parent = this.node

            let goldAnim = gold.getComponent(cc.Animation)

            goldAnim.play()

            cc.tween(gold)
                .by(0.2, { y: boxSize.height })
                .call(() => {
                    this.scheduleOnce(() => {
                        gold.destroy()
                        this.goldNum--
                        Game.instance.setScore()
                    }, 0.5)
                })
                .start()

            cc.tween(this.node)
                .by(0.2, { position: cc.v3(0, 10, 0) })
                .by(0.1, { position: cc.v3(0, -10, 0) })
                .start()
        }
    }
    start() {

    }

    // update (dt) {}
}
