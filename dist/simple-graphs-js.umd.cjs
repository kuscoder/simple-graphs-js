(function(n,h){typeof exports=="object"&&typeof module<"u"?module.exports=h():typeof define=="function"&&define.amd?define(h):(n=typeof globalThis<"u"?globalThis:n||self,n.SimpleGraphsJS=h())})(this,function(){"use strict";var u=Object.defineProperty;var T=(n,h,l)=>h in n?u(n,h,{enumerable:!0,configurable:!0,writable:!0,value:l}):n[h]=l;var i=(n,h,l)=>(T(n,typeof h!="symbol"?h+"":h,l),l);const h=class h{constructor(t,s={}){i(this,"WIDTH");i(this,"HEIGHT");i(this,"PADDING");i(this,"ROWS_COUNT");i(this,"MONTHS_NAMES");i(this,"DATES");i(this,"COLUMNS");i(this,"STYLES");i(this,"DPI_WIDTH");i(this,"DPI_HEIGHT");i(this,"VIEW_WIDTH");i(this,"VIEW_HEIGHT");i(this,"BOUNDARIES");i(this,"X_RATIO");i(this,"Y_RATIO");i(this,"ROWS_STEP");i(this,"TEXT_STEP");i(this,"DATE_COUNT");i(this,"DATE_STEP");i(this,"container");i(this,"canvas");i(this,"ctx");const e=h.getOptions(s);this.WIDTH=e.width,this.HEIGHT=e.height,this.PADDING=e.padding,this.ROWS_COUNT=e.rowsCount,this.MONTHS_NAMES=e.i18n.months,this.DATES=e.data.dates,this.STYLES={textFont:e.style.textFont,textColor:e.style.textColor,secondaryColor:e.style.secondaryColor},this.DPI_WIDTH=this.WIDTH*2,this.DPI_HEIGHT=this.HEIGHT*2,this.VIEW_WIDTH=this.DPI_WIDTH,this.VIEW_HEIGHT=this.DPI_HEIGHT-this.PADDING*2,this.BOUNDARIES=this.getBoundaries(e.data.columns),this.X_RATIO=this.VIEW_WIDTH/(e.data.columns[0].values.length-1),this.Y_RATIO=this.VIEW_HEIGHT/(this.BOUNDARIES[1]-this.BOUNDARIES[0]),this.COLUMNS=this.getColumns(e.data.columns),this.ROWS_STEP=this.VIEW_HEIGHT/this.ROWS_COUNT,this.TEXT_STEP=(this.BOUNDARIES[1]-this.BOUNDARIES[0])/this.ROWS_COUNT,this.DATE_COUNT=6,this.DATE_STEP=Math.round(this.DATES.length/this.DATE_COUNT),this.container=t,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.style.width=this.WIDTH+"px",this.canvas.style.height=this.HEIGHT+"px",this.canvas.width=this.DPI_WIDTH,this.canvas.height=this.DPI_HEIGHT,e.immediate&&this.initialize()}static validateOptions(t={}){var s,e,o,r,a,d;if(t.width){if(typeof t.width!="number")throw new Error("options.width should be a number");if(t.width<=0)throw new Error("options.width should be greater than 0");if(t.width%2!==0)throw new Error("options.width should be an even number")}if(t.height){if(typeof t.height!="number")throw new Error("options.height should be a number");if(t.height<=0)throw new Error("options.height should be greater than 0");if(t.height%2!==0)throw new Error("options.height should be an even number")}if(t.padding){if(typeof t.padding!="number")throw new Error("options.padding should be a number");if(t.padding<0)throw new Error("options.padding should be greater or equal to 0")}if(t.rowsCount){if(typeof t.rowsCount!="number")throw new Error("options.rowsCount should be a number");if(t.rowsCount<=0)throw new Error("options.rowsCount should be greater than 0")}if((s=t.i18n)!=null&&s.months){if(!Array.isArray(t.i18n.months))throw new Error("options.i18n.months should be an array");if(t.i18n.months.length!==12)throw new Error("options.i18n.months should have 12 elements")}if((e=t.data)!=null&&e.dates){if(!Array.isArray(t.data.dates))throw new Error("options.data.dates should be an array");if(t.data.dates.some(c=>typeof c!="number"))throw new Error("options.data.dates should be an array of numbers")}if((o=t.data)!=null&&o.columns&&!Array.isArray(t.data.columns))throw new Error("options.data.columns should be an array");if((r=t.style)!=null&&r.textFont&&typeof t.style.textFont!="string")throw new Error("options.style.textFont should be a string");if((a=t.style)!=null&&a.textColor&&typeof t.style.textColor!="string")throw new Error("options.style.textColor should be a string");if((d=t.style)!=null&&d.secondaryColor&&typeof t.style.secondaryColor!="string")throw new Error("options.style.secondaryColor should be a string");if(t.immediate&&typeof t.immediate!="boolean")throw new Error("options.immediate should be a boolean")}static getOptions(t={}){var s,e,o,r,a,d;return this.validateOptions(t),{width:t.width||this.presetOptions.width,height:t.height||this.presetOptions.height,padding:t.padding||this.presetOptions.padding,rowsCount:t.rowsCount||this.presetOptions.rowsCount,i18n:{months:((s=t.i18n)==null?void 0:s.months)||this.presetOptions.i18n.months},style:{textFont:((e=t.style)==null?void 0:e.textFont)||this.presetOptions.style.textFont,textColor:((o=t.style)==null?void 0:o.textColor)||this.presetOptions.style.textColor,secondaryColor:((r=t.style)==null?void 0:r.secondaryColor)||this.presetOptions.style.secondaryColor},data:{dates:((a=t.data)==null?void 0:a.dates)||this.presetOptions.data.dates,columns:((d=t.data)==null?void 0:d.columns)||this.presetOptions.data.columns},immediate:t.immediate??this.presetOptions.immediate}}static changePresetOptions(t={}){var s,e,o,r,a,d;this.validateOptions(t),this.presetOptions.width=t.width||this.presetOptions.width,this.presetOptions.height=t.height||this.presetOptions.height,this.presetOptions.padding=t.padding||this.presetOptions.padding,this.presetOptions.rowsCount=t.rowsCount||this.presetOptions.rowsCount,this.presetOptions.i18n.months=((s=t.i18n)==null?void 0:s.months)||this.presetOptions.i18n.months,this.presetOptions.style.textFont=((e=t.style)==null?void 0:e.textFont)||this.presetOptions.style.textFont,this.presetOptions.style.textColor=((o=t.style)==null?void 0:o.textColor)||this.presetOptions.style.textColor,this.presetOptions.style.secondaryColor=((r=t.style)==null?void 0:r.secondaryColor)||this.presetOptions.style.secondaryColor,this.presetOptions.data.columns=((a=t.data)==null?void 0:a.columns)||this.presetOptions.data.columns,this.presetOptions.data.dates=((d=t.data)==null?void 0:d.dates)||this.presetOptions.data.dates,this.presetOptions.immediate=t.immediate||this.presetOptions.immediate}initialize(){this.container.appendChild(this.canvas),this.draw()}destroy(){this.container.removeChild(this.canvas)}draw(){this.drawAxisX(),this.drawAxisY(),this.drawLines()}drawAxisX(){this.ctx.fillStyle=this.STYLES.textColor,this.ctx.font=this.STYLES.textFont,this.ctx.beginPath();for(let t=1;t<=this.DATES.length;t+=this.DATE_STEP){const s=this.getDate(this.DATES[t-1]);this.ctx.fillText(s,this.getX(t),this.DPI_HEIGHT-10)}this.ctx.closePath()}drawAxisY(){this.ctx.lineWidth=1,this.ctx.strokeStyle=this.STYLES.secondaryColor,this.ctx.fillStyle=this.STYLES.textColor,this.ctx.font=this.STYLES.textFont,this.ctx.beginPath();for(let t=1;t<=this.ROWS_COUNT;t++){const s=String(Math.round(this.BOUNDARIES[1]-this.TEXT_STEP*t)),e=t*this.ROWS_STEP+this.PADDING;this.ctx.fillText(s,5,e-10),this.ctx.moveTo(0,e),this.ctx.lineTo(this.DPI_WIDTH,e)}this.ctx.stroke(),this.ctx.closePath()}drawLines(){this.ctx.lineWidth=4;for(const t of this.COLUMNS){this.ctx.strokeStyle=t.color,this.ctx.beginPath();for(const[s,e]of t.values)this.ctx.lineTo(s,e);this.ctx.stroke(),this.ctx.closePath()}}getColumns(t){const s=JSON.parse(JSON.stringify(t));for(const e of s)e.values=e.values.map((o,r)=>[this.getX(r),this.getY(o)]);return s}getBoundaries(t){let s=null,e=null;for(const o of t)for(const r of o.values)s=s===null||r<s?r:s,e=e===null||r>e?r:e;return[s,e]}getDate(t){const s=new Date(t),e=s.getDate(),o=s.getMonth(),r=this.MONTHS_NAMES;return`${e} ${r[o]}`}getX(t){return Math.floor(t*this.X_RATIO)}getY(t){return Math.floor(this.DPI_HEIGHT-this.PADDING-t*this.Y_RATIO)}};i(h,"presetOptions",{width:600,height:250,padding:40,rowsCount:5,i18n:{months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},data:{columns:[],dates:[]},style:{textFont:"normal 20px Helvetica,sans-serif",textColor:"#96a2aa",secondaryColor:"#bbbbbb"},immediate:!0});let n=h;return n});
