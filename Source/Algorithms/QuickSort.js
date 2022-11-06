
import { Sorted , Unsorted , Alpha , Beta } from '../Colors.js'


export default function * sort ( size , bar_value , start , end ){
    
    if(start > end){
        yield [ Sorted , start ]
        return
    }
    
    if(start == end){
        yield [ Sorted , start ]
        return
    }
    
    let pivot = bar_value[start] ,
        tail = end + 1 ,
        head = start ;
    
    while ( head < tail ){
        
        do {

            yield [ Alpha , head ]
            yield [ Unsorted , head ]

            head++;

        } while (bar_value[head] <= pivot);
        
        do {

            tail--;

            yield [ Beta , tail ]
            yield [ Unsorted , tail ]

        } while (bar_value[tail] > pivot);
        
        if(head < tail)
            [ bar_value[head] , bar_value[tail] ] = [ bar_value[tail] , bar_value[head] ];
    }
    
    [ bar_value[start] , bar_value[tail] ] = [ bar_value[tail] , bar_value[start] ];
    
    yield [ Sorted , tail ]
    
    yield * sort(size,bar_value,start,tail - 1);
    yield * sort(size,bar_value,tail + 1, end);
}
