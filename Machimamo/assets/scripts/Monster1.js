cc.Class({
    extends: cc.Component,

    properties: {
        //体力
        hp: 0,
        //exprosionPrefab
        exprosionPrefab: {
            default: null,
            type: cc.Prefab
        },
        //討伐音
        downSound: {
            default: null,
            url: cc.AudioClip
        }        
    },
    
    onLoad: function () {
        //衝突判定機能を有効に
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        manager.enabledDrawBoundingBox = false;
        //hpの残数
        this.hpNum = this.hp;
        //アニメーションをコンポネント
        var anim = this.node.getComponent(cc.Animation);
        //sideMoveアニメーションを実行
        anim.play('sideMove');  
        //rushアクションの実行時間の設定
        this.rushTime = 10; 
        //backアクションの実行時間の設定
        this.backTime = 5;
        //rushかbackアクションの切り替えスイッチ
        this.switch = false;
        //タイマーの初期化
        this.timer = 0;
    },
    
    rush: function() {
        //スイッチをfalseに
        this.switch = true;
        //突進
        var move = cc.moveTo(1, cc.p(this.node.x, this.node.y - 400));
        //アクション実行
        this.node.runAction(move);
        //タイマーの初期化
        this.timer = 0;
        //backアクションの実行時間の設定
        this.backTime = Math.floor(Math.random()*10) + 3;
    },
    
    back: function() {
        //スイッチをfalseに
        this.switch = false;
        //バック
        var move = cc.moveTo(2, cc.p(this.node.x, this.node.y + 400));
        //アクション実行
        this.node.runAction(move);
        //突進アクションの実行時間
        this.timer = 0;
        //rushアクションの実行時間の設定
        this.rushTime = Math.floor(Math.random()*10) + 3;
    },
    
    onCollisionEnter: function(other, self) {
        //相手を破壊
        other.node.destroy();
        //モンスターのhp-1
        this.hpNum -= 1;
    },
    
    update: function (dt) {
        //hpが0になったら破壊しスコアアップ
        if(this.hpNum === 0) {
            this.showExprosion();
            this.node.destroy();
            this.game.gainScore2();
            cc.audioEngine.playEffect(this.downSound, false);
        }
        //タイマーがrushアクションの実行時間を超えて、スイッチがfalseなら
        if(this.timer > this.rushTime && this.switch === false) {
            this.rush();
        }
        //タイマーがbackアクションの実行時間を超えて、スイッチがtrueなら
        if(this.timer > this.backTime && this.switch) {
            this.back();
        }
        //タイマー
        this.timer += dt;
    },

    showExprosion: function() {
        //exprosionPrefabよりexprosionを生成
        var newExprosion = cc.instantiate(this.exprosionPrefab);
        //新しく生成したburnノードをCanvasノードの下に置く
        this.game.node.addChild(newExprosion);    
        //生成場所
        newExprosion.setPosition(cc.p(this.node.position));
    }    
});
