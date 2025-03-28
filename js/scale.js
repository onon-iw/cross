const viewScaler = {
  scaleValueX: 1,
  scaleValueY: 1,
  scale: 1,

  setScale: function () {
    let windowW = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;
    let windowH = document.body.clientHeight || window.innerHeight || document.documentElement.clientHeight;
    
    const wrapEl = document.querySelector('.content_wrap');
    
    if (!wrapEl) return;

    const _scaleValueX = windowW / wrapEl.clientWidth;
    const _scaleValueY = windowH / wrapEl.clientHeight;
    const _scale = _scaleValueX < _scaleValueY ? _scaleValueX : _scaleValueY;

    this.scaleValueX = _scaleValueX;
    this.scaleValueY = _scaleValueY;
    this.scale = _scale;
    const transform = 'transform: scale(' + _scale + ',' + _scale + ');' + '-ms-transform: scale(' + _scale + ',' + _scale + ');' + '-webkit-transform: scale(' + _scale + ',' + _scale + ');';
    
    const left = windowW / 2 - (wrapEl.clientWidth / 2) * _scale + 'px';
    const top = windowH / 2 - (wrapEl.clientHeight / 2) * _scale + 'px';
    wrapEl.setAttribute('style', transform + 'transform-origin: 0% 0%; -ms-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%;' + 'left:' + left + ';' + 'top:' + top);
    
    wrapEl.classList.remove('block'); 
  }
};
