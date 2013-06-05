var would = function(action){
    var result;
    if(action.conditions){
        result = {}
    }else{
        result = function(){
            action();
        }
    }

    result.when = function(condition_or_conditions){
        if(condition_or_conditions.conditions){
          condition_or_conditions.action = this.action;
          return condition_or_conditions;
        }

        this.condition = condition_or_conditions;
        this.pass = function(){
            if(this.condition()){
                this.action();
            }
        }
        this.not_pass = function(){
            if(!this.condition()){
                this.action();
            }
        }
        return this;
    };
    result.action = action;
    return result;
}


