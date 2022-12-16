import { Item } from "./item";

export interface ItemTree {
    item: Item;
    components: Array<ItemTree>;
}