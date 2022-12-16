import { Item } from "@/@types/item";
import { ItemTree } from "@/@types/item_tree";
import store from "@/store";

export function getItemTree(item: Item): ItemTree {
    return {
        item,
        components: item.from.map(id => store.getters.getItemById(id)).map(getItemTree)
    };
}

export function getRenderArray(itemTree: ItemTree): (Item|null)[][] {
    if(itemTree.components.length === 0) {
        return [[itemTree.item]];
    }

    const renderArray = itemTree.components.map(getRenderArray);
    const maxDepth = Math.max(...renderArray.map(arr => arr.length));
    const result = new Array(maxDepth).fill(null).map(() => new Array(renderArray.length).fill(null));

    for(let i = 0; i < renderArray.length; i++) {
        for(let j = 0; j < renderArray[i].length; j++) {
            result[j][i] = renderArray[i][j][0];
        }
    }

    return [[itemTree.item], ...result];
}