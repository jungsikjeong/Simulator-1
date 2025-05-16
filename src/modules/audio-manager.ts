class AudioManager {
    private static instance: AudioManager;
    private bgm: HTMLAudioElement | null = null;

    private constructor() { }

    static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    playBGM(src: string) {
        if (this.bgm) {
            this.bgm.pause();
            this.bgm = null;
        }
        this.bgm = new Audio(src);
        this.bgm.loop = true;
        this.bgm.play();
    }

    stopBGM() {
        if (this.bgm) {
            this.bgm.pause();
            this.bgm.currentTime = 0;
            this.bgm = null;
        }
    }
}

export const audioManager = AudioManager.getInstance(); 