export interface FlavorOption {
  name: string;
  image?: string;
  emoji?: string;
  category: 'prophy' | 'varnish';
}

export interface CategoryData {
  name: string;
  flavors: FlavorOption[];
}

export interface MenuData {
  officeName: string;
  menuTitle: string;
  logo?: File;
  categories: CategoryData[];
  fontSize: {
    officeName: number;
    title: number;
    categoryTitle: number;
    flavorName: number;
  };
  colors: {
    prophyBanner: string;
    varnishBanner: string;
  };
  confetti: {
    enabled: boolean;
    density: number;
    size: number;
    shape: 'stars' | 'dots' | 'hearts';
    colors: string[];
  };
  font: string;
  flavorImageSize: number;
  flavorSpacing: number; // Gap between flavors in pixels
  bannerStyle?: 'classic' | 'angled' | 'round' | 'underline';
}

export const WONDERFUL_FLAVORS: FlavorOption[] = [
  // Prophy Paste Flavors
  { name: 'Marshmallow', image: 'marshmallow.png', category: 'prophy' },
  { name: 'Strawberry', image: 'strawberry.png', category: 'prophy' },
  { name: 'Mint', image: 'mint.png', category: 'prophy' },
  { name: 'Chocolate', image: 'chocolate.png', category: 'prophy' },
  { name: 'Bubblegum', image: 'bubblegum.png', category: 'prophy' },
  { name: 'Plain', image: 'plain.png', category: 'prophy' },
  { name: 'Cinnamon', image: 'cinnamon.png', category: 'prophy' },

  // Fluoride Varnish Flavors
  { name: 'Chocolate', image: 'chocolate.png', category: 'varnish' },
  { name: 'Bubblegum', image: 'bubblegum.png', category: 'varnish' },
  { name: 'Strawberry', image: 'strawberry.png', category: 'varnish' },
  { name: 'Marshmallow', image: 'marshmallow.png', category: 'varnish' },
  { name: "S'mores", image: 'smores.png', category: 'varnish' },
  { name: 'Mint', image: 'mint.png', category: 'varnish' },
  { name: 'Blue Razz', image: 'bluerazz.png', category: 'varnish' }
];

// Additional emoji flavors as backup options
export const EMOJI_FLAVORS: FlavorOption[] = [
  // Prophy Paste Flavors
  { name: 'Apple', emoji: '🍎', category: 'prophy' },
  { name: 'Apricot', emoji: '🍑', category: 'prophy' },
  { name: 'Banana', emoji: '🍌', category: 'prophy' },
  { name: 'Berry Mix', emoji: '🫐', category: 'prophy' },
  { name: 'Birthday Cake', emoji: '🎂', category: 'prophy' },
  { name: 'Blackberry', emoji: '🫐', category: 'prophy' },
  { name: 'Blueberry', emoji: '🫐', category: 'prophy' },
  { name: 'Bubblegum', emoji: '🫧', category: 'prophy' },
  { name: 'Candy', emoji: '🍬', category: 'prophy' },
  { name: 'Caramel', emoji: '🍯', category: 'prophy' },
  { name: 'Cherry', emoji: '🍒', category: 'prophy' },
  { name: 'Chocolate', emoji: '🍫', category: 'prophy' },
  { name: 'Cinnamon Roll', emoji: '🥮', category: 'prophy' },
  { name: 'Coconut', emoji: '🥥', category: 'prophy' },
  { name: 'Coffee', emoji: '☕', category: 'prophy' },
  { name: 'Cookie', emoji: '🍪', category: 'prophy' },
  { name: 'Cotton Candy', emoji: '🍭', category: 'prophy' },
  { name: 'Cupcake', emoji: '🧁', category: 'prophy' },
  { name: 'Grape', emoji: '🍇', category: 'prophy' },
  { name: 'Green Apple', emoji: '🍏', category: 'prophy' },
  { name: 'Honey', emoji: '🍯', category: 'prophy' },
  { name: 'Ice Cream', emoji: '🍦', category: 'prophy' },
  { name: 'Kiwi', emoji: '🥝', category: 'prophy' },
  { name: 'Lemon', emoji: '🍋', category: 'prophy' },
  { name: 'Lime', emoji: '🍋', category: 'prophy' },
  { name: 'Mango', emoji: '🥭', category: 'prophy' },
  { name: 'Maple', emoji: '🍁', category: 'prophy' },
  { name: 'Orange', emoji: '🍊', category: 'prophy' },
  { name: 'Peach', emoji: '🍑', category: 'prophy' },
  { name: 'Pear', emoji: '🍐', category: 'prophy' },
  { name: 'Pineapple', emoji: '🍍', category: 'prophy' },
  { name: 'Plum', emoji: '🫐', category: 'prophy' },
  { name: 'Raspberry', emoji: '🫐', category: 'prophy' },
  { name: 'Strawberry', emoji: '🍓', category: 'prophy' },
  { name: 'Tangerine', emoji: '🍊', category: 'prophy' },
  { name: 'Vanilla', emoji: '🍦', category: 'prophy' },
  { name: 'Watermelon', emoji: '🍉', category: 'prophy' },

  // Fluoride Varnish Flavors
  { name: 'Apple', emoji: '🍎', category: 'varnish' },
  { name: 'Apricot', emoji: '🍑', category: 'varnish' },
  { name: 'Banana', emoji: '🍌', category: 'varnish' },
  { name: 'Berry Mix', emoji: '🫐', category: 'varnish' },
  { name: 'Birthday Cake', emoji: '🎂', category: 'varnish' },
  { name: 'Blackberry', emoji: '🫐', category: 'varnish' },
  { name: 'Blueberry', emoji: '🫐', category: 'varnish' },
  { name: 'Bubblegum', emoji: '🫧', category: 'varnish' },
  { name: 'Candy', emoji: '🍬', category: 'varnish' },
  { name: 'Caramel', emoji: '🍯', category: 'varnish' },
  { name: 'Cherry', emoji: '🍒', category: 'varnish' },
  { name: 'Chocolate', emoji: '🍫', category: 'varnish' },
  { name: 'Cinnamon Roll', emoji: '🥮', category: 'varnish' },
  { name: 'Coconut', emoji: '🥥', category: 'varnish' },
  { name: 'Coffee', emoji: '☕', category: 'varnish' },
  { name: 'Cookie', emoji: '🍪', category: 'varnish' },
  { name: 'Cotton Candy', emoji: '🍭', category: 'varnish' },
  { name: 'Cupcake', emoji: '🧁', category: 'varnish' },
  { name: 'Grape', emoji: '🍇', category: 'varnish' },
  { name: 'Green Apple', emoji: '🍏', category: 'varnish' },
  { name: 'Honey', emoji: '🍯', category: 'varnish' },
  { name: 'Ice Cream', emoji: '🍦', category: 'varnish' },
  { name: 'Kiwi', emoji: '🥝', category: 'varnish' },
  { name: 'Lemon', emoji: '🍋', category: 'varnish' },
  { name: 'Lime', emoji: '🍋', category: 'varnish' },
  { name: 'Mango', emoji: '🥭', category: 'varnish' },
  { name: 'Maple', emoji: '🍁', category: 'varnish' },
  { name: 'Orange', emoji: '🍊', category: 'varnish' },
  { name: 'Peach', emoji: '🍑', category: 'varnish' },
  { name: 'Pear', emoji: '🍐', category: 'varnish' },
  { name: 'Pineapple', emoji: '🍍', category: 'varnish' },
  { name: 'Plum', emoji: '🫐', category: 'varnish' },
  { name: 'Raspberry', emoji: '🫐', category: 'varnish' },
  { name: 'Strawberry', emoji: '🍓', category: 'varnish' },
  { name: 'Tangerine', emoji: '🍊', category: 'varnish' },
  { name: 'Vanilla', emoji: '🍦', category: 'varnish' },
  { name: 'Watermelon', emoji: '🍉', category: 'varnish' }
]; 