import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import Sidebar from './components/sidebar.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
    });

    console.log(phones);

    this._catalogue.on('phone-selected', (event) => {
      let phoneId = event.detail;
      let phoneDetails = PhoneService.getPhone(phoneId);

      this._catalogue.hide();
      this._viewer.showPhone(phoneDetails);

      console.log(phoneId);
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._sidebar = new Sidebar({
      element: this._element.querySelector('[data-component="phone-sidebar"]'),
    });

    this._checkingSearchValue();

    // скрываем вьюху телефона по нажатию на back

    this._viewer.on('click', '.btn_back', () => {
      this._viewer.hide();
      this._catalogue.show();
    });
  }

  // _checkingSearchValue() {
  //   this._sidebar.on('search-input-check', (event) => {
  //     if ()
  //   })
  // }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2">
        <div data-component="phone-sidebar"></div>
      </div>
  
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" class="js-hidden"></div>
      </div>
    `;
  }
}