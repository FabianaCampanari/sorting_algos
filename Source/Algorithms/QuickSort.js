
const 
    sorted_color = '#3CB371',
    main_color = '#DC143C',
    c_1 = '#FFFF00',
    c_2 = '#0096FF';


export default function * sort ( size , bar_value , start , end ){
    
    if(start > end){
        yield [ sorted_color , start ]
        return
    }
    
    if(start == end){
        yield [ sorted_color , start ]
        return
    }
    
    let pivot = bar_value[start] ,
        tail = end + 1 ,
        head = start ;
    
    while ( head < tail ){
        
        do {

            yield [ c_1 , head ]
            yield [ main_color , head ]

            head++;

        } while (bar_value[head] <= pivot);
        
        do {

            tail--;

            yield [ c_2 , tail ]
            yield [ main_color , tail ]

        } while (bar_value[tail] > pivot);
        
        if(head < tail)
            [ bar_value[head] , bar_value[tail] ] = [ bar_value[tail] , bar_value[head] ];
    }
    
    [ bar_value[start] , bar_value[tail] ] = [ bar_value[tail] , bar_value[start] ];
    
    yield [ sorted_color , tail ]
    
    yield * sort(size,bar_value,start,tail - 1);
    yield * sort(size,bar_value,tail + 1, end);
}
