(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{30:function(e,t,n){e.exports=n(42)},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var i,r=n(0),o=n.n(r),a=n(17),s=n.n(a),c=n(10),l=n(1),u=n(2),h=n(7),d=n(6),v=n(8),f=n(3),p=function(e){function t(){var e,n;Object(l.a)(this,t);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(n=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).elm=void 0,n.fixedVolume=!1,n}return Object(v.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e){this.elm&&(this.fixedVolume||(this.elm.volume=.5,this.fixedVolume=!0),this.props.audio.playing?this.elm.play():(this.elm.pause(),this.elm.currentTime=0))}},{key:"render",value:function(){var e=this,t=this.props.audio.url;return o.a.createElement("audio",{loop:!0,src:t,ref:function(t){return e.elm=t}})}}]),t}(o.a.Component),g=Object(c.b)(function(e){return{audio:e.audio}})(p),m=n(4),b=n(18),w=n(9),y=n(13);!function(e){e[e.Up=1]="Up",e[e.Down=2]="Down",e[e.Left=3]="Left",e[e.Right=4]="Right"}(i||(i={}));var k,O=Object.keys(i).filter(function(e){return isNaN(Number(e))}).map(function(e){return i[e]}),j=function(){function e(t,n,i){Object(l.a)(this,e),this.point=void 0,this.points=void 0,this.moves=void 0,this.point=t,this.points=n,this.moves=i}return Object(u.a)(e,[{key:"addMove",value:function(e,t){this.points.push(this.point),this.moves.push(t),this.point=e}},{key:"getNextMoves",value:function(){var e=this;return O.map(function(t){return{move:t,history:e.clone()}})}},{key:"clone",value:function(){return new e(this.point,Object(y.a)(this.points),Object(y.a)(this.moves))}},{key:"printMoves",value:function(){return this.moves.map(function(e){return i[e]}).join(", ")}}]),e}();!function(e){e[e.Start=1]="Start",e[e.Win=2]="Win",e[e.Block=3]="Block"}(k||(k={}));var x=function(){function e(t,n,i,r,o){Object(l.a)(this,e),this.width=void 0,this.height=void 0,this.start=void 0,this.win=void 0,this.blocks=void 0,this.blocksByKey={},this.width=t,this.height=n,this.start=i,this.win=r,this.blocks=o,this.blocksByKey=this.blocks.reduce(function(e,t){return e[t.toString()]=k.Block,e},{})}return Object(u.a)(e,[{key:"isWinningPoint",value:function(e){return this.win.equals(e)}},{key:"isIllegalPoint",value:function(e){var t=this.blocksByKey,n=this.width,i=this.height;return!!t[e.toString()]||e.x<0||e.x>=n||e.y<0||e.y>=i}},{key:"applyMove",value:function(e,t){for(var n=e,r=[{move:t,point:n}];;){var o=n.clone();if(t===i.Left)o.x--;else if(t===i.Right)o.x++;else if(t===i.Up)o.y--;else{if(t!==i.Down)throw new Error("unexpected move: ".concat(t));o.y++}if(this.isIllegalPoint(o))break;if(r.push({move:t,point:o}),n=o,this.isWinningPoint(n))break}return{point:n,traveled:r}}},{key:"solve",value:function(){for(var e=this,t={},n=[new j(this.start,[],[])];n.length;){var i=n.shift(),r=i.point.toString();if(!t[r]){if(t[r]=!0,this.isWinningPoint(i.point))return i;i.getNextMoves().forEach(function(t){var i=t.move,r=t.history,o=e.applyMove(r.point,i).point;r.addMove(o,i),n.push(r)})}}return null}},{key:"print",value:function(){for(var e=this.width,t=this.height,n=this.start,i=this.win,r=this.blocks,o=[],a=function(t){for(var a=[],s=function(e){var o="_";i.x===e&&i.y===t&&(o="W"),n.x===e&&n.y===t&&(o="S"),r.forEach(function(n){n.x===e&&n.y===t&&(o="0")}),a.push(o)},c=0;c<e;c++)s(c);o.push(a)},s=0;s<t;s++)a(s);return o.map(function(e){return e.join("")}).join("\n")}}]),e}(),E=function e(t,n){Object(l.a)(this,e),this.level=void 0,this.soln=void 0,this.level=t,this.soln=n},L=function(){function e(t){Object(l.a)(this,e),this.level=void 0,this.soln=void 0,this.hero=void 0,this.level=t.level,this.soln=t.soln,this.hero=new j(this.level.start,[],[])}return Object(u.a)(e,[{key:"reset",value:function(){this.hero=new j(this.level.start,[],[])}},{key:"moveHero",value:function(e){var t=this.level,n=this.hero,i=t.applyMove(n.point,e);return n.addMove(i.point,e),i}}]),e}(),M=function(){function e(t,n){Object(l.a)(this,e),this.x=void 0,this.y=void 0,this.x=t,this.y=n}return Object(u.a)(e,[{key:"clone",value:function(){return new e(this.x,this.y)}},{key:"toString",value:function(){return"".concat(this.x,",").concat(this.y)}},{key:"equals",value:function(e){return this.toString()===e.toString()}}],[{key:"fromString",value:function(t){var n=t.split(",");return new e(parseFloat(n[0]),parseFloat(n[1]))}}]),e}();function I(e){for(var t=[],n=0;n<e;n++)t.push(n);return t}function S(e,t){return e+Math.random()*(t-e)}var R,_,P,D=function(){function e(t,n){Object(l.a)(this,e),this.spaces=[];for(var i=0;i<n;i++)for(var r=0;r<t;r++)this.spaces.push(new M(r,i))}return Object(u.a)(e,[{key:"pop",value:function(){var e=Math.floor(Math.random()*this.spaces.length);return this.spaces.splice(e,1)[0]}}]),e}(),T=function(){function e(t){Object(l.a)(this,e),this.settings=void 0,this.settings=t}return Object(u.a)(e,[{key:"tryGenerateLevel",value:function(e){var t=this.settings,n=t.width,i=t.height,r=t.minMovesOptions,o=new D(n,i),a=o.pop(),s=o.pop(),c=I(e).map(function(e){return o.pop()}),l=new x(n,i,s,a,c),u=l.solve();return u&&r.includes(u.moves.length)?new E(l,u):null}},{key:"generateLevels",value:function(e,t){for(var n=this.settings,i=n.width,r=n.height,o=n.blockPercentMin,a=n.blockPercentMax,s=[],c=0,l=Math.min(t/10,100);s.length<e&&c<t;)for(var u=i*r*S(o,a),h=0;s.length<e&&h<l;h++){c+=1;var d=this.tryGenerateLevel(u);d&&s.push(d)}return s}}]),e}(),z=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;Object(l.a)(this,e),this.started=void 0,this.milliseconds=void 0,this.started=new Date,this.milliseconds=t}return Object(u.a)(e,[{key:"getElapsed",value:function(){return(new Date).getTime()-this.started.getTime()}},{key:"getRemaining",value:function(){return this.milliseconds-this.getElapsed()}},{key:"getPercent",value:function(){return this.getRemaining()/this.milliseconds}},{key:"addTime",value:function(e){this.milliseconds+=e}},{key:"formatElapsed",value:function(){return Math.floor(this.getElapsed()/1e3).toString(10)}},{key:"formatRemaining",value:function(){return Math.floor(this.getRemaining()/1e3).toString(10)}}]),e}(),A=n(11),G=n.n(A),B=n(15),W=n(5);!function(e){e[e.Easy=1]="Easy",e[e.Medium=2]="Medium",e[e.Hard=3]="Hard",e[e.Infinite=4]="Infinite"}(P||(P={}));var C=(R={},Object(W.a)(R,P.Easy,"music/visager_village_dreaming.mp3"),Object(W.a)(R,P.Medium,"music/visager_the_final_road.mp3"),Object(W.a)(R,P.Hard,"music/visager_the_great_forest.mp3"),Object(W.a)(R,P.Infinite,"music/visager_dark_sanctum.mp3"),R),H=(_={},Object(W.a)(_,P.Easy,{gridSize:1,minMoves:7,levelsPerTier:1,totalLevels:5}),Object(W.a)(_,P.Medium,{gridSize:1.5,minMoves:12,levelsPerTier:1,totalLevels:10}),Object(W.a)(_,P.Hard,{gridSize:2,minMoves:12,levelsPerTier:2,totalLevels:15}),Object(W.a)(_,P.Infinite,{gridSize:1.5,minMoves:7,levelsPerTier:3,totalLevels:20,secondsPerLevel:5}),_),U=function(){function e(t,n){var i=this;Object(l.a)(this,e),this.dimensions=void 0,this.difficulty=void 0,this.totalLevels=void 0,this.progression=void 0,this.loaded=!1,this.onLoad=void 0,this.registerLoaded=function(){},this.dimensions=t,this.difficulty=n,this.progression=H[n],this.onLoad=new Promise(function(e,t){i.registerLoaded=function(){return e(i)}}),this.totalLevels=this.progression.totalLevels}return Object(u.a)(e,[{key:"displayName",value:function(){return P[this.difficulty]}},{key:"isInfinite",value:function(){return this.difficulty===P.Infinite}},{key:"createStopwatch",value:function(){var e=1e3*(60-(this.progression.secondsPerLevel||0));return new z(this.isInfinite()?e:void 0)}},{key:"generateLevels",value:function(){throw new Error("base class")}},{key:"loadLevel",value:function(e){throw new Error("base class")}}]),e}(),K=function(e){function t(e,n){var i;return Object(l.a)(this,t),(i=Object(h.a)(this,Object(d.a)(t).call(this,e,n))).levelsByMoves=void 0,i.levelsByMoves=I(i.progression.totalLevels/i.progression.levelsPerTier).reduce(function(e,t){return e[t+i.progression.minMoves]=[],e},{}),i}return Object(v.a)(t,e),Object(u.a)(t,[{key:"getLevelKeys",value:function(){return Object.keys(this.levelsByMoves).map(parseFloat).sort(function(e,t){return e<t?-1:e>t?1:0})}},{key:"generateLevels",value:function(){var e=this.dimensions,t=this.levelsByMoves,n=this.progression,i=n.gridSize,r=n.levelsPerTier,o=this.getLevelKeys().filter(function(e){return t[e].length<r});if(0===o.length)return this.loaded=!0,void this.registerLoaded();var a=new M(e.x*i,e.y*i);new T({width:a.x,height:a.y,blockPercentMin:.05,blockPercentMax:.3,minMovesOptions:o}).generateLevels(500,500).forEach(function(e){var n=t[e.soln.moves.length];n&&n.length<r&&n.push(e)})}},{key:"loadLevel",value:function(){var e=Object(B.a)(G.a.mark(function e(t){var n,i=this;return G.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(;!this.loaded;)this.generateLevels();return n=this.getLevelKeys().reduce(function(e,t){return e.push.apply(e,Object(y.a)(i.levelsByMoves[t])),e},[]),e.abrupt("return",n[t]);case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),t}(U),q=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e,P.Infinite))).levels=[],n.lastIndex=0,n}return Object(v.a)(t,e),Object(u.a)(t,[{key:"generateLevels",value:function(){var e,t=this.dimensions,n=this.levels,i=this.progression,r=this.lastIndex,o=i.gridSize;if(n.length>r+10)return this.loaded=!0,void this.registerLoaded();var a,s,c=new M(t.x*o,t.y*o),l=new T({width:c.x,height:c.y,blockPercentMin:.05,blockPercentMax:.3,minMovesOptions:(a=i.minMoves,s=10,I(s).map(function(e){return e+a}))});(e=this.levels).push.apply(e,Object(y.a)(l.generateLevels(10,10))),n.length>r+10&&console.log("infinite loaded!")}},{key:"loadLevel",value:function(){var e=Object(B.a)(G.a.mark(function e(t){return G.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(;t>this.levels.length;)this.generateLevels();return this.lastIndex=t,e.abrupt("return",this.levels[t]);case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),t}(U),F=function(){function e(t){Object(l.a)(this,e),this.loaders=void 0,this.loaders=[new q(t)].concat(Object(y.a)([P.Easy,P.Medium,P.Hard].map(function(e){return new K(t,e)})))}return Object(u.a)(e,[{key:"getLoaderByDifficulty",value:function(e){return this.loaders.filter(function(t){return t.difficulty===e})[0]}},{key:"loadInBackground",value:function(){var e=this.loaders.filter(function(e){return!e.loaded})[0];e&&(e.generateLevels(),e.loaded&&console.log("loaded:",P[e.difficulty]))}}]),e}(),N="SET_GAME_OVER",V="SET_LEVEL",J="SET_TIMER",Y="SET_WORLD",X="TOGGLE_MUSIC",Q={audio:{playing:!0,url:""},isMobile:function(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t}(),secondsRemaining:0,secondsElapsed:0,level:0,world:void 0,isGameOver:!1};var Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N:return Object(w.a)({},e,{isGameOver:!0});case V:var n=t.payload.level;return Object(w.a)({},e,{level:n});case J:var i=t.payload.stopwatch;return Object(w.a)({},e,{secondsElapsed:i&&i.formatElapsed(),secondsRemaining:i&&i.formatRemaining()});case Y:var r=t.payload.world;return Object(w.a)({},e,{isGameOver:!1,world:r,audio:Object(w.a)({},e.audio,{url:r?C[r.difficulty]:e.audio.url})});case X:return Object(w.a)({},e,{audio:Object(w.a)({},e.audio,{playing:!e.audio.playing})});default:return e}},$=function(e){return{type:J,payload:{stopwatch:e}}},ee=function(e){return{type:Y,payload:{world:e}}},te=Object(b.b)(Z);function ne(){var e=Object(f.a)(["\n  height: 4vh;\n  width: auto;\n  min-width: 2em;\n  padding: 0 0.75em;\n  margin: 0 0.3em;\n"]);return ne=function(){return e},e}function ie(){var e=Object(f.a)(["\n  cursor: pointer;\n\n  border-color: var(--foreground);\n  font-style: normal;\n  color: var(--foreground);\n\n  &:hover {\n    color: var(--background);\n    background-color: var(--foreground);\n  }\n"]);return ie=function(){return e},e}function re(){var e=Object(f.a)(["\n  width: 4em;\n  padding: 0.5em;\n  border-radius: 1em;\n\n  border: 2px solid grey;\n  font-style: italic;\n  color: grey;\n  background-color: var(--background);\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: nowrap;\n\n"]);return re=function(){return e},e}function oe(){var e=Object(f.a)(["\n  flex-direction: column;\n"]);return oe=function(){return e},e}function ae(){var e=Object(f.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: stretch;\n  flex-wrap: nowrap;\n"]);return ae=function(){return e},e}function se(){var e=Object(f.a)(["\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  z-index: 1;\n  width: 100%;\n  height: 100vh;\n\n  background-color: var(--background);\n"]);return se=function(){return e},e}var ce=m.a.div(se()),le=m.a.div(ae()),ue=Object(m.a)(le)(oe()),he=m.a.div(re()),de=Object(m.a)(he)(ie()),ve=Object(m.a)(de)(ne());function fe(){var e=Object(f.a)(["\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  background-image: url('img/snow_loose.gif');\n  background-size: contain;\n  background-repeat: none;\n"]);return fe=function(){return e},e}function pe(){var e=Object(f.a)(["\n  position: relative;\n"]);return pe=function(){return e},e}function ge(){var e=Object(f.a)(["\n  height: 10vh;\n"]);return ge=function(){return e},e}function me(){var e=Object(f.a)(["\n  height: 10vh;\n  font-family: monospace;\n  font-size: 1.2em;\n  font-weight: bold;\n"]);return me=function(){return e},e}function be(){var e=Object(f.a)(["\n  width: 100%;\n  margin: 0px;\n"]);return be=function(){return e},e}function we(){var e=Object(f.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  flex-wrap: nowrap;\n"]);return we=function(){return e},e}var ye=m.a.div(we()),ke=Object(m.a)(le)(be()),Oe=Object(m.a)(ke)(me()),je=Object(m.a)(ke)(ge()),xe=m.a.div(pe()),Ee=m.a.div(fe()),Le=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.gm,n=e.toggleMusic,i=this.props.store,r=i.isMobile,a=i.world,s=i.level,c=i.secondsRemaining,l=i.secondsElapsed;return o.a.createElement(ye,null,o.a.createElement(Oe,null,o.a.createElement(ue,null,o.a.createElement("div",null,"Level ",s+1)),o.a.createElement(ue,null,o.a.createElement("div",null,a&&a.isInfinite()?c:l,"s"))),o.a.createElement(xe,{onClick:t.mouseMove},this.props.children,o.a.createElement(Ee,null)),o.a.createElement(je,null,o.a.createElement(ue,null,o.a.createElement(ve,{onClick:t.clickReset},"reset level")),!r&&o.a.createElement(ue,null,o.a.createElement(ve,{onClick:n},"toggle music")),o.a.createElement(ue,null,o.a.createElement(ve,{onClick:t.clickToggleGrid},"toggle grid"))))}}]),t}(o.a.Component),Me=Object(c.b)(function(e){return{store:e}},{toggleMusic:function(){return{type:X,payload:{}}}})(Le);function Ie(e){var t=new Image,n={image:t,loaded:new Promise(function(e,n){t.onload=function(){return e(!0)}})};return t.src=e,n}var Se,Re={heroLeft:Ie("sprite/snowman_left.png"),heroRight:Ie("sprite/snowman_right.png"),groundIce1:Ie("sprite/ground_ice_1.png"),groundIce2:Ie("sprite/ground_ice_2.png"),groundIce3:Ie("sprite/ground_ice_3.png"),groundIce4:Ie("sprite/ground_ice_4.png"),groundIce5:Ie("sprite/ground_ice_5.png"),groundIce6:Ie("sprite/ground_ice_6.png"),groundIce7:Ie("sprite/ground_ice_7.png"),groundIce8:Ie("sprite/ground_ice_8.png"),groundIce9:Ie("sprite/ground_ice_9.png"),treeLight:Ie("sprite/tree_light.png"),treeHeavy:Ie("sprite/tree_heavy.png"),igloo:Ie("sprite/igloo.png")},_e=Object(w.a)({},Re,{loaded:Promise.all(Object.values(Re).map(function(e){return e.loaded})).then(function(){return!0})});function Pe(){var e=Object(f.a)(["\n  margin: 0px;\n  margin-top: 0.5em;\n"]);return Pe=function(){return e},e}function De(){var e=Object(f.a)(["\n  margin: 0.5rem;\n"]);return De=function(){return e},e}function Te(){var e=Object(f.a)(["\n  padding: 0.5em;\n  margin: 0.5em;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  flex-wrap: nowrap;\n\n  background-color: #eeeeee;\n  border-radius: 1em;\n"]);return Te=function(){return e},e}function ze(){var e=Object(f.a)(["\n  margin-bottom: 0px;\n"]);return ze=function(){return e},e}function Ae(){var e=Object(f.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n"]);return Ae=function(){return e},e}window.Sprites=_e;var Ge=m.a.div(Ae()),Be=m.a.h1(ze()),We=m.a.div(Te()),Ce=m.a.h2(De()),He=m.a.h3(Pe()),Ue=(Se={spritesLoaded:!1},Object(W.a)(Se,P.Easy,!1),Object(W.a)(Se,P.Medium,!1),Object(W.a)(Se,P.Hard,!1),Object(W.a)(Se,P.Infinite,!1),Se),Ke=function(e){function t(){var e,n;Object(l.a)(this,t);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(n=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state=Object(w.a)({},Ue),n}return Object(v.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.reset(),_e.loaded.then(function(){e.setState({spritesLoaded:!0}),console.log("sprites loaded")})}},{key:"reset",value:function(){var e=this;this.setState(Object(w.a)({},Ue),function(){e.props.gm.worldLoader.loaders.forEach(function(t){t.onLoad.then(function(){e.setState(Object(W.a)({},t.difficulty,!0))})})})}},{key:"loadWorld",value:function(e){e.loaded&&(this.props.gm.setWorld(e),this.reset())}},{key:"render",value:function(){var e=this,t=this.props.store,n=this.state,i=this.props.gm.worldLoader;if(t.world)return"";var r=[P.Easy,P.Medium,P.Hard,P.Infinite];return o.a.createElement(ce,null,o.a.createElement(Be,null,o.a.createElement("em",null,"ice slide puzzle"),o.a.createElement("br",null),o.a.createElement("img",{src:"sprite/igloo.png"}),o.a.createElement("img",{src:"sprite/snowman_left.png"})),o.a.createElement(Ge,null,r.map(function(e){return i.getLoaderByDifficulty(e)}).map(function(t){return o.a.createElement(We,{key:t.difficulty},o.a.createElement(Ce,null,t.displayName()),o.a.createElement("div",null,t.isInfinite()?"\u221e":t.totalLevels," levels"),o.a.createElement(He,null,n[t.difficulty]?o.a.createElement(de,{onClick:function(){return e.loadWorld(t)}},"PLAY"):o.a.createElement(he,null,"loading")))})),o.a.createElement("p",null,"made by ",o.a.createElement("a",{href:"https://twitter.com/mpaulweeks"},"@mpaulweeks"),o.a.createElement("br",null),"assets by ",o.a.createElement("a",{href:"https://www.kenney.nl"},"Kenney"),o.a.createElement("br",null),"music by ",o.a.createElement("a",{href:"https://visager.bandcamp.com/album/songs-from-an-unmade-world"},"Visager")))}}]),t}(o.a.Component),qe=Object(c.b)(function(e){return{store:e}})(Ke),Fe=function(e){function t(){var e,n;Object(l.a)(this,t);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(n=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).onReset=function(){n.props.gm.unsetWorld()},n}return Object(v.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.gm,n=e.store,i=n.world,r=n.isGameOver;return i&&r?o.a.createElement(ce,null,o.a.createElement(le,null,o.a.createElement("h1",null,i.isInfinite()?"\n              game over! you managed to complete ".concat(t.currentLevelIndex-1," levels\n            "):"\n              you win! your score is ".concat(n.secondsElapsed,". try to get it lower!\n            "))),o.a.createElement(le,null,o.a.createElement(de,{onClick:this.onReset},"RESET"))):""}}]),t}(o.a.Component),Ne=Object(c.b)(function(e){return{store:e}})(Fe),Ve="white",Je="black",Ye={ArrowLeft:i.Left,ArrowRight:i.Right,ArrowUp:i.Up,ArrowDown:i.Down},Xe=function(){function e(){var t=this;Object(l.a)(this,e),this.dispatch=te.dispatch,this.worldLoader=void 0,this.worldDimensions=void 0,this.canvasDimensions=void 0,this.canvasElm=void 0,this.ctx=void 0,this.world=void 0,this.stopwatch=new z,this.currentLevel=void 0,this.currentLevelIndex=0,this.spriteFacing=void 0,this.loadedAssets=void 0,this.pendingAnimations=[],this.shouldDrawGrid=!1,this.clickReset=function(){t.currentLevel&&t.currentLevel.reset()},this.clickToggleGrid=function(){t.shouldDrawGrid=!t.shouldDrawGrid},this.mouseMove=function(e){var n=e.target.getBoundingClientRect(),r=e.clientX-n.left,o=e.clientY-n.top,a=r/n.width,s=o/n.height,c=a>s,l=a+s<1,u=l&&c&&i.Up||!l&&c&&i.Right||!l&&!c&&i.Down||l&&!c&&i.Left;u&&t.handleMove(u)},this.clickUp=function(){t.handleMove(i.Up)},this.clickDown=function(){t.handleMove(i.Down)},this.clickLeft=function(){t.handleMove(i.Left)},this.clickRight=function(){t.handleMove(i.Right)};for(var n=document.body.clientHeight,r=document.body.clientWidth,o=n>r?new M(8,10):new M(10,8),a=.8*document.body.clientHeight,s=a*o.x/o.y;s>r;)o.x-=1,s=a*o.x/o.y;this.worldDimensions=o,this.worldLoader=new F(this.worldDimensions),this.canvasDimensions=new M(s,a),window.addEventListener("keydown",function(e){var n=Ye[e.code]||void 0;n&&t.handleMove(n),"KeyR"===e.code&&t.clickReset(),"KeyN"===e.code&&t.nextLevel()}),this.loop()}return Object(u.a)(e,[{key:"loop",value:function(){var e=Object(B.a)(G.a.mark(function e(){var t,n,i=this;return G.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.world,n=this.stopwatch,!t){e.next=7;break}return e.next=4,this.draw();case 4:t.isInfinite()?(t.generateLevels(),n.getRemaining()!==te.getState().secondsRemaining&&this.dispatch($(n)),n.getRemaining()<0&&this.triggerGameOver()):n.getElapsed()!==te.getState().secondsElapsed&&this.dispatch($(n)),e.next=8;break;case 7:te.getState().isGameOver||this.worldLoader.loadInBackground();case 8:window.requestAnimationFrame(function(){return i.loop()});case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"setup",value:function(e){this.canvasElm=e,e.width=this.canvasDimensions.x,e.height=this.canvasDimensions.y,this.ctx=e.getContext("2d")}},{key:"setWorld",value:function(e){this.worldLoader=new F(this.worldDimensions),this.world=e,this.currentLevelIndex=0,this.stopwatch=e.createStopwatch(),this.nextLevel(),this.dispatch(ee(e))}},{key:"unsetWorld",value:function(){this.world=void 0,this.dispatch(ee(void 0))}},{key:"triggerGameOver",value:function(){this.world=void 0,this.dispatch({type:N,payload:{}})}},{key:"handleMove",value:function(e){var t=this.currentLevel;if(t){var n=t.moveHero(e);this.spriteFacing=[i.Left,i.Right].includes(e)?e:this.spriteFacing===i.Right?i.Left:i.Right,this.animateMove(n),t.level.isWinningPoint(n.point)&&this.nextLevel()}}},{key:"nextLevel",value:function(){var e=Object(B.a)(G.a.mark(function e(){var t,n,i;return G.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.currentLevelIndex,n=this.world){e.next=3;break}throw new Error("todo this should be impossible");case 3:return e.next=5,n.loadLevel(t);case 5:i=e.sent,this.currentLevel=i&&new L(i),this.currentLevel?(console.log(this.currentLevel.soln.printMoves()),this.dispatch((r=this.currentLevelIndex,{type:V,payload:{level:r}})),this.currentLevelIndex+=1,this.stopwatch.addTime(1e3*(n.progression.secondsPerLevel||0))):this.triggerGameOver();case 8:case"end":return e.stop()}var r},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"animateMove",value:function(e){var t,n=e.traveled.slice(0,-1).map(function(e,t,n){return{traveled:e,stopwatch:new z(1e3*(1+t/n.length))}});(t=this.pendingAnimations).push.apply(t,Object(y.a)(n))}},{key:"drawSprite",value:function(e,t,n,i){var r=this.canvasElm,o=this.ctx,a=this.currentLevel,s=r.width,c=r.height,l=s/a.level.width,u=c/a.level.height;i=i||1,o.drawImage(e.image,t*l+l*(1-i)/2,n*u+u*(1-i)/2,l*i,u*i)}},{key:"drawSpriteWithOpacity",value:function(e,t,n,i,r){var o=this.ctx,a=o.globalAlpha;o.globalAlpha=e,this.drawSprite(t,n,i,r),o.globalAlpha=a}},{key:"draw",value:function(){var e=Object(B.a)(G.a.mark(function e(){var t,n,r,o,a,s,c,l,u,h,d,v,f=this;return G.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.canvasElm,n=this.ctx,r=this.currentLevel,t&&n){e.next=3;break}return e.abrupt("return");case 3:return o=t.width,a=t.height,e.next=6,_e.loaded;case 6:if(r){e.next=8;break}return e.abrupt("return");case 8:for(s=o/r.level.width,c=a/r.level.height,n.fillStyle=Ve,n.fillRect(0,0,o,a),l=0;l<r.level.height;l++)for(u=0;u<r.level.width;u++)h=_e.groundIce5,0===l&&(h=_e.groundIce2),l===r.level.height-1&&(h=_e.groundIce8),0===u&&(h=_e.groundIce4,0===l&&(h=_e.groundIce1),l===r.level.height-1&&(h=_e.groundIce7)),u===r.level.width-1&&(h=_e.groundIce6,0===l&&(h=_e.groundIce3),l===r.level.height-1&&(h=_e.groundIce9)),this.drawSprite(h,u,l);if(this.shouldDrawGrid){for(n.strokeStyle=Je,d=1;d<r.level.height;d++)n.beginPath(),n.moveTo(0,d*c),n.lineTo(o,d*c),n.stroke();for(v=1;v<r.level.width;v++)n.beginPath(),n.moveTo(v*s,0),n.lineTo(v*s,a),n.stroke()}this.pendingAnimations=this.pendingAnimations.filter(function(e){return e.stopwatch.getRemaining()>0}),this.pendingAnimations.forEach(function(e){var t=e.traveled,n=e.stopwatch.getPercent();f.drawSpriteWithOpacity(n,t.move===i.Left?_e.heroLeft:_e.heroRight,t.point.x,t.point.y,1.2)}),this.drawSprite(_e.igloo,r.level.win.x,r.level.win.y),r.level.blocks.forEach(function(e){var t=(e.x+e.y)%2===0?_e.treeLight:_e.treeHeavy;f.drawSprite(t,e.x,e.y)}),this.drawSprite(this.spriteFacing===i.Left?_e.heroLeft:_e.heroRight,r.hero.point.x,r.hero.point.y,1.2);case 19:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),e}();function Qe(){var e=Object(f.a)(["\n  height: 80vh;\n"]);return Qe=function(){return e},e}function Ze(){var e=Object(f.a)(["\n  max-width: 50vh;\n  margin: 0px auto;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  flex-wrap: nowrap;\n"]);return Ze=function(){return e},e}var $e=m.a.div(Ze()),et=m.a.canvas(Qe()),tt=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e))).canvasRef=void 0,n.gm=new Xe,n.canvasRef=o.a.createRef(),n}return Object(v.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this.canvasRef.current;e&&this.gm.setup(e)}},{key:"render",value:function(){var e=this.gm;return o.a.createElement($e,null,o.a.createElement(g,null),o.a.createElement(Me,{gm:e},o.a.createElement(et,{ref:this.canvasRef})),o.a.createElement(qe,{gm:e}),o.a.createElement(Ne,{gm:e}))}}]),t}(o.a.Component),nt=Object(c.b)(function(e){return{store:e}})(tt);n(41);var it={testLevelGen:function(){var e=new x(5,5,new M(1,1),new M(3,3),[new M(2,4)]);console.log(e.print()),console.log(e.solve());var t=new x(5,5,new M(1,1),new M(3,3),[new M(4,0)]);console.log(t.print()),console.log(t.solve()),new T(5,5,.1,5).generateLevels(10,1e3).forEach(function(e){console.log(e.level.print()),console.log("Solution:",e.soln.printMoves()),console.log("\n")})}};window.scripts=it,s.a.render(o.a.createElement(c.a,{store:te},o.a.createElement(nt,null)),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.e7f0c7d1.chunk.js.map