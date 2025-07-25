import "./App.css";
import {useState} from "react";



function DrinkList({ drinks, removeDrinkClickEvent }) {
  return (
    <ul>
      {drinks.map((drink) => (
        <DrinkListItem key={drink} drink={drink} removeDrinkClickEvent={removeDrinkClickEvent}/>
        
      ))}
    </ul>
  );
}

function DrinkListItem({ drink, removeDrinkClickEvent }) {
  console.log("first", drink)
  return <li>{drink}<button onClick = {(drink) => {removeDrinkClickEvent(drink)}}  > DEL </button> </li>; //My Drink |button| 
}

function App() {
  const [drinkArray, setDrinkArray] = useState(["Whiskey Sour", "Old Fashioned", "Vodka Martini", "Manhattan"])
  const [favoriteDrinks, setFavoriteDrinks] = useState(["Moscow Mule"])
  // const favoriteArray = ["Moscow Mule"]
  //["Moscow Mule", "Manhattan"]
  // const newDrink = "Old Fashioned"
  
  // console.log(drinkArray)
  // console.log(drinkArray.pop())

  let addNewDrink = () => {
    setFavoriteDrinks([...favoriteDrinks, drinkArray.pop()])
    // console.log(drinkArray)
  }

  let removeLastDrink = () => {
    setFavoriteDrinks([...favoriteDrinks.slice(0, -1)]) //returns []
  }

  let removeDrink = (drink) => {
    setDrinkArray(drinkArray.filter((d)=>drink != d))
    console.log("second", drink)
}
  
  return (
    <>
      <div>
        <h1>Drink List</h1>
        <DrinkList id="DrinkList" drinks={drinkArray} removeDrinkClickEvent = {removeDrink} />
      </div>
       <div>
        <h1>Favorite Drinks</h1>
        <DrinkList drinks={favoriteDrinks} />
        <button onClick={addNewDrink}>ADD</button>
        <button onClick={removeLastDrink}>DELETE LAST DRINK</button>
      </div>
    </>
  );
}


export default App;


//www.thecocktaildb.com/api/json/v1/1/random.php
//https://react.dev/learn/updating-arrays-in-state
