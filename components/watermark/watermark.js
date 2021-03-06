const defaultOptions = {
  id: null,
  textAlign: 'left',
  font:
    'normal normal lighter 28px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  color: 'rgba(148, 148, 148, 0.2)',
  content: '请勿外传',
  rotate: -30,
  zIndex: 1000,
  logo: null,
  grayLogo: true, // 是否对图标进行灰度处理
  isAutoWrap: false, // 文字是否自动换行
  textOverflowEffect: 'zoom' // 当isAutoWrap 为 false 时，文本长度超出画布长度时的处理方式：  zoom - 缩小文字   cut - 截断文字
}

const parseTextData = (ctx, texts, width, isWrap) => {
  let content = []
  const lines = []
  if (texts instanceof Array) {
    content = texts
  } else if (typeof texts === 'string') {
    content.push(texts)
  } else {
    console.warn('Only support String Or Array')
  }
  if (isWrap) {
    content.forEach((text) => {
      let curLine = ''
      for (const char of text) {
        const nextLine = curLine + char
        if (char === '\n' || ctx.measureText(nextLine).width > width) {
          lines.push(curLine)
          curLine = char === '\n' ? '' : char
        } else {
          curLine = nextLine
        }
      }
      lines.push(curLine)
    })
    return lines
  } else {
    return content
  }
}
const drawText = (ctx, options) => {
  let { width, _w = width, height, textOverflowEffect, content: text, font, isAutoWrap, logo } = options
  const oldBaseLine = ctx.textBaseline
  let x = 0
  const y = 16
  ctx.textBaseline = 'hanging'
  /**
   * LOGO 固定宽高： 32 * 32
   * 内容区域为 画布宽度 - 48 （预留左右各24的 padding）
   * 如含 LOGO ，文字的起始 X 坐标为： 24(padding-left) + 32(logo size) + 4(logo 与 text 间距)
   */
  const lineHeight = parseInt(font * 2) // ctx.font必须以'XXpx'开头
  if (logo) {
    x += 64
    _w -= 64
  }
  const lines = parseTextData(ctx, text, width, isAutoWrap)

  // 计算 Y 的起始位置
  let lineY = y + ctx.canvas.height / 2 - (lineHeight * lines.length) / 2
  const initLineY = lineY
  for (const line of lines) {
    let lineX
    if (ctx.textAlign === 'center') {
      lineX = x + width + 40
    } else if (ctx.textAlign === 'right') {
      lineX = x + width + 40
    } else {
      lineX = x + 40
    }
    if (textOverflowEffect === 'zoom') {
      const size = parseInt(Math.sqrt((_w * _w + height * height) / 2))
      ctx.fillText(line, lineX, lineY, size)
    } else {
      ctx.fillText(line, lineX, lineY)
    }
    lineY += lineHeight
  }
  ctx.textBaseline = oldBaseLine
  return initLineY - lineHeight / 2
}
const drawLogo = (ctx, logo, cb) => {
  const img = new window.Image()
  img.src = logo
  img.onload = () => {
    ctx.globalAlpha = 0.2
    ctx.drawImage(img, 32, ctx.canvas.height / 2 - 16, 64, 64)
    cb()
  }
}

const toImage = (canvas, key, container, options) => {
  const base64Url = canvas.toDataURL()
  const { opacity = 1 } = options
  const _top = (options._top || 0) + 'px'
  const __wm = document.querySelector(`.${key}`)
  const watermarkDiv = __wm || document.createElement('div')
  const styleStr = `
  position:absolute;
  top:${_top};
  left:-50%;
  top:-50%;
  width:200%;
  height:200%;
  transform:scale(0.5);
  z-index:${options.zIndex};
  pointer-events:none;
  background-repeat:repeat;
  visibility:visible !important;
  display: block !important;
  opacity: ${opacity} !important;
  user-select:none !important;
  background-image:url('${base64Url}');
  ${
    options.grayLogo
      ? '-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);-ms-filter: grayscale(100%);-o-filter: grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none;'
      : ''
  }
  `
  watermarkDiv.setAttribute('style', styleStr)
  if (window.getComputedStyle(container).getPropertyValue('position') === 'static') {
    container.style.position = 'relative'
  }
  watermarkDiv.classList.add(key)
  container.insertBefore(watermarkDiv, container.firstChild)
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  if (MutationObserver) {
    let mo = new MutationObserver(function () {
      const __wm = document.querySelector(`.${key}`)
      const cs = __wm ? window.getComputedStyle(__wm) : {}
      if (
        (__wm &&
          (__wm.getAttribute('style') !== styleStr ||
            cs.visibility === 'hidden' ||
            cs.display === 'none' ||
            cs.opacity === 0)) ||
        !__wm
      ) {
        mo.disconnect()
        mo = null
        WaterMarker(container, JSON.parse(JSON.stringify(options)))
      }
    })
    mo.observe(container, {
      attributes: true,
      subtree: true,
      childList: true
    })
  }
}
const WaterMarker = (container, args) => {
  const _container = container || document.body
  const { density } = args
  let _markSize = {
    width: 420,
    height: 270
  }
  if (['low', 'high'].includes(density)) {
    _markSize = {
      width: density === 'low' ? 540 : 360,
      height: density === 'low' ? 410 : 210
    }
  }
  const options = Object.assign({}, defaultOptions, _markSize, args)
  const { id, width, height, textAlign, textBaseline, font, color, logo, rotate } = options
  let key = 'hi-' + Math.floor(Math.random() * (9999 - 1000)) + 1000 + '__wm'
  if (id && id.trim().length > 0 && !document.querySelector(id + '__wm')) {
    key = id + '__wm'
  }
  const canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  canvas.setAttribute('width', width + 'px')
  canvas.setAttribute('height', height + 'px')
  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = `normal normal lighter ${Number(
    font * 2
  )}px -apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  ctx.fillStyle = color
  ctx.translate(width / 2, height / 2)
  ctx.rotate((Math.PI / 180) * rotate)
  ctx.translate(-width / 2, -height / 2)

  drawText(ctx, options)
  if (logo) {
    drawLogo(ctx, logo, () => {
      toImage(canvas, key, _container, options)
    })
  } else {
    toImage(canvas, key, _container, options)
  }
}

export default WaterMarker
