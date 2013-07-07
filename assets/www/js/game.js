jQuery(document).ready(function($){
	
    init();

    $('.next-question').click(function(){
        if(questionIndex < 12 && answered){                        
            init();            
            question();   
            answered = false;
        } 
        if(questionIndex == 11){
            $('.next-question').hide();           
        }       
    });
    
    $('.total-marks').click(function(){
    	var msg;
    	if(score > 10){
    		msg = "Your score is " + score + "/12. Excellent job." 
    		$('.my-score').text(msg);
    		$('.my-score').addClass("alert").addClass("alert-success");
    		
    	} else if(score >= 8 && score <= 10){
    		msg = "Your score is " + score + "/12. Good job."
    		$('.my-score').text(msg);
    		$('.my-score').addClass("alert").addClass("alert-info");
    	} else {
    		msg = "Your score is " + score + "/12. Try again."
    		$('.my-score').text(msg);
    		$('.my-score').addClass("alert").addClass("alert-error");
    	}
    });
    
    question();    
});


var questionIndex = 0;
var multipliees = shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);
var answer = 0;
var score = 1;
var answered = false;

function init(){
    $('.draggable').remove();
    $('.answer-box-container').append('<div class="draggable number-box number" onclick="void(0)"><span class="answer-given one"></span></div>');
    $('.answer-box-container').append('<div class="draggable number-box number" onclick="void(0)"><span class="answer-given two"></span></div>');
    $('.answer-box-container').append('<div class="draggable number-box number" onclick="void(0)"><span class="answer-given three"></span></div>');
    $('.answer-box-container').append('<div class="draggable number-box number" onclick="void(0)"><span class="answer-given four"></span></div>');    

    $('#correct').hide();
    $('#incorrect').hide();

    $('.draggable').draggable();
    $('#droppybox').droppable({
        drop: function(event, ui){
            $(this).removeClass('vacant').addClass('occupied');
            $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
            disableAnswering();
            checkAnswer(this);
            answered = true;
        }
    }); 
}

function checkAnswer(elem){
    var selectedAns = $(elem).children('.draggable ').children('.answer-given').text();
    if(selectedAns == answer){
        $('#correct').show();
        $('#incorrect').hide();
        score = score + 1;
    } else {
        $('#correct').hide();
        $('#incorrect').show();        
        highlighCorrectAnswer();
    }
    if(questionIndex == 11){
        $('.total-marks').removeClass('hidden'); 
    }
};

function highlighCorrectAnswer(){
    $.each($('.answer-given'), function(){
        if($(this).text() == answer){
            $(this).parent().css('background-color', '#00FF00');
        }
    });
}

function disableAnswering(){
    $('.draggable').draggable('disable');    
};

function enableAnswering(){
    $('.draggable').draggable('enable');    
};

function question(){
    var multiplier = getParameterByName('multiplier');
    var multipliee = multipliees[questionIndex];
    questionIndex = questionIndex + 1;
    answer = parseInt(multiplier) * parseInt(multipliee);

    askQuestion(multiplier, multipliee);
    var answers = getSuggestions(multiplier, multipliee);

    $('.answer-given.one').text(answers[0]);
    $('.answer-given.two').text(answers[1]);
    $('.answer-given.three').text(answers[2]);
    $('.answer-given.four').text(answers[3]);
};

function askQuestion(multiplier, multipliee){
    $('.multiplier').text(multiplier);
    $('.multipliee').text(multipliee);
};

function getSuggestions(multiplier, multipliee){
    var answers = [];
    var ans = parseInt(multiplier) * parseInt(multipliee);
    answers.push(ans);

    $.each(multipliees, function(i, val){
        if(val != multipliee){
            answers.push(parseInt(multiplier) * parseInt(val));
            if(answers.length == 4){
                return false;
            }
        }        
    });
    return shuffle(answers);
};

function shuffle(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function getParameterByName(name){

    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)", 
        regex = new RegExp( regexS ),
        results = regex.exec( window.location.href );
    
    if( results == null ){
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
};