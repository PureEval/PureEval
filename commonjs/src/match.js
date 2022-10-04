import { _ } from './bind.js' 
function match(...rules){
    return function(value){
        for(let i=0;i<rules.length;i+=2)
            if(value==rules[i]||rules[i]==_)
                return rules[i+1](value);
    }
}
export { match };