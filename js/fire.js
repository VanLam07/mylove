if (typeof (jQuery) !== 'undefined') {
  jQuery(document).ready(function ($) {

    const fireworkBox = $('#fireworks');

    const bgColors = ['#ff0040', '#00ff73', '#0084ff', '#ffeb3b', '#ff6b00'];

    const makeFirebody = (randX) => {
      const bg = bgColors[Math.floor(Math.random() * bgColors.length)];
      const fireBody = $('#firebody').clone()
        .removeAttr('id')
        .removeClass('d-none')
        .addClass('firebody')
        .css({
          left: `${randX}vw`,
          background: bg,
        });

      fireBody.appendTo(fireworkBox);
      return fireBody;
    }

    const makeFireWork = (left, bottom) => {
      const fireWork = $('#firework').clone()
        .removeAttr('id')
        // .removeClass('d-none')
        .addClass('firework')
        .css({
          left: `${left}vw`,
          bottom: `${bottom}vh`,
          // opacity: 0,
        });

        fireWork.appendTo(fireworkBox);
        return fireWork;
    }

    let intervalFire = null;

    const clearBox = () => {
      if (intervalFire !== null) {
        clearInterval(intervalFire);
      }
      fireworkBox.empty();
    }

    // make random firebody
    const makeRandFire = () => {
      for (let i = 0; i < 5; i++) {
        const randX = Math.random() * 100;
        const randStop = Math.random() * 100;

        const fireBody = makeFirebody(randX);
        const fireWork = makeFireWork(randX, randStop);

        const duration = 500 + Math.random() * 1000;
        fireBody[0].animate([
          {
            transform: `translateY(0) scale(1)`,
            opacity: 0,
            offset: 0,
          },
          {
            transform: `translateY(-${randStop}vh) scale(1.5)`,
            opacity: 1,
            offset: 1,
          }
        ], {
          duration: duration,
          iterations: Infinity,
        });

        setTimeout(() => {
          fireWork.removeClass('d-none');
        }, duration);
      }
    }

    intervalFire = setInterval(() => {
      clearBox();
      makeRandFire();
    }, 10000);

    makeRandFire();

    $(window).on('resize', () => {
      clearBox();
      makeRandFire();
    });
    
  })
}