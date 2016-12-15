export const sortNumber = (a, b)=> b - a;
//@flow
export const cancatArray = (a: Array<string>, b: Array<string>)=>{
    let temp = [...a, ...b], result = [];
    temp.sort(sortNumber);
    for(let i=0; i<temp.length; i++){
        if(temp[i+1]==temp[i])i++;
        result.push(temp[i]);
    }
    return result;
}