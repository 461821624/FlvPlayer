export default function hotkey(flv, player) {
    const { proxy } = flv.events;

    const keys = {};

    function addHotkey(key, event) {
        if (keys[key]) {
            keys[key].push(event);
        } else {
            keys[key] = [event];
        }
    }

    addHotkey(27, () => {
        if (player.fullscreen) {
            player.fullscreen = false;
        }
    });

    addHotkey(32, () => {
        player.toggle();
    });

    addHotkey(37, () => {
        player.currentTime -= 10;
    });

    addHotkey(38, () => {
        player.volume += 0.05;
    });

    addHotkey(39, () => {
        player.currentTime += 10;
    });

    addHotkey(40, () => {
        player.volume -= 0.05;
    });

    proxy(window, 'keydown', event => {
        if (player.isFocus) {
            const tag = document.activeElement.tagName.toUpperCase();
            const editable = document.activeElement.getAttribute('contenteditable');
            if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
                const events = keys[event.keyCode];
                if (events) {
                    event.preventDefault();
                    events.forEach(fn => fn());
                }
            }
        }
    });
}