import { NamesDBCollection } from 'constant';

export interface IProduct {
  productName: string;
  availabilityProduct: number;
  productPrice: number;
  productImage: string;
  categoryId?: string;
  id?: string;
}

export interface IProductCategory {
  id?: string;
  nameCategory: string;
}

export interface IRemoveShopData {
  id: string;
  nameDBCollection: NamesDBCollection;
}

export interface IUpdateShopData {
  id: string;
  values: IProductCategory | IProduct;
  nameDBCollection: NamesDBCollection;
}
