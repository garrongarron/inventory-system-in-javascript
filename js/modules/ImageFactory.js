class ImageFactory{
    constructor(){
        this.urlList = {
            gold: {
                url:'img/gold.png',
                description:'Gold',
                isStackable:true,
                name:'gold',
            }
        }
        this.n = 0
    }
    list(){
        return this.urlList
    }
    getOneImage(data){
        let img = document.createElement('img')
        img.setAttribute('src', data.url)
        img.setAttribute('draggable',true)
        img.setAttribute('data-stackable',true)
        img.setAttribute('name', data.name)
        img.id = 'item'+this.n
        this.n++ 
        img.addEventListener('dragstart', (e)=>{
            e.dataTransfer.setData("img", e.target.id);
            e.dataTransfer.setData("imgParent", e.target.parentNode.id);            
        })
        return img
    }
}

let imageFactory = new ImageFactory()

export default imageFactory
