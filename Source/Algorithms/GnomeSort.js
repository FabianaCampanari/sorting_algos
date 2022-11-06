
const 
    sorted_color = '#3CB371',
    main_color = '#DC143C',
    c_1 = '#FFFF00',
    c_2 = '#0096FF';


export default function * ( size , bar_value ){
    
    let index = 0;
    
    while ( index < size ){
        
        if(bar_value[index] >= bar_value[index - 1] || index == 0){

            yield [ c_1 , index ]
            yield [ sorted_color , index ]

            index++;

        } else {

            [ bar_value[index] , bar_value[index - 1] ] = [ bar_value[index - 1] , bar_value[index] ];

            yield [ c_2 , index ]
            yield [ main_color , index + 1 ]

            index--;
        }
    }
}
