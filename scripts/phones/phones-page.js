import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import Sidebar from './components/sidebar.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._phones = PhoneService.getPhones();

    this._render();

    this._initCatalog();
    this._initViewer();
    this._sidebar();
    this._initShoppingCart();

    // this._checkingSearchValue();
    // this._checkingSelectValue();
  }

  _initCatalog() {
    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
    });

    this._catalogue.on('phone-selected', (event) => {
      let phoneId = event.detail;
      let phoneDetails = PhoneService.getPhone(phoneId);

      this._catalogue.hide();
      this._viewer.showPhone(phoneDetails);
    });

    this._catalogue.on('add', (event) => {
      let phoneDetails = {
        image: event.detail.phoneImg,
        id: event.detail.phoneId,
      };
      this._shoppingCart.addItem(phoneDetails);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalogue.show();
    });

    this._viewer.on('add', () => {
      let phoneDetails = {
        image: event.detail.phoneImg,
        id: event.detail.phoneId,
      };
      this._shoppingCart.addItem(phoneDetails);
    });
  }

  _sidebar() {
    this._sidebar = new Sidebar({
      element: this._element.querySelector('[data-component="phone-sidebar"]'),
    });

    this._sidebar.on('sort', (event) => {
      let sortedPhones = PhoneService.getPhones({ order: event.detail });
      console.log(event.detail);
      this._catalogue.showPhones(sortedPhones);
    });

    this._sidebar.on('search', (event) => {
      console.log(data);
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  // _checkingSearchValue() {
  //   this._sidebar.on('search-input-check', (event) => {
  //     let inputVal = event.detail;
  //     this._sortedPhones = this._phones.filter((phone) => {
  //       if (phone.name.startsWith(inputVal)) {
  //         return phone;
  //       }
  //     });
  //     this._catalogue._phones = this._sortedPhones;
  //     this._catalogue._render();
  //   })
  // }

  // _checkingSelectValue() {
  //   this._sidebar.on('select-check', (event) => {
  //     let selectVal = event.detail;
  //     if (selectVal.value === 'name') {
  //
  //       this._phones = this._phones.sort((a, b) => {
  //
  //         if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  //         if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  //         return 0;
  //
  //       });
  //
  //       this._catalogue._render();
  //     }
  //
  //     if (selectVal.value === 'age') {
  //       this._phones = this._phones.sort((a, b) => {
  //
  //         if (a.age < b.age) return -1;
  //         if (a.age > b.age) return 1;
  //         return 0;
  //
  //       });
  //
  //       this._catalogue._render();
  //     }
  //   })
  // }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2">
        <div data-component="phone-sidebar"></div>
        <div data-component="shopping-cart"></div>
      </div>
  
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" class="js-hidden"></div>
      </div>
    `;
  }
}