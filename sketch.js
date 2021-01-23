var lastFed

function preload()
{

  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png")
}

function setup() {
	createCanvas(800, 700);
  database= firebase.database()
  foodObj=new Food()
  foodStock= database.ref('food')
  foodStock.on("value",readStock);
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog)
  dog.scale=0.15;
  feed= createButton("feed the dog ")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("addFood");
  addFood.position(800,95)
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87)
foodObj.display();
fedTime= database.ref('fedTime')
fedTime.on("value", function(data){
  lastFed=data.val
})
fill (255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Fed :" + lastFed%12+"pm",350,30)
}
else if(lastFed==0){
  text("Last Fed : 12 am " ,350,30)
}
else{
  text("last Fed: "+ lastFed+ "am",350,30);
}
  drawSprites();

}

function readStock(data){
  foodS= data.val()
  foodObj.updateFoodStock(foodS)

}

function feedDog(){
dog.addImage(happyDog)
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  food:foodObj.getFoodStock(),
  fedTime: hour ()
})


}
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
