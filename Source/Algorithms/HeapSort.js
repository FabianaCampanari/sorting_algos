
import { Sorted , Unsorted , Alpha , Beta } from '../Colors.js'

const { floor } = Math;


export default function * ( size , bar_value ){
    
    for ( let i = 0 ; i < size ; i++ )
        yield * heap_up(size,bar_value,i);
    
    for ( let i = 0 ; i < size - 1 ; i++){
        
        let last = size - 1 - i;
        
        [ bar_value[0] , bar_value[last] ] = [ bar_value[last] , bar_value[0] ];
        
        yield [ Sorted , 0 ]
        yield [ Sorted , last ]
        
        yield * heap_down(bar_value,last);
    }
}


function * heap_up ( size , bar_value , i ){
    
    let root = floor((i - 1) / 2);
    
    while ( i > 0 && bar_value[root] < bar_value[i]){
        
        yield [ Alpha , i ]
        yield [ Beta , root ]
        
        [ bar_value[i] , bar_value[root] ] = [ bar_value[root] , bar_value[i] ];
        
        yield [ Unsorted , i ]
        yield [ Unsorted , root ]

        i = root;
        
        root = floor((i - 1) / 2);
    }

    yield [ Unsorted , i ]
}

function * heap_down ( bar_value , size ){
    
    let i = 0;
    
    while ( 2 * i + 1 < size ){
        
        let child = 2 * i + 1;
        
        if(2 * i + 2 < size && bar_value[2 * i + 2] >= bar_value[child])
            child = 2 * i + 2;
        
        yield [ Alpha , i ]
        yield [ Beta , child ]
        yield [ Unsorted , i ]
        yield [ Unsorted , child ]
        
        if(bar_value[i] >= bar_value[child])
            return
        
        [ bar_value[i] , bar_value[child] ] = [ bar_value[child] , bar_value[i] ];
        
        i = child;
    }
}
