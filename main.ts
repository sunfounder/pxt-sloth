// Types of tropical fruit
enum TropicalFruit {
    //% block=banana
    Banana = 0,
    //% block=pineapple
    Pineapple = 1,
    //% block=coconut
    Coconut = 2
}
// Pick some fruit and peel it.
//% weight=70 icon="\uf1db" color=#EC7505
namespace tropic {
    /**
     *  Pick a fruit
     */
    //% blockId=tropic_pick block="pick a %fruit"
    export function pick(fruit:TropicalFruit): boolean {
        return true;
    }
    /**
     * Peel the fruit if possible
     */
    //% blockId=tropic_peel block="peel a %fruit"
    export function peel(fruit: TropicalFruit): boolean {
        return (fruit == TropicalFruit.Banana);
    }
}