"use client"

export class SoundManager {
  private static sounds: { [key: string]: HTMLAudioElement } = {}

  static init() {
    // Create audio elements (silent data URIs as fallbacks)
    this.sounds.swipeRight = this.createAudio(
      "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
    )
    this.sounds.swipeLeft = this.createAudio(
      "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
    )
    this.sounds.like = this.createAudio(
      "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
    )
    this.sounds.click = this.createAudio(
      "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==",
    )
  }

  private static createAudio(src: string): HTMLAudioElement {
    const audio = new Audio(src)
    audio.volume = 0.3
    return audio
  }

  static play(soundKey: string) {
    try {
      const sound = this.sounds[soundKey]
      if (sound) {
        sound.currentTime = 0
        sound.play().catch(() => {})
      }
    } catch (e) {}
  }
}
