
import { Sorted , Unsorted , Alpha , Beta } from '../Colors.js'


export default function * ( size , bar_value ){
    
    let index = 0;
    
    while ( index < size ){
        
        if(bar_value[index] >= bar_value[index - 1] || index == 0){

            yield [ Alpha , index ]
            yield [ Sorted , index ]

            index++;

        } else {

            [ bar_value[index] , bar_value[index - 1] ] = [ bar_value[index - 1] , bar_value[index] ];

            yield [ Beta , index ]
            yield [ Unsorted , index + 1 ]

            index--;
        }
    }
}
