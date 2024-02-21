import Form from "../widgets/form";
import CreateColumnForm from "../widgets/CreateColumnForm";
import CardForm from "../widgets/cardForm";

export default class DrawDom {
  constructor() {

  }

  draw() {
    this.root = document.querySelector('#root');
    this.containerEl = document.createElement('div');
    this.containerEl.classList.add('container');

    const addColBtnEl = document.createElement('button');
    addColBtnEl.classList.add('btn');
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
      this.drawColumn(value)
    }
  }

  drawColumn(value) {
    console.log('new column')
    const columnEl = document.createElement('div');
    columnEl.classList.add('column');

    const wrpEl = document.createElement('div');
    wrpEl.classList.add('wrpTitleAndRemoveBtn')

    const columnTitleEl = document.createElement('span');
    columnTitleEl.classList.add('columnTitle');
    columnTitleEl.textContent = value;
    wrpEl.appendChild(columnTitleEl);

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('removeBtn');
    removeBtnEl.textContent = '\u{d7}';
    removeBtnEl.addEventListener('click', e => this.removeColumn(e,columnEl))


    wrpEl.appendChild(removeBtnEl);
    columnEl.appendChild(wrpEl)

    const addNoteWRPEl = document.createElement('div');
    addNoteWRPEl.classList.add('addNoteWRP')


    const addNoteEl = document.createElement('button');
    addNoteEl.classList.add('addNote');
    addNoteEl.textContent = ' ++ Add new card';
    addNoteEl.addEventListener('click',e => this.addNote());
    addNoteWRPEl.appendChild(addNoteEl)
    columnEl.appendChild(addNoteWRPEl);

    this.containerEl.appendChild(columnEl)
  }

  addNote(){
    console.log('addNote')
    const form = new CardForm()

  }
  drawNote(value) {

  }

  removeColumn(e,element){
    element.remove()
  }

}
