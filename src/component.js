//the asset/resource loader makes it so logo is a url.  its dynamically generated when the image is turned into a module by the asset/resoure loader.
import logo from './logo.png'

function component(){
    let m = document.createElement('main');
    let p = document.createElement('p');
    let img = document.createElement('img');
    m.append(p);
    p.append(img);
    img.src = logo;
    img.alt = 'sample logo';
    return m;
}

export default component;

//import and export are ES6 code.  Webpack by itself will handle import and export, but we need babel for the rest of the ES6 features.  