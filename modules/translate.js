export function transform(code) {
    let params = new URLSearchParams(window.location.search);
    let pages = params.get('page') || '';
    // let spl = code.split(/\r?\n/);
    // for (let i = 0; i < spl.length; i++) {
    //     if(spl[i].includes('#script')) {
    //         code = code.replace(new RegExp(`${spl[i]}`,'g'),`${spl[i].replace('#','241===<')}></script>241===`);
    //     } else if(spl[i].includes('@script')) {
    //         code = code.replace(new RegExp(`${spl[i]}`,'g'),`${spl[i].replace('@','241===<')}>`);
    //     } else if(spl[i].includes('!script')) {
    //         code = code.replace(new RegExp(`${spl[i]}`,'g'),`${spl[i].replace('!','</')}>241===`);
    //     } else if(spl[i].includes('?script')) {
    //         code = code.replace(/\?script/,`${spl[i].replace('?','241===<')}>`);
    //         code = code + "\n</script>241===";
    //     }
    // }
    code = code.replace(/@script([\s\S]*?){/g, (_,ats) => {
        return `241===<script${ats}>`;
    })
    .replace(/}script/g,'</script>241===')
    .replace(/hrefPage="([\s\S]*?)"/g, (_,cnt) => {
        let cntLen = cnt.split('/')[0]
        let pageLen = pages.split('/')
        if(cntLen == '.') {
            return `href="?page=${pages.split('/')[pageLen.length-2]+'/' ?? ''}${cnt.replace('./','')}"`
        } else if(cntLen == '..') {
            let folder = pages.split('/')[pageLen.length-3]
            return `href="?page=${(folder !== undefined) ? folder+'/' : ''}${cnt.replace('../','')}"`
        } else {
            return `href="?page=${cnt}"`;
        }
    })
    return code;
}