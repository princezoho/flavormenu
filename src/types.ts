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
  { name: 'Watermelon', emoji: '🍉', category: 'prophy' }
]; 