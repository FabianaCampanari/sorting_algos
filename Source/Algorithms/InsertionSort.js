
import { Sorted , Alpha , Beta } from '../Colors.js'


export default function * ( size , bar_value ){
    
    for ( let i = 0 ; i < size ; i++ ){
        
        let temp = bar_value[i];
        
        yield [ Beta , i ]
        
        let j = i - 1;

        for ( j = i - 1 ; j >= 0 && bar_value[j] > temp ; j-- ){
            
            bar_value[j + 1] = bar_value[j];
            
            yield [ Alpha , j ]
            yield [ Beta , j + 1 ]
            yield [ Sorted , j + 1 ]
            yield [ Sorted , j ]
        }
        
        bar_value[j + 1] = temp;
        
        yield [ Beta , i ]
        yield [ Sorted , i ]
        yield [ Beta , j + 1 ]
        yield [ Sorted , j + 1 ]
    }
}
