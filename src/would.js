var when = function(condition){
  if(condition()){
      return this.action;
  }
  return function(){}
}

var would = function(action){
    var result = function(){
        action();
    }
    result.when = when;
    result.action = action;
    return result;
}