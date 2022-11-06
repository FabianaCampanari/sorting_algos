
const 
    sorted_color = '#3CB371',
    main_color = '#DC143C',
    c_1 = '#FFFF00',
    c_2 = '#0096FF';


export default function * ( size , bar_value ){
    
    for( let i = 0 ; i < size - 1 ; i++ ){
        
        for( let j = 0 ; j < size - i - 1 ; j++ ){

            yield [ c_1 , j ]
            yield [ c_2 , j + 1 ]
            
            if(bar_value[j] > bar_value[j + 1]){
                
                [ bar_value[j] , bar_value[j + 1] ] = [ bar_value[j + 1] , bar_value[j] ];
                
                yield [ c_2 , j ]
                yield [ c_1 , j + 1 ]
            }
            
            yield [ main_color , j ]
            yield [ main_color , j + 1 ]
        }
        
        yield [ sorted_color , size - 1 - i ]
    }

    yield [ sorted_color , 0 ]
}
