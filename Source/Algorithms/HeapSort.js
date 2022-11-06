
const { floor } = Math;

const 
    sorted_color = '#3CB371',
    main_color = '#DC143C',
    c_1 = '#FFFF00',
    c_2 = '#0096FF';


export default function * ( size , bar_value ){
    
    for ( let i = 0 ; i < size ; i++ )
        yield * heap_up(size,bar_value,i);
    
    for ( let i = 0 ; i < size - 1 ; i++){
        
        let last = size - 1 - i;
        
        [ bar_value[0] , bar_value[last] ] = [ bar_value[last] , bar_value[0] ];
        
        yield [ sorted_color , 0 ]
        yield [ sorted_color , last ]
        
        yield * heap_down(bar_value,last);
    }
}


function * heap_up ( size , bar_value , i ){
    
    let root = floor((i - 1) / 2);
    
    while ( i > 0 && bar_value[root] < bar_value[i]){
        
        yield [ c_1 , i ]
        yield [ c_2 , root ]
        
        [ bar_value[i] , bar_value[root] ] = [ bar_value[root] , bar_value[i] ];
        
        yield [ main_color , i ]
        yield [ main_color , root ]

        i = root;
        
        root = floor((i - 1) / 2);
    }

    yield [ main_color , i ]
}

function * heap_down ( bar_value , size ){
    
    let i = 0;
    
    while ( 2 * i + 1 < size ){
        
        let child = 2 * i + 1;
        
        if(2 * i + 2 < size && bar_value[2 * i + 2] >= bar_value[child])
            child = 2 * i + 2;
        
        yield [ c_1 , i ]
        yield [ c_2 , child ]
        yield [ main_color , i ]
        yield [ main_color , child ]
        
        if(bar_value[i] >= bar_value[child])
            return
        
        [ bar_value[i] , bar_value[child] ] = [ bar_value[child] , bar_value[i] ];
        
        i = child;
    }
}
