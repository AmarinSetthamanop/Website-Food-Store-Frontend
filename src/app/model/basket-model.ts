// To parse this data:
//
//   import { Convert } from "./file";
//
//   const basket = Convert.toBasket(json);

export interface Basket {
  gid:    number;
  url:    string;
  name:   string;
  price:  number;
  amount: number;
  total:  number;
  no:     number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toBasket(json: string): Basket[] {
      return JSON.parse(json);
  }

  public static basketToJson(value: Basket[]): string {
      return JSON.stringify(value);
  }
}
