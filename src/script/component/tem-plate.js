class TemPlate extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.id = $(this).attr("id")||"template";
        this.class = $(this).attr("class")||"";
        $(this).attr("class",this.class);
        this.render();
    }
    disconnectedCallback(){
        
    }
    adoptedCallback(){

    }
    attributeChangedCallback(name,oldValue,newValue){

    }
    static get observedAttributes(){
        return ['src','id','name','class'];
    }
    
    render(){
        $(this).html(`
        `);
    }
}
customElements.define('tem-plate',TemPlate);