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
