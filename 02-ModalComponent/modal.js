class Modal extends HTMLElement {
    static _inputs ={
        'data-body': (oldValue, newValue)=> {console.log('cambio',oldValue, newValue)},
        'data-header': ()=>{}
    };


    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        
        this._style=`
            <style>
                .modal-backdrop.modal-backdrop--open{
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-Index: 1000;
                    height: 100vh;
                    background-color: rgba(0,0,0,0.75)
                }
                .modal-window {
                    position:absolute;
                    position: absolute;
                    top: 30%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80%;
                    height: 40vh;
                    background-color: red;
                    z-Index: 1010;
                    border-radius: 1rem


                }
            </style>
        `;
        this._htmlComponent=`
            <div class='modal-backdrop'></div>
            <div class='modal-window'></div>
        `;
        this._sDOM = this.shadowRoot;
        this._sDOM.innerHTML = this._style + this._htmlComponent;

    }

    static get observedAttributes () {
        return Object.keys(Modal._inputs);
    }
    //CALLBACKS
    connectedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue){
        Modal._inputs[name]?.call(this,[oldValue, newValue]);
    }
    disconnectedCallback(){

    }

}
customElements.define('dc-modal', Modal);