type cards = {
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

  type TypeProducts ={
    data:cards[]
  }

 

  export default TypeProducts