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
         check_element = function(element) {

            if (['IFRAME', 'FRAME'].indexOf(element.tagName) == -1) {
                return false;
            }
            if (!element.src) {
                return false;
            }
            if (element.src.match(/^javascript:/i)) {
               return false;
            }
            if (element.src.indexOf(window.location.host) != -1) {
               return false;
            }
            unsafeWindow.onbeforeunload = null;
            window.top.location.href = element.src;
            return element;
        },

        /**
         * Loops over previously inserted iframes to check for the desired iframe
         */
        loop = function(name) {

            var i, els, length, result;

            // cache the getElementsByTagName query into JS Array
            els = document.getElementsByTagName(name);
            // cache the length
            length = els.length;

            for ( i = 0; i < length; i += 1) {

                result = check_element(els[i]);

                // if already found and redirecting, stop looping
                if (result) {
                    return result;
                }
            }// for

            return false;

        };

        // loop the current iframes and if not found, add DOMNodeInserted listener
        if (!loop('IFRAME') && !loop('FRAME')) {
            document.addEventListener("DOMNodeInserted", function(event) {
                check_element(event.target);
            });
        }
    }(window, unsafeWindow, document)
    // module end
)
