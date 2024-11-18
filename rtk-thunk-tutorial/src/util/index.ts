export function fetchCount(amount: number): Promise<{data:number}>{
  return new Promise(function(resolve: (response: {data:number})=>void){
    setTimeout(()=>resolve({data:amount}), 1500)
  })
}

const ROOT_URL = 'http://127.0.0.1:3000'

export const getUrl = (stub: string) => (stub[0] === "/" ? (ROOT_URL + stub) : (ROOT_URL + "/" + stub))