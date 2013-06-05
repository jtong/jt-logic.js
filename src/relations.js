
var all = function(){
    var result = {}
    result.conditions = []
    if(arguments.length == 1){
        result.conditions = [].concat(arguments[0])
    } else{
        result.conditions = arguments;
    }

    result.pass = function(){
        var pass_or_not = true;
        var conditions = this.conditions;
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
        if(pass_or_not){
            this.action();
        };
    }
    return result;
}
