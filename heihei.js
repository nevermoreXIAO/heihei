/**
 * Created by Administrator on 2017/6/13 0013.
 */
var game={
    data:[],//��Ԫ���е���������
    score:0,
    state:1,
    RUNNING:1,
    GAME_OVER:0,
    PLAYING:2,//�������ڲ�����
    start:function(){//������Ϸʱ����
        this.data=[ [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0] ];
        //����������λ������2��4
        this.score=0;
        this.state=this.RUNNING;
        var div=document.getElementById("gameOver");
        div.style.display="none";
        this.randomNum();
        this.randomNum();
        //document.write(this.data.join("<br/>"));
        this.updateView();
    },
    isFull:function(){//�ж��Ƿ�����
        /*����data���飬
         ֻҪ����==0���ͷ���false
         �����˳�ѭ�����ͷ���true*/
        for(var row=0;row<4;row++){//this.data.length=4
            for(var col=0;col<4;col++){//this.data[row].length=4
                if(this.data[row][col]==0){
                    return false;
                }
            }
        }
        return true;
    },
    randomNum:function(){//������λ������2��4
        if(this.isFull()){return;}//�������˾Ͳ�������
        /*ѭ��������true
         ������0��3��������һ�����±�row
         ������0��3��������һ�����±�col
         ������λ��==0������ѡ��2��4:����Math.random()<0.5,ѡ2������ѡ4��������λ���˳�ѭ��*/
        while(true){
            var row=Math.floor(Math.random()*(3-0+1)+0);
            var col=Math.floor(Math.random()*(3-0+1)+0);
            if(this.data[row][col]==0){
                /*this.data[row][col]=Math.random()*(1-0+1)+0;
                 if(Math.random()<0.5){
                 this.data[row][col]=2;
                 }else{
                 this.data[row][col]=4;
                 }*/
                this.data[row][col]=Math.random()<0.5?2:4;
                break;
            }
        }
    },
    canLeft:function(){
        /*����ÿ��Ԫ�أ��������г��⣩��ֻҪ��������Ԫ��������==0���ߵ�ǰֵ==����ֵreturn true  ����ѭ������������  return false*/
        for(var row=0;row<4;row++){
            for(var col=1;col<4;col++){
                if(this.data[row][col]!=0){
                    if(this.data[row][col-1]==0||this.data[row][col]==this.data[row][col-1]){
                        return true;
                    }
                }
            }
        }
        return false;
    },
    moveLeft:function(){//ʵ������������
        if(this.canLeft()){//���ж��ܷ�����
            for(var row=0;row<4;row++){
                this.moveLeftInRow(row);
            }
            this.state=this.PLAYING;
            animation.start();
            setTimeout(function(){
                game.state=game.RUNNING;
                game.randomNum();
                game.updateView();

            },animation.times*animation.interval);

        }
    },
    moveLeftInRow:function(row){//����һ��
        /*��0λ�ÿ�ʼ��2��������row���е�ÿ��Ԫ��  ����һ����һ����Ϊ0��Ԫ�ص�nextCol�±�
         ����nextCol==-1��break��
         �������жϺϲ�
         �����Լ�==0������һ��Ԫ�ص�ֵ�滻�Լ�������һ��Ԫ�ص�ֵ��Ϊ0����col����ԭ�أ�col--
         �����Լ�==��һ��Ԫ�� ���Լ�*2�� ����һ��Ԫ����Ϊ0*/
        for(var col=0;col<=2;col++){
            var nextCol=this.getNextRight(row,col);
            if(nextCol==-1){
                break;
            }else{
                if(this.data[row][col]==0){
                    this.data[row][col]=this.data[row][nextCol];
                    this.data[row][nextCol]=0;
                    animation.addTask(""+row+nextCol,""+row+col);
                    col--;

                }else if(this.data[row][col]==this.data[row][nextCol]){
                    this.data[row][col]*=2;
                    this.score+=this.data[row][col];
                    this.data[row][nextCol]=0;
                    animation.addTask(""+row+nextCol,""+row+col);
                }
            }
        }
    },
    getNextRight:function(row,col){//���õ�ǰ���У�ָ��λ���Ҳ���һ����Ϊ0������������һ��Ϊ0������λ��
        /*������ǰλ���Ҳ�ÿ��Ԫ��	ֻҪ���֣�=0�ģ��ͷ�����λ���±�nextCol �˳�ѭ��������-1*/
        for(var i=col+1;i<4;i++){
            if(this.data[row][i]!=0){
                return i;
            }
        }
        return -1;
    },
    canRight:function(){//�ж��ܷ�����
        for(var row=0;row<4;row++){
            for(var col=2;col>=0;col--){
                if(this.data[row][col]!=0){
                    if(this.data[row][col+1]==0||this.data[row][col]==this.data[row][col+1]){
                        return true;
                    }
                }
            }
        }
        return false;
    },
    moveRight:function(){//�����ƶ�������
        if(this.canRight()){
            for(var row=0;row<4;row++){
                this.moveRightInRow(row);
            }
            this.state=this.PLAYING;
            animation.start();
            setTimeout(function(){
                game.state=game.RUNNING;
                game.randomNum();
                game.updateView();

            },animation.times*animation.interval);
        }
    },
    moveRightInRow:function(row){//���Ƶ�ǰ��
        /*���������������飬��������Ԫ�س��⣩*/
        for(var col=3;col>0;col--){
            var nextCol=this.getNextLeft(row,col);
            if(nextCol==-1){
                break;
            }else{
                if(this.data[row][col]==0){
                    this.data[row][col]=this.data[row][nextCol];
                    this.data[row][nextCol]=0;
                    animation.addTask(""+row+nextCol,""+row+col);
                    col++;
                }else if(this.data[row][col]==this.data[row][nextCol]){
                    this.data[row][col]*=2;
                    this.score+=this.data[row][col];
                    this.data[row][nextCol]=0;
                    animation.addTask(""+row+nextCol,""+row+col);
                }
            }
        }
    },
    getNextLeft:function(row,col){
        /*�ӵ�ǰλ������������һ����Ϊ0����*/
        for(var i=col-1;i>=0;i--){
            if(this.data[row][i]!=0){
                return i;
            }
        }
        return -1;
    },
    canUp:function(){
        for(var row=1;row<4;row++){
            for(var col=0;col<4;col++){
                if(this.data[row][col]!=0){
                    if(this.data[row-1][col]==0||this.data[row][col]==this.data[row-1][col]){
                        return true;
                    }
                }
            }
        }
        return false;
    },
    moveUp:function(){
        if(this.canUp()){//���ж��ܷ�����
            for(var col=0;col<4;col++){
                this.moveUpInCol(col);
            }
            this.state=this.PLAYING;
            animation.start();
            setTimeout(function(){
                game.state=game.RUNNING;
                game.randomNum();
                game.updateView();

            },animation.times*animation.interval);
        }
    },
    moveUpInCol:function(col){
        for(var row=0;row<3;row++){
            var nextRow=this.getNextDown(row,col);
            if(nextRow==-1){
                break;
            }else{
                if(this.data[row][col]==0){
                    this.data[row][col]=this.data[nextRow][col];
                    this.data[nextRow][col]=0;
                    animation.addTask(""+nextRow+col,""+row+col);
                    row--;
                }else if(this.data[row][col]==this.data[nextRow][col]){
                    this.data[row][col]*=2;
                    this.score+=this.data[row][col];
                    this.data[nextRow][col]=0;
                    animation.addTask(""+nextRow+col,""+row+col);
                }
            }
        }
    },
    getNextDown:function(row,col){
        for(var i=row+1;i<4;i++){
            if(this.data[i][col]!=0){
                return i;
            }
        }
        return -1;
    },
    canDown:function(){//�ж��ܷ�����
        for(var row=0;row<3;row++){
            for(var col=0;col<4;col++){
                if(this.data[row][col]!=0){
                    if(this.data[row+1][col]==0||this.data[row][col]==this.data[row+1][col]){
                        return true;
                    }
                }
            }
        }
        return false;
    },
    moveDown:function(){//�����ƶ�������
        if(this.canDown()){
            for(var col=0;col<4;col++){
                this.moveDownInCol(col);
            }
            this.state=this.PLAYING;
            animation.start();
            setTimeout(function(){
                game.state=game.RUNNING;
                game.randomNum();
                game.updateView();

            },animation.times*animation.interval);
        }
    },
    moveDownInCol:function(col){//���Ƶ�ǰ��
        /*���������������飬��������Ԫ�س��⣩*/
        for(var row=3;row>0;row--){
            var nextRow=this.getNextUp(row,col);
            if(nextRow==-1){
                break;
            }else{
                if(this.data[row][col]==0){
                    this.data[row][col]=this.data[nextRow][col];
                    this.data[nextRow][col]=0;
                    animation.addTask(""+nextRow+col,""+row+col);
                    row++;
                }else if(this.data[row][col]==this.data[nextRow][col]){
                    this.data[row][col]*=2;
                    this.score+=this.data[row][col];
                    this.data[nextRow][col]=0;
                    animation.addTask(""+nextRow+col,""+row+col);
                }
            }
        }
    },
    getNextUp:function(row,col){
        /*�ӵ�ǰλ������������һ����Ϊ0����*/
        for(var i=row-1;i>=0;i--){
            if(this.data[i][col]!=0){
                return i;
            }
        }
        return -1;
    },
    /*����Ϸ�����������µ�ҳ����*/
    updateView:function(){
        /*step1.������ά�����е�ÿ��Ԫ��
         step2���ҵ���ǰԪ�ض�Ӧ��div
         ƴdiv��id��c+row+col
         var div=document.getElementById(id)��
         step3������ǰԪ�ص�ֵ����div��
         ������ǰֵ==0���ͷ��롰����div.innerHTML=?
         �������뵱ǰֵ
         step4�����ݵ�ǰԪ��ֵ�޸�div��ʽ��
         div.className="����";
         ������ǰֵ==0��className=��cell����
         ����className=��cell n��+��ǰֵ*/
        for(var row=0;row<4;row++){
            for(var col=0;col<4;col++){
                var div=document.getElementById("c"+row+col);
                /*if(this.data[row][col]==0){
                 div.innerHTML="";
                 }else{
                 div.innerHTML=this.data[row][col];
                 }*/
                div.innerHTML=this.data[row][col]==0?"":this.data[row][col];
                /*	if(this.data[row][col]==0){
                 div.className="cell";
                 }else{
                 div.className="cell n"+this.data[row][col];
                 }*/
                div.className=this.data[row][col]==0?"cell":"cell n"+this.data[row][col];
                /*����������span*/
            }
        }
        /*����������span*/
        var span=document.getElementById("score");
        span.innerHTML=this.score;
        /*�ж���Ϸ����
         ������Ϸ������this.state=GAME_OVER
         ��ʾ��Ϸ����div
         �ҵ�gameOverdiv
         �޸�div��style.display*/
        if(this.isGameOver()){
            this.state=this.GAME_OVER;
            var div=document.getElementById("gameOver");
            var finalSocre=document.getElementById("finalScore");
            finalSocre.innerHTML=this.score;
            div.style.display="block";
        }
        /*if(this.state==this.RUNNING){
         var div=document.getElementById("gameOver");
         div.style.display="none";
         }*/
    },

    isGameOver:function(){//�ж���Ϸ�Ƿ�����
        /*�ܼ���ʱ����false�����򷵻�true*/
        if(!this.isFull()){return false;}
        /*�Ѿ�����*/	/*if(this.canLeft()||this.canRight()||this.canUp()||this.canDown()){return false;}
         else{return ture;}*/
        for(var row=0;row<4;row++){
            for(var col=0;col<4;col++){
                //if(this.data[row][col==0]){return false;}
                if(col<3){/*�����Ҳ�����*/
                    if(this.data[row][col]==this.data[row][col+1]){
                        return false;
                    }
                }
                if(row<3){/*�����·�����*/
                    if(this.data[row][col]==this.data[row+1][col]){
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
//�����ڼ��غ󣬵���game������start����
window.onload=function(){//�¼���������
    game.start();
    //console.log(game.moveLeftInRow(0));
    document.onkeydown=function(){
        /*step1���Ȼ����¼�������
         �����¼�����ʱ�����Զ�����һ��event����
         event�����з�װ���¼���Ϣ�����磺���������꣬�����¼���Ԫ�أ������ı���
         step2�������¼������еİ�������
         ������37�ţ��͵���moveLeft
         */
        if(game.state!=game.PLAYING){
            var event=window.event||arguments[0];//||�������ڽ�������������������
            if(game.state==game.RUNNING){
                if(event.keyCode==37){
                    game.moveLeft();
                }else if(event.keyCode==39){
                    game.moveRight();
                }
                else if(event.keyCode==38){
                    game.moveUp();
                }
                else if(event.keyCode==40){
                    game.moveDown();
                }
            }else if(event.keyCode==13){
                game.start();
            }
        }
    }
}

// animation
function Task(obj,topStep,leftStep){
    this.obj=obj;
    this.topStep=topStep;
    this.leftStep=leftStep;
}
/*moveStep��������ǰԪ�ض����ƶ�һ��*/
Task.prototype.moveStep=function(){
    var style=getComputedStyle(this.obj,null);
    var top=parseInt(style.top);
    var left=parseInt(style.left);
    this.obj.style.top=top+this.topStep+"px";
    this.obj.style.left=left+this.leftStep+"px";
}
/*����Ԫ�ض�������ʽ��ʹ�䷵��ԭ��*/
Task.prototype.clear=function(){
    this.obj.style.left="";
    this.obj.style.top="";
}
var animation={
    times:10,//ÿ������10������
    interval:10,//10������һ��
    timer:null,//���涨ʱ��id������
    tasks:[],//����ÿ����Ҫ�ƶ�������

    addTask:function(source,target){
        console.log(source+","+target);
        var sourceDiv=document.getElementById("c"+source);
        var targetDiv=document.getElementById("c"+target);
        var sourceStyle=getComputedStyle(sourceDiv);
        var targetStyle=getComputedStyle(targetDiv);
        var topStep=(parseInt(targetStyle.top)-parseInt(sourceStyle.top))/this.times;
        var leftStep=(parseInt(targetStyle.left)-parseInt(sourceStyle.left))/this.times;
        var task=new Task(sourceDiv,topStep,leftStep);
        this.tasks.push(task);
    },

    start:function(){
        this.timer=setInterval(function(){
            for(var i=0;i<animation.tasks.length;i++){
                animation.tasks[i].moveStep();
            }
            animation.times--;
            if(animation.times==0){
                for(var i=0;i<animation.tasks.length;i++){
                    animation.tasks[i].clear();
                }
                clearInterval(animation.timer);
                animation.timer=null;
                animation.tasks=[];
                animation.times=10;
            }
        },this.interval);
    }
}