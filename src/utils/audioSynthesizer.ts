// Real Web Audio API synthesizer for canine soothing frequencies

class CanineSoundEngine {
  private ctx: AudioContext | null = null;
  private currentMode: string | null = null;
  private gainNode: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private heartbeatInterval: number | null = null;
  private isRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(mode: 'brown_noise' | 'pink_noise' | 'maternal_heartbeat' | 'gentle_rain', volume: number = 0.5) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentMode = mode;
    this.isRunning = true;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume * 0.35, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    if (mode === 'brown_noise') {
      this.startBrownNoise();
    } else if (mode === 'pink_noise') {
      this.startPinkNoise();
    } else if (mode === 'gentle_rain') {
      this.startGentleRain();
    } else if (mode === 'maternal_heartbeat') {
      this.startHeartbeat();
    }
  }

  public setVolume(vol: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(vol * 0.35, this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    this.isRunning = false;
    this.currentMode = null;
    if (this.heartbeatInterval) {
      window.clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
        this.noiseNode.disconnect();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
  }

  public getMode(): string | null {
    return this.isRunning ? this.currentMode : null;
  }

  private startBrownNoise() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain compensation
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Low-pass filter for cozy canine-friendly muffled warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(this.gainNode);
    source.start();
    this.noiseNode = source;
  }

  private startPinkNoise() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(this.gainNode);
    source.start();
    this.noiseNode = source;
  }

  private startGentleRain() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.03 * white) / 1.03;
      lastOut = data[i];
      data[i] *= 2.2;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(500, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(0.8, this.ctx.currentTime);

    source.connect(bandpass);
    bandpass.connect(this.gainNode);
    source.start();
    this.noiseNode = source;
  }

  private startHeartbeat() {
    if (!this.ctx || !this.gainNode) return;

    // 60 beats per minute = 1 beat per second
    const playThump = () => {
      if (!this.ctx || !this.gainNode || !this.isRunning) return;
      const now = this.ctx.currentTime;

      // Lub
      this.synthesizeThump(now, 75, 45, 0.12, 0.8);
      // Dub (shortly after)
      this.synthesizeThump(now + 0.18, 65, 40, 0.1, 0.5);
    };

    playThump();
    this.heartbeatInterval = window.setInterval(playThump, 1000);
  }

  private synthesizeThump(time: number, startFreq: number, endFreq: number, duration: number, gainMultiplier: number) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const thumpGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + duration);

    thumpGain.gain.setValueAtTime(0, time);
    thumpGain.gain.linearRampToValueAtTime(0.6 * gainMultiplier, time + 0.02);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(thumpGain);
    thumpGain.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + duration);
  }
}

export const canineAudio = new CanineSoundEngine();
