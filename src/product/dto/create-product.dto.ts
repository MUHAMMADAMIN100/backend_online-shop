export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  colors?: any;
  sizes?: any;
  stock?: number;
}
