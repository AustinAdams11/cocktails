import "./App.css";
import {useState} from "react";

function DrinkList({ drinks }) {
  return (
    <ul>
      {drinks.map((drink) => (
        <DrinkListItem key={drink} drink={drink} />
      ))}
    </ul>
  );
}

function DrinkListItem({ drink }) {
  return <li>{drink}<button onClick = {removeDrink(drink)} > DEL </button> </li>; //My Drink |button| 
}
let removeDrink = (drink) => {
  drinkArray = drinkArray.filter((d)=>drink != d)
}
function App() {
  const drinkArray = ["Whiskey Sour", "Old Fashioned", "Vodka Martini", "Manhattan"];
  // const favoriteArray = ["Moscow Mule"]
  const [favoriteDrinks, setFavoriteDrinks] = useState(["Moscow Mule"])
  //["Moscow Mule", "Manhattan"]
  // const newDrink = "Old Fashioned"
  
  // console.log(drinkArray)
  // console.log(drinkArray.pop())

  let  addNewDrink = () => {
    setFavoriteDrinks([...favoriteDrinks, drinkArray.pop()])
    console.log(drinkArray)
  }

  let  removeLastDrink = () => {
    setFavoriteDrinks([...favoriteDrinks.slice(0, -1)]) //returns []
  }
  
  return (
    <>
      <div>
        <h1>Drink List</h1>
        <DrinkList drinks={drinkArray} />
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
