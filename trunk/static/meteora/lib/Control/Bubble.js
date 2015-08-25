
var Bubble=Control.extend({'__buildComponents':function(content){this.components={'bubble':Widget.div({'class':'m-bubble'}),'linkTop':Widget.div({'class':'m-bubble-link-top'}),'linkLeft':Widget.div({'class':'m-bubble-link-left'}),'linkRight':Widget.div({'class':'m-bubble-link-right'}),'linkBottom':Widget.div({'class':'m-bubble-link-bottom'}),'content':Widget.div({'class':'m-bubble-content'})}
this.components.links=[this.components.linkTop,this.components.linkLeft,this.components.linkRight,this.components.linkBottom];for(var i=3;i>=0;i--){$(this.components.links[i]).style.visibility='hidden';}
this.components.bubble.appendChildren([this.components.linkTop,this.components.linkLeft,this.components.linkRight,this.components.linkBottom,this.components.content]);this.components.content.setContent(content);this.resizeTo(this.options.width,this.options.height);},'resizeTo':function(w,h){this.components.bubble.style.width=w+'px';this.components.bubble.style.height=h+'px';},'show':function(e){var coord=$(this.element).getCoordinates();var bubble=this.components.bubble;var link=this.components.links;$(bubble).setOnTop();bubble.style.visibility='hidden';bubble.show();if(bubble.parentNode!=document.body){bubble.style.position='absolute';bubble.style.top='-500px';document.body.appendChild(bubble);}
this.reposition();},'reposition':function(){var coord=this.element.getCoordinates();var pos={'top':0,'left':0};var width=this.components.bubble.offsetWidth;var height=this.components.bubble.offsetHeight;var topBound=(Browser.pageScrollY());var leftBound=(Browser.pageScrollX());var bottomBound=(Browser.pageScrollY()+Browser.clientHeight());var rightBound=(Browser.pageScrollX()+Browser.clientWidth());var x=coord.left+(coord.width/2);var y=coord.top+(coord.height/2);if((coord.top-topBound)>(bottomBound-coord.bottom)){var spany='top';var disty=coord.top-topBound;}else{var spany='bottom';var disty=bottomBound-coord.bottom;}
if((coord.left-leftBound)>(rightBound-coord.right)){var spanx='left';var distx=coord.left-leftBound;}else{var spanx='right';var distx=rightBound-coord.right;}
var offsetx=0;var offsety=0;switch(spany+'_'+spanx){case'top_left':if(distx>disty){offsety=0;offsetx=width*-1-15;}else{offsety=height*-1-15;offsetx=(width-coord.width)/-1;}
break;case'top_right':if(distx>disty){offsety=0;offsetx=15;}else{offsety=height*-1-15;offsetx=coord.width*-1;}
break;case'bottom_left':if(distx>disty){offsety=height*-1;offsetx=width*-1-15;}else{offsety=15;offsetx=(width-coord.width)*-1;}
break;case'bottom_right':if(distx>disty){offsety=height*-1;offsetx=15;}else{offsety=15;offsetx=coord.width*-1;}
break;}
pos.top=coord[spany]+offsety;pos.left=coord[spanx]+offsetx;var min=new Number(-1);for(var i=0;i<4;i++){var link=this.components.links[i];if(i==0||i==3){var test=x-pos.left;if(test>=15&&test<=width-15){link.style.left=test+'px';}else{if(test<15){link.style.left='0px';}else{link.style.left=(width-20)+'px';}}}else{var test=y-pos.top;if(test>=30&&test<=height-15){link.style.top=test+'px';}else{if(test<15){link.style.top='0px';}else{link.style.top=(height-20)+'px';}}}
var abs=x-pos.left-link.offsetLeft;var ord=y-pos.top-link.offsetTop;link.dist=Math.pow(abs,2)+Math.pow(ord,2);if(min<0||link.dist<this.components.links[min].dist){min=i;}}
if(this.components.links[min]!=this.__link){if(this.__link){this.__link.style.visibility='hidden';}
this.__link=this.components.links[min];this.__link.style.visibility='visible';}
if(this.components.bubble.offsetLeft!=pos.left||this.components.bubble.offsetTop!=pos.top){this.components.bubble.setStyle({'top':pos.top+'px','left':pos.left+'px'});}
this.components.bubble.style.visibility='visible';},'hide':function(e){this.components.bubble.hide();},'__bindEvents':function(){this.addListener(this.element,this.options.showEvent,this.show.bindAsEventListener(this));this.addListener(this.element,this.options.destroyEvent,this.destroy.bindAsEventListener(this));this.addListener(this.element,this.options.hideEvent,this.hide.bindAsEventListener(this));this.addListener(window,'resize',this.reposition.bindAsEventListener(this));this.addListener(document,'mousedown',this.hide.bindAsEventListener(this));},'red':function(){this.components.bubble.className='m-bubble m-red';},'blue':function(){this.components.bubble.className='m-bubble m-blue';},'yellow':function(){this.components.bubble.className='m-bubble m-yellow';},'initialize':function(el,content,options){this.options={'showEvent':'mouseover','hideEvent':'mouseleave','destroyEvent':'dbclick','width':250,'height':60}
this.element=$(el);this.setOptions(options);this.__buildComponents(content);this.__bindEvents();}});