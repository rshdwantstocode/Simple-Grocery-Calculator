import { useState } from 'react'
import Items from './interface/Items.jsx';
import Calculations from './interface/Calculations.jsx';
import { groceryItems as initialGroceryItems } from '../dummyData.js';

function App() {

  const [cart, setCart] = useState([]);
  const [groceryItems, setGroceryItems] = useState(initialGroceryItems);

  const addToCart = (item) => {
    console.log(item);

    const currentItem = groceryItems.find((groceryItem) => groceryItem.id === item.id);
    // console.log(currentItem)
    if (!currentItem || currentItem.stock <= 0) {
      alert("Item is out of stock!");
      return;
    }

    // Decrease stock by 1

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Update quantity if item already exists in cart

        const totalInCart = existingItem.quantity + 1;
        if (totalInCart > currentItem.stock) {
          alert("Item is out of stock!");
          return prevCart;
        }

        return prevCart.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: (cartItem.quantity || 0) + 1
            }
          }
          return cartItem;
        })
      } else {
        // Add new item with quantity 1
        // console.log(cartItem)
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    setGroceryItems((prevItems) =>
      prevItems.map((groceryItem) =>
        groceryItem.id === item.id ? { ...groceryItem, stock: groceryItem.stock - 1 } : groceryItem
      )
    );

  };

  const removeFromCart = (itemId) => {

    const removedItem = cart.find((cartItem) => cartItem.id === itemId);

    if (removedItem) {
      setGroceryItems((prevItems) =>
        prevItems.map((groceryItem) =>
          groceryItem.id === itemId ? { ...groceryItem, stock: groceryItem.stock + removedItem.quantity } : groceryItem
        )
      );
    }

    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {

    const cartItem = cart.find(item => item.id === itemId);
    const stockItem = groceryItems.find(item => item.id === itemId);
    const quantityDiff = newQuantity - (cartItem ? cartItem.quantity : 0);

    if (!cartItem || !stockItem) return;

    if (quantityDiff > 0 && stockItem.stock < quantityDiff) {
      alert("Item is out of stock!");
      return;
    }


    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }; // Prevent quantity less than 1

    setGroceryItems((prevItems) =>
      prevItems.map((groceryItem) =>
        groceryItem.id === itemId ? { ...groceryItem, stock: groceryItem.stock - quantityDiff } : groceryItem
      )
    );

    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id === itemId) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
    });
  }

  const totalAmount = (cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0));
  const formattedTotal = totalAmount.toFixed(2);

  const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

  const clearCart = () => {

    // const itemsToRestore = [...cart];


    // //deubg this shit pag checkouot
    // // Restock items back to groceryItems
    // itemsToRestore.forEach((cartItem) => {
    //   setGroceryItems((prevItems) => {
    //     prevItems.map((groceryItem) => {
    //       groceryItem.id === cartItem.id
    //         ? { ...groceryItem, stock: groceryItem.stock + cartItem.quantity }
    //         : groceryItem;
    //     })
    //   });
    // });

    setCart([]);
  };

  return (
    <>
      <div className='bg-[#574964] w-full'>
        <h1 className='h-10 text-center text-white p-2 font-bold'>Grocery Calculator</h1>
        <div className='flex h-173.75'>
          <Items
            groceryItems={groceryItems}
            addToCart={addToCart}
          />
          <Calculations
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            totalAmount={formattedTotal}
            totalQuantity={totalQuantity}
            clearCart={clearCart}
          />
        </div>

      </div>
    </>
  )
}

export default App
