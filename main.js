var arr = new Array();

function addData(){
    arr.push({
        name: document.getElementById("Name").value,
        subject: document.getElementById("Subject").value
    });

    localStorage.setItem("localData", JSON.stringify(arr));
    showData();
}

function deleteData(){
    localStorage.clear();
    showData();
}

function showData(){

    var str = localStorage.getItem('localData');

    if( str != null){
        arr =JSON.parse(str);
    }

    var tbl =  document.getElementById('show');
    var x = tbl.rows.length;
    while(--x){
        tbl.deleteRow(x);
    }

    for(var i=0 ; i < arr.length ; i++){

        var NewRow = tbl.insertRow();
        var cel1 = NewRow.insertCell();
        var cel2 = NewRow.insertCell();
        var cel3 = NewRow.insertCell();
        var input = document.createElement("input");
        input.type = "text";
        var inputdate = cel3.input;
        cel1.innerHTML= arr[i].name;
        cel2.innerHTML= arr[i].subject;
        input.innerHTML= arr[i].subject;

    }
}


var newArr = new Array();
function random(){
    var str = localStorage.getItem('localData');
    arr =JSON.parse(str);

    if(arr.length == 0){
        console.log('No More Random Numbers');
        return;
    }
    
    //step1 = max - min + 1;
    var step1 = arr.length ;  // -1 - 0 + 1
    var step2 = Math.random() * step1;
    var result = Math.floor(step2) + 0;
    
    //tirage
    var randomIndex = result;
    var randomNumber = arr[randomIndex];
    var supp= arr.splice(randomIndex,1);
    // console.log(supp)
    // console.log(randomNumber.name);

    newArr.push({
        name: randomNumber.name,
        subject: randomNumber.subject
    });

    localStorage.setItem("rstData", JSON.stringify(newArr));


    
    console.log(newArr);
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

        cel1.innerHTML= newArr[i].name;
        cel2.innerHTML= newArr[i].subject;

    }
}