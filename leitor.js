function onScanSuccess(decodedText, decodedResult) {
 
  /* document.querySelector('#result').innerHTML = ` ${decodedText}`, decodedResult; */
   document.getElementById('produto').value = ` ${decodedText}`, decodedResult; 

    }
         



var html5QrcodeScanner = new Html5QrcodeScanner(
 "qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);


const localStorageKey = 'tbody'
const arrayProdutos = [];
function validateIfExist()
{
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let inputValue = document.getElementById('produto').value;
  let exists = values.find(x => x.name == inputValue)
  return !exists ? false : true

}


  
let data = new Date();
function today(data){
let newDate = new Date(data);
return `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`

}

 


function newTask()
{

  let input = document.getElementById('produto')
  let nomeSetor = document.getElementById('preco')
  

  
  if(!input.value)
  {
    input.style.border='1px solid red'
    alert('vazio')
  }
  else if(validateIfExist()){
    alert('já capturado')
  }
  else 
  {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
   
    values.push({
      id:1,
      departamento:nomeSetor.value,
      name:input.value,
      day:today(data),
      acao: "Excluir"
      

    })
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
  }
  input.value = ''
  
}

function showValues()
{
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let list = document.getElementById('tbody')
  list.innerHTML = ' '
  for (let i = 0; i < values.length; i++)
  { 
    let tr = tbody.insertRow();
    
       
    let td_produto =tr.insertCell();  /*nome do departamento */
    let td_valor = tr.insertCell();  /*nome do codigo */
    let td_data=tr.insertCell();
    let td_acoes = tr.insertCell();


    
    td_produto.innerText = `${values[i]['departamento']}`/*departamento */
    td_valor.innerText = `${values[i]['name']}` /*campo codigo*/
    td_data.innerText = `${values[i]['day']}` /*campo codigo*/
    td_acoes.innerHTML = `<button id='btnExcluir' style=" background-color: LightGray; border:none" onclick='removeItem("${values[i]['acao']}")'><i class="fa fa-trash" aria-hidden="true"></i></button><th>`
  
  

  }
}

function removeItem(data)
{
  let values = JSON.parse(localStorage.getItem(localStorageKey)|| "[]")
  let index = values.findIndex(x => x.name== data)
  values.splice(index,1)
  localStorage.setItem(localStorageKey,JSON.stringify(values))
  showValues()
}
showValues()






let tableRows = document.querySelectorAll('tr');
const exportBtn = document.querySelector('[data-js="export-table-btn"]');

exportBtn.addEventListener('click', () =>{
  location.reload()
const CSVString = Array.from(tableRows)
.map(row => Array.from(row.cells)
.map(cell => cell.textContent)
.join(',')
)
.join('\n')

exportBtn.setAttribute(
 'href',
 
 `data:text/csvcharset=utf-8,${encodeURIComponent(CSVString)}`
)
exportBtn.setAttribute('download',  'table.csv')

})




