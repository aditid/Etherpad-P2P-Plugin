/**
 * yjs - A framework for real-time p2p shared editing on any data
 * @version v12.1.7
 * @link http://y-js.org
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.yText=e()}}(function(){return function e(n,t,r){function i(s,l){if(!t[s]){if(!n[s]){var a="function"==typeof require&&require;if(!l&&a)return a(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};n[s][0].call(c.exports,function(e){var t=n[s][1][e];return i(t||e)},c,c.exports,e,n,t,r)}return t[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,n,t){function r(e,n,t){if(e==n)return e?[[p,e]]:[];(t<0||e.length<t)&&(t=null);var r=l(e,n),o=e.substring(0,r);e=e.substring(r),n=n.substring(r),r=a(e,n);var s=e.substring(e.length-r);e=e.substring(0,e.length-r),n=n.substring(0,n.length-r);var u=i(e,n);return o&&u.unshift([p,o]),s&&u.push([p,s]),c(u),null!=t&&(u=h(u,t)),u}function i(e,n){var t;if(!e)return[[v,n]];if(!n)return[[d,e]];var i=e.length>n.length?e:n,s=e.length>n.length?n:e,l=i.indexOf(s);if(l!=-1)return t=[[v,i.substring(0,l)],[p,s],[v,i.substring(l+s.length)]],e.length>n.length&&(t[0][0]=t[2][0]=d),t;if(1==s.length)return[[d,e],[v,n]];var a=u(e,n);if(a){var c=a[0],f=a[1],h=a[2],g=a[3],b=a[4],y=r(c,h),m=r(f,g);return y.concat([[p,b]],m)}return o(e,n)}function o(e,n){for(var t=e.length,r=n.length,i=Math.ceil((t+r)/2),o=i,l=2*i,a=new Array(l),u=new Array(l),c=0;c<l;c++)a[c]=-1,u[c]=-1;a[o+1]=0,u[o+1]=0;for(var f=t-r,h=f%2!=0,g=0,p=0,b=0,y=0,m=0;m<i;m++){for(var x=-m+g;x<=m-p;x+=2){var w,M=o+x;w=x==-m||x!=m&&a[M-1]<a[M+1]?a[M+1]:a[M-1]+1;for(var k=w-x;w<t&&k<r&&e.charAt(w)==n.charAt(k);)w++,k++;if(a[M]=w,w>t)p+=2;else if(k>r)g+=2;else if(h){var C=o+f-x;if(C>=0&&C<l&&u[C]!=-1){var I=t-u[C];if(w>=I)return s(e,n,w,k)}}}for(var A=-m+b;A<=m-y;A+=2){var I,C=o+A;I=A==-m||A!=m&&u[C-1]<u[C+1]?u[C+1]:u[C-1]+1;for(var O=I-A;I<t&&O<r&&e.charAt(t-I-1)==n.charAt(r-O-1);)I++,O++;if(u[C]=I,I>t)y+=2;else if(O>r)b+=2;else if(!h){var M=o+f-A;if(M>=0&&M<l&&a[M]!=-1){var w=a[M],k=o+w-M;if(I=t-I,w>=I)return s(e,n,w,k)}}}}return[[d,e],[v,n]]}function s(e,n,t,i){var o=e.substring(0,t),s=n.substring(0,i),l=e.substring(t),a=n.substring(i),u=r(o,s),c=r(l,a);return u.concat(c)}function l(e,n){if(!e||!n||e.charAt(0)!=n.charAt(0))return 0;for(var t=0,r=Math.min(e.length,n.length),i=r,o=0;t<i;)e.substring(o,i)==n.substring(o,i)?(t=i,o=t):r=i,i=Math.floor((r-t)/2+t);return i}function a(e,n){if(!e||!n||e.charAt(e.length-1)!=n.charAt(n.length-1))return 0;for(var t=0,r=Math.min(e.length,n.length),i=r,o=0;t<i;)e.substring(e.length-i,e.length-o)==n.substring(n.length-i,n.length-o)?(t=i,o=t):r=i,i=Math.floor((r-t)/2+t);return i}function u(e,n){function t(e,n,t){for(var r,i,o,s,u=e.substring(t,t+Math.floor(e.length/4)),c=-1,f="";(c=n.indexOf(u,c+1))!=-1;){var h=l(e.substring(t),n.substring(c)),g=a(e.substring(0,t),n.substring(0,c));f.length<g+h&&(f=n.substring(c-g,c)+n.substring(c,c+h),r=e.substring(0,t-g),i=e.substring(t+h),o=n.substring(0,c-g),s=n.substring(c+h))}return 2*f.length>=e.length?[r,i,o,s,f]:null}var r=e.length>n.length?e:n,i=e.length>n.length?n:e;if(r.length<4||2*i.length<r.length)return null;var o,s=t(r,i,Math.ceil(r.length/4)),u=t(r,i,Math.ceil(r.length/2));if(!s&&!u)return null;o=u?s&&s[4].length>u[4].length?s:u:s;var c,f,h,g;return e.length>n.length?(c=o[0],f=o[1],h=o[2],g=o[3]):(h=o[0],g=o[1],c=o[2],f=o[3]),[c,f,h,g,o[4]]}function c(e){e.push([p,""]);for(var n,t=0,r=0,i=0,o="",s="";t<e.length;)switch(e[t][0]){case v:i++,s+=e[t][1],t++;break;case d:r++,o+=e[t][1],t++;break;case p:r+i>1?(0!==r&&0!==i&&(n=l(s,o),0!==n&&(t-r-i>0&&e[t-r-i-1][0]==p?e[t-r-i-1][1]+=s.substring(0,n):(e.splice(0,0,[p,s.substring(0,n)]),t++),s=s.substring(n),o=o.substring(n)),0!==(n=a(s,o))&&(e[t][1]=s.substring(s.length-n)+e[t][1],s=s.substring(0,s.length-n),o=o.substring(0,o.length-n))),0===r?e.splice(t-i,r+i,[v,s]):0===i?e.splice(t-r,r+i,[d,o]):e.splice(t-r-i,r+i,[d,o],[v,s]),t=t-r-i+(r?1:0)+(i?1:0)+1):0!==t&&e[t-1][0]==p?(e[t-1][1]+=e[t][1],e.splice(t,1)):t++,i=0,r=0,o="",s=""}""===e[e.length-1][1]&&e.pop();var u=!1;for(t=1;t<e.length-1;)e[t-1][0]==p&&e[t+1][0]==p&&(e[t][1].substring(e[t][1].length-e[t-1][1].length)==e[t-1][1]?(e[t][1]=e[t-1][1]+e[t][1].substring(0,e[t][1].length-e[t-1][1].length),e[t+1][1]=e[t-1][1]+e[t+1][1],e.splice(t-1,1),u=!0):e[t][1].substring(0,e[t+1][1].length)==e[t+1][1]&&(e[t-1][1]+=e[t+1][1],e[t][1]=e[t][1].substring(e[t+1][1].length)+e[t+1][1],e.splice(t+1,1),u=!0)),t++;u&&c(e)}function f(e,n){if(0===n)return[p,e];for(var t=0,r=0;r<e.length;r++){var i=e[r];if(i[0]===d||i[0]===p){var o=t+i[1].length;if(n===o)return[r+1,e];if(n<o){e=e.slice();var s=n-t,l=[i[0],i[1].slice(0,s)],a=[i[0],i[1].slice(s)];return e.splice(r,1,l,a),[r+1,e]}t=o}}throw new Error("cursor_pos is out of bounds!")}function h(e,n){var t=f(e,n),r=t[1],i=t[0],o=r[i],s=r[i+1];if(null==o)return e;if(o[0]!==p)return e;if(null!=s&&o[1]+s[1]===s[1]+o[1])return r.splice(i,2,s,o),g(r,i,2);if(null!=s&&0===s[1].indexOf(o[1])){r.splice(i,2,[s[0],o[1]],[0,o[1]]);var l=s[1].slice(o[1].length);return l.length>0&&r.splice(i+2,0,[s[0],l]),g(r,i,3)}return e}function g(e,n,t){for(var r=n+t-1;r>=0&&r>=n-1;r--)if(r+1<e.length){var i=e[r],o=e[r+1];i[0]===o[1]&&e.splice(r,2,[i[0],i[1]+o[1]])}return e}var d=-1,v=1,p=0,b=r;b.INSERT=v,b.DELETE=d,b.EQUAL=p,n.exports=b},{}],2:[function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function o(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}function s(e){e.requestModules(["Array"]).then(function(){var n=function(e){function n(e,t,o){r(this,n);var s=i(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e,t,o));return s.textfields=[],s.aceInstances=[],s.codeMirrorInstances=[],s.monacoInstances=[],s}return o(n,e),l(n,[{key:"toString",value:function(){return this._content.map(function(e){return e.val}).join("")}},{key:"insert",value:function(e,t){a(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"insert",this).call(this,e,t.split(""))}},{key:"unbindAll",value:function(){this.unbindTextareaAll(),this.unbindAceAll(),this.unbindCodeMirrorAll(),this.unbindMonacoAll()}},{key:"unbindMonaco",value:function(e){var n=this.monacoInstances.findIndex(function(n){return n.editor===e});if(n>=0){var t=this.monacoInstances[n];this.unobserve(t.yCallback),t.disposeBinding(),this.monacoInstances.splice(n,1)}}},{key:"unbindMonacoAll",value:function(){for(var e=this.monacoInstances.length-1;e>=0;e--)this.unbindMonaco(this.monacoInstances[e].editor)}},{key:"bindMonaco",value:function(e,n){function t(e){if(s){s=!1;try{e()}catch(e){throw s=!0,new Error(e)}s=!0}}function r(e){t(function(){for(var n=0,t=1;t<e.range.startLineNumber;n++)o._content[n].val===e.eol&&t++;var r=n+e.range.startColumn-1;e.rangeLength>0&&o.delete(r,e.rangeLength),o.insert(r,e.text)})}function i(n){t(function(){var t,r,i=e.model.getPositionAt(n.index);"insert"===n.type?(t=i,r=n.values.join("")):"delete"===n.type&&(t=e.model.modifyPosition(i,n.length),r="");var o={startLineNumber:i.lineNumber,startColumn:i.column,endLineNumber:t.lineNumber,endColumn:t.column},s={major:c.major,minor:c.minor++};e.executeEdits("Yjs",[{id:s,range:o,text:r,forceMoveMarkers:!0}])})}var o=this;n=n||{};var s=!0;e.setValue(this.toString());var l=e.onDidChangeModelContent(r).dispose;this.observe(i),this.monacoInstances.push({editor:e,yCallback:i,monacoCallback:r,disposeBinding:l})}},{key:"unbindCodeMirror",value:function(e){var n=this.codeMirrorInstances.findIndex(function(n){return n.editor===e});if(n>=0){var t=this.codeMirrorInstances[n];this.unobserve(t.yCallback),t.editor.off("changes",t.codeMirrorCallback),this.codeMirrorInstances.splice(n,1)}}},{key:"unbindCodeMirrorAll",value:function(){for(var e=this.codeMirrorInstances.length-1;e>=0;e--)this.unbindCodeMirror(this.codeMirrorInstances[e].editor)}},{key:"bindCodeMirror",value:function(e,n){function t(e){if(s){s=!1;try{e()}catch(e){throw s=!0,new Error(e)}s=!0}}function r(n,r){t(function(){for(var n=0;n<r.length;n++){var t=r[n],i=e.indexFromPos(t.from);if(t.removed.length>0){for(var s=0,l=0;l<t.removed.length;l++)s+=t.removed[l].length;s+=t.removed.length-1,o.delete(i,s)}o.insert(i,t.text.join("\n"))}})}function i(n){t(function(){var t=e.posFromIndex(n.index);if("insert"===n.type){var r=t;e.replaceRange(n.values.join(""),t,r)}else if("delete"===n.type){var i=e.posFromIndex(n.index+n.length);e.replaceRange("",t,i)}})}var o=this;n=n||{};var s=!0;e.setValue(this.toString()),e.on("changes",r),this.observe(i),this.codeMirrorInstances.push({editor:e,yCallback:i,codeMirrorCallback:r})}},{key:"unbindAce",value:function(e){var n=this.aceInstances.findIndex(function(n){return n.editor===e});if(n>=0){var t=this.aceInstances[n];this.unobserve(t.yCallback),t.editor.off("change",t.aceCallback),this.aceInstances.splice(n,1)}}},{key:"unbindAceAll",value:function(){for(var e=this.aceInstances.length-1;e>=0;e--)this.unbindAce(this.aceInstances[e].editor)}},{key:"bindAce",value:function(e,n){function t(e){if(s){s=!1;try{e()}catch(e){throw s=!0,new Error(e)}s=!0}}function r(n){t(function(){var t,r,i=e.getSession().getDocument();"insert"===n.action?(t=i.positionToIndex(n.start,0),o.insert(t,n.lines.join("\n"))):"remove"===n.action&&(t=i.positionToIndex(n.start,0),r=n.lines.join("\n").length,o.delete(t,r))})}function i(n){var r=e.getSession().getDocument();t(function(){if("insert"===n.type){var e=r.indexToPosition(n.index,0);r.insert(e,n.values.join(""))}else if("delete"===n.type){var t=r.indexToPosition(n.index,0),i=r.indexToPosition(n.index+n.length,0),o=new u(t.row,t.column,i.row,i.column);r.remove(o)}})}var o=this;n=n||{};var s=!0;e.setValue(this.toString()),e.on("change",r),e.selection.clearSelection();var l;l="undefined"!=typeof ace&&null==n.aceClass?ace:n.aceClass;var a=n.aceRequire||l.require,u=a("ace/range").Range;this.observe(i),this.aceInstances.push({editor:e,yCallback:i,aceCallback:r})}},{key:"bind",value:function(){var e=arguments[0];e instanceof Element?this.bindTextarea.apply(this,arguments):null!=e&&null!=e.session&&null!=e.getSession&&null!=e.setValue?this.bindAce.apply(this,arguments):null!=e&&null!=e.posFromIndex&&null!=e.replaceRange?this.bindCodeMirror.apply(this,arguments):null!=e&&null!=e.onDidChangeModelContent?this.bindMonaco.apply(this,arguments):console.error("Cannot bind, unsupported editor!")}},{key:"unbindTextarea",value:function(e){var n=this.textfields.findIndex(function(n){return n.editor===e});if(n>=0){var t=this.textfields[n];this.unobserve(t.yCallback);t.editor.removeEventListener("input",t.eventListener),this.textfields.splice(n,1)}}},{key:"unbindTextareaAll",value:function(){for(var e=this.textfields.length-1;e>=0;e--)this.unbindTextarea(this.textfields[e].editor)}},{key:"bindTextarea",value:function(e,n){function t(e){if(o){o=!1;try{e()}catch(e){throw o=!0,new Error(e)}o=!0}}function r(e){t(function(){var n,t;if("insert"===e.type){n=e.index,t=function(e){return e<=n?e:e+=1};var r=l(t);a(r)}else"delete"===e.type&&(n=e.index,t=function(e){return e<n?e:e-=1},r=l(t),a(r))})}n=n||window,null==n.getSelection&&(n=window);for(var i=0;i<this.textfields.length;i++)if(this.textfields[i].editor===e)return;var o=!0,s=this;e.value=this.toString();var l,a,c,f;null!=e.selectionStart&&null!=e.setSelectionRange?(l=function(n){var t=e.selectionStart,r=e.selectionEnd;return null!=n&&(t=n(t),r=n(r)),{left:t,right:r}},a=function(n){c(s.toString()),e.setSelectionRange(n.left,n.right)},c=function(n){e.value=n},f=function(){return e.value}):(l=function(t){var r={},i=n.getSelection(),o=e.textContent.length;r.left=Math.min(i.anchorOffset,o),r.right=Math.min(i.focusOffset,o),null!=t&&(r.left=t(r.left),r.right=t(r.right));var s=i.focusNode;return s===e||s===e.childNodes[0]?r.isReal=!0:r.isReal=!1,r},a=function(t){c(s.toString());var r=e.childNodes[0];if(t.isReal&&null!=r){t.left<0&&(t.left=0),t.right=Math.max(t.left,t.right),t.right>r.length&&(t.right=r.length),t.left=Math.min(t.left,t.right);var i=document.createRange();i.setStart(r,t.left),i.setEnd(r,t.right);var o=n.getSelection();o.removeAllRanges(),o.addRange(i)}},c=function(n){e.innerText=n},f=function(){return e.innerText}),c(this.toString()),this.observe(r);var h=function(){t(function(){for(var e=l(function(e){return e}),n=s.toString(),t=f(),r=u(n,t,e.left),i=0,o=0;o<r.length;o++){var a=r[o];0===a[0]?i+=a[1].length:a[0]===-1?s.delete(i,a[1].length):(s.insert(i,a[1]),i+=a[1].length)}})};e.addEventListener("input",h),this.textfields.push({editor:e,yCallback:r,eventListener:h})}},{key:"_destroy",value:function(){this.unbindAll(),this.textfields=null,this.aceInstances=null,a(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"_destroy",this).call(this)}}]),n}(e.Array.typeDefinition.class);e.extend("Text",new e.utils.CustomTypeDefinition({name:"Text",class:n,struct:"List",initType:regeneratorRuntime.mark(function t(r,i){var o;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=[],t.delegateYield(e.Struct.List.map.call(this,i,function(e){if(e.hasOwnProperty("opContent"))throw new Error("Text must not contain types!");e.content.forEach(function(n,t){o.push({id:[e.id[0],e.id[1]+t],val:e.content[t]})})}),"t0",2);case 2:return t.abrupt("return",new n(r,i.id,o));case 3:case"end":return t.stop()}},t,this)}),createType:function(e,t){return new n(e,t.id,[])}}))})}var l=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),a=function e(n,t,r){null===n&&(n=Function.prototype);var i=Object.getOwnPropertyDescriptor(n,t);if(void 0===i){var o=Object.getPrototypeOf(n);return null===o?void 0:e(o,t,r)}if("value"in i)return i.value;var s=i.get;if(void 0!==s)return s.call(r)},u=e("fast-diff"),c={major:0,minor:0};n.exports=s,"undefined"!=typeof Y&&s(Y)},{"fast-diff":1}]},{},[2])(2)});
//# sourceMappingURL=y-text.js.map