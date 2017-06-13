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
    },
    isFull:function(){//判断是否已满
        /*遍历data数组，
         只要发现==0，就返回false
         如果退出循环，就返回true*/
        for(var row=0;row<4;row++){//this.data.length=4
            for(var col=0;col<4;col++){//this.data[row].length=4
                if(this.data[row][col]==0){
                    return false;
                }
            }
        }
        return true;

    }