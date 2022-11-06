
const 
    sorted_color = '#3CB371',
    main_color = '#DC143C',
    c_1 = '#FFFF00',
    c_2 = '#0096FF';


export default function * ( size , bar_value ){
    
    for ( let i = 0 ; i < size ; i++ ){
        
        let temp = bar_value[i];
        
        yield [ c_2 , i ]
        
        let j = i - 1;

        for ( j = i - 1 ; j >= 0 && bar_value[j] > temp ; j-- ){
            
            bar_value[j + 1] = bar_value[j];
            
            yield [ c_1 , j ]
            yield [ c_2 , j + 1 ]
            yield [ sorted_color , j + 1 ]
            yield [ sorted_color , j ]
        }
        
        bar_value[j + 1] = temp;
        
        yield [ c_2 , i ]
        yield [ sorted_color , i ]
        yield [ c_2 , j + 1 ]
        yield [ sorted_color , j + 1 ]
    }
}
