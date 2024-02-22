import Form from "../widgets/form";
import CreateColumnForm from "../widgets/CreateColumnForm";
import CreateCardForm from "../column/createCardForm";
import Column from "../column/column";

export default class DrawDom {
  constructor() {

  }

  draw() {
    this.root = document.querySelector('#root');
    this.containerEl = document.createElement('div');
    this.containerEl.classList.add('container');

    const addColBtnEl = document.createElement('button');
    addColBtnEl.classList.add('btn','btnAddColumn');
    addColBtnEl.textContent = '++ column';
    addColBtnEl.addEventListener('click', e => this.addColumn())
    this.root.appendChild(addColBtnEl);

    this.root.appendChild(this.containerEl);
  }

  async addColumn() {
    const form = new CreateColumnForm();

    let value;
    try {
      value = await form.queryName();
    } catch (e) {
      value = null;
    }

    if (value) {
      const column = new Column(value);
      column.drawColumn()
      //this.drawColumn(value)
    }
  }



}
