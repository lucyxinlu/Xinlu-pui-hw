

// const shoppingCart=new Set();
const shoppingCart = [];
let cart=[];
// establish the Class roll
class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice,rollImage) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
        this.image=rollImage;
        
    }

    updatePrice(caculatedPrice){
        this.price=caculatedPrice;
    }
    
};
// initializing the glazing price for each type of glazing choice
let glazingPrice={
    original:0,
    sugar:0,
    vanilla:0.5,
    double:1.5,
};

// caculate the final price of each cinnamon roll
function priceCaculation(Roll){
    if(Roll.glazing=="keep original"){
        finalPrice=(Roll.basePrice+glazingPrice.original)*
        (Roll.size-parseInt(Roll.size/6));
        let caculatedPrice=(Math.floor(finalPrice*100)/100);
        return caculatedPrice;
    }else if(Roll.glazing=="sugar milk"){
            finalPrice=(Roll.basePrice+glazingPrice.sugar)*
            (Roll.size-parseInt(Roll.size/6));
            let caculatedPrice=(Math.floor(finalPrice*100)/100);
            return caculatedPrice;
    }else if(Roll.glazing=="vanilla milk"){
        finalPrice=(Roll.basePrice+glazingPrice.vanilla)*
        (Roll.size-parseInt(Roll.size/6));
        let caculatedPrice=(Math.floor(finalPrice*100)/100);
        return caculatedPrice;
    }else if(Roll.glazing=="double chocolate"){
        finalPrice=(Roll.basePrice+glazingPrice.double)*
        (Roll.size-parseInt(Roll.size/6));
        let caculatedPrice=(Math.floor(finalPrice*100)/100);
        return caculatedPrice;
    }
}; 
function addNewRoll(rollType, rollGlazing, packSize, rollPrice,rollImage){
    const roll=new Roll(rollType, rollGlazing, packSize, rollPrice,rollImage);
    let caculatedPriceRoll=priceCaculation(roll);
    roll.updatePrice(caculatedPriceRoll);
    shoppingCart.push(roll);
    return roll;
}
// initilizing the four objects 
// const firstRoll=addNewRoll(
//     "Original",
//     "sugar milk",
//     1, 
//     2.49,
//     "assets/Original-cinnamon-roll.jpeg");
// let caculatedPriceFirst=priceCaculation(firstRoll);
// firstRoll.updatePrice(caculatedPriceFirst);

// const secondRoll=addNewRoll(
//     "Walnut",
//     "vanilla milk",
//     12, 
//     3.49,
//     "assets/Walnut-cinnamon-roll.jpeg");
// let caculatedPriceSecond=priceCaculation(secondRoll);
// secondRoll.updatePrice(caculatedPriceSecond);

// const thirdRoll=addNewRoll(
//     "Raisin",
//     "sugar milk",
//     3,
//     2.99,
//     "assets/Raisin-cinnamon-roll.jpeg");
// let caculatedPriceThird=priceCaculation(thirdRoll);
// thirdRoll.updatePrice(caculatedPriceThird);

// const fourthRoll=addNewRoll(
//     "Apple",
//     "keep original",
//     3,
//     3.49,
//     "assets/Apple-cinnamon-roll.jpeg");
// let caculatedPriceFourth=priceCaculation(fourthRoll);
// fourthRoll.updatePrice(caculatedPriceFourth);
// add to the set, the code follows my intuition but may be a little bit repetitive
// I see the example code in lab---
//  function addNewNote(imageURL, title, body) {
//     const notecard = new Notecard(imageURL, title, body);
//     notecardSet.add(notecard);
//     return notecard;
// }
// But I don't know how to get different rolls' different values of properties to 
// caculate the final price
// shoppingCart.add(firstRoll);
// shoppingCart.add(secondRoll);
// shoppingCart.add(thirdRoll);
// shoppingCart.add(fourthRoll);

for(const roll of shoppingCart){
    createElement(roll);
}
// use the template to create the four objects in js
function createElement(roll){
    const template=document.querySelector('#cart-template');
    const clone=template.content.cloneNode(true);
    roll.element=clone.querySelector('.cart-product');
    const rollListElement=document.querySelector('.cart-roll-list');
    const btnRemove=roll.element.querySelector('.remove');
    btnRemove.addEventListener('click',()=>{
        deleteRoll(roll);
        updateTotalPrice(roll);
        updateLocalStorage();

    })
    rollListElement.append(roll.element);
    updateElement(roll);
    updateTotalPrice(roll);
}
// display the related information of the four objects created above
function updateElement(roll){
    const rollImage=roll.element.querySelector('.cart-roll-pic');
    const rollType=roll.element.querySelector('.cart-roll-type');
    const rollGlazing=roll.element.querySelector('.cart-roll-glazing');
    const rollSize=roll.element.querySelector('.cart-roll-size');
    const rollPrice=roll.element.querySelector('.cart-roll-price');

    rollImage.src=roll.image;
    rollType.innerText=roll.type +" "+ "Cinnamon Roll";
    rollGlazing.innerText="Glazing:"+ roll.glazing;
    rollSize.innerText="Pack Size:"+roll.size;
    rollPrice.innerText="$"+" "+roll.price;
}
// update the checkout price 
function updateTotalPrice(roll){
    let checkPrice=0;
    for (roll of shoppingCart){
        checkPrice=Math.floor((checkPrice+roll.price)*100)/100;
    }
    const totalPrice=document.querySelector('#total-price');
    totalPrice.innerText="$"+" "+checkPrice;
}


function retrieveFromLocalStorage(){
    const cartString=localStorage.getItem('addedRolls');
    let   cartArray=JSON.parse(cartString);
    console.log(cartArray);
    for (const rollData of cartArray){
        const roll=addNewRoll(rollData.type,rollData.glazing,
            rollData.size,rollData.basePrice,rollData.image);
        console.log(roll)
        createElement(roll);
    }
    return cartArray;
}

if (localStorage.getItem('addedRolls')!= null) {
    cartArray=retrieveFromLocalStorage();
}else{
    cartArray=[];
}

function deleteRoll(roll){
    roll.element.remove();
    let index = shoppingCart.indexOf(roll);
    shoppingCart.splice(index, 1);
    if (index>-1){
        cartArray.splice(index,1);
    }
    console.log(cartArray);
    return cartArray;
}
function updateLocalStorage(){
    const cartArrayString=JSON.stringify(cartArray);
    localStorage.setItem('updatedRolls',cartArrayString);
    console.log(cartArrayString);

}

