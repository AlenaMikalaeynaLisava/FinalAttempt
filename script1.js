const employees = [
  {
      id: 0,
      name: "YarikHead",
      dept_unit_id: 0,
      tel: "123-123-3", 
      salary: 3000
  },
  {
      id: 1,
      name: "MashaLead",
      dept_unit_id: 1,
      tel: "123-123-3", 
      salary: 2000
  },
  {
      id: 2,
      name: "SashaLead",
      dept_unit_id: 1,
      tel: "123-123-3", 
      salary: 2200
  },
  {
      id: 3,
      name: "MirraDev",
      dept_unit_id: 2,
      tel: "123-123-3",
      salary: 1200
  },
  {
      id: 4,
      name: "IraDev",
      dept_unit_id: 2,
      tel: "123-123-3",
      salary: 1000
  },
  {
      id: 5,
      name: "DanikHead3",
      dept_unit_id: 3,
      tel: "123-123-33",
      salary: 3000
  },
  {
      id: 7,
      name: "KoliaLead",
      dept_unit_id: 4,
      tel: "123-123-3",
      salary: 2000
  },
  {
      id: 6,
      name: "OliaLead3",
      dept_unit_id: 4,
      tel: "123-123-3",
      salary: 2200
  },
  {
      id: 9,
      name: "SienaTest",
      dept_unit_id: 5,
      tel: "123-123-3",
      salary: 1000
  },
{
      id: 8,
      name: "LenaTest",
      dept_unit_id: 5,
      tel: "123-123-3",
      salary: 1200
  }
];


let developer = {
  parentId : 1,
  name: 'Developers',
  id: 2,
  //dept_units: [],
};
let devLead = {
  parentId :0,
  name: 'Lead Developers',
  id: 1,
  //dept_units: [developer]
};
let devDeptHead = {
  parentId : null,
  name: 'Development Management',
  id: 0,
  //dept_units: [devLead],
};

let qaTester = {
  parentId : 4,
  name: 'Testers',
  id: 5,
  //dept_units: [],
};
let qaLead = {
  parentId : 3,
  name: 'Lead QA',
  id: 4,
 // dept_units: [qaTester],
};
let qaDeptHead = {
  parentId : null,
  name: 'Quality Assurance Management',
  id: 3,
 // dept_units: [qaLead],
};


const company =[developer, devLead, devDeptHead, qaTester, qaLead, qaDeptHead];
// const develiperDepartment=[developer, devLead, devDeptHead];
// const qaDepartment =[qaTester, qaLead, qaDeptHead];

function getCompanyHierarchy(array){
for (i=0; i<array.length; i++){
  for(j=0; j<array.length; j++){
    if(array[i].id === array[j].parentId){
      if(!array[i].child){
        array[i].child=[];
      }
      array[i].child.push(array[j]);
    }
  }
}
 return array.filter(item=> item.parentId === null);
}
const companyHierarchy = getCompanyHierarchy(company);
const firstDepartment = companyHierarchy.slice(0, 1);
const secondDepartment = companyHierarchy.slice(1, 2);

const departmentNames=['Choose the department','developerDepartment', 'qaDepartment'];

const companyTreeContainer = document.getElementById('company-tree-container');


function buildCompanyTree(array,parentTag){
array.forEach(element => {
  const li =document.createElement('li');
  li.innerHTML = `<b> &#187;</b><span data-dept-id="${element.id}"> ${element.name}</span>`;
  li.classList.add('normal');
  parentTag.appendChild(li);

  if (element.child) {
    const childrenUl = document.createElement('ul');
    li.appendChild(childrenUl);
    buildCompanyTree(element.child, childrenUl);
}
if(!(element.parentId === null)){li.classList.add('hidden');}
});
}




const companyDeps = document.getElementById('company-department');
for(i=0; i<departmentNames.length; i++){
  const option = document.createElement('option');
  option.value = departmentNames[i];
  option.innerText = departmentNames[i];
  companyDeps.appendChild(option);
};

companyDeps.addEventListener('change', (ev) => {
  const companyDepsValue  = ev.target.value;
  const ul = companyTreeContainer.getElementsByTagName('ul')[0];
  if(ul)companyTreeContainer.removeChild(ul);
  clearTable();
  if(companyDepsValue === departmentNames[1])
  {
    showCompanyTree(firstDepartment, companyTreeContainer)
  } else if(companyDepsValue === departmentNames[2]){
    showCompanyTree(secondDepartment, companyTreeContainer);
  }
})



//showCompanyTree(companyHierarchy[0], companyTreeContainer);

function showCompanyTree(array, ancestorTag) {
  const ul = document.createElement('ul');
  
  ul.addEventListener('click', ev => {
      if (ev.target.nodeName === 'SPAN') {
          const deptId = +ev.target.getAttribute('data-dept-id');
              const targetSpan = document.getElementsByTagName('li');
              console.log(targetSpan);
              for(i=0; i< targetSpan.length; i++){
                if(targetSpan[i].classList.contains('bold'))
                  targetSpan[i].classList.remove('bold');
                  targetSpan[i].classList.add('normal');
              }
              const tar =ev.target.closest('li');
              tar.classList.remove('normal');
              tar.classList.add('bold');   


          const filteredEmpl = employees.filter(empl => deptId === empl.dept_unit_id);

          buildTable(filteredEmpl);
      }
      if (ev.target.nodeName === 'B') {
        const goal =ev.target;
        goal.classList.toggle('rotate');
        const b = goal.closest('li');
        const c=b.querySelector('li');
        c.classList.toggle('hidden');
    }
  });
  buildCompanyTree(array, ul);
 
  ancestorTag.appendChild(ul);
  
}


  function clearTable() {
    const tableEl = document.getElementsByTagName('table')[0];
    const tbodyEl = tableEl.getElementsByTagName('tbody')[0];

    if (!tbodyEl) {
        return;
    } 

    tableEl.removeChild(tbodyEl);
}
 const claenButton =document.getElementById('clean-button');
 claenButton.addEventListener('click', ev => {
  clearTable();
});


  function buildTable(items) {
    clearTable();
    fillTable(items);
  
    function fillTable (items) {
        const tbodyEl = document.createElement('tbody');
        const keys = ['id', 'name', 'tel', 'salary'];

        items.forEach(item => {
            const trEl = document.createElement('tr');

            keys.forEach(key => {
                const tdEl = document.createElement('td');

                if (key === 'salary') {
                    tdEl.setAttribute('data-salary-empl-orig', item.salary);
                }

                tdEl.innerText = item[key];

                trEl.appendChild(tdEl);
            });

            tbodyEl.append(trEl);
        });

        const tableEl = document.getElementsByTagName('table')[0];
        tableEl.append(tbodyEl);
    }
  }

  const currIds = [0, 292, 145];
  const currName=['BYN', 'USD', 'EUR']
  const currSel = document.getElementById('curr-sel');
  for(i=0; i<currIds.length; i++){
    const option = document.createElement('option');
    option.value=currIds[i];
    option.innerText =currName[i];
    currSel.appendChild(option);
  };
  
  currSel.addEventListener('change', async (ev) => {
    const currId = ev.target.value;
    const currData = await fetchCurrencyById(currId);
    
    const tableSalaryItems = document.querySelectorAll('td[data-salary-empl-orig]');

    if (!tableSalaryItems) {
        return;
    }

    for (let i = 0; i < tableSalaryItems.length; i++) {
        const originalSalaryCount = +tableSalaryItems[i].getAttribute('data-salary-empl-orig');
        if(currId==0){tableSalaryItems[i].innerText = originalSalaryCount} else{
        tableSalaryItems[i].innerText = (originalSalaryCount / currData.Cur_OfficialRate).toFixed(2);}
    }
})

const currCache = {};
currCache[0];


async function fetchCurrencyById(id) {
    if(id ==='0'){return;}
    if (!currCache[id]) {
        currCache[id] = fetch(`https://www.nbrb.by/api/exrates/rates/${id}`).then(data => data.json())
    }

    return currCache[id];
}












































// const employeersForTable=employeers;
// const currIds = [ 298, 292, 145];
// const currenciesCache = {};
// const btnEl = document.getElementById('submit_curr');
// const selectEl = document.getElementById('curr_sel');

// init();

// async function init() {
//    const currPromises = currIds.map(currId => fetchCurr(currId));
//    const currencies = await Promise.all(currPromises);
//    currencies.forEach(currency => {
//       currenciesCache[currency.Cur_ID] = currency;
//    });

//    createCurrOptions(currencies);
//    selectEl.addEventListener('change', async () => {
//     const selectedCurrId = selectEl.value;
//     alert(selectEl.value);
//    const fetchedCurrRate = await getCurrRate(selectedCurrId);
//    console.log(fetchedCurrRate);
//    const currAmount = fetchedCurrRate.Cur_OfficialRate * fetchedCurrRate.Cur_Scale;
//    //TableShow();///Вызов построения таблицы
//    for(let i=0;i<tr.length;i++){
//      //td = document.querySelectorAll('tr[i]>td');
//      let a=employeers[i];
//      tr[i].lastChild.innerText=(a.salary/currAmount).toFixed(2);
//     //TableShow();///Вызов построения таблицы
//    }
//    });
// }

// async function fetchCurr(id) {
//    const url = id
//       ? 'https://www.nbrb.by/api/exrates/currencies/' + id
//       : 'https://www.nbrb.by/api/exrates/currencies';

//    const result = await fetch(url);
//    const fetchedData = await result.json();
   
//    return fetchedData;
// }

// function createCurrOptions(currencies) {
//    currencies.forEach(currency => {
//       const optionEl = document.createElement('option');
//       optionEl.value = currency.Cur_ID;
//       optionEl.innerText = currency.Cur_Abbreviation;

//       selectEl.appendChild(optionEl);
//    });
// }

// async function getCurrRate(currId) {
//    const response = await fetch('https://www.nbrb.by/api/exrates/rates/' + currId);
//    return response.json();
// }



// //(bynCount / fetchedCurrRate.Cur_OfficialRate) * fetchedCurrRate.Cur_Scale

// let body =document.getElementsByTagName("body")[0];

// let developer = {
//   name: 'Developers',
//   id: 2,
//   dept_units: [],
// };
// let devLead = {
//   name: 'Lead Developers',
//   id: 1,
//   dept_units: [developer]
// };
// let devDeptHead = {
//   name: 'Development Management',
//   id: 0,
//   dept_units: [devLead],
// };
// //let developerDeTree = function(arr,){
//   // function innerDeveloperDeTree (arr,i){
//   // if(!dept_units){
//   //   ul[i] = document.createElement('ul');
//   //   body.prepend(ul[i]);
//   //   li[i] =  document.createElement('li');
//   //   li[i].dataset.dept_id=0;
//   //   li[i].setAttribute('data-dept_id', i);
//   //  // console.log(li[i].dataset.dept_id);
//   //   ul[i].append(li[i]);
//   //   p[i] = document.createElement('p');
//   //   li[i].append(p[i]);
//   //   div[i] = document.createElement('div');
//   //   div[i].innerText = " ";
//   //   p[i].append(div[i]);
//   //   //console.log(arr[i].innerDiv);
//   //   span[i] =document.createElement('span');
//   //   p[i].append(span[i]);               
//   //   span[i].innerText = arr[i].name;
//   // }
//   // } else {

//   //    innerDeveloperDeTree (arr,i++);}



//     //  if(arr[i].id == '0'||arr[i].id == '3'){
//     //    ul[i] = document.createElement('ul');
//     //    body.prepend(ul[i]);
//     //    li[i] =  document.createElement('li');
//     //    li[i].dataset.dept_id=0;
//     //    li[i].setAttribute('data-dept_id', i);
//     //   // console.log(li[i].dataset.dept_id);
//     //    ul[i].append(li[i]);
//     //    p[i] = document.createElement('p');
//     //    li[i].append(p[i]);
//     //    div[i] = document.createElement('div');
//     //    div[i].innerText = " ";
//     //    p[i].append(div[i]);
//     //    //console.log(arr[i].innerDiv);
//     //    span[i] =document.createElement('span');
//     //    p[i].append(span[i]);               
//     //    span[i].innerText = arr[i].name;
//     //  }
//     //  else{
//     //    innerDeveloperDeTree (arr,i-1);
//     //    ul[i] = document.createElement('ul');
//     //    li[i-1].append(ul[i]);
//     //    li[i] =  document.createElement('li');
//     //    li[i].setAttribute('data-dept_id', i);
//     //   // console.log(li[i].dataset.dept_id);
//     //    ul[i].append(li[i]);
//     //    p[i] = document.createElement('p');
//     //    li[i].append(p[i]);
//     //    div[i] = document.createElement('div');
//     //    div[i].innerText = "";
//     //    p[i].append(div[i]);
//     //    //console.log(arr[i].innerDiv);
//     //    span[i] =document.createElement('span');
//     //    p[i].append(span[i]);                  
//     //    span[i].innerText = arr[i].name;
//     //     }
//     //     //console.log(arr[i].innerDiv);
//     //  }
//     //  innerDeveloperDeTree(arr,2);
//     //}









// console.log(devLead.dept_units);


// let qaTester = {
//   name: 'Testers',
//   id: 5,
//   dept_units: [],
// };
// let qaLead = {
//   name: 'Lead QA',
//   id: 4,
//   dept_units: [qaTester],
// };
// let qaDeptHead = {
//   name: 'Quality Assurance Management',
//   id: 3,
//   dept_units: [qaLead],
// };

// let developerDep =[devDeptHead,devLead,developer];
// let qADep=[qaDeptHead, qaLead, qaTester]
// let ul=[];
// const li=[];
// const span=[];
// const div=[];
// const p=[];



//      function innerDeveloperDeTree (arr,i){
//        console.log(arr[i]);
//        let k=arr[i]
//        console.log(k);
//        console.log(k.dept_units)
//         if(!k['dept_units']){
//           ul[i] = document.createElement('ul');
//           body.prepend(ul[i]);
//           li[i] =  document.createElement('li');
//           li[i].dataset.dept_id=0;
//           li[i].setAttribute('data-dept_id', i);
//          // console.log(li[i].dataset.dept_id);
//           ul[i].append(li[i]);
//           p[i] = document.createElement('p');
//           li[i].append(p[i]);
//           div[i] = document.createElement('div');
//           div[i].innerText = " ";
//           p[i].append(div[i]);
//           //console.log(arr[i].innerDiv);
//           span[i] =document.createElement('span');
//           p[i].append(span[i]);               
//           span[i].innerText = arr[i].name;
//           return;
//         }
//         else{
//           innerDeveloperDeTree (arr,i-1);
//           ul[i] = document.createElement('ul');
//           li[i-1].append(ul[i]);
//           li[i] =  document.createElement('li');
//           li[i].setAttribute('data-dept_id', i);
//          // console.log(li[i].dataset.dept_id);
//           ul[i].append(li[i]);
//           p[i] = document.createElement('p');
//           li[i].append(p[i]);
//           div[i] = document.createElement('div');
//           div[i].innerText = "";
//           p[i].append(div[i]);
//           //console.log(arr[i].innerDiv);
//           span[i] =document.createElement('span');
//           p[i].append(span[i]);                  
//           span[i].innerText = arr[i].name;
//            }
//            //console.log(arr[i].innerDiv);
//         }
       
 
//      innerDeveloperDeTree(qADep,2);


//   // developerDeTree(qADep);
//   // developerDeTree(developerDep);
//  console.log(ul);


// ul=document.getElementsByTagName('ul');
// console.log(ul);

// ul[0].id="First1";
// ul[3].id="Second";


// for(i=1; i<i+1; i++){
//   console.log(ul[i]);
//   ul[i].classList.add('hidden');
  
// }
// for(i=4; i<i+1; i++){
//   ul[i].classList.add('hidden');
//   console.log(ul[i]);
// }



// //let pointer = document.getElementById('First');
// let pointer1 = document.getElementById('First1');
// let pointer2 = document.getElementById('Second');
// let table = document.getElementById('table')
// let tr=[];

// //function TableShow(){
// for(let i=0;i<employeers.length;i++){
//   tr[i] = document.createElement('tr');
//   table.append(tr[i]);
//   tr[i].classList.toggle('hidden');
//   tr[i].id=employeers[i].dept_unit_id;
//   for(key in employeers[i]){
//     if (key!='dept_unit_id'){//Проверки на совпадение с шапкой нет!!!
//       let td = document.createElement('td');
//       let a=employeers[i];
//       td.innerText = a[key];
//       tr[i].append(td);
//     }
//   }
// }
// //}
//  pointer1.addEventListener('click',(event)=>{
//   let goal =event.target;
//   if (goal.tagName=="DIV"){
//   goal.classList.toggle('rotate');
//   let b = goal.closest('li');
//   let c= b.childNodes[1];
//   c.classList.toggle('hidden');
//   }
//   if (goal.tagName=="SPAN"){
//       for(i=0; i<p.length; i++){
//       let j =p[i];
//      // console.log(j);
//       if(j.classList.contains('bold')){
//         j.classList.remove('bold');
//       }
//     }
//     let b = goal.closest('li');
//     for(let i=0;i<employeers.length;i++){
//       let a=employeers[i];
//       console.log(b.dataset.dept_id);
//      if (b.dataset.dept_id==a.dept_unit_id){
//       b.firstChild.classList.add('bold');
//        for(i=0; i< tr.length; i++){
//          if(b.dataset.dept_id==tr[i].id){
//          // tr[i].classList.remove('hidden');
//          } else tr[i].classList.add('hidden');
//        }
//      }
//     }

//   }
// }
//  )




