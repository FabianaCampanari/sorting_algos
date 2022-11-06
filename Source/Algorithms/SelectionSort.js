
const 
    sorted_color = '#3CB371',
    main_color = '#DC143C',
    c_1 = '#FFFF00',
    c_2 = '#0096FF';


export default function * ( size , bar_value ){
    
    for ( let i = 0 ; i < size - 1 ; i++ ){
        
        let min = i;
        
        for ( let j = size - 1 ; j > i ; j-- ){

            yield [ c_1 , j ]

            if(bar_value[j] < bar_value[min])
                min = j;
            
            yield [ main_color , j ]
        }
        
        [ bar_value[i] , bar_value[min] ] = [ bar_value[min] , bar_value[i] ];
        
        yield [ sorted_color , i ]
        
        if(min != i)
            yield [ main_color , min ]
    }

    yield [ sorted_color , size - 1 ]
}
