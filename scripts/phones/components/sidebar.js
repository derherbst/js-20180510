import Component from '../../component.js';

export default class Sidebar extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._searchInput = document.querySelector('.search');
    console.log(this._searchInput);

    // this._sortPhonesBySearch();

    this.on('keyup', '[data-element="search"]', (event) => {
      this._sortPhonesBySearch();
    });

  }

  _sortPhonesBySearch() {
    let searchElement = event.delegateTarget;

    console.log(searchElement.value);

    this.trigger('search-input-check', searchElement.value);
  }

  _render() {
    this._element.innerHTML = `
      <section>
        <p>
          Search:
          <input class="search" data-element="search">
        </p>

        <p>
          Sort by:
          <select>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>

      <section>
        <p>Shopping Cart</p>
        <ul>
          <li>Phone 1</li>
          <li>Phone 2</li>
          <li>Phone 3</li>
        </ul>
      </section>
    `;
  }
}