function Context(){
    this.conditions = [];
}

Context.prototype.has_condition = function(condition){
    this.conditions.push(condition);
    condition.when_not_pass_call = function(handler){
        condition.not_pass_handler = handler;
        return condition;
    }
    return condition;
}
var on_context = function(express_in_context){
    express_in_context(new Context);
}

var conditions_in = function(context){
    return context.conditions;
}

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
    var conditions = []
    if(arguments.length == 1){
        conditions = [].concat(arguments[0])
    } else{
        conditions = arguments;
    }
    result.pass = function(){
        var pass_or_not = true;
        for (var index in conditions){
            var current_pass = conditions[index]();
            pass_or_not = pass_or_not && current_pass;
            if(!current_pass && conditions[index].not_pass_handler){
                conditions[index].not_pass_handler();
            }
            if(current_pass && conditions[index].pass_handler){
                conditions[index].pass_handler();
            }
        }
        return pass_or_not;
    }
    return result;
}

var condition = function(condition_function){
  var result = condition_function;
  result.when_not_pass_call = function(handler){
      result.not_pass_handler = handler;
      return result;
  }
  result.when_pass_call = function(handler){
      result.pass_handler = handler;
      return result;
  }
  return result;
}

