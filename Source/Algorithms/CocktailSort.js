
import { Sorted , Unsorted , Alpha , Beta } from '../Colors.js'


export default function * ( size , bar_value ){
    
    let 
        swapped = true ,
        lsize = size ,
        index = 0 ;
    
    while ( swapped ){
        
        swapped = false;
        
        for ( let i = index ; i < lsize - 1 ; ++i ){
            
            yield [ Alpha , i ]
            yield [ Beta , i + 1 ]
            
            if(bar_value[i] > bar_value[i + 1]){
                
                [ bar_value[i] , bar_value[i + 1] ] = [ bar_value[i + 1] , bar_value[i] ];
                
                yield [ Beta , i ]
                yield [ Alpha , i + 1 ]
                
                swapped = true;
            }
            
            yield [ Unsorted , i ]
            yield [ Unsorted , i + 1 ]
        }
        
        swapped = false;
        lsize--;
        
        for ( let i = lsize - 1 ; i >= index ; i--){
            
            yield [ Alpha , i ]
            yield [ Beta , i + 1 ]

            if(bar_value[i] > bar_value[i + 1]){
                
                [ bar_value[i] , bar_value[i + 1] ] = [ bar_value[i + 1] , bar_value[i] ];
                
                yield [ Beta , i ]
                yield [ Alpha , i + 1 ]

                swapped = true;
            }

            yield [ Unsorted , i ]
            yield [ Unsorted , i + 1 ]
        }

        yield [ Sorted , index ]
        
        index++
        
        yield [ Sorted , lsize ]
    }

    for( let i = 0 ; i < size ; i++ )
        yield [ Sorted , i ]
}
