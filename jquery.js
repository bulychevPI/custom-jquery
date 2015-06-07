(function () {
    function Jquery(selector) {
        return this instanceof Jquery ? this.find(selector) : new Jquery(selector);
    }
    Jquery.prototype = {
        constructor: Jquery,
        length: 0,
        find: function (selector) {
            if (typeof selector === 'string') {
                var elems = document.querySelectorAll(selector);
                for (var i = 0; i < elems.length; i++) {
                    this[i] = elems[i];
                };
                this.length = elems.length;
            }
            else if(selector instanceof Jquery){
                var newLength=this.length+selector.length;
                for(var j=this.length,k=0;j<newLength;j++,k++){
                    this[j]=selector[k];
                }
                this.length=newLength;
            }
             else {
                this[this.length] = selector;
                this.length++;
            }
            return this;
        },
        addClass: function (value) {
            var callbackResult;
            if(typeof value ==="string"){
                for (var i = 0; i < this.length; i++) {
                        this[i].className += " " + value;
                };
            }
            else if(typeof value ==="function"){
                 for (var i = 0; i < this.length; i++) {
                    callbackResult=value(i,this[i].className);
                        this[i].className += " " + callbackResult;
                };
            }
            return this;
        },
        append: function (content) {
            if (content instanceof Jquery) {
                for (var i = 0; i < this.length; i++) {
                    for (var j = 0; j < content.length; j++) {
                        this[i].innerHTML+=content[j].outerHTML;
                    };
                };
            }
            else if(typeof content==="string"){
                for (var i = 0; i < this.length; i++) {                    
                    this[i].innerHTML+=content;
                };
            }
            else{
                for (var i = 0; i < this.length; i++) {
                    this[i].innerHTML+=content.outerHTML;
                };
            }
            return this;
        },
        html: function (htmlString) {
            if (typeof htmlString=== "string") {
                for (var i = 0; i < this.length; i++) {
                    this[i].innerHTML = htmlString;
                }
                return this;
            } 
            else {
                return this[0].innerHTML;
            };
        },
        attr: function (attribute, value) {
            for (var i = 0; i < this.length; i++) {
                if (arguments.length === 1 && typeof attribute === 'string') {
                    var currentAttribute = this[i].getAttribute(attribute);
                    return currentAttribute+"";
                }
                else if (typeof attribute === 'string'&&(typeof value === 'number')){
                    this[i].setAttribute(attribute, value);
                };
            };
            return this;
        },
        children: function (selector) {
            if(typeof selector ==="string"){
            	return this[0].querySelectorAll(selector);
            }
            else{
                for (var i = 0; i < this.length; i++) {
                    return this[i].children;
                };
            }
        },
        data: function (key, value) {
            if (arguments.length === 1 && typeof key === 'string') {
                for (var i = 0; i < this.length; i++) {
                    if(this[i].dataset.hasOwnProperty(key)){
                        return this[i].dataset[key];
                    }
                };
                return {};
            };
            if (typeof key === 'string' && typeof value === 'string') {
                this.each(function () {
                    this.dataset[key] = value;
                });
            };

            if (typeof key === 'object') {
                this.each(function () {
                    for(var prop in key){
                        if(key.hasOwnProperty(prop)){
                            this.dataset[prop]=key[prop];
                        }
                    };
                });
            };

            return this;
        },
        on: function (e,selector, handler) {
            if(typeof e==="object"&& typeof handler==="function"){
                if(typeof selector==="string"){
                    for (var i = 0; i < this.length; i++) {
                        var children=this[i].querySelectorAll(selector);
                        for (var i = 0; i < children.length; i++) {
                            children[i].addEventListener(e,handler)
                        };
                        this[i].addEventListener(e, handler);
                    };
                }
                else{
                    for (var i = 0; i < this.length; i++) {
                        this[i].addEventListener(e, handler);
                    };
                }
            }
            return this;
        },
        one: function (e, handler) {
            function removeEv(elem) {;
                elem.removeEventListener(e, wrapperHandler);
            };
            var wrapperHandler = function (e) {
                handler.call(this, e);
                removeEv(e.target);
            };
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener(e, wrapperHandler);
            };
            return this;
        },
        each: function (callback) {
            for (var i = 0, len = this.length; i < len; i++) {
                callback.call(this[i], i,this[i]);
            };
            return this;
        },
        css: function (property, value) {
            if (arguments.length === 1 && typeof property === 'string') {
                if (this[0].hasAttribute('style')) {
                    return this[0].style[property];
                };
            };

            if (arguments.length === 1 && typeof property === 'object') {
                this.each(function () {
                    for (var k in property) {
                        this.style[k] = property[k];
                    };
                });
            };

            if (arguments.length === 2&& typeof property==="string" && typeof value==="string") {
                this.each(function () {
                    this.style[property] = value;
                });
            };
            return this;
        }
    };
    window.$ = Jquery;
}());