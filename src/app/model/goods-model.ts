// To parse this data:
//
//   import { Convert } from "./file";
//
//   const goods = Convert.toGoods(json);

export interface Goods {
  gid:   number;
  name:  string;
  price: number;
  url:   string;
  type:  string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toGoods(json: string): Goods[] {
      return JSON.parse(json);
  }

  public static goodsToJson(value: Goods[]): string {
      return JSON.stringify(value);
  }
}
