
import { Sorted , Unsorted , Alpha } from '../Colors.js'


export default function * ( size , bar_value ){
    
    for ( let i = 0 ; i < size - 1 ; i++ ){
        
        let min = i;
        
        for ( let j = size - 1 ; j > i ; j-- ){

            yield [ Alpha , j ]

            if(bar_value[j] < bar_value[min])
                min = j;
            
            yield [ Unsorted , j ]
        }
        
        [ bar_value[i] , bar_value[min] ] = [ bar_value[min] , bar_value[i] ];
        
        yield [ Sorted , i ]
        
        if(min != i)
            yield [ Unsorted , min ]
    }

    yield [ Sorted , size - 1 ]
}
