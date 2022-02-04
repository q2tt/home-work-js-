$(document).ready(function(){

    // table
    var pieces = createPieces(true);
    $('.box1').html(pieces);
    function createPieces(withImage){
        var rows = 4, columns = 4;
        var pieces = "";
            for( var i=0, top=0, order=0; i<rows; i++, top-=100){
                for( var j=0, left=0; j<columns; j++, left-=100, order++){
                    if(withImage){
                         pieces += "<div style='background-position:" + left +"px " + top+"px;' class='piece' data-order=" +order+ "></div>";
                }
                else{
                    pieces += "<div style='background-image: none' class='piece droppableSpase'></div>";
         
                }
            }
        }
        return pieces
    }

    // drag and drob       
    function implementLogic(){
        $(".draggablePiese").draggable({
              revert:"invalid",
            start: function(){
                if($(this).hasClass("droppedPiese")){
                    $(this).removeClass("droppedPiese");
                    $(this).parent().removeClass("piecePresent")
                }
            }
        });
        $(".droppableSpase").droppable({
            accept:function(){
                return!$(this).hasClass("piecePresent")
            },
            drop:function(event, ui)
            {
                var draggableElement = ui.draggable;
                var droppedOn = $(this);
                droppedOn.addClass("piecePresent");
                $(draggableElement)
                .addClass("droppedPiese")
                .css({
                    top:0,
                    left:0,
                    position:'relative'
                }).appendTo(droppedOn);
            }
        });
    }
    
    // random
    function randomDiv(){
        $('.piece').each(function () {$(this).parent()[Math.random() > 0.5 ? 'parent' : 'append']($(this).show())});  
    }

    //start
    $('.start').on('click', function startGame(){
        var pieces = $(".box1 div");
        pieces.each(function(){
            $(this).addClass("draggablePiese")
            $('.box1').append($(this))
        })
        newGame()
        $('.check').attr("disabled", false);
        $('.min1').addClass('display');
        $('.timer').removeClass('display');
        $('.start').attr("disabled", true);
       
    })
    function newGame(){
        var emptyString = createPieces(false);
        $('.box2').html(emptyString);
        reStart ();
        implementLogic();
    }
    // newGame
    $('.newGame').on('click', function(){
        var pieces = createPieces(true);
        $('.box1').html(pieces);
        newGame();
        $('.check').attr("disabled", true);
        $('.start').attr("disabled", false);
        $('.min1').removeClass('display');
        $('.timer').addClass('display');
        randomDiv();
        stopTimer ();
    })

    // check
    function checkIfPuzzleSolved(){
        if($(".box2 .droppedPiese").length !=16){
                $('.youLost').removeClass('display');
                $('.haveTime').addClass('display');
            return false
        }
        for(var k=0; k<16; k++){
            var item = $(".box2 .droppedPiese:eq("+ k +")");
            var order = item.data("order");
            if(k != order){
                $('.youLost').removeClass('display');
                $('.haveTime').addClass('display');;
                return false;
            }
        }
        $('.wellDone').removeClass('display');
            $('.haveTime').addClass('display');;
        return true;
    }

     //btnCheck
     $('.btnCheck').on('click', function(){
        $('.bGColor').show();
        $('.btnCloseStop').removeClass('display');
        $('.btnClose').addClass('display');
        $('.btnCheck').addClass('display');
        checkIfPuzzleSolved();
        })
        
     //checkBtn1
     $('.check').on('click', function(){
        $('.bGColor').show();
        $('.check').attr("disabled", true);
        stopTimer ();
        $('.stillTime').text(`00:${seconds}`);
    })

    //close!
    $('.btnClose').on('click', function(){
        startTimer();
        $('.bGColor').hide();
        $('.check').attr("disabled", false);
    })

     //btnCloseStop1
    $('.btnCloseStop').on('click', function(){
        $('.bGColor').hide();
        $('.min1').removeClass('display');
        $('.timer').addClass('display');
    })

     //timer
     var setTime;
     var seconds = 60;
     function startTimer(){
        setTime = setInterval(function(){
           seconds = seconds -1;
           $('.sec').text(seconds);
           if(seconds == 0){
            $('.bGColor').show();
            $('.youLost').removeClass('display');
            $('.haveTime').addClass('display');
            $('.btnCheck').addClass('display');
            $('.btnClose').addClass('display');
            $('.btnCloseStop').removeClass('display');
             stopTimer ();
            } 
   
         }, 1000)
     }
    //  startTimer
     function reStart (){
        stopTimer ();
       seconds = 60;
       startTimer();
     }
     function stopTimer (){
       clearInterval(setTime);
   }

})

 