import './assets/css/vendor/bootstrap.min.css';

const render = () => {
  import(`./assets/css/sass/themes/light.scss`).then(() => {
    require('./AppRenderer');
  });
}

render();