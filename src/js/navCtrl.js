class Nav {
    toggleNav(){
        let menu = document.querySelector('#mobileNav');
        if(menu.classList.contains('hidden')){
            menu.classList.remove('hidden');

        } else {
            menu.classList.add('hidden');
            
         }
    }
};
const nav = new Nav();
export default nav; 

