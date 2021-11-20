var arr = new Array();

//add new data
function addData(){

    arr.push({
        name: document.getElementById("Name").value,
        subject: document.getElementById("Subject").value
    });

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

    //verification array
    if( str != null){
        arr =JSON.parse(str);
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
        var cel1 = NewRow.insertCell();
        var cel2 = NewRow.insertCell();

        //add data to cell
        cel1.innerHTML= arr[i].name;
        cel2.innerHTML= arr[i].subject;

    }
}


//new array for random rst
var newArr = new Array();

//random funtion
function random(){
    var newstr = localStorage.getItem('rstData');
    var str = localStorage.getItem('localData');
    arr =JSON.parse(str);

    if(arr.length == 0){
        console.log('No More Random Numbers');
        // var message = document.getElementById('message');
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
    // localStorage.removeItem(randomIndex);
    var newStorage= JSON.stringify(arr.filter((elem,i)=>i !== randomIndex))

    var str = localStorage.setItem('localData',newStorage);

    showData()
    //push resultat to new array
    newArr.push({
        name: randomNumber.name,
        subject: randomNumber.subject
    });

    localStorage.setItem("rstData", JSON.stringify(newArr));

    resultat();


}

function resultat(){
    var newstr = localStorage.getItem('rstData');
    if( newstr != null){
        newArr =JSON.parse(newstr);
    }

    var tbl =  document.getElementById('rst');
    var x = tbl.rows.length;

    while(--x){
        tbl.deleteRow(x);
    }

    for(var i=0 ; i < newArr.length ; i++){

        var NewRow = tbl.insertRow();
        var cel1 = NewRow.insertCell();
        var cel2 = NewRow.insertCell();
        var cel2 = NewRow.insertCell();
        // var cel3 = NewRow.insertCell();
        
        cel1.innerHTML= newArr[i].name;
        cel2.innerHTML= newArr[i].subject;
        // cel3.innerHTML = "<input type='date' id='date' class='deleteBtn'/>"

    }
}