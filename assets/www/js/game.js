jQuery(document).ready(function($){

	$('.draggable').draggable();
	$('#droppybox').droppable({
		drop: function(event, ui){
			$(this).removeClass('vacant').addClass('occupied').disabled();
		}
	});    

    question();
});

var multipliees = shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);

function question(){
    var multiplier = getParameterByName('multiplier');
    var multipliee = multipliees[0];
    var answer = parseInt(multiplier) * parseInt(multipliee);

    askQuestion(multiplier, multipliee);
    var answers = getSuggestions(multiplier, multipliee);

    $('.answer-one').text(answers[0]);
    $('.answer-two').text(answers[1]);
    $('.answer-three').text(answers[2]);
    $('.answer-four').text(answers[3]);
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