
var Class=function(properties){var klass=function(){return(arguments[0]!==null&&this.initialize&&$type(this.initialize)=='function')?this.initialize.apply(this,arguments):this;};$extend(klass,this);klass.prototype=properties;klass.constructor=Class;return klass;};Class.empty=function(){};Class.prototype={extend:function(properties){var proto=new this(null);for(var property in properties){var pp=proto[property];proto[property]=Class.Merge(pp,properties[property]);}
return new Class(proto);},implement:function(){for(var i=0,l=arguments.length;i<l;i++)$extend(this.prototype,arguments[i]);}};Class.Merge=function(previous,current){if(previous&&previous!=current){var type=$type(current);if(type!=$type(previous))return current;switch(type){case'function':var merged=function(){this.parent=arguments.callee.parent;return current.apply(this,arguments);};merged.parent=previous;return merged;case'object':return $merge(previous,current);}}
return current;};