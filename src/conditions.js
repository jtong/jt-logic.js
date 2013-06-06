function Context(){
    this.conditions = [];
}

Context.prototype.has_condition = function(condition_function){
    this.conditions.push(condition_function);
    return condition(condition_function);
}
var on_context = function(express_in_context){
    express_in_context(new Context);
}

var conditions_in = function(context){
    return context.conditions;
}

function _build_condition_handler(condition) {
    condition.when_not_pass_call = function (handler) {
        condition.not_pass_handler = handler;
        condition.current_define_not_pass = true;
        return condition;
    }
    condition.when_pass_call = function (handler) {
        condition.pass_handler = handler;
        condition.current_define_pass= true;
        return condition;
    }
    condition.with = function(){
        if(condition.current_define_pass){
            condition.pass_args = arguments;
        }
        if(condition.current_define_not_pass){
            condition.not_pass_args = arguments;
        }
        return condition;
    }
    return condition;
}
var condition = function(condition_function){
    return _build_condition_handler(condition_function);
}