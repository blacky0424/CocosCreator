cc.Class({
    extends: cc.Component,

    properties: {
        //体力
        hp: 0,
        //beamPrefab
        beamPrefab: {
            default: null, 
            type: cc.Prefab
        },
        //exprosionPrefab
        exprosionPrefab: {
            default: null,
            type: cc.Prefab
        },        
        //討伐音
        downSound: {
            default: null,
            url: cc.AudioClip
        },        
        //ビーム音
        beamSound: {
            default: null,
            url: cc.AudioClip
        },        
    },
    
    onLoad: function () {
        //衝突判定機能を有効に
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        manager.enabledDrawBoundingBox = false;
        //hpの残数
        this.hpNum = this.hp;
        //ビーム発車までの時間
        this.beamTime = 2;    
        //移動方向変更スイッチ
        this.directionX = false;
        this.directionY = false;
        //タイマーの初期化
        this.timer = 0;
    },
    
    onCollisionEnter: function(other, self) {
        //相手を破壊
        other.node.destroy();
        //モンスターのhp-1
        this.hpNum -= 1;
    },
    
    beamAttack: function() {
        //beamPrefabよりbeamを生成
        this.beam = cc.instantiate(this.beamPrefab);
        //新しく生成したbeamノードをCanvasノードの下に置く
        this.game.node.addChild(this.beam);  
        //生成場所
        this.beam.setPosition(cc.p(this.node.x, this.node.y));  
        //次のbeam発射までの時間
        this.beamTime = Math.random()*2;
        //タイマーの初期化
        this.timer = 0;
        //プレイヤーに向けて攻撃
        var attack = cc.moveBy(60, cc.p(this.game.player.x * 100, this.game.player.y * 100));
        this.beam.runAction(attack);
    },    
    
    update: function (dt) {
        //タイマーがビーム発射時間を超えたら
        if(this.timer > this.beamTime) {
            //ビーム発射
            this.beamAttack();
            cc.audioEngine.playEffect(this.beamSound, false);
        }        
        //hpが0になったら破壊しスコアアップ
        if(this.hpNum === 0) {
            this.showExprosion();
            this.node.destroy();
            this.game.gainScore4();
            cc.audioEngine.playEffect(this.downSound, false);
        }
        //進む速度が常に変わる
        var move = Math.floor(Math.random()*10);
        //動きまわる動作
        //x座標
        if(this.directionX === false) {
            this.node.x += move;
        }else if(this.directionX) {
            this.node.x -= move;
        }
        //y座標
        if(this.directionY === false) {
            this.node.y += move;
        }else if(this.directionY) {
            this.node.y -= move;
        }        
        //x方向変換
        if(this.node.x > 430) {
            this.directionX = true;
        }else if(this.node.x < -430) {
            this.directionX = false;
        }
        //y方向変換
        if(this.node.y > 270) {
            this.directionY = true;
        }else if(this.node.y < -270) {
            this.directionY = false;
        }        
        //まわる動作
        this.node.rotation += 2;
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
