export interface Review {
  id: number;
  author: string;
  rating: number;      
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  reviews: Review[];
}