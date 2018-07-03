import Component from '../../component.js';

export default class PhoneViewer extends Component {

  constructor( {element} ) {
    super( {element} );

    this.on('click', '[data-element="back-button"]', () => {
      this.trigger('back');
    });
  }

  showPhone(phoneDetails) {
    this._render(phoneDetails);
    this.show();
  }

  _render(phone) {
    console.log(phone);
    this._element.innerHTML = `
      <img class="phone" src="${phone.images[0]}">

      <button class="btn_back" data-element="back-button">Back</button>
      <button class="btn_add">Add to basket</button>
  
  
      <h1>${phone.name}</h1>
  
      <p>${phone.description}</p>
  
      <ul class="phone-thumbs">
        ${phone.images.map(image => `
          <li>
            <img src="${image}">
          </li>
        `).join('')};
      </ul>
    `;
  }
}