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
    'http://notlurking.com/*',
    //
    'http://r.ping.mk/toolbar/inner*',
    //
    'http://www.time.mk/read/*',
    //
    'http://grid.mk/read/*',
    //
    'http://daily.mk/forward/*',
    //
    'http://blogirame.mk/g/*',
    //
    'http://off.net.mk/links/nabrzinka/*',
    //
    'http://on.net.mk/shortcut.php*',
    //
    'http://bukvar.mk/news/*'
    //
    ]
});
