$(document).ready(function(){
    //let person = prompt("Hello Gamer, please enter your name:", "New Gamer");
    person = "";
    if (person == null || person == "") {
        person = "Gamer";
    } else {
        person = person;
    }

    /*    First Canvas to contain game    */
    let canvas = document.createElement('canvas');
    canvas.className = "canvas";
    canvas.id = "canvas";
    $("#canvas-body").append(canvas);
    $("#canvas").wrap("<div id='canvasWrapper' class='canvas-wrapper'></div>");

    /*    Divider    */
    let divider = document.createElement('div');
    divider.className = "divider";
    $("#canvas-body").append(divider);

    /*    Second Canvas to contain score and others    */
    let gameCanvas = document.createElement('canvas');
    gameCanvas.className = "game-canvas";
    gameCanvas.id = "gameCanvas";
    $("#canvas-body").append(gameCanvas);
    $("#gameCanvas").wrap("<div id='gameCanvasWrapper' class='canvas-wrapper' style='float:right'></div>");

    function generateBallColor(){
        let colors = ["#09568d", "#801788", "#457725", "#686b69", "#ffbb00", "#f0c282", "#ce3500", "#901E1D", "#421814", "#122b3e"];
        let random = colors[Math.floor(Math.random() * colors.length)]
        return random;
    }

    let floatingBallsHeight = ($('#canvasWrapper').height() - 63) + "px";
    let floatingBallsWidth = ($('#canvasWrapper').width() - 63) + "px";
    //console.log(floatingBallsWidth);

    let floatingBalls = document.createElement('div');
    $(floatingBalls).attr({class:"floatingBalls", id:"floatingBalls"});
    $(floatingBalls).css({"width":floatingBallsWidth, "height":floatingBallsHeight});
    $("#canvasWrapper").append(floatingBalls);

    let gameBox = document.createElement('div');
    $(gameBox).attr({class:"gameBox", id:"gameBox"});
    $("#gameCanvasWrapper").append(gameBox);

    let innerBoxHi  = ($('#gameBox').height() * 0.45) + "px";
    let innerBoxH  = ($('#gameBox').height() * 0.3) + "px";
    //let innerBoxW  = ($('#gameBox').width() / 3) + "px";
    
    let topGameBox = document.createElement('div');
    $(topGameBox).attr({class:"topGameBox", id:"topGameBox"});
    $(topGameBox).css({"height":innerBoxHi});
    $("#gameBox").append(topGameBox);

    let midGameBox = document.createElement('div');
    $(midGameBox).attr({class:"midGameBox", id:"midGameBox"});
    $(midGameBox).css({"height":innerBoxH});
    $("#gameBox").append(midGameBox);
    
    //$('#midGameBox').hide();

    let downGameBox = document.createElement('div');
    $(downGameBox).attr({class:"downGameBox", id:"downGameBox"});
    $(downGameBox).css({"height":innerBoxH});
    $("#gameBox").append(downGameBox);

    
    let resetGameDiv = document.createElement('div');
    $(resetGameDiv).attr({class:"resetGameDiv", id:"resetGameDiv"});
    $(resetGameDiv).html('<a class="reset">RESTART GAME</a>')
    $("#topGameBox").append(resetGameDiv); 

    let round = 1, score = 0;

    let topGameDiv = document.createElement('div');
    $(topGameDiv).attr({class:"topGameDiv", id:"topGameDiv"});
    $(topGameDiv).html("<b>Difficulty: </b> Easy<br/><span style=color:red><b>Round: </b>"+round+"</span>");
    $("#topGameBox").append(topGameDiv);

    let topGameDivR = document.createElement('div');
    $(topGameDivR).attr({class:"topGameDivR", id:"topGameDivR"});
    $(topGameDivR).html('<b>Player: </b>'+person+'<br/><span style=color:red><b>Score: </b>'+score+'</span>');
    $("#topGameBox").append(topGameDivR);

    let topGameDivB = document.createElement('div');
    $(topGameDivB).attr({class:"topGameDivB", id:"topGameDivB"});
    $(topGameDivB).html('<span class=title>How To Play</span><br>Click the Color Ball to POP it<br/>POP ball before timer runs down to get 5 points<br/>Click PLAY to start the game, REPLAY to continue game after timer runs down');
    $("#topGameBox").append(topGameDivB);

    let midGameDivL = document.createElement('div');
    $(midGameDivL).attr({class:"midGameDivL", id:"midGameDivL"});
    $("#midGameBox").append(midGameDivL);

    let midGameDivR = document.createElement('div');
    $(midGameDivR).attr({class:"midGameDivR", id:"midGameDivR"});
    $("#midGameBox").append(midGameDivR);

    let pop = document.createElement('p');
    $(pop).attr({class:"pop", id:"pop"});
    $(pop).html('P O P');
    $("#midGameDivL").append(pop);
    
    let popin = document.createElement('p');
    $(popin).attr({class:"popin", id:"popin"});
    $(popin).html('I N');
    $("#midGameDivL").append(popin);

    let popball = document.createElement('div');
    $(popball).attr({class:"popball qBallBox", id:"popball"});
    $("#midGameDivL").append(popball);

    let timer = document.createElement('p');
    $(timer).attr({class:"timer", id:"timer"});
    $(timer).html('00 : 00');
    $("#midGameDivR").append(timer);

    function timeCount(){
        var now = new Date().getTime();
        var countDownDate = now + (1000 * 10)
        var x = setInterval(function() {
            var now = new Date().getTime();
            let distance = countDownDate - now;
            //var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var minutes = '00';
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            let prefix;
            (seconds < 10) ? prefix = '0' : prefix = '';
            $("#timer").html(minutes + " : " + prefix + seconds);
            
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "TIME UP!";
                $("#timer").css({"fontSize":"3.5em", "marginTop":"1.15em"});
                $("#midGameDivL #qBallOut").hide();
                clearInterval(interval);
                $('#resetButton').show();
            }
            
        }, 1000);
    }

    let downGameDiv = document.createElement('div');
    $(downGameDiv).attr({class:"downGameDiv", id:"downGameDiv"});
    $(downGameDiv).html('<a id=playButton class=playButton>PLAY</a><a id=resetButton class=resetButton>REPLAY</a>')
    $("#downGameBox").append(downGameDiv);       

    $('#resetButton').hide();
    

    function generatePosition(){
        let canvasWidth = $("#floatingBalls").width();
        let ballPositionX  = Math.floor(canvasWidth * Math.random());
        let canvasHeight = $("#floatingBalls").height();
        let ballPositionY  = Math.floor(canvasHeight * Math.random());
        let position = [ballPositionX, ballPositionY];

        return position;
    }
    //console.log(generatePosition());

    function createQBall(){
        let color = generateBallColor();
        let qBallBox = document.createElement('div');
        $(qBallBox).attr({class:"qBallBox", id:"qBallBox"});

        let qBallOut = document.createElement('div');
        $(qBallOut).attr({class:"qBallOut", id:"qBallOut"});
        $(qBallOut).css({'background-color':color, 'color':color});

        let qBallIn = document.createElement('div');
        $(qBallIn).attr({class:"qBallIn", id:"qBallIn"});
        $(qBallIn).css({'background-color':color, 'color':color});
        
         $("#popball").append(qBallBox);
        return $("#qBallBox").append(qBallOut, qBallIn);
        
    }
    
    //createQBall();
    var qBallColorHex;
    function rgb2hex(orig){
        var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
        return (rgb && rgb.length === 4) ? "#" +
         ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
         ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
       }

    function randomQBall(){
        let i, balls = 1;
        let colorBox = [];
        let colorString = '', search;
        let boxLength = colorBox.length;
        let j, ballColor, found, counter=0;
        while(counter<10){
            let gBall = generateBallColor();
            let findColor = colorString.indexOf(gBall);
            
            if(findColor >= 0){
                continue;
            }
            
            ballColor = gBall;
            colorString = gBall + '_' + colorString;
            
            if(qBallColorHex === ballColor){
                search = "Found";
            }
            else{
                search = "";
            }

            let bPosition = generatePosition();
            let qBallBox = document.createElement('div');
            $(qBallBox).attr({class:"qBallBox", id:"qBallBox"+counter});
            $(qBallBox).css({'margin-left':bPosition[0]+'px', 'margin-top':bPosition[1]+'px'});

            let qBallOut = document.createElement('div');
            $(qBallOut).attr({class:"qBallOut", id:"qBallOut"});
            $(qBallOut).css({'background-color':ballColor, 'color':ballColor});

            let qBallIn = document.createElement('div');
            $(qBallIn).attr({class:"qBallIn qBallIn"+search, id:"qBallIn"});
            $(qBallIn).css({'background-color':ballColor, 'color':ballColor});

            $("#floatingBalls").prepend(qBallBox);
            $("#qBallBox"+counter).append(qBallOut, qBallIn);
            // $("#floatingBalls").append(generateBallColor());

            counter++;
        }
    }
    randomQBall();

    var goingup = [];
    var goingleft = [];
    let f, delay = 200;

    for(f=0; f<10; f=f+2){
        goingup[f] = 'yes';
        goingleft[f] = 'yes';
        goingup[f+1] = 'no';
        goingleft[f+1] = 'no';
    }
    
    function changePosition() {
        let step = 5, height, width;
        let xPos, yPos, key;
        let name = navigator.appName;
        
        if(name == "Microsoft Internet Explorer") name = true;
        else name = false;
        
        if(name) {
            width = document.getElementById('floatingBalls').clientWidth;
            height = document.getElementById('floatingBalls').clientHeight;
        }
        else {
            height = $('#floatingBalls').innerHeight();
            width = $('#floatingBalls').innerWidth();
        }

        for(key = 0; key < 10; key++){
            let keyID = '#qBallBox'+key

            if(name) {
                yPos = parseInt(document.getElementById('qBallBox'+key).style.marginTop);
                xPos = parseInt(document.getElementById('qBallBox'+key).style.marginLeft);
            }
            else {
                yPos = parseInt($(keyID).css("margin-top"));
                xPos = parseInt($(keyID).css("margin-left"));
            }

            if(yPos > 0 && yPos < height) {
                if(goingup[key] === 'yes'){
                    $(keyID).css("margin-top", yPos-step)
                    yPos = $(keyID).css("margin-top");
                }
                else if(goingup[key] === 'no'){
                    $(keyID).css("margin-top", yPos+step)
                    yPos = $(keyID).css("margin-top");
                }
            }
            
            else if (yPos <= 0) {
                goingup[key] = 'no';

                $(keyID).css("margin-top", yPos+step)
                yPos = $(keyID).css("margin-top");
            }
            else if (yPos >= height){
                $(keyID).css("margin-top", yPos-step)
                yPos = $(keyID).css("margin-top");
                goingup[key] = 'yes';
            }
            
            if(xPos > 0 && xPos < width) {
                if(goingleft[key] === 'yes'){
                    $(keyID).css("margin-left", xPos-step)
                    xPos = $(keyID).css("margin-left");
                }
                else if(goingleft[key] === 'no'){
                    $(keyID).css("margin-left", xPos+step)
                    xPos = $(keyID).css("margin-left");
                }
            }
            else if (xPos <= 0) {
                goingleft[key] = 'no';

                $(keyID).css("margin-left", xPos+step)
                xPos = $(keyID).css("margin-left");
            }
            else if (xPos >= width){
                $(keyID).css("margin-left", xPos-step)
                xPos = $(keyID).css("margin-left");
                goingleft[key] = 'yes';
            }
            
        }
        
    }
    
    var interval, qBallColor;
    function currentTimer(){
            
        $('#floatingBalls .qBallInFound').click(function(){
            let timeNow = $('#timer').html().split(":");
            timeNow = parseInt(timeNow[1]);
            console.log(timeNow);   
            if(timeNow>0){
                let colorThis = $(this).css("color");
                console.log(colorThis);
                if(colorThis === qBallColor){
                    console.log('Yeesssss!');
                    score = score + 5;
                    $(topGameDivR).html('<b>Player: </b> '+person+'<br/><span style=color:red><b>Score: </b>'+score+'</span>');
                    $("#floatingBalls .qBallInFound").attr("class","qBallIn");

                    $('#midGameDivL > #qBallBox').empty();
                    createQBall();

                    var newBallColor = $('#qBallBox > #qBallIn').css("color");
                    $("#floatingBalls #qBallIn[style*='background-color: "+newBallColor+"']").attr("class","qBallIn qBallInFound");
                    
                    qBallColor = newBallColor;
                    return currentTimer();
                }
                else{
                    console.log('Ooopps!');
                    return currentTimer();
                }
            }
            else{
                console.log('Time Up!');
            }
        }); 
            
    }

   $('#playButton').click(function(){
        //$('#midGameBox').show();
        interval = setInterval(changePosition, delay);
        $('#midGameDivL').children().last().replaceWith(createQBall());
                
        qBallColor = $('#qBallBox > #qBallIn').css("color");
        console.log(qBallColor);
        qBallColorHex = rgb2hex(qBallColor);

        $('#floatingBalls').empty();
        randomQBall();
        
        $(this).hide();
        
        timeCount();
        currentTimer();

        
    
    });
    
    $('#resetButton').click(function(){
        interval = setInterval(changePosition, delay);
        round = round + 1;
        $(topGameDiv).html("<b>Difficulty: </b> Easy<br/><span style=color:red><b>Round: </b>"+round+"</span>");
        
        $('#midGameDivL > #qBallBox').empty();
        createQBall();
        
        qBallColor = $('#qBallBox > #qBallIn').css("color");
        console.log(qBallColor);
        qBallColorHex = rgb2hex(qBallColor);

        $('#floatingBalls').empty();
        randomQBall();
        
        timeCount();
        currentTimer();
        
        $(this).hide();
        //$('#resetButton').show();

        

        /* $('#midGameDivL').children().last().remove();
        $("#midGameDivL").append(popball);
        //$('#midGameBox').hide();
        clearInterval(interval);
        console.log(interval)
        $(this).hide();
        $('#playButton').show(); */
    });

    $('#resetGameDiv').click(function(){
        let restart = confirm("Hey "+person+", you will lose your current game and score of "+score+" points!\n\n\t\t\t\tDo you still want to restart game?");
        if( restart == true ) {
            location.reload();
            return true;
        } else {
            return false;
        }
    });

    
});