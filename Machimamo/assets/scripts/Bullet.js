cc.Class({
    extends: cc.Component,

    properties: {
        //攻撃スピード
        attackSpeed: 0,
        //ダメージ量
        damage: 0,
        //particle
        burnPrefab: {
            default: null,
            type: cc.Prefab
        },
        //破壊音
        destroySound: {
            default: null,
            url: cc.AudioClip
        },   
        //コイン音
        coinSound: {
            default: null,
            url: cc.AudioClip
        },        
        //回復音
        recoverySound: {
            default: null,
            url: cc.AudioClip
        }, 
        //討伐音
        powerSound: {
            default: null,
            url: cc.AudioClip
        },         
    },

    // use this for initialization
    onLoad: function () {
      //collider機能追加
      var manager = cc.director.getCollisionManager();
      manager.enabled = true;
      manager.enabledDebugDraw = false;
      manager.enabledDrawBoundingBox = false;       
    },
    
    showBurn: function() {
        //burnPrefabよりburnを生成
        var newBurn = cc.instantiate(this.burnPrefab);
        //新しく生成したburnノードをCanvasノードの下に置く
        this.game.node.addChild(newBurn);    
        //生成場所
        newBurn.setPosition(cc.p(this.node.position));
    },    
    
    onCollisionEnter: function(other, self) {
        //bomやmissile破壊
        if(other.node.group === 'bom') {
            other.node.destroy();   
            this.game.gainScore1();
            cc.audioEngine.playEffect(this.destroySound, false);
        }else if(other.node.group === 'coin') {
            other.node.destroy();   
            this.game.gainScore5(); 
            cc.audioEngine.playEffect(this.coinSound, false);
        }else if(other.node.group === 'heart') {
            other.node.destroy();   
            this.game.recovery();     
            cc.audioEngine.playEffect(this.recoverySound, false);
        }else if(other.node.group === 'power') {
            other.node.destroy();
            this.game.power += 1;
            cc.audioEngine.playEffect(this.powerSound, false);
        }else if(other.node.group === 'monster1' || other.node.group === 'monster2' || other.node.group === 'monster3') {
            cc.audioEngine.playEffect(this.destroySound, false);
        }
        //particle発動
        this.showBurn();
        //bullet破壊
        self.node.destroy();
    },
    
    update: function (dt) {
        //上に上がり続ける
        this.node.y += this.attackSpeed * dt;
        //画面外に出たら破棄
        if(this.node.y > 343) {
            this.node.destroy();
        }
    },
});
