# Assignment 03 — Dynamic Fashion Store / E-Commerce Page

## Aim
To build a dynamic, interactive fashion store (e-commerce) web page using HTML, CSS, and JavaScript, with Bootstrap CDN for layout. Features include a product grid, category filtering, add-to-cart functionality, and a sliding cart panel — all without any backend.

## Technologies Used
- HTML5
- CSS3 (custom styles in `style.css`)
- JavaScript (vanilla, in `script.js`)
- Bootstrap 5.3 (CDN)
- Font Awesome 6 (CDN)
- Google Fonts — Playfair Display, Inter

## Steps Performed
1. Defined a `products` array in JavaScript with 9 products across three categories: Men, Women, Accessories.
2. Implemented a `renderProducts(filter)` function that dynamically injects product cards into the DOM based on the selected category filter.
3. Added category filter buttons (All / Men / Women / Accessories) that trigger re-render on click.
4. Implemented `addToCart(id)` — finds product by ID, adds to cart array or increments quantity.
5. Implemented `removeFromCart(id)` — removes item from cart array and refreshes UI.
6. Built a sliding cart panel with cart item list, quantity display, running total (in ₹), and checkout button.
7. Showed a toast notification on every add-to-cart action.
8. Cart count badge on the navbar cart button updates in real time.

## Output Description
A full-page fashion store UI with:
- Dark navbar with brand name "StyleHub" and animated cart count badge
- Full-width gradient hero banner with CTA button
- Responsive product grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Emoji-based product illustrations with sale/new/hot badges
- Category filter buttons that animate the grid
- Slide-in cart panel from the right with item management
- Toast pop-up on add-to-cart

## Output Screenshots
> Add screenshots of this running locally here.

Open `source-code/index.html` directly in any browser — no server needed.
