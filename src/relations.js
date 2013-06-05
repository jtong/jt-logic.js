function Conditions(){
    this.conditions = [];
}

Conditions.prototype.init = function(args){
    if(args.length == 1){
        this.conditions = [].concat(args[0])
    } else{
        this.conditions = args;
    }
}

var all = function(){
    var result = new Conditions();
    result.init(arguments)

    result.go_through_conditions = function(all_pass_judge) {
        var conditions = this.conditions;
        for (var index in conditions) {
            var condition = conditions[index];
            var current_pass = condition();
            all_pass_judge(current_pass);
            if (!current_pass && condition.not_pass_handler) {
                condition.not_pass_handler();
            }
            if (current_pass && condition.pass_handler) {
                condition.pass_handler();
            }
        }
    }

    result.pass = function(){
        var all_pass  = true;
        var all_pass_judge = function(current_condition_pass){
            all_pass = all_pass && current_condition_pass;
            return all_pass;
        }
        this.go_through_conditions(all_pass_judge);
        if(all_pass){
            this.action();
        };
    }

    result.not_pass = function(){
        var all_pass  = false;
        var all_pass_judge = function(current_condition_pass){
            all_pass = all_pass || current_condition_pass;
            return all_pass;
        }
        this.go_through_conditions(all_pass_judge);

        if(!all_pass){
            this.action();
        };
    }

    return result;
}
