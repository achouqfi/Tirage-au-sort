//create array to save data
var arr = new Array();

//add new data
function addData(){
    
    //push data to array
    arr.push({
        name: document.getElementById("Name").value,
        subject: document.getElementById("Subject").value,
    });

    //save data in localstorage
    localStorage.setItem("localData", JSON.stringify(arr));
    showData();
}

//delete data from local storage
function deleteData(){
    localStorage.clear();
    showData();
}

//show data
function showData(){

    var str = localStorage.getItem('localData');
    var studentList = document.getElementById('table');

    //verification array
    if( str != null){
        arr =JSON.parse(str);
        if( arr.length !== 0){
            studentList.style.display="block";
        }else{
            studentList.style.display="none";
        }
    }

    var tbl =  document.getElementById('show');
    var x = tbl.rows.length;

    //delete duplicated rows
    while(--x){
        tbl.deleteRow(x);
    }

    // boucle for show data 
    for(var i=0 ; i < arr.length ; i++){
        var NewRow = tbl.insertRow();
        var cel = NewRow.insertCell();
        cel.innerHTML= arr[i].name;
    }
}


//new array for random rst
var newArr = new Array();

//random funtion
function random(){
    var str = localStorage.getItem('localData');
    arr =JSON.parse(str);

    if(arr.length == 0){
        console.log('No More Random Numbers');
        message.innerHTML = "Ajouter un apprenant";
        return;
    }

    //step1 = max - min + 1;
    var step1 = arr.length ;  // -1 - 0 + 1
    var step2 = Math.random() * step1;
    var result = Math.floor(step2) + 0;
    
    //tirage
    var randomIndex = result;
    var randomNumber = arr[randomIndex];
    var newStorage= JSON.stringify(arr.filter((elem,i)=>i !== randomIndex))
    var str = localStorage.setItem('localData',newStorage);

    showData();

    //push resultat to new array
    newArr.push({
        name: randomNumber.name,
        subject: randomNumber.subject,
        date: document.getElementById('startDate').value
    });

    localStorage.setItem("rstData", JSON.stringify(newArr));

    resultat();
}

//random result function 
function resultat(){
    var newstr = localStorage.getItem('rstData');
    var resultatList = document.getElementById('resultat-table');

    if( newstr != null){
        newArr =JSON.parse(newstr);
        if( newArr.length !== 0){
            resultatList.style.display="block";
        }
    }

    var resultat =  document.getElementById('rst');
    var x = resultat.rows.length;

    while(--x){
        resultat.deleteRow(x);
    }
    
    let date = new Date();
    // console.log(date);
    for(var i=0 ; i < newArr.length ; i++){
        if(date.getDay()+1 ===  6) date.setDate(date.getDate() + 3);
        else date.setDate(date.getDate() + 1);
        // console.log();
        var NewRow = resultat.insertRow();
        var cel1 = NewRow.insertCell();
        cel1.innerHTML= `Mr ${newArr[i].name} le ${date.toLocaleDateString()} , votre sujet est ${newArr[i].subject}`;
    }
}

function Export(type, fn, dl) {
    var elt = document.getElementById('rst');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
}
