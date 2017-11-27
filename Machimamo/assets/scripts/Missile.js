cc.Class({
    extends: cc.Component,

    properties: {
        //重力
        gravity: 0,
        //体力
        hp: 0,
        //particle
        burnPrefab: {
            default: null,
            type: cc.Prefab
        },  
        //爆発音
        explosionSound: {
            default: null,
            url: cc.AudioClip
        }        
    },

    showBurn: function() {
        //burnPrefabよりburnを生成
        var newBurn = cc.instantiate(this.burnPrefab);
        //新しく生成したburnノードをCanvasノードの下に置く
        this.game.node.addChild(newBurn);    
        //生成場所
        newBurn.setPosition(cc.p(this.node.position));
    },    

    update: function (dt) {
         //下に落ち続ける
         this.node.y -= this.gravity * dt;
         //街に落ちたら
         if(this.node.y < -250){
             //particle発動
             this.showBurn();
             //hp減少
             this.game.lose();
             //bom破棄
             this.node.destroy();
              cc.audioEngine.playEffect(this.explosionSound, false);
         }
    },
});
