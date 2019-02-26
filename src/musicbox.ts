declare var webkitAudioContext: any;
export class MusicBox {
  opts:any;
  audioCtx: AudioContext;
  constructor(options:any = {}) {

    let defaults = {
      type: 'square',
      duration: 0.1
    };

    this.opts = Object.assign(defaults, options);


    this.audioCtx = new AudioContext();
  }

  createSound(freq: number) {

    let oscillator = this.audioCtx.createOscillator();

    let gainNode = this.audioCtx.createGain();

    oscillator.connect(gainNode);

    gainNode.connect(this.audioCtx.destination);

    oscillator.type = this.opts.type;

    oscillator.frequency.value = freq;

    gainNode.gain.setValueAtTime(1, this.audioCtx.currentTime);

    oscillator.start(this.audioCtx.currentTime);

    oscillator.stop(this.audioCtx.currentTime + this.opts.duration);
  }
}