
const 
    sorted_color = '#3CB371',
    main_color = '#DC143C',
    c_1 = '#FFFF00',
    c_2 = '#0096FF';


export default function * ( size , bar_value ){
    
    let 
        swapped = true ,
        lsize = size ,
        index = 0 ;
    
    while ( swapped ){
        
        swapped = false;
        
        for ( let i = index ; i < lsize - 1 ; ++i ){
            
            yield [ c_1 , i ]
            yield [ c_2 , i + 1 ]
            
            if(bar_value[i] > bar_value[i + 1]){
                
                [ bar_value[i] , bar_value[i + 1] ] = [ bar_value[i + 1] , bar_value[i] ];
                
                yield [ c_2 , i ]
                yield [ c_1 , i + 1 ]
                
                swapped = true;
            }
            
            yield [ main_color , i ]
            yield [ main_color , i + 1 ]
        }
        
        swapped = false;
        lsize--;
        
        for ( let i = lsize - 1 ; i >= index ; i--){
            
            yield [ c_1 , i ]
            yield [ c_2 , i + 1 ]

            if(bar_value[i] > bar_value[i + 1]){
                
                [ bar_value[i] , bar_value[i + 1] ] = [ bar_value[i + 1] , bar_value[i] ];
                
                yield [ c_2 , i ]
                yield [ c_1 , i + 1 ]

                swapped = true;
            }

            yield [ main_color , i ]
            yield [ main_color , i + 1 ]
        }

        yield [ sorted_color , index ]
        
        index++
        
        yield [ sorted_color , lsize ]
    }

    for( let i = 0 ; i < size ; i++ )
        yield [ sorted_color , i ]
}
