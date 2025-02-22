export interface ProductInfoType {
  sold: number;
  images: string[];
  subcategory: SubcategoryType[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: CategoryType;
  brand: CategoryType;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubcategoryType {
  _id: string;
  name: string;
  slug: string;
  category: string;
}