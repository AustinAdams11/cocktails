import "./App.css";
import {useState} from "react";





function DrinkList({ drinks, removeDrinkClickEvent }) {
  // console.log("Drink Array", drinks); 
  return (
    <ul>
      {drinks.map((drink) => (
        <DrinkListItem key={drink} drink={drink} removeDrinkClickEvent={removeDrinkClickEvent}/>
      ))}
    </ul> 
  );
}

function ResultList({ drinks, addDrinkClickEvent }) {
  // console.log("Drink Array", drinks); 
  return (
    <ul>
      {drinks.map((drink) => (
        <ResultListItem key={drink} drink={drink} addDrinkClickEvent={addDrinkClickEvent}/>
      ))}
    </ul> 
  );
}

function DrinkListItem({ drink, removeDrinkClickEvent }) {
  // console.log("Drink item in DrinkListItem: ", drink)
  return <li>{drink}<button onClick = {() => removeDrinkClickEvent(drink)}> DEL </button> </li>
}

function ResultListItem({ drink, addDrinkClickEvent }) {
  // console.log("Drink item in DrinkListItem: ", drink)
  return <li>{drink}<button onClick = {() => addDrinkClickEvent(drink)}> ADD </button> </li>
}

function App() {
  const [drinkArray, setDrinkArray] = useState(["Whiskey Sour", "Old Fashioned", "Vodka Martini", "Manhattan"])
  const [favoriteDrinks, setFavoriteDrinks] = useState(["Moscow Mule"])
  const [searchResults, setSearchResults] = useState([])


  let addNewDrink = () => {
    setFavoriteDrinks([...favoriteDrinks, drinkArray.pop()])
  }

  let removeLastDrink = () => {
    setFavoriteDrinks([...favoriteDrinks.slice(0, -1)]) //returns []
  }

  let removeDrink = (drink) => {
    setDrinkArray(drinkArray.filter((d)=>drink != d)) //updates state
  }

  let removeDrinkfromFavorites = (drink) => {
    setFavoriteDrinks(favoriteDrinks.filter((d)=>drink != d)) //updates state
  }

  // let addSearchedDrinkToFavoriteDrinks = (drink) => {
  //  setFavoriteDrinks = data.favoriteDrinks.map()
  //    setFavoriteDrinks = data.drinks.map(drink => drink.strDrink);
  // }


  let addSearchedDrinkToFavoriteDrinks = (drink) => {
    //get a copy of favoriteDrinks 
    const newFavoriteDrinksArray = [...favoriteDrinks]
    //add drink the the copy of favirite drinks array 
    newFavoriteDrinksArray.push(drink)
    //use setFavoriteDrinks the update the array 
    setFavoriteDrinks(newFavoriteDrinksArray)
  }

  async function SearchForDrink() {
    const userInput = document.getElementById('drinkInput').value.toLowerCase().trim()
    //API CALL 
    if (!userInput) return;
    // display.innerHTML = "Let me look in the back...";
    try {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`);
        if (!res.ok) throw new Error("Drink not Found"); //If no response, go to the catch block

        const data = await res.json(); //{drinks:[{},{},{}]}

        // const searchResultsArray = data.drinks.map(drink => drink.strDrink); 
        // for(var i = 0; i < data.drinks.length; i++){
        //   searchResultsArray.push(data.drinks[i].strDrink)
        // }
        const searchResultsArray = data.drinks.map(drink => drink.strDrink);
        setSearchResults(searchResultsArray); 
          // console.log("Search Results after search is added", searchResults)
    } catch (error) {
      console.error("Error fetching drink:", error);
    }
  }
  
  return (
    <>
      <div>
        <h1>Drink List</h1>
        <DrinkList id="DrinkList" drinks={drinkArray} removeDrinkClickEvent = {removeDrink} />
      </div>
       <div>
        <h1>Favorite Drinks</h1>
        <DrinkList drinks={favoriteDrinks} removeDrinkClickEvent = {removeDrinkfromFavorites}/>
        {/* <button onClick={addNewDrink}>ADD</button> */}
        {/* <button onClick={removeLastDrink}>DELETE LAST DRINK</button> */}
        
        <input type="text" id="drinkInput" placeholder="Enter your drink"></input>
        <button onClick = {() => SearchForDrink()}>Search</button>

        <h1>Search Results</h1>
        <ResultList id="searchResults" drinks={searchResults} addDrinkClickEvent = {addSearchedDrinkToFavoriteDrinks} />
        
      </div>
    </>
  );
}


export default App;


//www.thecocktaildb.com/api/json/v1/1/random.php
//https://react.dev/learn/updating-arrays-in-state

// async function fetchItem(itemName) {
//   const input = itemName || document.getElementById('itemInput').value.toLowerCase().trim();  //if the item name is passed in it runs, otherwhise it looks in the searchbox for user input
//   const display = document.getElementById('itemDisplay');
//     if (!input) return;
