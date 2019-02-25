declare var webkitAudioContext: any;
export class MusicBox {
  opts:any;
  audioCtx: AudioContext;
  constructor(options:any = {}) {

    let defaults = {
      type: 'sine',
      duration: 0.2
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

    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);

    gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.01);

    oscillator.start(this.audioCtx.currentTime);

    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + this.opts.duration);

    oscillator.stop(this.audioCtx.currentTime + this.opts.duration);
  }
}