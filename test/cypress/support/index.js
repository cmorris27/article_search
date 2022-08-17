import './commands'
Cypress.on('window:before:load', (win) => {
    const original = win.EventTarget.prototype.addEventListener;

    win.EventTarget.prototype.addEventListener = function () {
        if (arguments && arguments[0] === 'beforeunload') {
            return;
        }
        return original.apply(this, arguments);
    };

    Object.defineProperty(win, 'onbeforeunload', {
        get() { },
        set() { },
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
