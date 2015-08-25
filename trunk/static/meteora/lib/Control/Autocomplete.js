
var Autocomplete=Control.extend({'initialize':function(el,options){this.options={'autoClose':true,'autoSelect':true,'onClick':function(){}}
this.hasFocus=false;this.setMainElement(el);this.element.setAttribute('autocomplete','off');this.element.autocomplete='off';if(window.ie){this.element.focus();}
this.setOptions(options);if(this.options.rowClick){this.options.onClick=this.options.rowClick;}
this.__buildComponents();this.__bindEvents();},'__buildComponents':function(){this.components={'element':Widget.div({'class':'m-autocomplete'}),'list':Widget.ul()}
this.components.element.appendChild(this.components.list);},'__inputKeyDownEvent':function(e){e=new Event(e);switch(e.key){case'enter':if(this.__pointer){this.__select(e);}
break;case'down':this.__move('down');break;case'up':this.__move('up');break;case'tab':case'esc':this.close();break;default:this.timedSearch();break;}},'__documentMouseDownEvent':function(e){e=new Event(e);var parent=e.target;while(parent){if($type(parent)=='element'){if(parent==this.components.element){this.cancelClose=true;return;}
if(parent.parentNode==this.components.list){this.__pointer=parent;return this.__select(e);}}
parent=parent.parentNode;}
this.__pointer=null;this.close();},'__inputMouseMoveEvent':function(e){if(this.__mouse){this.element.focus();e=new Event(e);var parent=e.target;while(parent){if(parent.parentNode==this.components.list){if(parent.className!='selected'){if(this.__pointer!=parent){if(this.__pointer){this.__pointer.className='';}
this.__pointer=parent;this.__pointer.className='selected';}}}
parent=parent.parentNode;}}else{if($type(this.__mouse)==false){this.__mouse=0;}
this.__mouse++;}},'__inputKeyUpEvent':function(e){e=new Event(e);switch(e.key){default:if(e.key.length==1){if(this.options.autoselect){this.__quickFind();}}
break;}},'__listClickEvent':function(e){e=new Event(e);this.__select(e);},'__inputBlurEvent':function(){if(this.cancelClose||window.opera){this.cancelClose=false;}else{this.close();}},'__bindEvents':function(){this.__populateOptionsCallback=this.__populateOptions.bind(this);this.__searchCallback=this.search.bind(this);this.addListener(document.body,'mousedown',this.__documentMouseDownEvent);this.addListener(this.element,(window.opera||window.gecko)?'keypress':'keydown',this.__inputKeyDownEvent);this.addListener(this.components.element,'mousemove',this.__inputMouseMoveEvent);this.addListener(this.element,'keyup',this.__inputKeyUpEvent);this.addListener(this.components.list,'click',this.__listClickEvent);},'__select':function(e){if(e){e.stop();}
if(this.__pointer){this.element.value=this.__pointer.__value.content
this.__pointer.className=='';this.options.onClick(this.__pointer.__value);this.close();}},'__move':function(where){if(this.__pointer){this.__pointer.className='';}
if(where=='down'){if(this.__pointer&&this.__pointer.nextSibling){this.__pointer=this.__pointer.nextSibling;}else{this.__pointer=this.components.list.firstChild;}}else{if(this.__pointer&&this.__pointer.previousSibling){this.__pointer=this.__pointer.previousSibling;}else{this.__pointer=this.components.list.lastChild;}}
if(this.__pointer){var parent=this.components.element;var scroll=$(this.__pointer).getPosition()['y']-this.components.element.getPosition()['y'];parent.scrollTop=scroll;this.__pointer.className='selected';}},'__populateOptions':function(json){this.__pointer=null;this.components.list.dumpChildren();var json=this.fromJSON(json);if(json){if($type(json)=='array'&&json.length==1){json=json[0];}
var show=false;for(var p in json){var data=json[p];if($type(data)=='string'){var li=Widget.li(null,Widget.fromHTML(data));li.__value={'index':p,'content':data};}else{var li=Widget.li(null,Widget.fromHTML(data.display));li.__value={'index':p,'content':data.data};}
this.components.list.appendChild(li);show=true;}
if(show){var coord=this.element.getCoordinates();if(!this.__toolbox){this.__toolbox=new Toolbox(this.components.element,{'autoClose':false,'enableDrag':false});}
this.__toolbox.moveTo(coord.top+coord.height,coord.left);if(this.__timeOut){this.__toolbox.show();if(this.options.autoSelect){this.__quickFind();}}
return;}}
if($type(this.__toolbox)){this.__toolbox.hide();}},'__quickFind':function(){var mx=new Number(-1);for(var i=0;i<this.components.list.childNodes.length;i++){var li=this.components.list.childNodes[i];var mt=new Number(0);if(li.__value){for(var j=0;j<this.element.value.length&&j<li.__value.content.length;j++){var a=this.element.value.charAt(j);var b=li.__value.content.charAt(j);if(a.toLowerCase()==b.toLowerCase()){mt++;}else{break;}}
if(mt>mx){if(this.__pointer){this.__pointer.className='';}
this.__pointer=li;this.__pointer.className='selected';mx=mt;}}}},'close':function(){this.__pointer=null;if(this.__timeOut){window.clearTimeout(this.__timeOut);this.__timeOut=null;}
this.components.list.dumpChildren();if(this.__toolbox){this.__toolbox.hide();}},'timedSearch':function(){if(this.__timeOut){window.clearTimeout(this.__timeOut);this.__timeOut=null;}
this.__timeOut=window.setTimeout(this.__searchCallback,200);},'search':function(){if(this.element.value){new Ajax(this.options.action,{'method':'get','data':(this.element.name?this.element.name:'q')+'='+this.element.value,'onComplete':this.__populateOptionsCallback}).request();}else{this.close();}}});