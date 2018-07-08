import Component from '../../component.js';

export default class Sidebar extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._searchInput = document.querySelector('.search');
    console.log(this._searchInput);

    // this._sortPhonesBySearch();

    window.handlePhonesSort = (event) => {
      this.trigger('sort', event.target.value);
    };

    // this.on('input', '[data-element="search"]', (event) => {
    //   this._sortPhonesBySearch();
    // });
    //
    // this.on('change', '[data-element="search"]', () => {
    //   this._sortPhonesBySelect();
    // })

  }

  // _sortPhonesBySelect() {
  //   let selectElement = event.delegateTarget;
  //   this.trigger('select-check', selectElement.value);
  // }
  //
  // _sortPhonesBySearch() {
  //   let searchElement = event.delegateTarget;
  //   this.trigger('search-input-check', searchElement.value);
  // }

  _render() {
    this._element.innerHTML = `
      <section>
        <p>
          Search:
          <input class="search" data-element="search">
        </p>

        <p>
          Sort by:
          <select onchange="window.handlePhonesSort(event)">
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>
    `;
  }
}