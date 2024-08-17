// To parse this data:
//
//   import { Convert } from "./file";
//
//   const iOrderOID = Convert.toIOrderOID(json);

export interface IOrderOID {
  gid:    number;
  url:    string;
  goods_name:   string;
  price:  number;
  amount: number;
  total:  number;
  no:     number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toIOrderOID(json: string): IOrderOID[] {
      return JSON.parse(json);
  }

  public static iOrderOIDToJson(value: IOrderOID[]): string {
      return JSON.stringify(value);
  }
}

