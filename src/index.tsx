import * as QRCode from 'qrcode'
const qrcodeDom = document.getElementById('qrcode')

function refreshQRCode() {
  QRCode.toCanvas(qrcodeDom, 'http://baidu.com', (error) => {
    if (error) console.error(error)
    console.log('success!')
  })
}

const htmlContainer = document.getElementsByClassName('html-container')[0]
const links = htmlContainer.querySelectorAll('.html-item a.link')
debugger
[].slice.apply(links).forEach(n => {
  const href = n.getAttribute('data-href')
  const target = n.getAttribute('target')
  n.onclick = () => {
    window.open(href, target)
  }
})
