/**
 *
 * This addon registers a page-mod which triggers on several
 * popular .mk portals that iframeize other sites, and removes the iframe.
 *
 */

var
//
pageMod = require("page-mod").PageMod,
//
data = require("self").data
//
;

pageMod({
    contentScriptWhen: "ready",
    contentScriptFile: data.url("contentScript.js"),
    include: [
    //
    'http://www.time.mk/read/*',
    //
    'http://grid.mk/read/*',
    //
    'http://daily.mk/forward/*',
    //
    'http://blogirame.mk/g/*'
    //
    ]
});
