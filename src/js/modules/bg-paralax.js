const bgElement = document.querySelectorAll( '[data-mouse-parallax]' );

export const initBgParalaxEffect = () => {
  for ( let i = 0; i < bgElement.length; i++ ) {
    window.addEventListener( 'mousemove', ( evt ) => {
      let x = evt.clientX / window.innerWidth;
      let y = evt.clientY / window.innerHeight;
      bgElement[ i ].style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
    } );
  }
};