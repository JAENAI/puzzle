/*
NOM : RUGENGANDE IHIMBAZWE
Prénom :Jaenai

NOM : FAYEZ
Prénom : Karim Shady Monir

*/
const tuiles = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

function alea(min, max){ // [0;15[
  return Math.floor((Math.random()*(max-min))+min)
}
function shuffle() {
  for (var i = 15; i >= 0; i--) {
    const newIndex = alea(0,i);
    const oldValue = tuiles[newIndex];
    tuiles[newIndex] = tuiles[i];
    tuiles[i] = oldValue;
  }
  for (var i = 15; i >= 0; i--) {
    $(".tuile").eq(i).css({"background-image": "url(img/0" + tuiles[i] + ".jpg)"}).html(tuiles[i]).attr("id", tuiles[i]);
    $(".tuile").eq(i).click({index:i},check_and_swap);
  }
  $("#output").text(" ");
}


function check_and_swap(event) {
  event.preventDefault();
  const i = event.data.index;
  console.log(tuiles);

  if(tuiles[i-1]==15 && (Math.floor(i/4) == Math.floor((i-1)/4))){
    const oldValue = tuiles[i];
    tuiles[i] = tuiles[i-1];
    tuiles[i-1] = oldValue;
  }else if(tuiles[i+1]==15 && (Math.floor(i/4) == Math.floor((i+1)/4))){
    const oldValue = tuiles[i];
    tuiles[i] = tuiles[i+1];
    tuiles[i+1] = oldValue;
  }else if(tuiles[i+4]==15 && i+4 >=0 && i+4 < 16){
    const oldValue = tuiles[i];
    tuiles[i] = tuiles[i+4];
    tuiles[i+4] = oldValue;
  }else if(tuiles[i-4]==15 && i-4 >=0 && i-4 < 16){
    const oldValue = tuiles[i];
    tuiles[i] = tuiles[i-4];
    tuiles[i-4] = oldValue;
  }

  for (var j = 16; j >= 0; j--) {
    $(".tuile").eq(j).css({"background-image": "url(img/0" + tuiles[j] + ".jpg)"}).html(tuiles[j]).attr("id", tuiles[j]);
  }

  if(puzzle_solved()){
    $("#output").text("Puzzle résolu");
    for (var j = 0; j < 16; j++) {
      $(".tuile").eq(j).off('click');
    }
  }
}

function puzzle_solved() {
  let ans = false;
  for(let i=0;i<16;i++){
    if(tuiles[i] == i){
      ans = true;
    }
    else{
      ans = false;
      i=15;
    }
  }
  return ans;
}

$(document).ready(function(){
  for (var i = 0; i < 16; i++) {
    let tuile = $("<div></div>").attr("class", "tuile").attr("id", i).css({"background-image": "url(img/0" + i + ".jpg)"}).html(i);
    tuile.click({index:i},check_and_swap);
    $("#puzzlearea").append(tuile);
  }
  
});
$("#shuffle").click(shuffle);


