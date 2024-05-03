function printReport(pages){
    console.log('Report starting...');
    const pageList = sortReport(pages);
    for (const page of pageList){
        console.log(`Found ${page.count} internal links to ${page.url}`);
    }
}


function sortReport(pages){
    const pageList = [];
    for (const page of Object.keys(pages)){
        pageList.push({url: page, 
            count: pages[page],
        });
    }

    pageList.sort(compare);
    
    return pageList;
}

function compare(a, b){
    const countA = a.count;
    const countB = b.count;
    return countB - countA;
}

export { printReport };