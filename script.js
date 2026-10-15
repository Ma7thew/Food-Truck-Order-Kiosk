/* ============================================================
   FOOD TRUCK ORDER KIOSK   |   Spice level: MILD
   ============================================================
   The design is done. Your job is the brain.

   PLACES ON THE PAGE YOUR CODE CAN REACH (by id):
     truck-name      the big heading
     tagline         the line under the heading
     menu            the box that holds the menu cards
     customer-name   the name on the receipt
     receipt-lines   the list of items on the receipt
     order-total     the total on the receipt
     student-name    your name in the footer

   HTML FOR ONE MENU CARD (build this as a string for each item):
     <article class="menu-card">
       <div class="menu-emoji">🌮</div>
       <h3>Item name</h3>
       <p class="menu-category">Category</p>
       <p class="menu-price">\$0.00</p>
     </article>
   Use class="menu-card special" to highlight a daily special.

   HTML FOR ONE RECEIPT LINE:
     <li><span>Item name</span><span>\$0.00</span></li>

   TIP: someNumber.toFixed(2) turns 6.5 into "6.50"
   ============================================================ */


// ==========================================
// STEP 1: Define the Base Menu Items
// ==========================================
// Stores regular menu items in an array of object literals.
const menu = [
  {name: 'Spicy Beef Bulgogi', price: 10.15, category: 'main', emoji: '🍱'},
  {name: 'Garlic Bacon & Cheese', price: 10.35, category: 'main', emoji: '🍣'},
  {name: 'Spam Egg Bite Sandwich', price: 10.35, category: 'main', emoji: '🥪'},
  {name: 'French Fries', price: 2.50, category: 'side', emoji: '🍟'},
  {name: 'Tater Tots (8oz)', price: 3.00, category: 'side', emoji: '🍠'},
  {name: 'Chicken Wings', price: 3.50, category: 'side', emoji: '🍗'},
  {name: 'Mango Smoothie', price: 3.50, category: 'drink', emoji: '🥭'},
  {name: 'Taro Bubble Tea', price: 3.50, category: 'drink', emoji: '🧋'},
  {name: 'Coffee Caramel', price: 4.50, category: 'drink', emoji: '☕'},
];


// ==========================================
// STEP 2: Define Daily Specials
// ==========================================
// Stores dynamic daily special items in a separate array.
const specialMenu = [
  {name: 'Avocado Bacon', price: 8.50, category: 'special', emoji: '🍙'},
  {name: 'Brown Sugar w/ Pearls', price: 5.00, category: 'special', emoji: '🥤'},
  {name: 'Chicken Garlic Poutine', price: 6.00, category: 'special', emoji: '🥘'},
];


// ==========================================
// STEP 3: Combine Menus Together
// ==========================================
// Uses the spread operator (...) to merge both menus into one list.
const combinedMenu = [...menu, ...specialMenu];


// ==========================================
// STEP 4: Render Menu Cards onto the Page
// ==========================================
// Targets the HTML grid wrapper and clears out pre-existing placeholder elements.
const menuContainer = document.getElementById('menu');
menuContainer.innerHTML = '';

let i = 0;

// Loops through the array to create individual HTML cards for every menu option.
while (i < combinedMenu.length) {
  const item = combinedMenu[i];


//Question mark is short version of if else statement 
  menuContainer.innerHTML += `
  <article class="menu-card ${item.category === 'main' ? '' : item.category}">
    <div class="menu-emoji"> ${item.emoji} </div>
    <h3>${item.name} </h3>
    <p class="menu-category">${item.category === 'special' ? 'Daily Special' : item.category + 's'}</p>
    <p class="menu-price">$${item.price.toFixed(2)}</p>
  </article>
  `;
  i++;
}


// ==========================================
// STEP 5: Initialize Order State & Details
// ==========================================
// Prompts user for their name and prints it onto the receipt layout immediately.
let givenName = window.prompt('What is the name for the order?') || "Guest";
document.getElementById('customer-name').innerHTML = givenName;

// Sets up structural properties to tracks chosen items and total bill state.
const shoppingCart = []; 
const siteFooterName = document.getElementById('student-name').innerHTML = 'Matthew'
const order = { name: givenName, total: 0 };


// ==========================================
// STEP 6: Interactive Checkout Prompt Sequence
// ==========================================
// Puts a slight delay on the modal triggers so the background page finishes drawing first.
setTimeout(() => {
  let choice;

  // Asks the user repeatedly a series of questions until they type "done" to finalize things.
  do {
    choice = window.prompt(
      `Hi ${givenName}! What would you like to do? \n\n ` +
      `1. Type an item name to ADD it \n` +
      `2. Type "REMOVE" followed by the name to drop it \n` +
      `3. Type "DONE" to check out.`
    );
    if (!choice) break;

    const input = choice.trim().toLowerCase();

    // MATCH CONDITION 1: Handles removing items out of the cart
    if (input.startsWith('remove ')) {
      const item = input.replace('remove ', '');
      const index = shoppingCart.findIndex(m => m.name.toLowerCase() === item);
      
      if (index !== -1) {
        order.total -= shoppingCart[index].price;
        alert(`${shoppingCart[index].name} removed! Total: $${order.total.toFixed(2)}`);
        shoppingCart.splice(index, 1);
      } else {
        alert("Item not in cart.");
      }

    // MATCH CONDITION 2: Handles adding matching items into the cart array
    } else if (input !== 'done') {
      const item = combinedMenu.find(m => m.name.toLowerCase() === input);
      
      if (item) {
        shoppingCart.push(item);
        order.total += item.price;
        alert(`${item.name} added! Current Total: $${order.total.toFixed(2)}`);
      } else {
        alert("Item not found. Please try again.");
      }
    }

  } while (choice.toLowerCase().trim() !== 'done');

  // Calculates the total price and loads it.
  const totalBox = document.getElementById('order-total') || document.getElementById('cart-total');
  if (totalBox) totalBox.innerHTML = `$${order.total.toFixed(2)}`;
  
  alert(`Thank you, ${order.name}! Final total: $${order.total.toFixed(2)}.`);


  // ==========================================
  // STEP 7: Generate Finalized Itemized Receipt
  // ==========================================
  // 7a. Clones the checkout collection array safely using spread elements.
  const finalReceiptCart = [...shoppingCart];
  const receiptContainer = document.getElementById('receipt-lines');

  if (receiptContainer) {
    // 7b. Wipes away previous strings like "- - -" and "\$____"
    receiptContainer.innerHTML = '';

    // 7c. Uses a while loop to create an individual receipt line for each item chosen
    let j = 0;
    while (j < finalReceiptCart.length) {
      const recipeItem = finalReceiptCart[j];

      receiptContainer.innerHTML += `
        <li>
          <span class="shopping-cart">${recipeItem.name}</span>
          <span>$${recipeItem.price.toFixed(2)}</span>
        </li>
      `;
      j++;
    }
  }

  // 7d. Shows the complete calculated transaction total at the bottom of the receipt.
  const finalTotalBox = document.getElementById('order-total');
  if (finalTotalBox) {
    finalTotalBox.innerHTML = `$${order.total.toFixed(2)}`;
  }

  // 50 miliseconds to let the options load
}, 50);


