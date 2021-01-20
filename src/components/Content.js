import React from 'react';

// const SECURE_SERVER_URL="https://35.247.209.203:8080";
const SERVER_URL = "https://168c5fb1e4ad.ngrok.io";

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      corpus_id: ""
    };

    this.recv_media = this.recv_media.bind(this);
    this.processVideo = this.processVideo.bind(this);
    this.query_transcript = this.query_transcript.bind(this);
    this.processTranscript = this.processTranscript.bind(this);
    this.create_btn = this.create_btn.bind(this);
  }

  static get_btn_background() {
    return "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAARGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAACAoAMABAAAAAEAAACAAAAAAEiOBHcAAAHNaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xMDI0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjEwMjQ8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4Ks9O86wAAF8VJREFUeAHtnQmYXFWVx08v6XR3ekunO+mQfU8gCUKiIhENIAOCwEhGgiIiHzPzgQuyfDMjDDC4EAKC8IkyiiCuIzM4MAp8KPsoiwg4LCH7vqcTupN0et/m/G7lkabzqurdW69Tr7rqfF9S1a/eu8s5/3vOueeee19e5a1v9kqOspYD+Vnb81zHDQdyAMhyIOQAkANAlnMgy7uf0wA5AGQ5B7K8+zkNkANAlnMgy7uf0wA5AGQ5B7K8+zkNkANAlnMgy7uf0wA5AGQ5B7K8+zkNkANAlnMgy7uf0wBZDoDCwdz/nt586ZZ84bNHP6E8iSVA9eo3iF+G5HeZT3Mhy/4bVABAqJ09hSr0Ahma1yHVQ/ZKXdFuGTN0p4weWi81QxqlvLBZCvK6pb2nSOo7RsjK5inyxoGj5d3O4TI0v+M9gGQLDgYFABjdCLSsoEWOq1wmJ1W9JseXL5MJxVtl+JD9UpzfrpDofk+mAMXTBF29hbKp7Sh5YMdn5Nc7zzX3AJBsobxMTwpt6xkqwwv3ydm1T8ui2t/LrGFrjcDRAt29Bar+EXVM3ccTamFelxSq0B/cdbbcsvFL0tQ9TIbotWygjNUACBfBnlPzlHxl3M9lZuk66dJrXb1DpLWn2Ep2aAH+fXbU72RSyRa5avUNsrNjpIKg06qcTLw5IzVApwq5qnC/XDvxB3Kejnpcu04VYBhUkt8mrzfNkX9csUT2dlUafyGMcqNaRsZNAzt6hsjYoTvkxzO/LotHPm5GfFjCR0hoj3nlb8tNk++SvLyepOYjqoIN2q6MAgCCHlu8U3448zqZV/G2tKiwBmJXCyD4VM2zcsGoR41zGZSZmXhfxgCgW+fy5QUH5I5p35aj1dHD+RtIAmxfGvNLGV+83TiTA1lXOsvOIAAUyD9PuFdOqPi/wMLHicOm49EztWM6GHSuj5N51NBdclHdw6H5F+kUdLy6w/Gc4pUe0nVG+xnV/yuLRz0WyMNH4D3qGOLMPdf4EVndMtmo8tEq0I9V/UVOGf6yAUaHOpOJqL23SM7V6eXPdyzSWUHtoHQIIw8ABFlZ2CRfHfdT/YZTVpBIZmaUv9M8Xe7afIn8ce+HDWAI9xIJICz80K6zZH7FW3LjpO/JnLJVCW08IeS6ono5bcSf5P7ti6VkEAaIIm8COjTCd5Y6ZLPLVqsqjj9iCfcUaSiXYM6F79wlTzZ8zHjwmADUPr9531/df6xcuuI2+WvTMVKUZK5PQOn06j8aYCVEXob+GGkAEOgpLWiV83W6hxMYjxA+0by7t3xRrlv3T3Kga5gRmBfu7f8cvsDujmq5cd01sq+7LOFCEGsLOJ0Ti7eYYFH/sjL97/hcjUDPYP4HypbLMUlGf1F+p9yz9SK5c/OlJqQbJJaPVni7eYY8sedk1Q7xI36AsEJN0HHlyxUAic1PBFhm3YRIAwD1i9PGyl48YjT/pv6TcteWS3VZt1PFFTwygG/wTOOJSad5+A8fUAAMRoosABAjNpuAD1MyP2IBZ03LRFmqCzgIPt9C+JSHptjYOs4s/iQCTpean2mlG4xZSbaw5NfOKF+LLAB6VOhjdNo2tXRjXNuL3X9w1zlS3znCaYoGYA50l0pLd4nk58XXHD2qiUbrbID1h15dXRxMFFkAYG8ZdVUFTQcnce9nO8Jr6KySZ3WeX5TARLz/Kf+/4os+dj9LypWFB0yCiZdZ5F9S5l2NLABg9JSSTXFHdoGO/rWtE2Rbe51x/FxYjzrHhyhWhzDRyOa+oXrfCM0oAgyDiSILAGzyuOId+r8/wwt0pW5T29iEgZxkggJktUUNMkwziZJpAfyN4WoCchogGVdD+h0HrWZIQ1wAAJD9Ot+PB5AgzSC2gJZBCyQrh/rKNJ9wsFFkNQAjnCBQfMEQJGoz3n8qQjmu/J1AjwOAIEDxKyx+H/zuPrLXIgkA1DEMR+3qhy8R15+k0blkoVzfh/UiQsGrJ3mUdLAgZNoT5MY+91A2wEkUyexz+xH/GkkAYPURkJn/+7sAJv2bBNDJJZudlms7NbNoTtlKzQHcGjjCFweLcYXGKub00vXyy2OulNOqXwi8jB23wAH4IZIAoJ+MmGadn6MJ/AiAsEr4ubrfBh7BfcthffDMEc9baZAuDU0HIdrW2l0sCypfl3tnXmuiiN+acofMVcAlW4IOUn6Y90QYAAWyp7M6YXSPvQDnj3pczlBBEswJSmiWcZpXeGr1i9KeYIWxb3kIlREdD5DevWQSMVW8dMx/yo9mXadJJfWmbWxK+deJ33f2I7zyw/6MLABg+MbWMdpffw0AI7iHaOAtU74jn1AVCwi4lowYhX878g9m1xBr/kGIcokaxiM0FrmEzCrumXGDyTcgduAlrAKeD1W+IQur/iwktkaFgvU+Da1loWZVy5T3GBivCYxmTMHdM/5NLh/7C72tNyGDuZ+wLkvMNuqY5/Z3lx+mkbiO4NmBdOW4++XB2VfI32gCCdqpP7h0m4os0F1LQUAar79hXw9m1MKuNUB5pHWxb2+37t+rKWpM6EUTNmZJ97qJ98iJlX+VOzb/vZAVhAfu5QN6qhuhXzz6N7ptbLsKLlhiKc8yavd1lptUcfwHnEgESYr6OZo2tnjkY2ZTCWlkjHY/4v5q3cVku2jlV1ZY1yILgHyNA+zqrNG8vtkmRbu715+pHiMYbW16z8eHvyLHVyyT1/bPlecbT5C/aPbPprYxxqEEEMfrvP9CdRzbLdQwAGjpKTF5gWQoEaCaq8mpn1Tf4+Tql41GIVsJTZCIKIc+MYWNCkUWADCI+Pzje0413npQhqF6yR84WRM/Txn+kqrtMlnfMl7ePDDLgIn9gxW6sMN9gUndCgBzWvWfTGrafN04MkGnj2gXNEoywXv1oKle2Dtfxd/jXUr7Z6S3hqEySe3+j9lfkznDVlnZbI+zjDoCODiLlIdTht12IS+lHE1imx3Es2ijLy6/3dRPu6JA0dFFPtyASQd0py4ZuSo7J/KEzijFNrsKn8rRGpRhK3zMWYvGBb6rvkmbfkZF+PQp0gCggUylntizUJ589ySTIcS1TCKEjalA+H/ed5zJTo5S+yMPAAY+S7BLNn5ZNuryb6Zt2WYd4P7t5+sBFOeb9PQoCZ+2RB4ANBL7vVk9+a+v/RfN3yszf3M9ysTIL9Wcxv+qP0tu23SZSWyJkur3eJcRAKCxmIKX9s2Tq9dcb0AQZU2AzScu8bOd58kNuveA2UyUPH9P+HxmDABoLOr0mYYFctnKm2VL+1GR9Anw9tu6h8o3N1whN62/yhxYBSCiShkFAA8Er6gzddE7d8oT7y40dhUTkW6iDQD0ZW3bF5Z/V36idp+spqiOfI9fkY4DeI30+2QuDnPPrX1S1wB+JVNLNuocf4j1FM2vbJtrePjEGdZogirT1UfqTzfTxUS7jWzKH+h7MxYAMIY5PnNzQrOLRv5ePqMLPFNLNxmesa1soBI4jY3XABUrgKt06/lD6uj9dvdpZvkaLRBFZy8ekDIaAF6nWAdgEYaDIT9e9YquHTyj5/wsM39zD9oCYQEYF0KgqHNGOmWwsZSo3mMapn5RHdN9XRUm/BxlWx+v34MCAF7nGPGs2iEsVvs+VPGGfERXB2cPW21OCmXvYP8lWu/ZeJ/AhqSRbW11ZjPpS3vnyWtNc2Wr/g0YUPWZNOL793NQAaBv5wj5EvdHOOQLcGTstbpczGbToHkAAObVfcfK9euvkV16QkjTwTR0b4m5b32Z+n1AVgNZ5mCksaeur+pFGJ46Je17IEcOWoB/EOsAy3QrOMe8GDUdcB2GBA52Hq1onqqbR1ojGckzHUzhv9AAgGhJkmDigyM0suhdkw83SkceI5BRg8O2W/P8iOptaRtt1thJ6/YElUI/Ej4K0Agc0QZbwqRg+wcSrLZtCvP+lAHgOWDk2GNvT9RMWA5T4KBmBM/RLDH3q9eMf1QzuXXrWsfLUw0nGe+ZUeYttYbZuf5l2TppCB1zAbgHK6UEAEY0BzVfMuohOU+nYVM1IZKRhpD1YDYTAiWDpj+hIY4tW2E89c/XPSL3bvuc/Fq3efPcQGoDl6CM7dJv/75G/W9nALAuvqDyNblh0t16hs4a43AFTZQw5kJHFoEbTMU3Jt8pH6x4U25cf7Wez1vhpKqTMZoxjN9hS5xTMJjJCQAIn6NUb526VFe8WgOnRPkxklHPv3Nqn9Ht13vlq6tuksauqgFY8YvN5W3VeeyAOb+WD45r1msB2EQ2VN6sufio8qBTqmTsImMG/+E7024x5YYexVMVMJDmJVn/ovq7FQAYPXjSV4+/z2ysDNs+Ml07VRM5r9LyCeWGSTh0TOuiQJ4JhH840bZaKcw+WAEAocwvf0tOqAx+Xq9tY8nVv3j0wyYDF1MTFhkAHIwL2JSJeMIkhM2BFPOUj7ycoko3lKCZvLRyBgGOM2bxSADDaphxbBt596Rdt/YmzoF3ZRqd5l1f16gWILefpFDb6Ztf3R4AbJkaRt1928OILy9oln+feb0JI+/rKjdnHe1sr5Wt7aPNHoaNrWP1e53ZFMOUGb6jvVhyDrs9VgAgaMOWbBo0kEQIl3ourPsf+d7WS/SM3raUq8vTU8BcfICwGU55jfomkj36lrJpuoRdUtQuR+lWNXYOx6apsdR13lu0q71G1reNk+W6y+mtphnm0GtOREM7MN12mdX0Z2RgADBycPpqden1SByUhHPJ1u9Hdp+hcfgaJ+F5nUWJo8rNap6lRucldGiPsIiy2DrO2sJ0PQWtuyf2bsP+VTC74oi8GcPWy1kjnjMmol5XIQlpP68noz3f+GETpmZQpgLSwD4ALEAFEdkLokZpFNE9QMOKma0tBeWcE7ho5BMhzDRir4kDADYbDOgnp5GFTWi47e2jEvKEuomrEGzDL8BhZI8kB00smXKbPDz3Mn1/wg/1VXnNqhECi/GwrgR+kkAKjeI8zkSBUe5A6I2dlfK05u89VH+mvKjbobBlXLcZTThGn679Q0zraL2pECbAJXWMt4qGTfBxe/tIK17QBhN2V0DgHBMz+dq4B+T2aUt0gMV2Pbm0M7AJoHCQ26oJj0DBj8yERkf+T3f8ndy3bbFs66gzjWbqOKF4m7Hpn637nbFfoDsZgfqJugePfX4ACQC5UsyJIqHDjmi7DWiDlE55O1QDAARXYtS3qWbgMM0SNRf71ZkE5LYUeFjRaLNFWivyO1aV32nAzRu+YkK6O/S9e9gnhIbzxaaOmzZcKZev/Jax6fwWlM6ufcqAJuj9fvdhkmIawI7pLiuIfvX3vcZAwa9hQKVC9OcXOz8dO0lF++dCgQFA4d3aYN6l57eogr2/d9sF8hPdAYPQY/b2UJNoLIc/P9u4QP5hxVLzutYgIAB0bOmenuDM4EO1+H9jXABC4wT63+J7lRFKUogf4H0fCHgRMPKu4nZV5a7aBRBxVC4rqqmA1AoAxMXbfFb3cPJe3z9HfrD1C0mXdQEBhzdcsfob5pDnZHYZIVTo28IWqhlwHzHqzB2cR9s4gcgTkPKqmjCJ8pj/m0OwHNQ2bQHQm9rHCPGDIzIL8BjgZ7fw2L+vwm9WR89PO3jPep9oCPbr83YPRniyGQJxh4UagAI89lZOa9WH8OZdNIDLDMbrZ7xPNApOMdvckvU9XhkAYEvraOMQumoRyrbSADyAB9q3QqaFr2rE7oV9H9TRH9xJQ5hPN3zUaA3KSESEoGeWrjWhU8yQLQEa1GQybdO/3F59EA3ACHMCXv8C3/u71/BxL0fOOGoXZECKW6qLZlYAYPRjd/oSLhVv7GAk27lXsa1e922/wLzdCx8iHhkzoKd6sA7hZgaw5TENIFanfXs+ACbAtnfxehMriX4QEUzFv+D5VMkKAKBuvaZyeahDpa5tmSDPNpxogj22jaE8Fj441MnE/JOMsxP0mDXNHrCtxpTqaQCbkcy9aACXOpM1ErNJrKSvNk32TP/feTlWqmQFAJj49oEZsrezwtgu4tGP7D5dGjSBI4jt92ss6v+NpqP1LCBe3hRfCzBiZmnmEXmG9kka5O93qB9g58yhefAB+s9o/Pphe42yGcGuAOB5Vk5dn/faawUAbz7PNu0SPambueyjujsmyHTOq9DvE/D8d/0Zh/kXfe8lClZXtEdfHr3DLIb0/S3Zd5iFiaH9dkT+QwwAlBE2kf7mSrSHSGmqZAWAWGV5ZhMkNv9JnYOS4m3P2Pc3G/u8onmampdxccuiwxwfP1nX0FGfNoQzFwtI2b0OHhOA1jPhYBvbEaBxjFyid6kAy14THt4wawAwInjj5lI99QL1n6rwaRLMYFq0tnViQnWLpiDd3JZp3M+sw9pMqdARPn22rfNwVh9+hSXflMoNAZT2cyrtB+r0Ad3/zvSIERIGgWZmGIlsGszimNdE9/i1hed4uYQJmFgwjeeYOuIHWDzm14TDrtEH4iYpreQ5BpH6NsYJABQQxsjv2xAsbGwqGN/WIhDO5HWJfA3Lb7EGDu3DAYy9uDJ+u/r2I+h3AEAirDejCvrcofvcVjcPPR/7Zm0C+hcQ1t+o2fG6YpjoGFVGoYsqBzhlha4A6DLApIwwKU+LY60ff8ZWo9EOWpOq8005kQAAy77jdTv3rNJ1EvSlDDTehsp1PcGWEDrappgQdNg2QDUAXjyzGxcCNDHTlBow3Wp3aXGCZzr0cAcSPzjgIZFnS1fJjnFhGucDuxCLSCUFyd8qZls2fSG2kai/ycpEG6ZKaQcAanCu7hMkATTZJhO8eHYX29pNnqvkta8OahwNAKNdnk0snF4D5EQvrEz8vJpDdWxTpbQCgBFAatO3J9+h+fEa4QugDjdorMBWGEQAqzSCaPsczEXVEn8YCKI9Lm3y2sL+glQpbQAgkMTO4junf9NsNePvZMRK5DINRduEZmEwDibb14MArH8bEBEziFQE1b9M7++Y+N2cC9pTpgCgjFTIeRroWikNR5CzdHn3lqm3mmwf/k5GzMfXtEySlfoaGdtl3RJdpnZbQ4i1amA0ABnHmnKewlyejGDXfAKP30cUAIxyOn3BqEd158+PzdbwIMKnsUUKgMf2nGIyaWycH0Z9uTqAOIGuozgMVesx3Ptk3MZWGu0WqLzncR7ZYZRvvb7hlRD7PCIAiE138szJIV8e+zM5RV+zQgQMBzAIEW3kRBHO44sFZYI8FbsHRvHWb/OCaKtcgEN1cD5QvEzoQ3fZfcP5w4kr1FCzi2nieWIb8Aan2NUUhAIAv5EFwjkziISH2cNWyufVyz+z5jlz2FJQwcNSPHjiBEs3XW4yYFjU8asvHvtJP2eDCc/Z1OuVR10xWxvbF+FdT/UToTGCyTWwndVQN/szMAEkrZJc6kqhAACb3DccAdMI687XQxvZ2fPRqlcNExGAjRBANczhZQtsMqHDfesJ0umuvAKzz9B6Iehg4TEANBt1Hda6B0XTLk5HYYbS6eDH0S40U7Hy2byFxNGXSOmcQBqBTb996hLzwkTOBYJQTzSO6B6/Y/u515YAACeAMvVDgC4OU6+amtH69k4yi12CLrSBRZttupHDpf54fUbtE/gayV5LB97g/DVpuxa99SOzkxg+u1DKGgAGsc/9aN3N26HqFkLUdArVzT9XAjTY/GP0pE9Xoi3E212YTJ2xkdZi+ucwUOM227QLWCsQXIi2MPrL1LntaSft3Y1SBgDVImSCOkG2e9k2EwEMRLk27aAN9C9KRJtIc2N6a6KJ9grWdMcNflHiRBa3hYAYbyJ1cSI9tuUA4HEiAz/xi2qKGoyZcm1+DgCunIvIcxzYkQqFYtiY8pmky143TzSVDmTSszjM2O4wKOYDdOp5zLu0RHf3NCUAUDFe7N1bLtZULbVFjh5tGAyJehnwijl/LAcwFRAg7DzzTmSSVOr1ZdSJ9lMk40tKAKBwkMibM1JxRJI1Mvf74RzwRj2gYrXTlVIGABXHkjldm5B7Lp0cyDmB6eR+BOrOASACQkhnE3IASCf3I1B3DgAREEI6m5ADQDq5H4G6cwCIgBDS2YQcANLJ/QjUnQNABISQzibkAJBO7keg7hwAIiCEdDYhB4B0cj8CdecAEAEhpLMJOQCkk/sRqDsHgAgIIZ1NyAEgndyPQN05AERACOlswv8DpYR7gYtOld8AAAAASUVORK5CYII=')";
  }

  static navigateVideo(time, player) {
    // This method for raw <video id="player"> tags
    console.log("Nav To ", time);
    player.currentTime = time;
  }

  create_btn() {
    let video = this.lookForVideo();

    const recv_media = this.recv_media;
    let transcribeButton = document.createElement("button");
    transcribeButton.style.height = "50px";
    transcribeButton.style.width = "50px";
    transcribeButton.style.borderRadius = "50%";

    transcribeButton.style.color = "#E0C231";
    transcribeButton.style.background = Content.get_btn_background();
    transcribeButton.style.backgroundSize = "25px 25px";
    transcribeButton.style.backgroundRepeat = "no-repeat";
    transcribeButton.style.backgroundPosition = "center";
    transcribeButton.style.backgroundColor = "#0F89D2";

    transcribeButton.style.borderWidth = "0px";
    transcribeButton.style.marginLeft = "5px";
    transcribeButton.style.marginTop = "5px";
    transcribeButton.style.position = "absolute";
    transcribeButton.style.zIndex = 1;

    transcribeButton.style.opacity = 0.8;
    transcribeButton.style.animationTimingFunction = "ease-in-out";
    transcribeButton.style.animation = 0;
    transcribeButton.addEventListener("click", function (event) {
      transcribeButton.animate([
        // keyframes
        { transform: 'scale(1)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
      ], {
        // timing options
        duration: 200,
        iterations: 1
      });
      chrome.storage.local.set({ key: video.title }, function () {
        console.log(video, video.getAttribute("src"));
        console.log('Value is set to ' + video.title);
        let vid_src = video.getAttribute("src");
        if (vid_src === undefined) {
          vid_src = video.currentSrc;
        }
        if (vid_src === undefined) {
          vid_src = video.src;
        }
        recv_media(vid_src);
      });
      event.preventDefault();
    });
    transcribeButton.classList.add("transcribeButton");


    transcribeButton.addEventListener("mouseover", function () {
      let opacity = 0.8;
      let intervalID = 1;
      function show() {
        opacity = Number(window.getComputedStyle(transcribeButton)
          .getPropertyValue("opacity"));
        if (opacity < 1) {
          opacity = opacity + 0.1;
          transcribeButton.style.opacity = opacity;
        } else {
          clearInterval(intervalID);
        }
      }
      intervalID = setInterval(show, 20);
    });

    transcribeButton.addEventListener("mouseout", function () {
      let opacity = 1;
      let intervalID = 1;
      function hide() {
        opacity = Number(window.getComputedStyle(transcribeButton)
          .getPropertyValue("opacity"));
        if (opacity > 0.8) {
          opacity = opacity - 0.1;
          transcribeButton.style.opacity = opacity;
        } else {
          clearInterval(intervalID);
        }
      }
      intervalID = setInterval(hide, 20);
    });

    try {
      let curr_btn = document.getElementsByClassName("transcribeButton");
      video.parentNode.replaceChild(transcribeButton, curr_btn);
    } catch(err) {
      video.parentNode.insertBefore(transcribeButton, video);
    }

    return transcribeButton;
  }

  recv_media(media_path) {
    let create_btn = this.create_btn;
    console.log("Media path: ", media_path);

    let setState = this.setState.bind(this);
    let query_transcript = this.query_transcript;

    fetch(media_path)
      .then((res) => res.blob())
      .then((blob) => blob.arrayBuffer())
      .then((bytes) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            chrome.storage.local.set({ corpus_id: xhttp.responseText }, function () {
              let response = JSON.parse(xhttp.responseText);
              setState({ corpus_id: response.corpus_id });

              console.log("TRANSCRIBING");
              let transcribeButton = create_btn();
              transcribeButton.animate([
                // keyframes
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(360deg)' }
              ], {
                // timing options
                duration: 1000,
                iterations: Infinity
              });
            });
            let interval_id = setInterval(function () {
              let resRecv = query_transcript();
              if (resRecv !== 0) {
                clearInterval(interval_id);
                console.log("DONE TRANSCRIBING");
              }
            }, 2000);
          } else if (this.status == 502 || this.status == 500 || this.status == 503 || this.status == 504) {
            console.log(xhttp);
            let transcribeButton = create_btn();
            transcribeButton.animate([
              // keyframes
              { transform: 'translateY(10px)' },
              { transform: 'translateY(0px)' },
              { transform: 'translateY(10px)' },
              { transform: 'translateY(0px)' },
              { transform: 'translateY(10px)' }
            ], {
              // timing options
              duration: 1000,
              iterations: Infinity
            });
          }
        };

        let transcribeButton = create_btn();
        let url = SERVER_URL + "/transcribe_file";
        // xhttp.open("POST", url, true); // TODO : Sync
        xhttp.open("POST", url);
        xhttp.upload.addEventListener('progress', function (evt) {
          if (evt.lengthComputable) {
            transcribeButton.style.background = "";
            transcribeButton.style.backgroundColor = "#0F89D2";
            transcribeButton.innerText = Math.floor(100 * evt.loaded / evt.total).toString() + "%";
          }
        });
        xhttp.upload.addEventListener('load', function (evt) {
          if (evt.lengthComputable) {
            transcribeButton.style.background = Content.get_btn_background();
            transcribeButton.style.backgroundColor = "#0F89D2";
            transcribeButton.innerText = "";
          }
        });

        xhttp.setRequestHeader("Content-Type", "video/mp4");
        xhttp.send(bytes);
      });
  }

  query_transcript() {
    let processTranscript = this.processTranscript;
    let create_btn = this.create_btn;

    let url = new URL(SERVER_URL + "/get_transcript");
    url.searchParams.set("corpus_id", this.state.corpus_id);
    var oReq = new XMLHttpRequest();
    var complete = 0;
    oReq.onload = function () {
      if (oReq.readyState === 4) {
        if (oReq.status === 200) {
          let response = JSON.parse(oReq.responseText);
          if (response.complete === "1") {
            create_btn();
            processTranscript(response);
            complete = response;
          }
        } else {
          console.error("Error from backend: ", oReq.statusText);
          complete = 2;
        }
      }
    };
    oReq.open("GET", url, false);
    oReq.send();

    return complete;
  }

  processTranscript(response) {
    let player = this.lookForVideo();
    console.log("Transcript:", response);

    const parsed_response = response;
    const MAX_BLOCK_WORD_COUNT = 150;
    let sentences = parsed_response["sentences"];
    let response_box = document.createElement("div");

    // Create a new tab and inject the transcript there
    let t = window.open();
    t.document.body.appendChild(response_box);

    // Split text into blocks of approximately equal length
    let currentBlock = document.createElement("div");
    currentBlock.classList.add("block");
    response_box.appendChild(currentBlock);
    // currentBlock.style.visibility = "hidden";
    let currentWordCount = 0;

    sentences.forEach(function (sentence) {
      let words = sentence.words;

      currentWordCount += words.length;
      //currentWordCount += 5;

      words.forEach(function (word) {
        let word_box = undefined;
        let timestamp = word.timestamp;
        if (timestamp >= 0) {
          word_box = document.createElement("a");
          word_box.addEventListener("click", () => { Content.navigateVideo(timestamp, player); });
          word_box.classList.add("linked-timestamp");
        } else {
          // Do not create a link and only show the text
          word_box = document.createElement("span");
        }
        word_box.classList.add("text");
        word_box.innerText = " " + word.value;

        currentBlock.appendChild(word_box);
      });

      // If after adding this sentence the currentBlock is too big, create a new one
      if (currentWordCount >= MAX_BLOCK_WORD_COUNT) {
        currentWordCount = 0;
        //currentBlock.style.visibility = "visible";

        currentBlock = document.createElement("div");
        currentBlock.classList.add("block");
        response_box.appendChild(currentBlock);
        //currentBlock.style.visibility = "hidden";
      }
    });

    // Flush the last block by making it visible
    //currentBlock.style.visibility = "visible";

    // Inject CSS into the new tab
    let style = document.createElement("style");
    style.textContent = `
  body {
    font-family: Arial;
    font-size: 30px;
  }
  .block {
    padding: 100px 300px 0 300px;
  }
  .linked-timestamp {
    cursor: pointer;
  }
  .linked-timestamp:hover {
    color: #4660b8;
  }
  `;
    t.document.head.append(style);
    document.getElementById('transcribingMarker').textContent = 'doneTranscribing';
  }

  clear_media() {
    this.setState({ currentJob: null });
  }

  lookForVideo() {
    var videoTags = ["video", "d2l-labs-media-player"];
    for (let i = 0; i < videoTags.length; i++) {
      try {
        if (document.getElementsByTagName(videoTags[i])[0] !== undefined) {
          return document.getElementsByTagName(videoTags[i])[0];
        }
      } catch (err) {
        console.log(err);
      }
    }
    return false;
  }

  processVideo() {
    chrome.storage.local.remove(["key"], function () {
      var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
    });
    this.create_btn();

    // Make transcribe button appear on mouse hover
    let transcribingMarker = document.createElement('div');
    transcribingMarker.id = 'transcribingMarker';
    let transcriptionStatus = document.createTextNode('notTranscribing');
    // transcribingMarker.style.visibility = 'hidden';
    transcribingMarker.append(transcriptionStatus);
    document.body.appendChild(transcribingMarker);
  }

  render() {
    // document.addEventListener("DOMContentLoaded", function() {});

    window.addEventListener("load", () => {
      chrome.storage.local.set({ key: null }, function () {
        console.log("key is cleared!");
      });
      //let iter_count = 0;
      var lookForVideo = this.lookForVideo;
      var processVideo = this.processVideo;
      let interval_ID = setInterval(function () {
        let vid_elem = lookForVideo();
        if (vid_elem !== false) {
          clearInterval(interval_ID);
          processVideo(vid_elem);
        }
      }, 1000);

      /*var videoLookupWorker = BuildWorker(function() {
        setInterval(lookForVideo, 5000);
        //let interval_ID = setInterval(lookForVideo, 5000);
        function frame() {
          lookForVideo();
          iter_count += 1;
          if (iter_count > 10) clearInterval(interval_ID);
        }
      });
      console.log("WORKER: ", videoLookupWorker);*/
    }, false);

    return (
      <div></div>
    );
  }
}

export default Content;
