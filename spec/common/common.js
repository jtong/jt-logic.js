var called_flag;
var condition_a_handled;
var condition_b_handled;

function be_called(){
    called_flag = true;
}

function not_be_called(){
    called_flag = true;
}

var a_handler = function(){
    condition_a_handled = "a not null";
}

var b_handler = function(){
    condition_b_handled = "b not null";
}