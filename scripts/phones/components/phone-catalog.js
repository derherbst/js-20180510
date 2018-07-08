import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element, phones }) {
    super({ element });

    this._phones = phones;

    this._render();

    this.on('click', '[data-element="details-link"]', (event) => {
      this._onPhoneClick(event);
    });

    this.on('click', '[data-element="add-button"]', (event) => {
      let phoneElement = event.delegateTarget.closest('[data-element="phone"]');
      this.trigger('add', { phoneId: phoneElement.dataset.phoneId, phoneImg: phoneElement.dataset.phoneImg });
      // console.log(phoneElement.dataset);
    });

  }

  _onPhoneClick(event) {
    let phoneElement = event.delegateTarget.closest('[data-element="phone"]');

    this.trigger('phone-selected', phoneElement.dataset.phoneId);
  }

  showPhones(phones) {
    this._phones = phones;
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${this._phones.map(phone => `
          
          <li class="thumbnail"
              data-element="phone"
              data-phone-id="${ phone.id }"
              data-phone-img="${ phone.imageUrl }">
              
            <a href="#!/phones/${ phone.id }" class="thumb">
              <img
                alt="${ phone.name }"
                src="${ phone.imageUrl }"
                data-element="details-link"
              >
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success" data-element="add-button">
                Add
              </a>
            </div>
  
            <a href="#!/phones/${ phone.id }" data-element="details-link">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('')}
      </ul>
    `;
  }
}