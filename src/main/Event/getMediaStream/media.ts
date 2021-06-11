/*
 * @Author: Lixiao2
 * @Date: 2021-06-09 09:02:21
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-11 17:48:16
 * @Desciption: Do not edit
 * @Email: 932184220@qq.com
 */
import { desktopCapturer, DesktopCapturerSource } from "electron"
import _ from "lodash"

interface Media extends MediaTrackConstraints {
  mandatory: Object
}

type callBack = (stream: MediaStream) => void

export class CusMediaStream {
  private source: DesktopCapturerSource[]
  private stream: MediaStream
  private inputDevices: MediaDeviceInfo[]
  private ouputDevices: MediaDeviceInfo[]
  private currentDevice: string
  constructor() {
    this.source = new Array<DesktopCapturerSource>()
    this.stream = null as unknown as MediaStream
    this.inputDevices = new Array<MediaDeviceInfo>()
    this.ouputDevices = new Array<MediaDeviceInfo>()
    this.currentDevice = ""
    this.initStates()
  }

  private async initStates() {
    await this.getSource()
    await this.getMediaDevice()
    this.stream = await this.getAppointMedia()
  }

  private async getSource() {
    this.source = await desktopCapturer.getSources({ types: ["window", "screen"] })
  }

  private async getAppointMedia() {
    let stream: MediaStream

    let params: Media = {
      mandatory: {
        chromeMediaSource: "desktop",
      },
    }
    stream = await navigator.mediaDevices.getUserMedia({
      audio: params,
      video: params,
    })

    return stream
  }

  private async getMediaDevice() {
    let devices = await navigator.mediaDevices.enumerateDevices()
    this.inputDevices = _.filter(devices, (device) => {
      return device.deviceId !== "default" && device.kind === "audioinput"
    })

    this.ouputDevices = _.filter(devices, (device) => {
      return device.deviceId !== "default" && device.kind === "audiooutput"
    })
  }

  public onPrecess(fn: callBack) {
    navigator.mediaDevices
      // @ts-ignore
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((stream: MediaStream) => {
        fn(stream)
      })
      .catch((err: string) => {
        console.error(err)
      })
  }
}
