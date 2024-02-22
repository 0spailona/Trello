import CreateCardForm from "./createCardForm";
import CreateColumnForm from "../widgets/CreateColumnForm";
import RenameColumnForm from "../widgets/RenameColumnForm";

export default class Column {
  constructor(name) {
    this.name = name
  }

  drawColumn() {
    this.containerEl = document.querySelector('.container');
    //console.log('new column')
    this.columnEl = document.createElement('div');
    this.columnEl.classList.add('column');

    const wrpEl = document.createElement('div');
    wrpEl.classList.add('wrpTitleAndRemoveBtn');


    const columnTitleEl = document.createElement('span');
    columnTitleEl.classList.add('columnTitle');
    columnTitleEl.textContent = this.name;
    //console.log('name',this.name)
    wrpEl.appendChild(columnTitleEl);

    this.showSidebarBtn = document.createElement('button');
    this.showSidebarBtn.classList.add('showSidebarBtn', 'customBtn');
    this.showSidebarBtn.textContent = '\u{205d}'//'\u{d7}';
    this.showSidebarBtn.addEventListener('click', e => this.toggleSidebar(e))
    wrpEl.appendChild(this.showSidebarBtn);

    wrpEl.appendChild(this.drawSidebar())

    this.columnEl.appendChild(wrpEl)

    const addNoteWRPEl = document.createElement('div');
    addNoteWRPEl.classList.add('addNoteWRP')


    const addNoteEl = document.createElement('button');
    addNoteEl.classList.add('addNote', 'customBtn');
    addNoteEl.textContent = ' ++ Add new card';
    addNoteEl.addEventListener('click', e => this.addNote());
    addNoteWRPEl.appendChild(addNoteEl)
    this.columnEl.appendChild(addNoteWRPEl);

    this.containerEl.appendChild(this.columnEl)
  }

  addNote() {
    console.log('addNote')
    const form = new CreateCardForm()

  }

  drawNote(value) {

  }

  drawSidebar() {
    const sidebarEl = document.createElement('div');
    sidebarEl.classList.add('sidebar');

    const listEl = document.createElement('ul');
    listEl.classList.add('list');


    const renameItem = document.createElement('li');
    renameItem.classList.add('listItem');
    listEl.appendChild(renameItem)

    const renameColumnBtn = document.createElement('button');
    renameColumnBtn.classList.add('renameColumnBtn', 'customBtn');
    renameColumnBtn.textContent = 'Rename block';
    renameColumnBtn.addEventListener('click',e=>this.renameColumn(e))
    renameItem.appendChild(renameColumnBtn);

    const removeItem = document.createElement('li');
    removeItem.classList.add('listItem');
    listEl.appendChild(removeItem)

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeColumnBtn', 'customBtn');
    removeBtn.textContent = 'Delete this block'
    removeBtn.addEventListener('click', e => this.removeColumn(e))

    removeItem.appendChild(removeBtn);
    sidebarEl.appendChild(listEl)
    return sidebarEl
  }

  toggleSidebar() {
    const sidebarEl = this.columnEl.querySelector('.sidebar');
    sidebarEl.classList.toggle('show')
  }

  async renameColumn(e){
    const form = new RenameColumnForm();

    let value;
    try {
      value = await form.queryName();
    } catch (e) {
      value = null;
    }

    if (value) {
      const column = new Column(value);
      this.name = value;
      document.querySelector('.columnTitle').textContent = value;
      this.toggleSidebar()
    }
  }

  removeColumn(e) {
    this.columnEl.remove()
  }
}
