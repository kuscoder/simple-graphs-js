(function(r,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(r=typeof globalThis<"u"?globalThis:r||self,l(r.SimpleChartsJS={}))})(this,function(r){"use strict";var D=Object.defineProperty;var v=(r,l,e)=>l in r?D(r,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[l]=e;var h=(r,l,e)=>(v(r,typeof l!="symbol"?l+"":l,e),e);class l extends Error{constructor(t){super(t),this.name="ChartError"}}class e extends l{constructor(t){super(t),this.name="ChartOptionsError"}}const A=class A{constructor(t,i={}){h(this,"WIDTH");h(this,"HEIGHT");h(this,"PADDING");h(this,"ROWS_COUNT");h(this,"DATA");h(this,"I18N");h(this,"STYLE");h(this,"FLAGS");h(this,"DPI_WIDTH");h(this,"DPI_HEIGHT");h(this,"VIEW_WIDTH");h(this,"VIEW_HEIGHT");h(this,"Y_BOUNDARIES");h(this,"X_RATIO");h(this,"Y_RATIO");h(this,"ROWS_STEP");h(this,"TEXT_STEP");h(this,"X_AXIS_DATA_COUNT");h(this,"X_AXIS_DATA_STEP");h(this,"isInitialized",!1);h(this,"rafID",0);h(this,"mouse");h(this,"container");h(this,"canvas");h(this,"ctx");h(this,"canvasRect");var a;const s=A.getOptions(i),n=((a=s.data.xAxis)==null?void 0:a.values.length)||0,o=s.data.yAxis[0].values.length;this.WIDTH=s.width,this.HEIGHT=s.height,this.PADDING=s.padding,this.ROWS_COUNT=s.rowsCount,this.DATA=s.data,this.I18N=s.i18n,this.STYLE=s.style,this.FLAGS=s.flags,this.DPI_WIDTH=this.WIDTH*2,this.DPI_HEIGHT=this.HEIGHT*2,this.VIEW_WIDTH=this.DPI_WIDTH,this.VIEW_HEIGHT=this.DPI_HEIGHT-this.PADDING*2,this.Y_BOUNDARIES=this.getBoundariesY(this.DATA.yAxis),this.X_RATIO=this.VIEW_WIDTH/(o-1),this.Y_RATIO=this.VIEW_HEIGHT/(this.Y_BOUNDARIES[1]-this.Y_BOUNDARIES[0]),this.ROWS_STEP=this.VIEW_HEIGHT/this.ROWS_COUNT,this.TEXT_STEP=(this.Y_BOUNDARIES[1]-this.Y_BOUNDARIES[0])/this.ROWS_COUNT,this.X_AXIS_DATA_COUNT=6,this.X_AXIS_DATA_STEP=n&&Math.round(n/this.X_AXIS_DATA_COUNT),this.mouseMoveHandler=this.mouseMoveHandler.bind(this),this.mouseLeaveHandler=this.mouseLeaveHandler.bind(this),this.drawChart=this.drawChart.bind(this),this.mouse=new Proxy({},{set:(...d)=>{const u=Reflect.set(...d);return this.rafID=window.requestAnimationFrame(this.drawChart),u}}),this.container=t,this.canvas=document.createElement("canvas"),this.canvas.style.width=this.WIDTH+"px",this.canvas.style.height=this.HEIGHT+"px",this.canvas.width=this.DPI_WIDTH,this.canvas.height=this.DPI_HEIGHT,this.ctx=this.canvas.getContext("2d"),this.FLAGS.immediateInit&&this.initialize()}initialize(){this.isInitialized||(this.isInitialized=!0,this.container.appendChild(this.canvas),this.canvas.addEventListener("mousemove",this.mouseMoveHandler),this.canvas.addEventListener("mouseleave",this.mouseLeaveHandler),this.drawChart())}destroy(){this.isInitialized&&(this.isInitialized=!1,window.cancelAnimationFrame(this.rafID),this.canvas.removeEventListener("mousemove",this.mouseMoveHandler),this.canvas.removeEventListener("mouseleave",this.mouseLeaveHandler),this.canvas.remove())}drawChart(){this.clearAll(),this.drawAxisX(),this.drawAxisY(),this.drawLines()}clearAll(){this.ctx.clearRect(0,0,this.DPI_WIDTH,this.DPI_HEIGHT)}drawAxisX(){if(this.DATA.xAxis){this.ctx.fillStyle=this.STYLE.textColor,this.ctx.font=this.STYLE.textFont,this.ctx.lineWidth=2,this.ctx.strokeStyle=this.STYLE.secondaryColor;for(let t=1;t<=this.DATA.xAxis.values.length;t++){const i=this.getX(t);if((t-1)%this.X_AXIS_DATA_STEP===0){const s=this.getDate(this.DATA.xAxis.values[t-1]);this.ctx.fillText(s,i,this.DPI_HEIGHT-10)}this.drawGuideLines(i)}}}drawGuideLines(t){var n;if(!this.mouse.x||!this.mouse.y)return;const i=((n=this.DATA.xAxis)==null?void 0:n.values.length)||0;i&&Math.abs(t-this.mouse.x)<this.DPI_WIDTH/i/2&&(this.FLAGS.horGuide&&(this.ctx.beginPath(),this.ctx.setLineDash([20,25]),this.ctx.moveTo(0,this.mouse.y),this.ctx.lineTo(this.DPI_WIDTH,this.mouse.y),this.ctx.stroke(),this.ctx.closePath()),this.ctx.beginPath(),this.ctx.setLineDash([]),this.ctx.moveTo(t,this.PADDING),this.ctx.lineTo(t,this.DPI_HEIGHT-this.PADDING),this.ctx.stroke(),this.ctx.closePath())}drawAxisY(){this.ctx.lineWidth=1,this.ctx.strokeStyle=this.STYLE.secondaryColor,this.ctx.fillStyle=this.STYLE.textColor,this.ctx.font=this.STYLE.textFont,this.ctx.beginPath();for(let t=1;t<=this.ROWS_COUNT;t++){const i=String(Math.round(this.Y_BOUNDARIES[1]-this.TEXT_STEP*t)),s=t*this.ROWS_STEP+this.PADDING;this.ctx.fillText(i,5,s-10),this.ctx.moveTo(0,s),this.ctx.lineTo(this.DPI_WIDTH,s)}this.ctx.stroke(),this.ctx.closePath()}drawLines(){this.ctx.lineWidth=4;for(const t of this.DATA.yAxis){this.ctx.strokeStyle=t.color,this.ctx.beginPath();for(let i=0;i<t.values.length;i++){const s=this.getX(i),n=this.getY(t.values[i]);this.ctx.lineTo(s,n)}this.ctx.stroke(),this.ctx.closePath()}}mouseMoveHandler(t){this.canvasRect??(this.canvasRect=this.canvas.getBoundingClientRect()),this.mouse.x=(t.clientX-this.canvasRect.left)*2,this.mouse.y=(t.clientY-this.canvasRect.top)*2}mouseLeaveHandler(){this.mouse.x=null,this.mouse.y=null}getBoundariesY(t){let i=null,s=null;for(const n of t)for(const o of n.values)(i===null||o<i)&&(i=o),(s===null||o>s)&&(s=o);return[i??0,s??0]}getDate(t){const i=new Date(t),s=i.getDate(),n=i.getMonth();return`${s} ${this.I18N.months[n]}`}getX(t){return t*this.X_RATIO}getY(t){return this.DPI_HEIGHT-this.PADDING-t*this.Y_RATIO}static validateOptions(t={}){const{width:i,height:s,padding:n,rowsCount:o,data:{xAxis:a,yAxis:d}={},i18n:{months:u}={},style:{textFont:c,textColor:y,secondaryColor:I}={},flags:{horGuide:w,immediateInit:m}={}}=t;if(i){if(typeof i!="number")throw new e("width should be a number");if(i<=0)throw new e("width should be greater than 0");if(i%2!==0)throw new e("width should be an even number")}if(s){if(typeof s!="number")throw new e("height should be a number");if(s<=0)throw new e("height should be greater than 0");if(s%2!==0)throw new e("height should be an even number")}if(n){if(typeof n!="number")throw new e("padding should be a number");if(n<0)throw new e("padding should be greater or equal to 0")}if(o){if(typeof o!="number")throw new e("rowsCount should be a number");if(o<=0)throw new e("rowsCount should be greater than 0")}if(a){if(typeof a!="object")throw new e("data.xAxis should be an object");if(typeof a.type!="string")throw new e("data.xAxis.type should be a string");if(!["date"].includes(a.type))throw new e('data.xAxis.type should be "date"');if(!Array.isArray(a.values))throw new e("data.xAxis.values should be an array");a.type==="date"&&a.values.forEach((x,f)=>{if(typeof x!="number")throw new e(`data.xAxis.values[${f}] should be a number`)})}if(d){if(!Array.isArray(d))throw new e("data.columns should be an array");d.forEach((x,f)=>{if(typeof x.name!="string")throw new e(`data.yAxis[${f}].name should be a string`);if(typeof x.color!="string")throw new e(`data.yAxis[${f}].color should be a string`);if(!Array.isArray(x.values))throw new e(`data.yAxis[${f}].values should be an array`);x.values.forEach((g,O)=>{if(typeof g!="number")throw new e(`data.yAxis[${f}].values[${O}] should be a number`)})})}if(u){if(!Array.isArray(u))throw new e("i18n.months should be an array");if(u.length!==12)throw new e("i18n.months should have 12 elements")}if(c&&typeof c!="string")throw new e("style.textFont should be a string");if(y&&typeof y!="string")throw new e("style.textColor should be a string");if(I&&typeof I!="string")throw new e("style.secondaryColor should be a string");if(w&&typeof w!="boolean")throw new e("flags.horGuide should be a boolean");if(m&&typeof m!="boolean")throw new e("flags.immediateInit should be a boolean")}static getOptions(t={}){var i,s,n,o,a,d,u,c;return this.validateOptions(t),{width:t.width||this.presetOptions.width,height:t.height||this.presetOptions.height,padding:t.padding??this.presetOptions.padding,rowsCount:t.rowsCount||this.presetOptions.rowsCount,data:{xAxis:((i=t.data)==null?void 0:i.xAxis)||this.presetOptions.data.xAxis,yAxis:((s=t.data)==null?void 0:s.yAxis)||this.presetOptions.data.yAxis},i18n:{months:((n=t.i18n)==null?void 0:n.months)||this.presetOptions.i18n.months},style:{textFont:((o=t.style)==null?void 0:o.textFont)||this.presetOptions.style.textFont,textColor:((a=t.style)==null?void 0:a.textColor)||this.presetOptions.style.textColor,secondaryColor:((d=t.style)==null?void 0:d.secondaryColor)||this.presetOptions.style.secondaryColor},flags:{horGuide:((u=t.flags)==null?void 0:u.horGuide)??this.presetOptions.flags.horGuide,immediateInit:((c=t.flags)==null?void 0:c.immediateInit)??this.presetOptions.flags.immediateInit}}}static changePresetOptions(t={}){var i,s,n,o,a,d,u,c;this.validateOptions(t),this.presetOptions.width=t.width||this.presetOptions.width,this.presetOptions.height=t.height||this.presetOptions.height,this.presetOptions.padding=t.padding??this.presetOptions.padding,this.presetOptions.rowsCount=t.rowsCount||this.presetOptions.rowsCount,this.presetOptions.i18n.months=((i=t.i18n)==null?void 0:i.months)||this.presetOptions.i18n.months,this.presetOptions.style.textFont=((s=t.style)==null?void 0:s.textFont)||this.presetOptions.style.textFont,this.presetOptions.style.textColor=((n=t.style)==null?void 0:n.textColor)||this.presetOptions.style.textColor,this.presetOptions.style.secondaryColor=((o=t.style)==null?void 0:o.secondaryColor)||this.presetOptions.style.secondaryColor,this.presetOptions.data.xAxis=((a=t.data)==null?void 0:a.xAxis)||this.presetOptions.data.xAxis,this.presetOptions.data.yAxis=((d=t.data)==null?void 0:d.yAxis)||this.presetOptions.data.yAxis,this.presetOptions.flags.horGuide=((u=t.flags)==null?void 0:u.horGuide)??this.presetOptions.flags.horGuide,this.presetOptions.flags.immediateInit=((c=t.flags)==null?void 0:c.immediateInit)??this.presetOptions.flags.immediateInit}};h(A,"presetOptions",{width:600,height:250,padding:40,rowsCount:5,data:{xAxis:null,yAxis:[]},i18n:{months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},style:{textFont:"normal 20px Helvetica,sans-serif",textColor:"#96a2aa",secondaryColor:"#bbbbbb"},flags:{horGuide:!0,immediateInit:!0}});let p=A;r.Chart=p,r.ChartError=l,r.ChartOptionsError=e,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});
