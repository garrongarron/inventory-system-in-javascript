import grid from './Grid.js'
import imageFactory from './ImageFactory.js'
import tooltip from './Tooltip.js'
class InventorySystem
{
    show(){

        grid.show()
        let img = imageFactory.getOneImage(imageFactory.list().gold)
        tooltip.setDescription(img, imageFactory.list().gold.description)
        grid.get(8).appendChild(img);
    }
    hide(){
        grid.hide()
    }
}
let inventorySystem = new InventorySystem()

export default inventorySystem