export function getCardFromNumber(n) {
  let flower, number, value;
  switch(Math.floor((n-1)/13))
  {
    case 0:
      flower = "h";
      break;
    case 1:
      flower = "s";
      break;
    case 2:
      flower = "d";
      break;
    case 3:
      flower = "c";
      break;
    default:
      flower = ""
      break;
  }
  number = ((n-1) % 13) + 1;
  if(number === 1)
  {
    value = "a"
  }
  else if(number === 11)
  {
    value = "j"
  }
  else if(number === 12)
  {
    value = "q"
  }
  else if(number === 13)
  {
    value = "k"
  }
  else 
  {
    value = number;
  }
  return {flower: flower, number: value}
}

export function swapTwoElement(numberArray, firstIndex, secondIndex) {
  let c = numberArray[firstIndex];
  numberArray[firstIndex] = numberArray[secondIndex];
  numberArray[secondIndex] = c;
}

export default function initCardArray(){
  var cardData = new Array(16);
  let cardDataInit = [];
  let n, firstId, secondId;
  let holderNo;

  for(n=0; n<52; n++) {
    cardDataInit[n] = n+1;
  }
  // Randomize card array
  for(n=0; n<52; n++)
  {
    firstId = Math.floor(Math.random() * 52);
    secondId = Math.floor(Math.random() * 52);
    swapTwoElement(cardDataInit, firstId, secondId);
  }
  firstId = 0;
  for(holderNo=0; holderNo<15; holderNo++)
  {
    const holder_card_data = new Array(3);
    for(n=0; n<3; n++)
    {
      holder_card_data[n] = getCardFromNumber(cardDataInit[firstId++]);
    }
    cardData[holderNo] = holder_card_data;
  }
  
  // keep residue cards into final holder
  const spare_card_holder_data = new Array(7);
  n = 0;
  while(firstId < 52)
  {
    spare_card_holder_data[n++] = getCardFromNumber(cardDataInit[firstId++]);
  }
  cardData[15] = spare_card_holder_data;
  return cardData;
}