import cache from './Cache.js'
import imageFactory from './ImageFactory.js'
import createSlotNumber from './FactoryNumber.js'
import tooltip from './Tooltip.js'

class Grid {
    constructor() {
        this.container = document.createElement('main')


        for (let index = 0; index < 9; index++) {
            let slot = document.createElement('div')
            
            let slotNumber = createSlotNumber()
            slotNumber.classList.add('hide')

            slot.appendChild(slotNumber)
            slot.classList.add('slot')
            slot.id = 'slot' + index
            slot.addEventListener('drop', (e) => {
                let originSlot = document.getElementById(e.dataTransfer.getData("imgParent"))
                //to delete
                if (slot.id == 'slot' + 0) {


                    originSlot.querySelector('.slot-number').classList.add('hide')
                    originSlot.querySelector('.slot-number').innerText = '0'
                    document.getElementById(e.dataTransfer.getData("img")).remove()
                    return
                }

                //is the origin and destiny are the same
                if (slot.id == e.dataTransfer.getData("imgParent")) {
                    return
                }


                //same creator
                if (slot.id == 'slot' + 8) {
                    return
                }

                //straight from creator-slot to rubbish bin
                if (e.dataTransfer.getData("imgParent") == 'slot' + 8 && slot.id == 'slot' + 0) {
                    return
                }

                //if slot is not empty
                if (slot.children.length == 2) {
                    let item = document.getElementById(e.dataTransfer.getData("img"))
                    if (!item.dataset.stackable) return

                    //if it is the same item
                    if (slot.querySelector('img').name == item.name) {
                        if (e.dataTransfer.getData("imgParent") != 'slot' + 8) {
                            item.remove()
                            originSlot.querySelector('.slot-number').classList.add('hide')
                            let origiQ = originSlot.querySelector('.slot-number').innerText * 1
                            let currentQ = slot.querySelector('.slot-number').innerText * 1
                            slot.querySelector('.slot-number').innerText = origiQ + currentQ
                            originSlot.querySelector('.slot-number').innerText = '0'
                            console.log(originSlot.querySelector('.slot-number'));
                        }
                        //@todo increment number
                        return
                    }
                }

                

                if (e.dataTransfer.getData("imgParent") == 'slot' + 8) {
                    slotNumber.classList.remove('hide')
                    slotNumber.innerText = slotNumber.innerText * 1 + 1
                    //creating new dragable
                    let gold = imageFactory.list().gold
                    let img = imageFactory.getOneImage(gold)
                    this.get(8).appendChild(img);
                    tooltip.setDescription(img, gold.description)
                } else {
                    let origiQ = originSlot.querySelector('.slot-number').innerText * 1
                    originSlot.querySelector('.slot-number').innerText  = '0'
                    originSlot.querySelector('.slot-number').classList.add('hide')
                    slot.querySelector('.slot-number').innerText = origiQ
                    slotNumber.classList.remove('hide')
                }


                //release dragable
                console.log(e.dataTransfer.getData("img"));
                slot.appendChild(document.getElementById(e.dataTransfer.getData("img")))

            })
            slot.addEventListener("dragover", function (event) {
                event.preventDefault();
            });
            this.container.appendChild(slot)
        }
        this.container.children[0].classList.add('rubish-bin')
        this.container.children[this.container.children.length - 1].classList.add('fountain-of-resources')

    }
    get(index) {
        return this.container.children[index]
    }
    show() {
        document.body.appendChild(this.container)
    }
    hide() {
        cache.appendChild(this.container)
    }
}

let grid = new Grid()

export default grid