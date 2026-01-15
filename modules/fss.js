export async function fss(path) {
    var params = new URLSearchParams(window.location.search);
    var page = params.get('page') || '';
    let fileStart = path.split('/')[0]
    try {
        let cont;
        if(fileStart == '.') {
            cont = await fetch(`real-estate/src/${page.split('/')[0]+'/' || ''}${path.replace('./','')}`);
        } else if(fileStart == '..') {
            let pageLen = page.split('/');
            cont = await fetch(`real-estate/src/${page.split('/')[pageLen.length-3] || ''}/${path.replace('../','')}`);
        } else {
            cont = await fetch(`real-estate/src/${path}`);
        }
        let txt;
        if(!cont.ok) {
            txt = `file not found ${path}`;
        } else {
            txt = await cont.text();
        }
        return {
            text: (txt !== undefined || txt !== '') ? txt : '',
            fileName: path
        };
    } catch (error) {
        console.error(error.message);
    }

}


