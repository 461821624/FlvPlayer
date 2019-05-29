import './style/index.scss';
import Emitter from 'tiny-emitter';
import optionValidator from './utils/optionValidator';
import Debug from './debug';
import Events from './events';
import Icons from './icons';
import Player from './player';
import Demuxer from './demuxer';
import Decoder from './decoder/h264bsd';
import Stream from './stream';

let id = 0;
class FlvPlayer extends Emitter {
    constructor(options) {
        super();
        this.options = Object.assign({}, FlvPlayer.options, options);
        optionValidator(this);

        this.debug = new Debug(this);
        this.events = new Events(this);
        this.icons = new Icons(this);
        this.player = new Player(this);
        this.decoder = new Decoder(this);
        this.demuxer = new Demuxer(this);
        this.stream = new Stream(this);

        id += 1;
        this.id = id;
        this.isDestroy = false;
        this.isLoaded = false;
        FlvPlayer.instances.push(this);
    }

    static get options() {
        return {
            url: '',
            container: null,
            debug: false,
            live: false,
            controls: true,
            width: 400,
            height: 300,
        };
    }

    static get version() {
        return '__VERSION__';
    }

    static get env() {
        return '__ENV__';
    }

    destroy() {
        this.events.destroy();
        this.decoder.destroy();
        this.demuxer.destroy();
        this.stream.destroy();
        this.options.container.innerHTML = '';
        this.isDestroy = true;
        FlvPlayer.instances.splice(FlvPlayer.instances.indexOf(this), 1);
        this.emit('destroy');
    }
}

Object.defineProperty(FlvPlayer, 'instances', {
    value: [],
});

export default FlvPlayer;
