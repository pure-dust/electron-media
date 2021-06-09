/*
 * @Author: Lixiao2
 * @Date: 2021-06-09 09:02:21
 * @LastEditors: Lixiao
 * @LastEditTime: 2021-06-09 17:25:18
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
    if (this.ouputDevices.length == 0) {
      setTimeout(() => {
        this.onPrecess(fn)
      }, 1000)
      return
    }
    let params: Media = {
      mandatory: {
        // chromeMediaSource: "desktop",
        chromeMediaSourceId: this.ouputDevices[2].deviceId,
      },
    }
    console.log(this.ouputDevices[2])
    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        fn(stream)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
