/**
 * Created by Administrator on 2017/6/13 0013.
 */
var game={
    data:[],//单元格中的所有数字
    score:0,
    state:1,
    RUNNING:1,
    GAME_OVER:0,
    PLAYING:2,//动画正在播放中
    start:function(){//启动游戏时调用
        this.data=[ [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0] ];
        //在两个随机位置生成2或4
        this.score=0;
        this.state=this.RUNNING;
        var div=document.getElementById("gameOver");
        div.style.display="none";
        this.randomNum();
        this.randomNum();
        //document.write(this.data.join("<br/>"));
        this.updateView();
    }