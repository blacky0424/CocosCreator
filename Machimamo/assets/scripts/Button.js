cc.Class({
    extends: cc.Component,
    //ボタンによるScene移行Script
    
    gameStart: function() {
        cc.director.loadScene('Shooting');
    },
    
    howto1: function() {
        cc.director.loadScene('HowToPlay1');
    },
    
    howto2: function() {
        cc.director.loadScene('HowToPlay2');
    },
    
    howto3: function() {
        cc.director.loadScene('HowToPlay3');
    },
    
    howto4: function() {
        cc.director.loadScene('HowToPlay4');
    },
    
    title: function() {
        cc.director.loadScene('Title');
    },
});
