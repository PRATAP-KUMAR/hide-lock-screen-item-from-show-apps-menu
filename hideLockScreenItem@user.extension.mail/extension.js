const Main = imports.ui.main;
const GLib = imports.gi.GLib;

let matchingActions = imports.misc.systemActions.getDefault().getMatchingActions;

function _removeMatchingActions(terms) {
    
    terms = terms.map(term => GLib.str_tokenize_and_fold(term, null)[0]).flat(2);
    
    if (terms.length === 0)
    	return [];

    let results = [];

    for (let [key, { available, keywords }] of this._actions) {
    	if (available && terms.every(t => keywords.some(k => k.startsWith(t)))) {
    			if (key != 'lock-screen')
    				results.push(key);
    			}
    }
    return results;
   
}

function init() {
}

function enable() { imports.misc.systemActions.getDefault().getMatchingActions = _removeMatchingActions;
}
    
function disable() { imports.misc.systemActions.getDefault().getMatchingActions = matchingActions;
}
