if (typeof (jQuery) !== 'undefined') {
  jQuery(document).ready(function ($) {

    const bigHeart = $('#big-heart');

    const makePoint = (x, y) => {
      const cloneP = $('#pheart').clone()
        .removeAttr('id')
        .addClass('pheart')
        .css({
          left: x,
          top: y,
        })
        .appendTo(bigHeart.find('.phearts'));

      return cloneP;
    }

    const step = 0.1;
    const initPheartW = 32;
    const scaleRate = 17/600;
    const smRate = 0.5;

    //draw heart
    const drawBigHeart = () => {
      const bWith = bigHeart.width();
      const bHeight = bigHeart.height();
      const scale = scaleRate * bWith;

      let firstY = 0;
      for (let t = 0; t < Math.PI * 2; t += step) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) 
                  - 5 * Math.cos(2 * t)
                  - 2 * Math.cos(3 * t)
                  - Math.cos(4 * t);

        if (t === 0) {
          firstY = y;
        }

        //scale and move to center
        const px = bWith / 2 + x * scale - initPheartW / 2; // left
        const py = bHeight / 2 - y * scale - initPheartW - 1.54 * (initPheartW / 2); // top
        // AI tính ra khoảng dư từ đỉnh hình vuông bao ngoài đến điểm cao nhất trái tim là 1.54 đơn vị

        const point = makePoint(px, py);
        point.removeClass('d-none').addClass('p-vibrate');

        const pxSm = bWith / 2 + x * scale * smRate - initPheartW / 2;
        const pySm = bHeight / 2 - y * scale * smRate - initPheartW - 1.54 * (initPheartW / 2);

        setTimeout(() => {
          pointSpread(px, py, pxSm, pySm);
        }, Math.random() * 2000);
      }
    }

    const spRange = 20;
    const randPos = () => {
      return Math.random() * (spRange * 2) - spRange;
    }

    // Tạo cụm time lan tỏa
    const pointSpread = (px, py, pxSm, pySm) => {
      // make 5 sub point
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const randPx = pxSm + randPos();
          const randPy = pySm + randPos();
          const subPoint = makePoint(randPx, randPy);
          subPoint.removeClass('d-none');

          subPoint[0].animate([
            {
              left: randPx + 'px',
              top: randPy + 'px',
              opacity: 1,
              transform: 'scale(0)',
              offset: 0,
            },
            {
              left: (px + randPx)/2 + 'px',
              top: (py + randPy)/2 + 'px',
              opacity: 1,
              transform: 'scale(0.4)',
              offset: 0.3
            },
            {
              left: px + 'px',
              top: py + 'px',
              opacity: 0.1,
              transform: 'scale(1)',
              offset: 1,
            }
          ], {
            duration: 1000 + Math.random() * 1000,
            iterations: Infinity,
          })
        }, i * 50);
      }
    }

    let timeoutReize = null;
    const resize = () => {
      if (timeoutReize !== null) {
        clearTimeout(timeoutReize);
      }
      timeoutReize = setTimeout(() => {
        bigHeart.find('.phearts').empty();
        bigHeart.height(bigHeart.width());
        setTimeout(() => {
          drawBigHeart();
        }, 50);
      }, 300);
    }

    $(window).on('resize', resize);
    resize();

  });
}