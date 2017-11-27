cc.Class({
    extends: cc.Component,
    properties: {
        //家
        home: {
            default: null,
            type: cc.Node
        },
        //回転速度
        rolling: 5,
        //サウンド
        audio: {
            default: null,
            url: cc.AudioClip
        }
    },
    onLoad: function () {
        //当たり判定を有効にする
        cc.director.getCollisionManager().enabled = true;
        //当たり範囲を目で見えるようにするか
        cc.director.getCollisionManager().enabledDebugDraw = false;        
    },

    onCollisionEnter: function(other, self) {
        if(other.node.group !== 'Brock') {
            //サウンドを鳴らす
            cc.audioEngine.playEffect(this.audio, false);        
        }
        if(other.node.group === 'Player') {
            this.gameOver();
        }
    },
    
    update: function() {
        //グループがSawのものは回転する
        if(this.node.group === 'Saw') {
            this.node.rotation += this.rolling;
        }
    },
    
     //障害物に当たるとゲームオーバー
     gameOver: function() {
    	//ステージボックス
        var stageBox = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7', 'stage8', 'stage9', 'stage10'];
        //ゲームオーバーボックス
        var gameOverBox = ['gameOver1', 'gameOver2', 'gameOver3', 'gameOver4', 'gameOver5', 'gameOver6', 'gameOver7', 'gameOver8', 'gameOver9', 'gameOver10'];    	         
         //gameOverSceneに移行
         for(var i = 0;i < stageBox.length;i++) {
             if(this.home.group === stageBox[i]) {
                 cc.director.loadScene(gameOverBox[i]);
                 break;
             }
        }
     },
});
