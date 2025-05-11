// Näitame edukuse teadet
function showSuccessMessage(event) {
    event.preventDefault();
  
    alert("Aitäh! Võtame teiega peatselt ühendust.");
  
    event.target.reset();
  }
  
