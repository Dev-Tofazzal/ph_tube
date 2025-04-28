

function getTimeString(time){
     const day = parseInt(time/86400);
     let remainingSecond = time % 86400;
     const hour =parseInt(remainingSecond/3600) ;
     remainingSecond = time % 3600;
     const minute = parseInt(remainingSecond / 60 ) ;
     remainingSecond = remainingSecond % 60 ;
    return `${day} day ${hour} hour ${minute} minites ${remainingSecond} second ago`
}

console.log(getTimeString(7865));
