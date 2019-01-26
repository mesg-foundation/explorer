<template>
  <div class="service-item-skeleton"></div>
</template>

<style lang="scss" >
/*
 * Variables
 */

:root {  
  --card-padding: 30px;
  --card-height: 130px;
  --card-skeleton: linear-gradient(#fff var(--card-height), transparent 0);
  
  --avatar-size: 70px;
  --avatar-position: 30px 25px;
  --avatar-skeleton: radial-gradient(circle 35px at center, #eee 99%, transparent 0);
  
  --text-1-height: 14px;
  --text-1-width: 250px;
  --text-1-position: 125px 30px;
  --text-1-skeleton: linear-gradient(#eee var(--text-1-height), transparent 0);
  
  --text-2-height: 12px;
  --text-2-width: 150px;
  --text-2-position: 125px 52px;
  --text-2-skeleton: linear-gradient(#eee var(--text-2-height), transparent 0);
  
  --text-3-height: 22px;
  --text-3-width: 450px;
  --text-3-position: 125px 80px;
  --text-3-skeleton: linear-gradient(#eee var(--text-3-height), transparent 0);
  
  --blur-width: 200px;
  --blur-size: var(--blur-width) var(--card-height);
}

/*
 * Card Skeleton for Loading
 */

.service-item-skeleton {
  width: 100%;
  height: var(--card-height);
  margin: 20px 0;
  opacity: 0.9;
  
  &:empty::after {
    content: "";
    display:block;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 1px 2px #eee;

    background-image:
      linear-gradient(
        90deg, 
        rgba(#fff, 0) 0, 
        rgba(#fff, .4) 50%, 
        rgba(#fff, 0) 100%
      ),                          //animation blur
      var(--text-1-skeleton),      //text-1
      var(--text-2-skeleton),      //text-1
      var(--text-3-skeleton),      //text-1
      var(--avatar-skeleton),     //avatar
      var(--card-skeleton)        //card
    ;

    background-size:
      var(--blur-size),
      var(--text-1-width) var(--text-1-height),
      var(--text-2-width) var(--text-2-height),
      var(--text-3-width) var(--text-3-height),
      var(--avatar-size) var(--avatar-size),
      100% 100%
    ;
    
    background-position:
      -150% 0,                      //animation
      var(--text-1-position),        //text-1
      var(--text-2-position),        //text-2
      var(--text-3-position),        //text-3
      var(--avatar-position),       //avatar
      0 0                           //card
    ;

    background-repeat: no-repeat;
    animation: loading 1.5s infinite;
  }
}

@keyframes loading {
  to {
    background-position:
      350% 0,        
      var(--text-1-position),  
      var(--text-2-position),  
      var(--text-3-position),  
      var(--avatar-position),
      0 0
    ;
  }
}
</style>