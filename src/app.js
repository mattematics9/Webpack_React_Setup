//import dependencies into the javascript so they enter the dependency graph of the project.  however, these are not javascript files, so this is why we need loaders (see webpack.config.js).  it will not show up in the index.html file, but the main.[contenthash].js file will know that it is supposed to bring in the css, read everything, and then inject it into the page, so we will have that content in our html file.  you can see the <style> tag while inspecting the html file in chrome developer tools
import style from './main.css'
import component from './component'

console.log('Hello');  //you can see in the console that this is coming from app.js.  this is due to the source mapping.  

document.body.append(component());