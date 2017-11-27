cc.Class({
    extends: cc.Component,
    //ゲームスタートボタン
    gameStart: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('memo1');
    },
    
    //遊び方ボタン
    howToPlay: function() {
        cc.director.loadScene('howtoplay');
    },
    
    //遊び方２ボタン
    howToPlay2: function() {
        cc.director.loadScene('howtoplay2');
    },    
    
    //タイトルボタン
    title: function() {
        cc.director.loadScene('titlescreen');
    },
    
    memo2: function() {
        cc.director.loadScene('memo2');
    },

    memo3: function() {
        cc.director.loadScene('memo3');
    },

    memo4: function() {
        cc.director.loadScene('memo4');
    },

    memo5: function() {
        cc.director.loadScene('memo5');
    },

    memo6: function() {
        cc.director.loadScene('memo6');
    },    
    
    memo7: function() {
        cc.director.loadScene('memo7');
    },    
    
    memo8: function() {
        cc.director.loadScene('memo8');
    },    
    
    memo9: function() {
        cc.director.loadScene('memo9');
    },    
    
    memo10: function() {
        cc.director.loadScene('memo10');
    },    
    
    //ステージスタートボタン
    start1: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage1');
    },
    
    start2: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage2');
    },
    
    start3: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage3');
    },

    start4: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage4');
    },

    start5: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage5');
    },
    
    start6: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage6');
    },
    
    start7: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage7');
    },    
    
    start8: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage8');
    },
    
    start9: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage9');
    },  

    start10: function() {
        //サウンドストップ
        cc.audioEngine.stopMusic();        
        cc.director.loadScene('stage10');
    },    
});
