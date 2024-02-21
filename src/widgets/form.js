export default class Form {
  constructor(btnText, label) {
    this.btnText = btnText;
    this.labelText = label;
  }

  drawForm() {
    this.formContainer = document.createElement('div');
    this.formContainer.classList.add('formBackGround');
    document.querySelector('#root').appendChild(this.formContainer);

    const formEl = document.createElement('form');
    formEl.classList.add('form');

    const labelEl = document.createElement('label');
    labelEl.classList.add('label');
    labelEl.textContent = this.labelText;
    formEl.appendChild(labelEl);

    this.inputEl = document.createElement('input');
    this.inputEl.type = 'text';
    this.inputEl.classList.add('inputEl');
    formEl.appendChild(this.inputEl)

    const btnWRP = document.createElement('div');
    btnWRP.classList.add('btnWRP');

    const btnSave = document.createElement('button');
    btnSave.classList.add('btn', 'btnCreate');
    btnSave.textContent = this.btnText;
    btnWRP.appendChild(btnSave);

    const btnCancel = document.createElement('button');
    btnCancel.classList.add('btn', 'btnCreate');
    btnCancel.textContent = 'Cancel';
    btnCancel.type = 'button';
    btnCancel.addEventListener('click', (e) => this.cancel())
    btnWRP.appendChild(btnCancel);


    formEl.appendChild(btnWRP);
    formEl.addEventListener('submit', e => this.saveData(e))
    this.formContainer.appendChild(formEl)
  }

  async queryName(){
    this.drawForm();

    return new Promise((resolve,reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });
  }

  saveData(e) {
    e.preventDefault();
    this.value = this.inputEl.value;
    console.log('form value',this.value)
    this.formContainer.remove();
    this.promiseResolve(this.inputEl.value);
  }

  cancel(e) {
    this.formContainer.remove();
    this.promiseReject();
  }

}
