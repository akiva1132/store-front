type TypeProductsSort = {
    _id: string;
    id: number;
    title: string;
    price: number;
    description: string;
    images: [string, string, string];
    creationAt: string;
    updatedAt: string;
    category: {
      id: number;
      name: string;
      image: string;
      creationAt: string;
      updatedAt: string;
    };
    Stock: number;
    Views: number;
  }
  export default TypeProductsSort