export function fetchCount(amount: number): Promise<{data:number}>{
  return new Promise(function(resolve: (response: {data:number})=>void){
    setTimeout(()=>resolve({data:amount}), 1500)
  })
}