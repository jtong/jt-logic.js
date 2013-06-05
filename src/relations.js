
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
