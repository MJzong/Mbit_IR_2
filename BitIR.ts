

//% weight=10 color=#008B00 icon="\uf1eb" block="Mbit_IR_V2"
namespace BitIR {
    


    let irstate:number;
    let state:number;
    
    export enum enIRButton {
    Power = 0xD,
    Up = 0x18,
    Light = 0x16,
    Left = 0x8,
    Beep = 0x1C,
    Right = 0x5A,
    SpinLeft = 0x15,
    Down = 0x52,
    SpinRight = 0x9,
    Add = 0x0c,
    Zero = 0x19,
    Minus = 0x0e,
    One = 0x45,
    Two = 0x46,
    Three = 0x47,
    Four = 0x44,
    Five = 0x40,
    Six = 0x43,
    Seven = 0x7,
    Eight = 0x1,
    Nine = 0x11,
    }



     /**
     * Read IR sensor value V2.
     */

    //% advanced=true shim=Bit_IR::irCode
    function irCode(): number {
        return 0;
    }

    //% weight=5
    //% blockId=IR_KeyValue block="IR_KeyValue|value %value"
    export function IR_KeyValue(value: enIRButton): number {
        return value;
    }

    
    //% weight=5
    //% blockId=IR_readV2 block="read IR key value"
    export function IR_readV2(): number {
        return valuotokeyConversion();
    }

    //% weight=2
    //% blockId=IR_callbackUserV2 block="on IR received"
    //% draggableParameters
    export function IR_callbackUserV2(cb: (message: number) => void) {
        state = 1;
        control.onEvent(11, 22, function() {
            cb(irstate);
        }) 
    }

    function valuotokeyConversion():number{
        let irdata:number;
        switch(irCode()){
            case 0xff00:irdata = 0;break;
            case 0xfe01:irdata = 1;break;
            case 0xfd02:irdata = 2;break;
            case 0xfb04:irdata = 4;break;
            case 0xfa05:irdata = 5;break;
            case 0xf906:irdata = 6;break;
            case 0xf708:irdata = 8;break;
            case 0xf609:irdata = 9;break;
            case 0xf50a:irdata = 10;break;
            case 0xf30c:irdata = 12;break;
            case 0xf20d:irdata = 13;break;
            case 0xf10e:irdata = 14;break;
            case 0xef10:irdata = 16;break;
            case 0xee11:irdata = 17;break;
            case 0xed12:irdata = 18;break;
            case 0xeb14:irdata = 20;break;
            case 0xea15:irdata = 21;break;
            case 0xe916:irdata = 22;break;
            case 0xe718:irdata = 24;break;
            case 0xe619:irdata = 25;break;
            case 0xe51a:irdata = 26;break;
            default:
             irdata = -1;
        }
        return irdata;
    }

    basic.forever(() => {
        if(state == 1){
            irstate = valuotokeyConversion();
            if(irstate != -1){
                control.raiseEvent(11, 22);
            }
        }
        
        basic.pause(20);
    })

}
