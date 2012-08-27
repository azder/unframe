/**
 * Catch the exact insertion of the iframe node and take it from there
 */
(
    // module start
    function(window, unsafeWindow, document) {

        //
        'use strict';

        var

        /**
         * Checks if the supplied element is the <em>iframe</em> in question
         * and if so navigates to it's url
         */ 
         find = function(element) {

            if ('IFRAME' !== element.tagName || !element.src) {
                return false;
            }

            if (!element.src.match(/^javascript:/i)) {
                unsafeWindow.onbeforeunload = null;
                window.location.href = element.src;
                return element;
            }

            return false;
        },

        /**
         * Loops over previously inserted iframes to check for the desired iframe
         */
        loop = function() {

            var i, els, length, result;

            // cache the getElementsByTagName query into JS Array
            els = Array.prototype.slice.call(document.getElementsByTagName("IFRAME"));
            // cache the length
            length = els.length;

            for ( i = 0; i < length; i += 1) {

                result = find(els[i]);

                // if already found and redirecting, stop looping
                if (result) {
                    return result;
                }
            }// for

            return false;

        };

        // loop the current iframes and if not found, add DOMNodeInserted listener
        if (!loop()) {
            document.addEventListener("DOMNodeInserted", function(event) {
                find(event.target);
            });
        }

    }(window, unsafeWindow, document)
    // module end
)