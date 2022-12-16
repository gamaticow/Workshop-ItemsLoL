export interface Item {
  id: number;
  name: string;
  description: string;
  active: boolean;
  inStore: boolean;
  from: Array<number>;
  to: Array<number>;
  categories: Array<string>;
  maxStack: number;
  requiredChampion: string;
  requiredAlly: string;
  requiredBuffCurrencyName: string;
  requiredBuffCurrencyCost: number;
  specialRecipe: number;
  isEnchantment: boolean;
  price: number;
  priceTotal: number;
  iconPath: string;
}