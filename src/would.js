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

var all = function(){
    var result = {}
    var condition_arguments = arguments;
    result.pass = function(){
        var pass_or_not = false;

        for (index in condition_arguments){
            pass_or_not |= condition_arguments[index]();
        }
        return pass_or_not;
    }
    return result;
}