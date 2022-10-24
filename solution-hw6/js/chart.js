
//  update the image and baseprice once the page is redirected

    // to get the URL params first from the gallery page link
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');


    // Update the header text, image and the baseprice on detial page
const headerElement = document.querySelector('#type-title');
headerElement.innerText = rollType +' '+'Cinnamon Roll'
const rollImage = document.querySelector('.detail-picture');
rollImage.src = 'assets/' + rollType +'-cinnamon-roll'+ '.jpeg';
rollImage.alt=rolls[rollType]["alttext"];
// also get the alt text of the product
const basePrice=rolls[rollType].basePrice;
const initialPrice=document.querySelector('#finalPrice');
initialPrice.innerText='$'+' '+basePrice;


let cart=[];





let glazingPriceValue={
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
        packPriceFinal=Input.sizeInput-(Input.sizeInput/6);
    }
    else {
        packPriceFinal=Input.sizeInput;
    }
    return packPriceFinal;
}
// discount function is to caculate the final packsize based on the table


function priceCaculation(){
    let packPriceFinal=discount();
    if (Input.glazingInput==="keep original"){
        finalPrice=(basePrice+glazingPriceValue.original) * packPriceFinal;
    }else if (Input.glazingInput=="sugar milk"){
         finalPrice=(basePrice+glazingPriceValue.sugar) * packPriceFinal;
    }else if(Input.glazingInput=="vanilla milk"){
         finalPrice=(basePrice+glazingPriceValue.vanilla) * packPriceFinal;
    }else if(Input.glazingInput=="double chocolate"){ 
          finalPrice=(basePrice+glazingPriceValue.double) * packPriceFinal;
    
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


class Roll {
    type;
    glazing;
    size;
    basePrice;
    image;

    constructor(rollType, rollGlazing, packSize, rollPrice,rollImage) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
        this.image= rollImage;
        
    }
}
    // const btnAdd=document.querySelector('.btn-add');
    //     btnAdd.onclick=this.addInstance;

function updateRoll(){
    let glazing = document.querySelector('#glazingOptions').value;
    // console.log(glazing);
    let size = document.querySelector('#sizeOptions').value;
    
    // let shownImage=rollImage.src;
    // console.log(size);
    const element=new Roll(
        rollType,
        glazing,
        size,
        rolls[rollType]["basePrice"],
        rolls[rollType]["imageFile"]
    );
    cart.push(element);
    saveToLocalStorage();
    console.log(cart);
    // console.log(JSON.stringify(cart));
   
    
}
// store the added rolls into local storage
function saveToLocalStorage(){
    const cartString=JSON.stringify(cart);
    localStorage.setItem('addedRolls',cartString);
    console.log(cartString);
}
function retrieveFromLocalStorage(){
    const cartString=localStorage.getItem('addedRolls');
    return JSON.parse(cartString);

}
if (localStorage.getItem('addedRolls')!= null) {
    cart=retrieveFromLocalStorage();
}else{
    cart=[];
}




        





