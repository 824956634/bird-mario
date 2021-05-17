// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Touch extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('touchstart', this.onTouchStart, this)
        this.node.on('touchend', this.onTouchEnd, this)
        this.node.on('touchcancel', this.onTouchEnd, this)
    }
    onTouchEnd(e: cc.Event.EventTouch) {
        Game.instance.onKeyUp()
        e.target.opacity = 100
    }

    onTouchStart(e: cc.Event.EventTouch) {
        if (Game.instance.gameOpen) {
            e.target.opacity = 255

            // cc.log(e.target)
            switch (e.target.name) {
                case 'left':
                    Game.instance.left()
                    break
                case 'right':
                    Game.instance.right()
                    break
                case 'up':
                    Game.instance.jump()
                    break

            }
        }
    }
    start() {

    }
    onDestroy() {
        this.node.off('touchstart', this.onTouchStart, this)
        this.node.off('touchend', this.onTouchEnd, this)
        this.node.off('touchcancel', this.onTouchEnd, this)
    }
    // update (dt) {}
}
