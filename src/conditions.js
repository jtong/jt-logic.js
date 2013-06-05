function Context(){
    this.conditions = [];
}

Context.prototype.has_condition = function(condition){
    this.conditions.push(condition);
    return _build_condition_handler(condition);
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
        return condition;
    }
    condition.when_pass_call = function (handler) {
        condition.pass_handler = handler;
        return condition;
    }
    return condition;
}
var condition = function(condition_function){
    return _build_condition_handler(condition_function);
}