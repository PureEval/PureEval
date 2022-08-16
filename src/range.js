function range(start,end){
    if(typeof start==='number'&&typeof end==='number')
        return new Array(end-start+1).fill(start).map((v,i)=>start+i);
    else if(typeof start==='string'&&typeof end==='string'){
        let l=start.charCodeAt(),r=end.charCodeAt();
        return new Array(r-l+1).fill(start).map((v,i)=>String.fromCharCode(l+i));
    }
}
export { range };