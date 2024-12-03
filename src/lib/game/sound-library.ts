export const soundLibrary = {
  root: '/sounds',
  library: {
    catch: 'catch.mp3',
    powerup: 'powerup.mp3',
    countdown: 'countdown.mp3',
    move: 'move.mp3',
  },
  loaded: {},
  preload: async (p5: any) => {
    for (const [name, path] of Object.entries(soundLibrary.library)) {
      soundLibrary.loaded[name] = p5.loadSound(`${soundLibrary.root}/${path}`);
    }
  },
  play: (name: strin, noConcurrent: boolean) => {
    const sound = soundLibrary.loaded[name];
    if (!sound.isLoaded()) {
      return;
    }
    if (sound.isPlaying() && noConcurrent) {
      return;
    }
    sound.play();
  }
}