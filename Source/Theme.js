
import { byId } from './Document.js'


// Dark and Light mode switch

const 
    light = byId('light') ,
    dark = byId('dark') ;


function switch_to_dark (){
    
    light.show();
    dark.hide();
    
    document.body.style.backgroundColor = '#212529';
    document.body.style.color = '#fff';
    
    const { style } = document.documentElement;
    
    style.setProperty('--sort-btn-background-color','#212529');
    style.setProperty('--bar-background-color','#f5f5f5');
    style.setProperty('--source-code-color','#00ffff');
    style.setProperty('--sort-btn-color','#f5f5f5');
    style.setProperty('--shadow-color', "#888888");
}

function swith_to_light (){
    
    light.hide();
    dark.show();
    
    document.body.style.backgroundColor = '#f5f5f5';
    document.body.style.color = '#000';
    
    const { style } = document.documentElement;
    
    style.setProperty('--sort-btn-background-color','#f5f5f5');
    style.setProperty('--bar-background-color','#212529');
    style.setProperty('--source-code-color','#000000');
    style.setProperty('--sort-btn-color','#212529');
    style.setProperty('--shadow-color','#212529');
}

light.addEventListener('click',swith_to_light);
dark.addEventListener('click',switch_to_dark);
