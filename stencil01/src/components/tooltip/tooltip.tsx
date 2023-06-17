import { Component, h, Method, Prop } from "@stencil/core";
@Component(
    {
        shadow:true,
        styleUrl: './tooltip.css',
        tag: 'dc-tooltip'
    }
)
export class Tooltip {
    @Prop( {mutable: true,
            reflect: true} ) 
    openned:boolean = false;
    @Method()
    async open():Promise<boolean>{
        return (this.openned = true);
    };
    @Method()
    async close():Promise<boolean>{
        return (this.openned = false);
    };
    render() {
        return [
            <slot/>,
            <span class="tooltip-arrow" onMouseOver={this.open.bind(this)} onMouseLeave={this.close.bind(this)}>
                ?
            </span>,
            <div class="tooltip-content">
                <slot name="tooltip-content"/>
            </div>
    
        ];
    }
}