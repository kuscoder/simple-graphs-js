(function(n,o){typeof exports=="object"&&typeof module<"u"?module.exports=o():typeof define=="function"&&define.amd?define(o):(n=typeof globalThis<"u"?globalThis:n||self,n.SimpleGraphsJS=o())})(this,function(){"use strict";var c=Object.defineProperty;var w=(n,o,A)=>o in n?c(n,o,{enumerable:!0,configurable:!0,writable:!0,value:A}):n[o]=A;var i=(n,o,A)=>(w(n,typeof o!="symbol"?o+"":o,A),A);const o=class o{constructor(t,s={}){i(this,"WIDTH");i(this,"HEIGHT");i(this,"PADDING");i(this,"ROWS_COUNT");i(this,"MONTHS_NAMES");i(this,"X_AXIS_DATA");i(this,"Y_AXIS_DATA");i(this,"STYLES");i(this,"DPI_WIDTH");i(this,"DPI_HEIGHT");i(this,"VIEW_WIDTH");i(this,"VIEW_HEIGHT");i(this,"Y_BOUNDARIES");i(this,"X_RATIO");i(this,"Y_RATIO");i(this,"ROWS_STEP");i(this,"TEXT_STEP");i(this,"X_AXIS_DATA_COUNT");i(this,"X_AXIS_DATA_STEP");i(this,"container");i(this,"canvas");i(this,"ctx");var a;const e=o.getOptions(s),r=((a=e.data.xAxis)==null?void 0:a.values.length)||0,h=e.data.yAxis[0].values.length;this.WIDTH=e.width,this.HEIGHT=e.height,this.PADDING=e.padding,this.ROWS_COUNT=e.rowsCount,this.MONTHS_NAMES=e.i18n.months,this.X_AXIS_DATA=e.data.xAxis,this.Y_AXIS_DATA=e.data.yAxis,this.STYLES={textFont:e.style.textFont,textColor:e.style.textColor,secondaryColor:e.style.secondaryColor},this.DPI_WIDTH=this.WIDTH*2,this.DPI_HEIGHT=this.HEIGHT*2,this.VIEW_WIDTH=this.DPI_WIDTH,this.VIEW_HEIGHT=this.DPI_HEIGHT-this.PADDING*2,this.Y_BOUNDARIES=this.getBoundariesY(this.Y_AXIS_DATA),this.X_RATIO=this.VIEW_WIDTH/(h-1),this.Y_RATIO=this.VIEW_HEIGHT/(this.Y_BOUNDARIES[1]-this.Y_BOUNDARIES[0]),this.ROWS_STEP=this.VIEW_HEIGHT/this.ROWS_COUNT,this.TEXT_STEP=(this.Y_BOUNDARIES[1]-this.Y_BOUNDARIES[0])/this.ROWS_COUNT,this.X_AXIS_DATA_COUNT=6,this.X_AXIS_DATA_STEP=r&&Math.round(r/this.X_AXIS_DATA_COUNT),this.container=t,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.style.width=this.WIDTH+"px",this.canvas.style.height=this.HEIGHT+"px",this.canvas.width=this.DPI_WIDTH,this.canvas.height=this.DPI_HEIGHT,e.immediate&&this.initialize()}static validateOptions(t={}){var s,e,r,h,a,d;if(t.width){if(typeof t.width!="number")throw new Error("options.width should be a number");if(t.width<=0)throw new Error("options.width should be greater than 0");if(t.width%2!==0)throw new Error("options.width should be an even number")}if(t.height){if(typeof t.height!="number")throw new Error("options.height should be a number");if(t.height<=0)throw new Error("options.height should be greater than 0");if(t.height%2!==0)throw new Error("options.height should be an even number")}if(t.padding){if(typeof t.padding!="number")throw new Error("options.padding should be a number");if(t.padding<0)throw new Error("options.padding should be greater or equal to 0")}if(t.rowsCount){if(typeof t.rowsCount!="number")throw new Error("options.rowsCount should be a number");if(t.rowsCount<=0)throw new Error("options.rowsCount should be greater than 0")}if((s=t.i18n)!=null&&s.months){if(!Array.isArray(t.i18n.months))throw new Error("options.i18n.months should be an array");if(t.i18n.months.length!==12)throw new Error("options.i18n.months should have 12 elements")}if((e=t.data)!=null&&e.xAxis){if(typeof t.data.xAxis!="object")throw new Error("options.data.xAxis should be an object");if(typeof t.data.xAxis.type!="string")throw new Error("options.data.xAxis.type should be a string");if(!["date"].includes(t.data.xAxis.type))throw new Error('options.data.xAxis.type should be "date"');if(!Array.isArray(t.data.xAxis.values))throw new Error("options.data.xAxis.values should be an array");t.data.xAxis.type==="date"&&t.data.xAxis.values.forEach((l,x)=>{if(typeof l!="number")throw new Error(`options.data.xAxis.values[${x}] should be a number`)})}if((r=t.data)!=null&&r.yAxis){if(!Array.isArray(t.data.yAxis))throw new Error("options.data.columns should be an array");t.data.yAxis.forEach((l,x)=>{if(typeof l.name!="string")throw new Error(`options.data.yAxis[${x}].name should be a string`);if(typeof l.color!="string")throw new Error(`options.data.yAxis[${x}].color should be a string`);if(!Array.isArray(l.values))throw new Error(`options.data.yAxis[${x}].values should be an array`);l.values.forEach((y,u)=>{if(typeof y!="number")throw new Error(`options.data.yAxis[${x}].values[${u}] should be a number`)})})}if((h=t.style)!=null&&h.textFont&&typeof t.style.textFont!="string")throw new Error("options.style.textFont should be a string");if((a=t.style)!=null&&a.textColor&&typeof t.style.textColor!="string")throw new Error("options.style.textColor should be a string");if((d=t.style)!=null&&d.secondaryColor&&typeof t.style.secondaryColor!="string")throw new Error("options.style.secondaryColor should be a string");if(t.immediate&&typeof t.immediate!="boolean")throw new Error("options.immediate should be a boolean")}static getOptions(t={}){var s,e,r,h,a,d;return this.validateOptions(t),{width:t.width||this.presetOptions.width,height:t.height||this.presetOptions.height,padding:t.padding||this.presetOptions.padding,rowsCount:t.rowsCount||this.presetOptions.rowsCount,i18n:{months:((s=t.i18n)==null?void 0:s.months)||this.presetOptions.i18n.months},style:{textFont:((e=t.style)==null?void 0:e.textFont)||this.presetOptions.style.textFont,textColor:((r=t.style)==null?void 0:r.textColor)||this.presetOptions.style.textColor,secondaryColor:((h=t.style)==null?void 0:h.secondaryColor)||this.presetOptions.style.secondaryColor},data:{xAxis:((a=t.data)==null?void 0:a.xAxis)||this.presetOptions.data.xAxis,yAxis:((d=t.data)==null?void 0:d.yAxis)||this.presetOptions.data.yAxis},immediate:t.immediate??this.presetOptions.immediate}}static changePresetOptions(t={}){var s,e,r,h,a,d;this.validateOptions(t),this.presetOptions.width=t.width||this.presetOptions.width,this.presetOptions.height=t.height||this.presetOptions.height,this.presetOptions.padding=t.padding||this.presetOptions.padding,this.presetOptions.rowsCount=t.rowsCount||this.presetOptions.rowsCount,this.presetOptions.i18n.months=((s=t.i18n)==null?void 0:s.months)||this.presetOptions.i18n.months,this.presetOptions.style.textFont=((e=t.style)==null?void 0:e.textFont)||this.presetOptions.style.textFont,this.presetOptions.style.textColor=((r=t.style)==null?void 0:r.textColor)||this.presetOptions.style.textColor,this.presetOptions.style.secondaryColor=((h=t.style)==null?void 0:h.secondaryColor)||this.presetOptions.style.secondaryColor,this.presetOptions.data.xAxis=((a=t.data)==null?void 0:a.xAxis)||this.presetOptions.data.xAxis,this.presetOptions.data.yAxis=((d=t.data)==null?void 0:d.yAxis)||this.presetOptions.data.yAxis,this.presetOptions.immediate=t.immediate||this.presetOptions.immediate}initialize(){this.container.appendChild(this.canvas),this.draw()}destroy(){this.container.removeChild(this.canvas)}draw(){this.drawAxisX(),this.drawAxisY(),this.drawLines()}drawAxisX(){if(this.X_AXIS_DATA){this.ctx.fillStyle=this.STYLES.textColor,this.ctx.font=this.STYLES.textFont,this.ctx.beginPath();for(let t=1;t<=this.X_AXIS_DATA.values.length;t+=this.X_AXIS_DATA_STEP){const s=this.getDate(this.X_AXIS_DATA.values[t-1]);this.ctx.fillText(s,this.getX(t),this.DPI_HEIGHT-10)}this.ctx.closePath()}}drawAxisY(){this.ctx.lineWidth=1,this.ctx.strokeStyle=this.STYLES.secondaryColor,this.ctx.fillStyle=this.STYLES.textColor,this.ctx.font=this.STYLES.textFont,this.ctx.beginPath();for(let t=1;t<=this.ROWS_COUNT;t++){const s=String(Math.round(this.Y_BOUNDARIES[1]-this.TEXT_STEP*t)),e=t*this.ROWS_STEP+this.PADDING;this.ctx.fillText(s,5,e-10),this.ctx.moveTo(0,e),this.ctx.lineTo(this.DPI_WIDTH,e)}this.ctx.stroke(),this.ctx.closePath()}drawLines(){this.ctx.lineWidth=4;for(const t of this.Y_AXIS_DATA){this.ctx.strokeStyle=t.color,this.ctx.beginPath();for(let s=0;s<t.values.length;s++){const e=this.getX(s),r=this.getY(t.values[s]);this.ctx.lineTo(e,r)}this.ctx.stroke(),this.ctx.closePath()}}getBoundariesY(t){let s=null,e=null;for(const r of t)for(const h of r.values)s=s===null||h<s?h:s,e=e===null||h>e?h:e;return[s,e]}getDate(t){const s=new Date(t),e=s.getDate(),r=s.getMonth(),h=this.MONTHS_NAMES;return`${e} ${h[r]}`}getX(t){return Math.floor(t*this.X_RATIO)}getY(t){return Math.floor(this.DPI_HEIGHT-this.PADDING-t*this.Y_RATIO)}};i(o,"presetOptions",{width:600,height:250,padding:40,rowsCount:5,i18n:{months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},data:{xAxis:null,yAxis:[]},style:{textFont:"normal 20px Helvetica,sans-serif",textColor:"#96a2aa",secondaryColor:"#bbbbbb"},immediate:!0});let n=o;return n});
