class ConfirmLink extends HTMLAnchorElement {
    constructor() {
        super();
    };
    connectedCallback(){
        this.addEventListener('click', event => {
            if(!confirm('Vas a abandonar el site')) {
                event.preventDefault();
            }
            
        })
    }
}
customElements.define('dc-confirm-link', ConfirmLink, {extends: 'a'});