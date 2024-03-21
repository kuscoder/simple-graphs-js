(function(l,d){typeof exports=="object"&&typeof module<"u"?d(exports):typeof define=="function"&&define.amd?define(["exports"],d):(l=typeof globalThis<"u"?globalThis:l||self,d(l.SimpleChartsJS={}))})(this,function(l){"use strict";var _=Object.defineProperty;var v=(l,d,e)=>d in l?_(l,d,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[d]=e;var h=(l,d,e)=>(v(l,typeof d!="symbol"?d+"":d,e),e);class d extends Error{constructor(t){super(t),this.name="ChartError"}}class e extends d{constructor(t){super(t),this.name="ChartOptionsError"}}const g=class g{constructor(t,i={}){h(this,"WIDTH");h(this,"HEIGHT");h(this,"PADDING");h(this,"ROWS_COUNT");h(this,"GUIDE_DOTS_RADIUS");h(this,"DATA");h(this,"I18N");h(this,"STYLE");h(this,"FLAGS");h(this,"DPI_WIDTH");h(this,"DPI_HEIGHT");h(this,"VIEW_WIDTH");h(this,"VIEW_HEIGHT");h(this,"Y_AXIS_DATA_BOUNDARIES");h(this,"X_RATIO");h(this,"Y_RATIO");h(this,"ROWS_STEP");h(this,"TEXT_STEP");h(this,"X_AXIS_DATA_COUNT");h(this,"X_AXIS_DATA_STEP");h(this,"isInitialized",!1);h(this,"rafID",0);h(this,"mouse");h(this,"container");h(this,"canvas");h(this,"ctx");h(this,"canvasRect");var n;const s=g.getOptions(i),o=((n=s.data.xAxis)==null?void 0:n.values.length)||0,a=s.data.yAxis[0].values.length;this.WIDTH=s.width,this.HEIGHT=s.height,this.PADDING=s.padding,this.ROWS_COUNT=s.rowsCount,this.GUIDE_DOTS_RADIUS=s.guideDotsRadius,this.DATA=s.data,this.I18N=s.i18n,this.STYLE=s.style,this.FLAGS=s.flags,this.DPI_WIDTH=this.WIDTH*2,this.DPI_HEIGHT=this.HEIGHT*2,this.VIEW_WIDTH=this.DPI_WIDTH,this.VIEW_HEIGHT=this.DPI_HEIGHT-this.PADDING*2,this.Y_AXIS_DATA_BOUNDARIES=this.getYAxisDataBoundaries(this.DATA.yAxis),this.X_RATIO=this.VIEW_WIDTH/(a-1),this.Y_RATIO=this.VIEW_HEIGHT/(this.Y_AXIS_DATA_BOUNDARIES[1]-this.Y_AXIS_DATA_BOUNDARIES[0]),this.ROWS_STEP=this.VIEW_HEIGHT/this.ROWS_COUNT,this.TEXT_STEP=(this.Y_AXIS_DATA_BOUNDARIES[1]-this.Y_AXIS_DATA_BOUNDARIES[0])/this.ROWS_COUNT,this.X_AXIS_DATA_COUNT=6,this.X_AXIS_DATA_STEP=o&&Math.round(o/this.X_AXIS_DATA_COUNT),this.mouseMoveHandler=this.mouseMoveHandler.bind(this),this.mouseLeaveHandler=this.mouseLeaveHandler.bind(this),this.drawChart=this.drawChart.bind(this),this.mouse=new Proxy({},{set:(...r)=>{const u=Reflect.set(...r);return this.rafID=window.requestAnimationFrame(this.drawChart),u}}),this.container=t,this.canvas=document.createElement("canvas"),this.canvas.style.width=this.WIDTH+"px",this.canvas.style.height=this.HEIGHT+"px",this.canvas.width=this.DPI_WIDTH,this.canvas.height=this.DPI_HEIGHT,this.ctx=this.canvas.getContext("2d"),this.FLAGS.immediateInit&&this.initialize()}initialize(){this.isInitialized||(this.isInitialized=!0,this.container.appendChild(this.canvas),this.canvas.addEventListener("mousemove",this.mouseMoveHandler),this.canvas.addEventListener("mouseleave",this.mouseLeaveHandler),this.drawChart())}destroy(){this.isInitialized&&(this.isInitialized=!1,window.cancelAnimationFrame(this.rafID),this.canvas.removeEventListener("mousemove",this.mouseMoveHandler),this.canvas.removeEventListener("mouseleave",this.mouseLeaveHandler),this.canvas.remove())}drawChart(){this.drawBackground(),this.drawAxisX(),this.drawAxisY(),this.drawLines()}drawBackground(){this.ctx.fillStyle=this.STYLE.backgroundColor,this.ctx.fillRect(0,0,this.DPI_WIDTH,this.DPI_HEIGHT)}drawAxisX(){if(this.DATA.xAxis){this.ctx.fillStyle=this.STYLE.textColor,this.ctx.font=this.STYLE.textFont,this.ctx.lineWidth=2,this.ctx.strokeStyle=this.STYLE.secondaryColor;for(let t=1;t<=this.DATA.xAxis.values.length;t++){const i=this.getX(t);if((t-1)%this.X_AXIS_DATA_STEP===0){const s=this.getDate(this.DATA.xAxis.values[t-1]);this.ctx.fillText(s,i,this.DPI_HEIGHT-10)}this.drawGuideLinesIsOver(i)}}}drawGuideLinesIsOver(t){if(this.mouse.x&&this.mouse.y){const i=this.isMouseOverYAxisDataItem(t),s=this.PADDING/2,o=this.DPI_HEIGHT-this.PADDING;if(i&&this.mouse.y>=s)return this.FLAGS.horGuide&&this.mouse.y<=o&&(this.ctx.beginPath(),this.ctx.setLineDash([20,25]),this.ctx.moveTo(0,this.mouse.y),this.ctx.lineTo(this.DPI_WIDTH,this.mouse.y),this.ctx.stroke(),this.ctx.closePath()),this.ctx.beginPath(),this.ctx.setLineDash([]),this.ctx.moveTo(t,s),this.ctx.lineTo(t,o),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.ctx.arc(t,s,2,0,2*Math.PI),this.ctx.fill(),this.ctx.stroke(),this.ctx.closePath(),!0}return!1}drawAxisY(){this.ctx.lineWidth=1,this.ctx.strokeStyle=this.STYLE.secondaryColor,this.ctx.fillStyle=this.STYLE.textColor,this.ctx.font=this.STYLE.textFont,this.ctx.beginPath();for(let t=1;t<=this.ROWS_COUNT;t++){const i=String(Math.round(this.Y_AXIS_DATA_BOUNDARIES[1]-this.TEXT_STEP*t)),s=t*this.ROWS_STEP+this.PADDING;this.ctx.fillText(i,5,s-10),this.ctx.moveTo(0,s),this.ctx.lineTo(this.DPI_WIDTH,s)}this.ctx.stroke(),this.ctx.closePath()}drawLines(){this.ctx.lineWidth=4,this.ctx.fillStyle=this.STYLE.backgroundColor;for(const t of this.DATA.yAxis){let i=null,s=null;this.ctx.strokeStyle=t.color,this.ctx.beginPath();for(let o=0;o<t.values.length;o++){const a=this.getX(o),n=this.getY(t.values[o]);this.ctx.lineTo(a,n),this.isMouseOverYAxisDataItem(a)&&(i=a,s=n)}this.ctx.stroke(),this.ctx.closePath(),i&&s&&this.mouse.x&&this.mouse.y&&this.mouse.y>=this.PADDING/2&&(this.ctx.beginPath(),this.ctx.arc(i,s,this.GUIDE_DOTS_RADIUS,0,2*Math.PI),this.ctx.fill(),this.ctx.stroke(),this.ctx.closePath())}}isMouseOverYAxisDataItem(t){var s;const i=(s=this.DATA.xAxis)==null?void 0:s.values.length;return!i||!this.mouse.x?!1:Math.abs(t-this.mouse.x)<this.DPI_WIDTH/i/2}mouseMoveHandler(t){this.canvasRect??(this.canvasRect=this.canvas.getBoundingClientRect()),this.mouse.x=(t.clientX-this.canvasRect.left)*2,this.mouse.y=(t.clientY-this.canvasRect.top)*2}mouseLeaveHandler(){this.mouse.x=null,this.mouse.y=null}getYAxisDataBoundaries(t){let i=null,s=null;for(const o of t)for(const a of o.values)(i===null||a<i)&&(i=a),(s===null||a>s)&&(s=a);return[i??0,s??0]}getDate(t){const i=new Date(t),s=i.getDate(),o=i.getMonth();return`${s} ${this.I18N.months[o]}`}getX(t){return t*this.X_RATIO}getY(t){return this.DPI_HEIGHT-this.PADDING-t*this.Y_RATIO}static validateOptions(t={}){const{width:i,height:s,padding:o,rowsCount:a,guideDotsRadius:n,data:{xAxis:r,yAxis:u}={},i18n:{months:c}={},style:{textFont:x,textColor:y,secondaryColor:p,backgroundColor:D}={},flags:{horGuide:m,immediateInit:w}={}}=t;if(i){if(typeof i!="number")throw new e("width should be a number");if(i<=0)throw new e("width should be greater than 0");if(i%2!==0)throw new e("width should be an even number")}if(s){if(typeof s!="number")throw new e("height should be a number");if(s<=0)throw new e("height should be greater than 0");if(s%2!==0)throw new e("height should be an even number")}if(o){if(typeof o!="number")throw new e("padding should be a number");if(o<0)throw new e("padding should be greater or equal to 0")}if(a){if(typeof a!="number")throw new e("rowsCount should be a number");if(a<=0)throw new e("rowsCount should be greater than 0")}if(n){if(typeof n!="number")throw new e("guideDotsRadius should be a number");if(n<=0)throw new e("guideDotsRadius should be greater than 0")}if(r){if(typeof r!="object")throw new e("data.xAxis should be an object");if(typeof r.type!="string")throw new e("data.xAxis.type should be a string");if(!["date"].includes(r.type))throw new e('data.xAxis.type should be "date"');if(!Array.isArray(r.values))throw new e("data.xAxis.values should be an array");r.type==="date"&&r.values.forEach((f,A)=>{if(typeof f!="number")throw new e(`data.xAxis.values[${A}] should be a number`)})}if(u){if(!Array.isArray(u))throw new e("data.columns should be an array");u.forEach((f,A)=>{if(typeof f.name!="string")throw new e(`data.yAxis[${A}].name should be a string`);if(typeof f.color!="string")throw new e(`data.yAxis[${A}].color should be a string`);if(!Array.isArray(f.values))throw new e(`data.yAxis[${A}].values should be an array`);f.values.forEach((O,b)=>{if(typeof O!="number")throw new e(`data.yAxis[${A}].values[${b}] should be a number`)})})}if(c){if(!Array.isArray(c))throw new e("i18n.months should be an array");if(c.length!==12)throw new e("i18n.months should have 12 elements")}if(x&&typeof x!="string")throw new e("style.textFont should be a string");if(y&&typeof y!="string")throw new e("style.textColor should be a string");if(p&&typeof p!="string")throw new e("style.secondaryColor should be a string");if(D&&typeof D!="string")throw new e("style.backgroundColor should be a string");if(m&&typeof m!="boolean")throw new e("flags.horGuide should be a boolean");if(w&&typeof w!="boolean")throw new e("flags.immediateInit should be a boolean")}static getOptions(t={}){var i,s,o,a,n,r,u,c,x;return this.validateOptions(t),{width:t.width||this.presetOptions.width,height:t.height||this.presetOptions.height,padding:t.padding??this.presetOptions.padding,rowsCount:t.rowsCount||this.presetOptions.rowsCount,guideDotsRadius:t.guideDotsRadius||this.presetOptions.guideDotsRadius,data:{xAxis:((i=t.data)==null?void 0:i.xAxis)||this.presetOptions.data.xAxis,yAxis:((s=t.data)==null?void 0:s.yAxis)||this.presetOptions.data.yAxis},i18n:{months:((o=t.i18n)==null?void 0:o.months)||this.presetOptions.i18n.months},style:{textFont:((a=t.style)==null?void 0:a.textFont)||this.presetOptions.style.textFont,textColor:((n=t.style)==null?void 0:n.textColor)||this.presetOptions.style.textColor,secondaryColor:((r=t.style)==null?void 0:r.secondaryColor)||this.presetOptions.style.secondaryColor,backgroundColor:((u=t.style)==null?void 0:u.backgroundColor)||this.presetOptions.style.backgroundColor},flags:{horGuide:((c=t.flags)==null?void 0:c.horGuide)??this.presetOptions.flags.horGuide,immediateInit:((x=t.flags)==null?void 0:x.immediateInit)??this.presetOptions.flags.immediateInit}}}static changePresetOptions(t={}){var i,s,o,a,n,r,u,c,x;this.validateOptions(t),this.presetOptions.width=t.width||this.presetOptions.width,this.presetOptions.height=t.height||this.presetOptions.height,this.presetOptions.padding=t.padding??this.presetOptions.padding,this.presetOptions.rowsCount=t.rowsCount||this.presetOptions.rowsCount,this.presetOptions.guideDotsRadius=t.guideDotsRadius||this.presetOptions.guideDotsRadius,this.presetOptions.i18n.months=((i=t.i18n)==null?void 0:i.months)||this.presetOptions.i18n.months,this.presetOptions.style.textFont=((s=t.style)==null?void 0:s.textFont)||this.presetOptions.style.textFont,this.presetOptions.style.textColor=((o=t.style)==null?void 0:o.textColor)||this.presetOptions.style.textColor,this.presetOptions.style.secondaryColor=((a=t.style)==null?void 0:a.secondaryColor)||this.presetOptions.style.secondaryColor,this.presetOptions.style.backgroundColor=((n=t.style)==null?void 0:n.backgroundColor)||this.presetOptions.style.backgroundColor,this.presetOptions.data.xAxis=((r=t.data)==null?void 0:r.xAxis)||this.presetOptions.data.xAxis,this.presetOptions.data.yAxis=((u=t.data)==null?void 0:u.yAxis)||this.presetOptions.data.yAxis,this.presetOptions.flags.horGuide=((c=t.flags)==null?void 0:c.horGuide)??this.presetOptions.flags.horGuide,this.presetOptions.flags.immediateInit=((x=t.flags)==null?void 0:x.immediateInit)??this.presetOptions.flags.immediateInit}};h(g,"presetOptions",{width:600,height:250,padding:40,rowsCount:5,guideDotsRadius:10,data:{xAxis:null,yAxis:[]},i18n:{months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},style:{textFont:"normal 20px Helvetica,sans-serif",textColor:"#96a2aa",secondaryColor:"#bbbbbb",backgroundColor:"#ffffff"},flags:{horGuide:!0,immediateInit:!0}});let I=g;l.Chart=I,l.ChartError=d,l.ChartOptionsError=e,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
