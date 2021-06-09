/*
 * @Author: Lixiao2
 * @Date: 2021-06-09 15:08:46
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-09 16:55:23
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
interface VisualMediaConfig {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
}

export class VisualMedia {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private audioCtx: AudioContext
  private sourceNode: MediaStreamAudioSourceNode
  private analyser: AnalyserNode

  constructor(opts: VisualMediaConfig) {
    this.canvas = opts.canvas
    this.ctx = opts.ctx
    this.width = opts.width
    this.height = opts.height
    this.audioCtx = new AudioContext()
    this.sourceNode = null as unknown as MediaStreamAudioSourceNode
    this.analyser = null as unknown as AnalyserNode
  }

  private initMediaInfo(stream: MediaStream): void {
    this.sourceNode = this.audioCtx.createMediaStreamSource(stream)
    this.analyser = this.audioCtx.createAnalyser()
    this.sourceNode.connect(this.analyser)
    this.analyser.connect(this.audioCtx.destination)
  }

  public render(stream: MediaStream): void {
    this.initMediaInfo(stream)
    const { analyser } = this
    const len = analyser.frequencyBinCount
    const buffer = new Uint8Array(len)
    console.log(buffer)
  }
}
