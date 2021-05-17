// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Flag extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // cc.log("加载完成")
    }

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {

        // cc.log(other.node.name)
        if (other.node.name == 'player') {
            Game.instance.gameWin()
        }
    }

    start() {

    }

    // update (dt) {}
}
