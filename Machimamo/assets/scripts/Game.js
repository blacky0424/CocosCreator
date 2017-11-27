cc.Class({
    extends: cc.Component,

    properties: {
        //BomPrefabの設定
        bomPrefab: {
            default: null,
            type: cc.Prefab
        },
        //bulletPrefabの設定
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        //missilePrefabの設定
        missilePrefab: {
            default: null,
            type: cc.Prefab
        },
        //monster1Prefabの設定
        monster1Prefab: {
            default: null,
            type: cc.Prefab
        },
        //monster2Prefabの設定
        monster2Prefab: {
            default: null,
            type: cc.Prefab
        },
        //monster3Prefabの設定
        monster3Prefab: {
            default: null,
            type: cc.Prefab
        },        
        //coinPrefabの設定
        coinPrefab: {
            default: null,
            type: cc.Prefab
        },
        //hpPrefabの設定
        hpPrefab: {
            default: null,
            type: cc.Prefab
        },
        //pPrefabの設定
        pPrefab: {
            default: null,
            type: cc.Prefab
        },        
        //地面の設定
        background: {
            default: null,
            type: cc.Node
        },
        //playerの設定
        player: {
          default: null,
          type: cc.Node
        },
        //hpLabelの設定
        hpDisplay: {
            default: null,
            type: cc.Label
        },
        //scoreの設定
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        //hpの初期値
        hp: 0,
    },

    onLoad: function () {
        //hpの残数
        this.hpNum = this.hp;
        //hpの表示
        this.hpDisplay.string = this.hpNum.toString();
        //playerの力
        this.power = 0;
        //タイマー
        this.timer1 = 0;
        this.timer2 = 0;
        this.timer3 = 0;
        this.timer4 = 0;
        this.timer5 = 1;
        this.timer6 = 1;
        this.timer7 = 0;
        //ボム複製フラグ
        this.bomFlag = true;
        //bom複製までの時間
        this.bomTime = 0;
        //missile複製までの時間
        this.missileTime = 10;
        //coin複製までの時間
        this.coinTime = 0;
        //monster1召喚フラグ
        this.monster1Flag = true;
        //monster2召喚フラグ
        this.monster2Flag = true;
        //monster3召喚フラグ
        this.monster3Flag = true; 
        //スコアの初期化
        this.score = 0;
        //Playerにコンポーネント
        this.player.getComponent('Player').game = this;
    },
    
    spawnNewBom: function() {
        //bomPrefabよりbomを生成
        var newBom = cc.instantiate(this.bomPrefab);
        //新しく生成したbomノードをcanvasノードの下に置く
        this.node.addChild(newBom);
        //bomをランダムな位置に表示
        newBom.setPosition(this.newBomPosition());
        //タイマーの初期化
        this.timer1 = 0;
        //複製までの時間
        //スコアに応じて複製までの時間が変わる
        if(this.score < 3000) {
            this.bomTime = 1 + Math.floor(Math.random()*14);
        }else if(this.score < 8000) {
            this.bomTime = 1 + Math.floor(Math.random()*12);
        }else if(this.score < 15000) {
            this.bomTime = 1 + Math.floor(Math.random()*10);
        }else if(this.score < 20000) {
            this.bomTime = 1 + Math.floor(Math.random()*8);
        }else if(this.score < 30000) {
            this.bomTime = 1 + Math.floor(Math.random()*6);
        }
        //Bomにコンポーネント
        newBom.getComponent('Bom').game = this;  
    },
    
    newBomPosition: function() {
        //ランダムな座標X
        var randX = 0;
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
        //位置を返す
        return cc.p(randX, 360);
    },
    
    spawnNewMissile: function() {
        //missilePrefabよりmissileを生成
        var newMissile = cc.instantiate(this.missilePrefab);
        //新しく生成したmissileノードをcanvasノードの下に置く
        this.node.addChild(newMissile);
        //missileをランダムな位置に表示
        newMissile.setPosition(this.newBomPosition());
        //タイマーの初期化
        this.timer2 = 0;
        //複製までの時間
        //スコアに応じて複製までの時間が変わる
        if(this.score < 5000) {
            this.missileTime = 3 + Math.floor(Math.random()*14);
        }else if(this.score < 10000) {
            this.missileTime = 2 + Math.floor(Math.random()*12);
        }else if(this.score < 15000) {
            this.missileTime = 1 + Math.floor(Math.random()*10);
        }else if(this.score < 20000) {
            this.missileTime = 1 + Math.floor(Math.random()*8);
        }
        //Missileにコンポーネント
        newMissile.getComponent('Missile').game = this;
    },    
    
    spawnNewCoin: function() {
        //coinPrefabよりcoinを生成
        var newCoin = cc.instantiate(this.coinPrefab);
        //新しく生成したcoinノードをcanvasノードの下に置く
        this.node.addChild(newCoin);
        //coinの生成位置
        newCoin.setPosition(this.newBomPosition());
        //タイマーの初期化
        this.timer3 = 0;
        //複製時間をランダムに
        if(this.bomFlag) {
            this.coinTime = Math.floor(Math.random()*20);
        }else if(this.bomFlag === false) {
            this.coinTime = Math.random()*1;
        }
    },
    
    spawnNewHp: function() {
        //hpPrefabよりhpを生成
        var newHp = cc.instantiate(this.hpPrefab);
        //新しく生成したcoinノードをcanvasノードの下に置く
        this.node.addChild(newHp);
        //coinの生成位置
        newHp.setPosition(this.newBomPosition());
        //タイマーの初期化
        this.timer5 = 0;
    },
    
    spawnNewPower: function() {
        //pPrefabよりpを生成
        var newPower = cc.instantiate(this.pPrefab);
        //新しく生成したcoinノードをcanvasノードの下に置く
        this.node.addChild(newPower);
        //coinの生成位置
        newPower.setPosition(this.newBomPosition());
        //タイマーの初期化
        this.timer6 = 0;
    },    
    
    spawnNewMonster1: function() {
        //monster1Prefabよりmonster1を生成
        var newMonster1 = cc.instantiate(this.monster1Prefab);
        //新しく生成したmonster1ノードをcanvasノードの下に置く
        this.node.addChild(newMonster1);
        //monster1の生成位置
        newMonster1.setPosition(0, 400);
        //Monster1にコンポネート
        newMonster1.getComponent('Monster1').game = this;
    },
    
    spawnNewMonster2: function() {
        //monster2Prefabよりmonster2を生成
        var newMonster2 = cc.instantiate(this.monster2Prefab);
        //新しく生成したmonster2ノードをcanvasノードの下に置く
        this.node.addChild(newMonster2);
        //monster2の生成位置
        newMonster2.setPosition(0, 400);
        //Monster2にコンポネート
        newMonster2.getComponent('Monster2').game = this;
    },
    
    spawnNewMonster3: function() {
        //monster3Prefabよりmonster3を生成
        var newMonster3 = cc.instantiate(this.monster3Prefab);
        //新しく生成したmonster3ノードをcanvasノードの下に置く
        this.node.addChild(newMonster3);
        //monster3の生成位置
        newMonster3.setPosition(0, 400);
        //Monster3にコンポネート
        newMonster3.getComponent('Monster3').game = this;
    },    
    
    update: function (dt) {
        //bomFlagがtrueで時間を超えたら新しいbom生成
        if(this.bomFlag && this.timer1 > this.bomTime){
            this.spawnNewBom();
        }
        //bomFlagがtrueで時間を超えたら新しいmissile生成
        if(this.bomFlag && this.timer2 > this.missileTime) {
            this.spawnNewMissile();
        }
        //時間を超えたら新しいcoin生成
        if(this.timer3 > this.coinTime) {
            this.spawnNewCoin();
        }
        //100秒に一度hp生成
        if(this.timer5 > 100) {
            this.spawnNewHp();
        }        
        //20秒に一度p生成
        if(this.timer6 > 20) {
            this.spawnNewPower();
        }
        //ゲーム開始から30秒したらmonster1を生成
        if(this.monster1Flag) {
            if(Math.floor(this.timer7) === 30) {
                this.spawnNewMonster1();
                this.monster1Flag = false;
            }
        }
        //ゲーム開始から90秒したらmonster2を生成
        if(this.monster2Flag) {
            if(Math.floor(this.timer7) === 150) {
                this.spawnNewMonster2();
                this.monster2Flag = false;
            }
        }
        //ゲーム開始から300秒したらmonster3を生成
        if(this.monster3Flag) {
            if(Math.floor(this.timer7) === 300) {
                this.spawnNewMonster3();
                this.monster3Flag = false;
            }
        }        
        //Hpが0になったらゲームオーバー
        if(this.hpNum <= 0) {
            this.gameOver();
        }      
        //タイマー更新
        this.timer1 += dt;
        this.timer2 += dt;
        this.timer3 += dt;
        //bomFlagがfalseなら
        if(this.bomFlag === false) {
            this.timer4 += dt;
        }
        this.timer5 += dt;
        this.timer6 += dt;
        this.timer7 += dt;
        //タイマーが30秒を超えたらゲームクリア画面へ
        if(this.timer4 > 30) {
            this.gameClear();
        }
    },
    
    fire: function() {
        //bulletPerfabよりbulletを生成
        var newBullet = cc.instantiate(this.bulletPrefab);
        //新しく生成したbulletノードをCanvasノードの下に置く
        this.node.addChild(newBullet);
        //bulletをplayerの上に表示
        newBullet.setPosition(cc.p(this.player.x, this.player.y + 52.5));
        newBullet.getComponent('Bullet').game = this;        
    },
    
    gameOver: function() {
        this.player.stopAllActions(); // 『Player』ノードのアクションを停止
        //スコアの保存
        cc.sys.localStorage.setItem('Score', this.score);
        cc.director.loadScene('GameOver'); //GameOverシーンへ
    },    
    
    lose: function() {
        //hp残数の減少
        this.hpNum -= 1;
        //hpDisplayの更新
        this.hpDisplay.string = this.hpNum.toString();
    },        
    
    recovery: function() {
        //hp残数の上昇
        this.hpNum += 1;
        //hpDisplayの更新
        this.hpDisplay.string = this.hpNum.toString();        
    },    
    
    gainScore1: function() {
        //scoreの追加
        this.score += 300;
        //scoreLabelの更新
        this.scoreDisplay.string = "Score: " + this.score.toString();
    },
    
    gainScore2: function() {
        //scoreの追加
        this.score += 3000;
        //scoreLabelの更新
        this.scoreDisplay.string = "Score: " + this.score.toString();
        //monsterFlagをtrueに
        this.monster1Flag = true;

    },  
    
    gainScore3: function() {
        //scoreの追加
        this.score += 5000;
        //scoreLabelの更新
        this.scoreDisplay.string = "Score: " + this.score.toString();
        //monsterFlagをtrueに
        this.monster2Flag = true;        
    },
    
    gainScore4: function() {
        //scoreの追加
        this.score += 10000;
        //scoreLabelの更新
        this.scoreDisplay.string = "Score: " + this.score.toString();
        //monsterFlagをtrueに
        this.bomFlag = false;
    },  

    gainScore5: function() {
        //scoreの追加
        this.score += 100;
        //scoreLabelの更新
        this.scoreDisplay.string = "Score: " + this.score.toString();
    },        
    
    gameClear: function() {
        //スコアの保存
        cc.sys.localStorage.setItem('Score', this.score);
        //GameClearSceneへ
        cc.director.loadScene('GameClear');
    }
});
