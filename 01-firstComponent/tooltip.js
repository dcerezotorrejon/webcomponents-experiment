class Tooltip extends HTMLElement {
/**
 * NOTAS:  La clase modal-backdrop--open añadida junto con la de backdrop 
 *  añade la capa oscura
 * 
 */

    constructor() {
        super();
        // Crea un árbol dom propio
        this.attachShadow({mode: 'open'});
        this._tooltipText = 'Texto de prueba';
        this._iconTooltip = null;
        this._tooltipContainer = null;
        this._sDOM = this.shadowRoot;
        this._style = `
        <style>
            div {
                background-color: black;
                color: white;
                position: absolute;
                z-index=:100;
                padding:0.5rem;
                border-radius:10px;
            }
            :host {
                position:relative;
            }
            span {
                background-color: yellow;
                border-radius: 50%;
                padding: 0.5rem;
            }
            

        </style>
        ` 
    };

    static get observedAttributes () {
        return ['data-text'];
    }

    _createTooltipIcon(){
        const template = document.querySelector('#icon-tooltip-template');
        if (template && this._defaultTemplate != 'true') {
            this._sDOM.appendChild(template.content.cloneNode(true));
        } else {
            this._sDOM.innerHTML = `
                <span data-tooltip-icon>(i) </span>
                <slot></slot>`
        }
        this._iconTooltip = this._sDOM.querySelector('[data-tooltip-icon]');
        this._iconTooltip.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._iconTooltip.addEventListener('mouseleave', this._destroyTooltip.bind(this));
         
    }

    _showTooltip(){
         this._tooltipContainer = document.createElement('div')
         this._tooltipContainer.textContent=this._tooltipText;
         this._sDOM.appendChild(this._tooltipContainer);
        
        
    }
    _destroyTooltip() {
        this._tooltipContainer?.remove();
    }

    connectedCallback() {
        // Initialize variables DOM Dependant
        this._tooltipText = this.getAttribute('data-text') ?? this._tooltipText;
        this._defaultTemplate = this.getAttribute('data-default-template')||false ;    
        // Initialize interface components
        this._createTooltipIcon();
        this._sDOM.appendChild(new DOMParser().parseFromString(this._style, 'text/html').head.firstChild);
    }

    disconnectedCallback(){
        console.log("Disconected callback");
        this._iconTooltip.removeEventListener('mouseenter', this._showTooltip);
        this._iconTooltip.removeEventListener('mouseleave', this._destroyTooltip);
    }
    attributeChangedCallback(name, oldValue, newValue){
        if (name === 'data-text') {
            this._tooltipText = newValue;
            
        }
    }
    
}
customElements.define('dc-tooltip', Tooltip);