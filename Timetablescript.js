var content = document.getElementById('content'),
    address = document.getElementById('address'),
    saveButton = document.getElementById('save'),
    loadButton = document.getElementById('load'),
    clearButton = document.getElementById('clear'),
    resetButton = document.getElementById('reset');

var localStore = {
  saveLocalStorage: function() {
    localStorage.setItem('item', content.innerHTML);
  },
  loadLocalStorage: function() {
    var contentStored = localStorage.getItem('item');
    if ( contentStored ) {
      content.innerHTML = contentStored;
    } 
  },
  clearLocalStorage: function() {
    localStorage.removeItem('item');
  }
};

saveButton.addEventListener('click', function() {
  localStore.saveLocalStorage();
}, false);


clearButton.addEventListener('click', function() {
  localStore.clearLocalStorage();
}, false);





