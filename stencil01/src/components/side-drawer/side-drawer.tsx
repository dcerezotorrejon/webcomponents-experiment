import { Component, h, Method, Prop, State } from "@stencil/core";

@Component(
    {
        shadow:true,
        styleUrl: './side-drawer.css',
        tag: 'dc-side-drawer'
    }
)
export class SideDrawer {
    @Prop({
        attribute : 'title',
        reflect: true,
    }) 
    headerTitle: string = 'HOLA';
   @Prop({ 
        reflect: true,
        mutable: true,
    }) 
    openned: boolean = false;
    
    _mainContent = {
        contact: ()=> (
            <div>
                <h2>Como contactar con nosotros:</h2>
                <h3>¿Cómo?</h3>
                <p>Por internet</p>
                <p>SAMANTE!</p>
            </div>
        ),
        default: () => (<slot/>), 
    }
    @State() _selectedContentKey: string = 'default';
    _onContentChange(key :string){
        this._selectedContentKey = key ?? 'default';
    }
    _getMainContent (){
        const contentFunction = this._mainContent[this._selectedContentKey] ?? this._mainContent.default
        return contentFunction();
    }

    //Method to open the side drawer
    @Method()
    async open (){
        return (this.openned = true);
    }
    //Method to close the side drawer
    @Method()
    async close (){
        return (this.openned = false);
    }
    render() {
        const content = this._getMainContent() ?? ''
       return [
            <div class="backdrop" onClick={this.close.bind(this)}></div>,
            <aside>
                <header>
                    <h1>{ this.headerTitle }</h1>
                    <button data-close-btn onClick={this.close.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button onClick={this._onContentChange.bind(this,'default')}>Navigation</button>
                    <button onClick={this._onContentChange.bind(this,'contact')}>Contact</button>
                </section>
                <main>
                    {content}
                </main>
            </aside>
       ];
    }
}