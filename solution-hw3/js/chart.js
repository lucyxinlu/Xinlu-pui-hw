
const basePrice=2.49; 
let glazingPrice={
    original:0,
    sugar:0,
    vanilla:0.5,
    double:1.5,
};
let Input={
    // these are the initial input in the dropdown fields.
    glazingInput:"keep original",
    sizeInput:1,
};

function glazingChange(){
    Input.glazingInput=document.querySelector('#glazingOptions').value;
    update();
   
}
function sizeChange(){
    Input.sizeInput=document.querySelector('#sizeOptions').value;
    update();
    
}
// Above two functions are to get the user input in the page

function discount(){
    if(Input.sizeInput>=6){
        packPrice=Input.sizeInput-(Input.sizeInput/6);
    }
    else {
        packPrice=Input.sizeInput;
    }
    return packPrice;
}
// discount function is to caculate the final packsize based on the table


function priceCaculation(){
    let packPrice=discount();
    if (Input.glazingInput==="keep original"){
        finalPrice=(basePrice+glazingPrice.original) * packPrice;
    }else if (Input.glazingInput=="sugar milk"){
         finalPrice=(basePrice+glazingPrice.sugar) * packPrice;
    }else if(Input.glazingInput=="vanilla milk"){
         finalPrice=(basePrice+glazingPrice.vanilla) * packPrice;
    }else if(Input.glazingInput=="double chocolate"){ 
          finalPrice=(basePrice+glazingPrice.double) * packPrice;
    
    }  
    // The above way is more intuitive for me, and I thought about
    // using the loops but I don't know how to apply objects in this way.
    // const glazingList = ["keep original","sugar milk","vanilla milk","double chocolate"];
    // const glazingPrice = [0, 0, 0.5, 1.5];
    // for (i=0;i++;i<4){
    //     if (glazingInput == glazingList[i]){
    //         singlePrice = basePrice+glazingPrice[i];
    //         break;
    //     }
    // };
    // finalPrice=singlePrice*packPrice;
    return (Math.floor(finalPrice*100)/100);
  
}
function update(){
    let checkoutPrice=priceCaculation();
    const finalResult=document.querySelector('#finalPrice');
    finalResult.innerText ="$"+ " "+checkoutPrice;
    return finalResult;
}
// update the final price value in the html



