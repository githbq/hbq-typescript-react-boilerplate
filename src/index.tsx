// import * as QRCode from 'qrcode'
import 'tslib'
(async () => {
  const QRCode = await import('qrcode')
  const qrcodeDom = document.getElementById('qrcode')
  qrcodeDom.title = '点击关闭二维码'
  qrcodeDom.onclick = (e) => {
    qrcodeDom.style.display = 'none'
  }

  function refreshQRCode(url) {
    qrcodeDom.style.display = 'inline-block'
    qrcodeDom.style.border = '3px solid green'
    QRCode.toCanvas(qrcodeDom, url, (error) => {
      if (error) console.error(error)
      console.log('success!')
    })

  }

  const htmlContainer = document.getElementsByClassName('html-container')[0]
  const links = htmlContainer.querySelectorAll('.html-item a.link')
  Array.prototype.slice.apply(links).forEach(n => {
    const href = n.getAttribute('data-href')
    const target = n.getAttribute('target')
    n.onclick = () => {
      window.open(href, target)
      debugger
      refreshQRCode('http://10.252.213.148:7703' + '/' + href.replace(/\\/g, '/'))
    }
  })
})()
