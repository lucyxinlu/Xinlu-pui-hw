
const basePrice=2.49; 
const glazingPriceOriginal=0;
const glazingPriceSugar=0;
const glazingPriceVanilla=0.5;
const glazingPriceDouble=1.5;
let glazingInput="keep original";
let sizeInput=1;

function glazingChange(){
    glazingInput=document.querySelector('#glazingOptions').value;
    update();
    // return glazingInput;
}
function sizeChange(){
    sizeInput=document.querySelector('#sizeOptions').value;
    update();
    // return sizeInput;
}

function discount(){
    if(sizeInput>=6){
        packPrice=sizeInput-(sizeInput/6);}
        else{packPrice=sizeInput;};
    return packPrice;
}


function priceCaculation(){
    packPrice=discount();
    if (glazingInput==="keep original"){
        finalPrice=(basePrice+glazingPriceOriginal) * packPrice;
    }else if (glazingInput=="sugar milk"){
         finalPrice=(basePrice+glazingPriceSugar) * packPrice;
    }else if(glazingInput=="vanilla milk"){
         finalPrice=(basePrice+glazingPriceVanilla) * packPrice;
    }else if(glazingInput=="double chocolate"){ 
          finalPrice=(basePrice+glazingPriceDouble) * packPrice;
    
    }  

    // const glazingList = ["keep original","sugar milk","vanilla milk","double chocolate"];
    // const glazingPrice = [0, 1, 1, 2]
    // for (i=0;i++;i<4){
    //     if (glazingInput == glazingList[i]){
    //         finalPrice = glazingPrice[i];
    //         break;
    //     }
    // }
    return (Math.floor(finalPrice*100)/100);
  
}
function update(){
    let checkoutPrice=priceCaculation();
    const finalResult=document.querySelector('#finalPrice');
    finalResult.innerText ="$"+ " "+checkoutPrice;
    return finalResult;
}



